"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";
import { cities, states, type ICity, type IState } from "country-cities";
import { cn } from "@/lib/utils";

type IndianCityOption = {
  city: string;
  state: string;
  stateCode: string;
  latitude: number;
  longitude: number;
  searchText: string;
};

const INDIA_COUNTRY_CODE = "IN";
const MAX_VISIBLE_OPTIONS = 8;

const INDIA_STATES = states.getByCountry(INDIA_COUNTRY_CODE) as IState[];
const STATE_NAME_BY_CODE = new Map(
  INDIA_STATES.map((state) => [state.isoCode, state.name]),
);

const INDIAN_CITY_OPTIONS = Array.from(
  new Map(
    (cities.getByCountry(INDIA_COUNTRY_CODE) as ICity[])
      .map((city) => {
        const state = STATE_NAME_BY_CODE.get(city.stateCode) ?? city.stateCode;
        return [
          `${city.name.toLowerCase()}::${city.stateCode}`,
          {
            city: city.name,
            state,
            stateCode: city.stateCode,
            latitude: Number(city.latitude ?? 0),
            longitude: Number(city.longitude ?? 0),
            searchText: `${city.name} ${state}`.toLowerCase(),
          } satisfies IndianCityOption,
        ];
      }),
  ).values(),
).sort((a, b) => a.city.localeCompare(b.city) || a.state.localeCompare(b.state));

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function calculateDistanceInKm(
  latitudeA: number,
  longitudeA: number,
  latitudeB: number,
  longitudeB: number,
) {
  const earthRadiusKm = 6371;
  const deltaLatitude = toRadians(latitudeB - latitudeA);
  const deltaLongitude = toRadians(longitudeB - longitudeA);
  const a =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(toRadians(latitudeA)) *
      Math.cos(toRadians(latitudeB)) *
      Math.sin(deltaLongitude / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

export function findNearestIndianCity(latitude: number, longitude: number) {
  let nearestOption: IndianCityOption | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const option of INDIAN_CITY_OPTIONS) {
    if (!Number.isFinite(option.latitude) || !Number.isFinite(option.longitude)) {
      continue;
    }

    const distance = calculateDistanceInKm(
      latitude,
      longitude,
      option.latitude,
      option.longitude,
    );

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestOption = option;
    }
  }

  if (!nearestOption) {
    return null;
  }

  return {
    city: nearestOption.city,
    state: nearestOption.state,
    stateCode: nearestOption.stateCode,
    distanceKm: nearestDistance,
  };
}

function getFilteredOptions(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return INDIAN_CITY_OPTIONS.slice(0, MAX_VISIBLE_OPTIONS);
  }

  const startsWith = INDIAN_CITY_OPTIONS.filter((option) =>
    option.city.toLowerCase().startsWith(normalizedQuery),
  );
  const contains = INDIAN_CITY_OPTIONS.filter(
    (option) =>
      !option.city.toLowerCase().startsWith(normalizedQuery) &&
      option.searchText.includes(normalizedQuery),
  );

  return [...startsWith, ...contains].slice(0, MAX_VISIBLE_OPTIONS);
}

function findExactMatch(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return null;
  }

  const exactMatches = INDIAN_CITY_OPTIONS.filter(
    (option) => option.city.toLowerCase() === normalizedQuery,
  );

  return exactMatches.length === 1 ? exactMatches[0] : null;
}

interface IndianCitySelectProps {
  value: string;
  stateValue: string;
  onChange: (selection: { city: string; state: string }) => void;
  inputClassName?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function IndianCitySelect({
  value,
  stateValue,
  onChange,
  inputClassName,
  disabled = false,
  placeholder = "Search your city",
}: IndianCitySelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const filteredOptions = getFilteredOptions(query);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  const commitSelection = (option: IndianCityOption) => {
    setQuery(option.city);
    setIsOpen(false);
    onChange({ city: option.city, state: option.state });
  };

  const handleInputChange = (nextValue: string) => {
    setQuery(nextValue);
    setIsOpen(true);

    const exactMatch = findExactMatch(nextValue);
    if (exactMatch) {
      onChange({ city: exactMatch.city, state: exactMatch.state });
      return;
    }

    onChange({ city: nextValue, state: "" });
  };

  const handleBlur = () => {
    window.setTimeout(() => {
      const exactMatch = findExactMatch(query);

      if (exactMatch) {
        commitSelection(exactMatch);
        return;
      }

      if (!query.trim()) {
        onChange({ city: "", state: "" });
      } else if (stateValue) {
        setQuery(value);
      }

      setIsOpen(false);
    }, 120);
  };

  return (
    <div ref={rootRef} className="relative">
      <MapPin className="pointer-events-none absolute left-4 top-1/2 z-[1] h-5 w-5 -translate-y-1/2 text-outline" />
      <input
        type="text"
        value={query}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(inputClassName, "pr-12 pl-12")}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        onChange={(event) => handleInputChange(event.target.value)}
        onKeyDown={(event) => {
          if (!filteredOptions.length) {
            return;
          }

          if (event.key === "ArrowDown") {
            event.preventDefault();
            setIsOpen(true);
            setHighlightedIndex((current) =>
              current >= filteredOptions.length - 1 ? 0 : current + 1,
            );
            return;
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            setIsOpen(true);
            setHighlightedIndex((current) =>
              current <= 0 ? filteredOptions.length - 1 : current - 1,
            );
            return;
          }

          if (event.key === "Enter") {
            const option = filteredOptions[highlightedIndex];

            if (option) {
              event.preventDefault();
              commitSelection(option);
            }
            return;
          }

          if (event.key === "Escape") {
            setIsOpen(false);
          }
        }}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-autocomplete="list"
      />
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-outline" />

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl border border-outline-variant/20 bg-card shadow-2xl"
        >
          {filteredOptions.length ? (
            <div className="max-h-72 overflow-y-auto py-2">
              {filteredOptions.map((option, index) => {
                const isSelected =
                  option.city === value && option.state === stateValue;

                return (
                  <button
                    key={`${option.city}-${option.stateCode}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => commitSelection(option)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors",
                      index === highlightedIndex
                        ? "bg-primary/8"
                        : "hover:bg-surface-container-low",
                    )}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-foreground">
                        {option.city}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {option.state}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-start gap-3 px-4 py-3.5 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              <p>Select a suggested city so we can auto-fill your state.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
