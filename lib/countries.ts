import countryList from "country-list-with-dial-code-and-flag";

export interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

// Get all countries from the library and map them to our interface
// We filter out secondary entries to avoid duplicate keys (e.g., 'TR' for Turkey and Türkiye)
export const countries: Country[] = countryList.getAll({ withSecondary: false }).map((c: any) => ({
  name: c.data.name,
  code: c.data.code,
  dial_code: c.data.dial_code,
  flag: c.data.flag,
}));
