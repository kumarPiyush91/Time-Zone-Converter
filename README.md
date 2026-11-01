# Time Zone Converter 🌍

A lightweight Firefox browser extension that lets you compare world clocks and convert time between different time zones with ease.

## ✨ Features

- **Live Local Clock:** View your current local time.
- **World Clock:** Track the current time in multiple cities around the world.
- **Add & Remove Cities:** Customize your world clock by adding or removing cities.
- **City Search:** Quickly find cities by city name or country.
- **Time Zone Converter:** Convert a selected date and time between different time zones.
- **12-Hour Time Picker:** Select hours from 1–12, minutes from 00–59, and choose AM or PM.
- **Custom Calendar:** Select dates using an easy-to-use calendar.
- **Persistent Storage:** Your selected cities are saved locally using Firefox Storage API.
- **Lightweight & Backend-Free:** No backend server or account registration required.

## 🛠️ Built With

- React
- TypeScript
- Vite
- CSS
- JavaScript Internationalization API (`Intl`)
- Firefox WebExtensions API

## 📁 Project Structure

```text
time-zone-converter/
│
├── public/
│   └── manifest.json
│
├── src/
│   ├── data/
│   │   └── timezones.ts
│   │
│   ├── utils/
│   │   └── timezoneUtils.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔒 Privacy

Time Zone Converter does not require an account or a backend server.

- Selected cities are stored locally using Firefox Storage API.
- Time zone conversions are performed locally in the browser.
- No personal information or location data is collected by the extension.

## 🎯 Purpose

This project was built to provide a simple and convenient way to track time across different cities and convert dates and times between time zones directly from the Firefox toolbar.

## 📄 License

This project is open source. A license will be specified separately.