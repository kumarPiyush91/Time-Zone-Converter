
export interface TimeZone {
  city: string;
  country: string;
  timezone: string;
}

export const timezones: TimeZone[] = [
  // North America
  { city: "New York", country: "USA", timezone: "America/New_York" },
  { city: "Los Angeles", country: "USA", timezone: "America/Los_Angeles" },
  { city: "Chicago", country: "USA", timezone: "America/Chicago" },
  { city: "Toronto", country: "Canada", timezone: "America/Toronto" },
  { city: "Vancouver", country: "Canada", timezone: "America/Vancouver" },

  // Europe
  { city: "London", country: "UK", timezone: "Europe/London" },
  { city: "Paris", country: "France", timezone: "Europe/Paris" },
  { city: "Berlin", country: "Germany", timezone: "Europe/Berlin" },
  { city: "Rome", country: "Italy", timezone: "Europe/Rome" },
  { city: "Madrid", country: "Spain", timezone: "Europe/Madrid" },
  { city: "Amsterdam", country: "Netherlands", timezone: "Europe/Amsterdam" },
  { city: "Moscow", country: "Russia", timezone: "Europe/Moscow" },

  // Asia
  { city: "Mumbai", country: "India", timezone: "Asia/Kolkata" },
  { city: "Delhi", country: "India", timezone: "Asia/Kolkata" },
  { city: "Kolkata", country: "India", timezone: "Asia/Kolkata" },
  { city: "Bengaluru", country: "India", timezone: "Asia/Kolkata" },
  { city: "Dubai", country: "UAE", timezone: "Asia/Dubai" },
  { city: "Abu Dhabi", country: "UAE", timezone: "Asia/Dubai" },
  { city: "Singapore", country: "Singapore", timezone: "Asia/Singapore" },
  { city: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok" },
  { city: "Hong Kong", country: "China", timezone: "Asia/Hong_Kong" },
  { city: "Shanghai", country: "China", timezone: "Asia/Shanghai" },
  { city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo" },
  { city: "Seoul", country: "South Korea", timezone: "Asia/Seoul" },
  { city: "Jakarta", country: "Indonesia", timezone: "Asia/Jakarta" },
  { city: "Kuala Lumpur", country: "Malaysia", timezone: "Asia/Kuala_Lumpur" },
  { city: "Karachi", country: "Pakistan", timezone: "Asia/Karachi" },
  { city: "Dhaka", country: "Bangladesh", timezone: "Asia/Dhaka" },

  // Oceania
  { city: "Sydney", country: "Australia", timezone: "Australia/Sydney" },
  { city: "Melbourne", country: "Australia", timezone: "Australia/Melbourne" },
  { city: "Perth", country: "Australia", timezone: "Australia/Perth" },
  { city: "Auckland", country: "New Zealand", timezone: "Pacific/Auckland" },

  // Africa
  { city: "Cairo", country: "Egypt", timezone: "Africa/Cairo" },
  { city: "Johannesburg", country: "South Africa", timezone: "Africa/Johannesburg" },
  { city: "Nairobi", country: "Kenya", timezone: "Africa/Nairobi" },
  { city: "Lagos", country: "Nigeria", timezone: "Africa/Lagos" },

  // South America
  { city: "Sao Paulo", country: "Brazil", timezone: "America/Sao_Paulo" },
  { city: "Rio de Janeiro", country: "Brazil", timezone: "America/Sao_Paulo" },
  { city: "Buenos Aires", country: "Argentina", timezone: "America/Argentina/Buenos_Aires" },
  { city: "Mexico City", country: "Mexico", timezone: "America/Mexico_City" },
  { city: "Bogota", country: "Colombia", timezone: "America/Bogota" },
];
