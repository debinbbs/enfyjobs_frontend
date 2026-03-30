"use client";

import { useState, useRef, useEffect } from "react";
import { countries, Country } from "@/lib/countries";
import { cn } from "@/lib/utils";
import { Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CountryCodeSelectorProps {
  onSelect: (country: Country) => void;
  selectedCountry: Country;
}

export function CountryCodeSelector({ onSelect, selectedCountry }: CountryCodeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial_code.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-full px-4 border-r border-outline-variant/10 hover:bg-surface-container-high transition-colors focus:outline-none rounded-l-full"
      >
        <span className="text-xl">{selectedCountry.flag}</span>
        <span className="font-black text-sm text-foreground">{selectedCountry.dial_code}</span>
        <ChevronDown className={cn("size-4 text-outline transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-full mt-4 w-72 max-h-80 overflow-hidden bg-surface-container-lowest glass-effect rounded-[1.5rem] shadow-2xl z-[100] border border-outline-variant/10 flex flex-col"
          >
            <div className="p-4 border-b border-outline-variant/10 relative">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 size-4 text-outline" />
              <input
                autoFocus
                placeholder="Search Country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-surface-container-highest border-none rounded-full text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      onSelect(country);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-high transition-colors text-left",
                      selectedCountry.code === country.code && "bg-primary/5"
                    )}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-foreground">{country.name}</span>
                      <span className="text-[10px] font-bold text-outline uppercase">{country.dial_code}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-outline font-black text-[10px] uppercase tracking-widest opacity-60">
                  No matches found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
