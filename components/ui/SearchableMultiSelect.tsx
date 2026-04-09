"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchableMultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  inputClassName?: string;
  emptyMessage?: string;
}

export function SearchableMultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Search and select",
  inputClassName,
  emptyMessage = "No matching options found.",
}: SearchableMultiSelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const availableOptions = useMemo(
    () => options.filter((option) => !selected.includes(option)),
    [options, selected],
  );

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return availableOptions.slice(0, 8);
    }

    const startsWith = availableOptions.filter((option) =>
      option.toLowerCase().startsWith(normalizedQuery),
    );
    const contains = availableOptions.filter(
      (option) =>
        !option.toLowerCase().startsWith(normalizedQuery) &&
        option.toLowerCase().includes(normalizedQuery),
    );

    return [...startsWith, ...contains].slice(0, 8);
  }, [availableOptions, query]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const addOption = (option: string) => {
    onChange([...selected, option]);
    setQuery("");
    setHighlightedIndex(0);
    setIsOpen(false);
  };

  const removeOption = (option: string) => {
    onChange(selected.filter((item) => item !== option));
    setHighlightedIndex(0);
  };

  return (
    <div ref={rootRef} className="space-y-3">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => removeOption(option)}
              className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/15"
            >
              {option}
              <X className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 z-[1] h-4 w-4 -translate-y-1/2 text-outline" />
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          className={cn(inputClassName, "pl-11 pr-12")}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setHighlightedIndex(0);
            setIsOpen(true);
          }}
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
                addOption(option);
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
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />

        {isOpen && (
          <div
            id={listboxId}
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl border border-outline-variant/20 bg-card shadow-2xl"
          >
            {filteredOptions.length ? (
              <div className="max-h-72 overflow-y-auto py-2">
                {filteredOptions.map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={false}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => addOption(option)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors",
                      index === highlightedIndex
                        ? "bg-primary/8"
                        : "hover:bg-surface-container-low",
                    )}
                  >
                    <span className="truncate text-sm font-bold text-foreground">
                      {option}
                    </span>
                    <Check className="h-4 w-4 flex-shrink-0 text-primary opacity-0" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
