
import { useEffect, useState } from "react";
import { timezones } from "./data/timezones";
import type { TimeZone } from "./data/timezones";
import { convertTimezone } from "./utils/timezoneUtils";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [fromTimezone, setFromTimezone] = useState("Asia/Kolkata");
  const [toTimezone, setToTimezone] = useState("America/New_York");

  // Time Converter
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("09:00");

  // Calendar
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  // Custom Time Picker
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Cities
  const [cities, setCities] = useState<TimeZone[]>([
    timezones[0],
    timezones[1],
  ]);

  const [showCities, setShowCities] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [storageLoaded, setStorageLoaded] = useState(false);

  // Update live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Load saved cities
  useEffect(() => {
    async function loadCities() {
      try {
        if (typeof browser !== "undefined") {
          const result = await browser.storage.local.get("cities");

          if (Array.isArray(result.cities)) {
            setCities(result.cities as TimeZone[]);
          }
        }
      } catch (error) {
        console.error("Failed to load cities:", error);
      } finally {
        setStorageLoaded(true);
      }
    }

    loadCities();
  }, []);

  // Save cities
  useEffect(() => {
    if (!storageLoaded || typeof browser === "undefined") {
      return;
    }

    async function saveCities() {
      try {
        await browser.storage.local.set({ cities });
      } catch (error) {
        console.error("Failed to save cities:", error);
      }
    }

    saveCities();
  }, [cities, storageLoaded]);

  // Available cities
  const availableCities = timezones.filter(
    (zone) =>
      !cities.some(
        (city) =>
          city.city === zone.city &&
          city.country === zone.country
      )
  );

  // Search cities
  const filteredCities = availableCities.filter((city) => {
    const search = searchQuery.trim().toLowerCase();

    return (
      city.city.toLowerCase().includes(search) ||
      city.country.toLowerCase().includes(search)
    );
  });

  // Add city
  function addCity(city: TimeZone) {
    setCities((prev) => [...prev, city]);
    setSearchQuery("");
    setShowCities(false);
  }

  // Remove city
  function removeCity(cityToRemove: TimeZone) {
    setCities((prev) =>
      prev.filter(
        (city) =>
          !(
            city.city === cityToRemove.city &&
            city.country === cityToRemove.country
          )
      )
    );
  }

  // Local time
  const localTime = currentTime.toLocaleTimeString();

  const localDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Calendar values
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, index) => index + 1),
  ];

  const monthLabel = calendarMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Format date
  function formatDate(day: number) {
    const currentMonth = String(month + 1).padStart(2, "0");
    const currentDay = String(day).padStart(2, "0");

    return `${year}-${currentMonth}-${currentDay}`;
  }

  // Select date
  function selectDate(day: number) {
    setSelectedDate(formatDate(day));
    setShowCalendar(false);
  }

  // Change calendar month
  function changeMonth(direction: number) {
    setCalendarMonth(new Date(year, month + direction, 1));
  }

  // Open calendar
  function openCalendar() {
    setShowTimePicker(false);

    if (selectedDate) {
      const [selectedYear, selectedMonth] = selectedDate
        .split("-")
        .map(Number);

      setCalendarMonth(
        new Date(selectedYear, selectedMonth - 1, 1)
      );
    }

    setShowCalendar((prev) => !prev);
  }

  // Convert selected time into 12-hour format
  const [hour24, minute] = selectedTime.split(":");

  const hourNumber = Number(hour24);
  const displayHour = hourNumber % 12 || 12;
  const period = hourNumber >= 12 ? "PM" : "AM";

  // Update selected hour
  function updateHour(hour: number) {
    const newHour =
      (hour % 12) + (period === "PM" ? 12 : 0);

    setSelectedTime(
      `${String(newHour).padStart(2, "0")}:${minute}`
    );
  }

  // Update AM / PM
  function updatePeriod(newPeriod: "AM" | "PM") {
    let newHour = hourNumber % 12;

    if (newPeriod === "PM") {
      newHour += 12;
    }

    setSelectedTime(
      `${String(newHour).padStart(2, "0")}:${minute}`
    );
  }

  // Time conversion
  const selectedDateTime =
    selectedDate && selectedTime
      ? `${selectedDate}T${selectedTime}`
      : "";

  const convertedTime =
    selectedDateTime && fromTimezone !== toTimezone
      ? convertTimezone(
          selectedDateTime,
          fromTimezone,
          toTimezone
        )
      : selectedDateTime
        ? "Both cities have the same timezone."
        : "";

  // Format selected date
  const formattedSelectedDate = selectedDate
    ? new Date(
        Number(selectedDate.split("-")[0]),
        Number(selectedDate.split("-")[1]) - 1,
        Number(selectedDate.split("-")[2])
      ).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Select date";

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>World Clock</h1>
          <p>Time across the world</p>
        </div>

        <button
          className="add-btn"
          onClick={() => {
            setShowCities(!showCities);
            setSearchQuery("");
          }}
        >
          + Add City
        </button>
      </header>

      {showCities && (
        <div className="city-dropdown">
          <h3>Select a City</h3>

          <input
            type="text"
            className="city-search"
            placeholder="Search city or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {filteredCities.length === 0 ? (
            <p>
              {availableCities.length === 0
                ? "All cities have been added."
                : "No cities found."}
            </p>
          ) : (
            filteredCities.map((city) => (
              <button
                key={`${city.city}-${city.country}`}
                onClick={() => addCity(city)}
              >
                {city.city}, {city.country}
              </button>
            ))
          )}
        </div>
      )}

      <main>
        {/* Local Clock */}
        <section className="clock-section">
          <h2>Your Local Time</h2>

          <div className="local-clock">
            <h3>{localTime}</h3>
            <p>{localDate}</p>
          </div>
        </section>

        {/* World Cities */}
        <section className="clock-section">
          <h2>World Cities</h2>

          <div className="city-list">
            {cities.map((zone) => (
              <div
                className="city-card"
                key={`${zone.city}-${zone.country}`}
              >
                <div>
                  <h3>{zone.city}</h3>
                  <p>{zone.country}</p>
                </div>

                <div className="city-actions">
                  <span className="city-time">
                    {currentTime.toLocaleTimeString("en-US", {
                      timeZone: zone.timezone,
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>

                  <button
                    className="remove-btn"
                    onClick={() => removeCity(zone)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Time Converter */}
        <section className="converter-section">
          <h2>Time Converter</h2>

          <div className="converter-card">
            <label htmlFor="fromTimezone">From City</label>

            <select
              id="fromTimezone"
              value={fromTimezone}
              onChange={(e) => setFromTimezone(e.target.value)}
            >
              {timezones.map((zone) => (
                <option
                  key={`${zone.city}-${zone.country}`}
                  value={zone.timezone}
                >
                  {zone.city}, {zone.country}
                </option>
              ))}
            </select>

            {/* Custom Calendar */}
            <label>Select Date</label>

            <div className="custom-date-wrapper">
              <button
                type="button"
                className="date-picker-button"
                onClick={openCalendar}
              >
                <span>{formattedSelectedDate}</span>
                <span>▦</span>
              </button>

              {showCalendar && (
                <div className="custom-calendar">
                  <div className="calendar-header">
                    <button
                      type="button"
                      onClick={() => changeMonth(-1)}
                    >
                      ‹
                    </button>

                    <strong>{monthLabel}</strong>

                    <button
                      type="button"
                      onClick={() => changeMonth(1)}
                    >
                      ›
                    </button>
                  </div>

                  <div className="calendar-grid">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                      (day) => (
                        <span
                          className="calendar-weekday"
                          key={day}
                        >
                          {day}
                        </span>
                      )
                    )}

                    {calendarDays.map((day, index) =>
                      day === null ? (
                        <span key={`empty-${index}`} />
                      ) : (
                        <button
                          type="button"
                          key={day}
                          className={
                            selectedDate === formatDate(day)
                              ? "calendar-day selected"
                              : "calendar-day"
                          }
                          onClick={() => selectDate(day)}
                        >
                          {day}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Custom 12-hour Time Picker */}
            <label>Select Time</label>

            <div className="custom-time-wrapper">
              <button
                type="button"
                className="time-picker-button"
                onClick={() => {
                  setShowCalendar(false);
                  setShowTimePicker((prev) => !prev);
                }}
              >
                <span>
                  {displayHour}:{minute} {period}
                </span>
                <span>◷</span>
              </button>

              {showTimePicker && (
                <div className="custom-time-picker">
                  <div className="time-columns">
                    {/* Hour */}
                    <div className="time-column">
                      <strong>Hour</strong>

                      <div className="time-options">
                        {Array.from({ length: 12 }, (_, i) => {
                          const hour = i + 1;

                          return (
                            <button
                              type="button"
                              key={hour}
                              className={
                                displayHour === hour
                                  ? "time-option active"
                                  : "time-option"
                              }
                              onClick={() => updateHour(hour)}
                            >
                              {hour}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Minute */}
                    <div className="time-column">
                      <strong>Minute</strong>

                      <div className="time-options">
                        {Array.from({ length: 60 }, (_, i) => {
                          const minuteValue = String(i).padStart(2, "0");

                          return (
                            <button
                              type="button"
                              key={minuteValue}
                              className={
                                minute === minuteValue
                                  ? "time-option active"
                                  : "time-option"
                              }
                              onClick={() => {
                                setSelectedTime(
                                  `${hour24}:${minuteValue}`
                                );
                              }}
                            >
                              {minuteValue}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* AM / PM */}
                    <div className="time-column">
                      <strong>AM / PM</strong>

                      <div className="time-options">
                        {(["AM", "PM"] as const).map((value) => (
                          <button
                            type="button"
                            key={value}
                            className={
                              period === value
                                ? "time-option active"
                                : "time-option"
                            }
                            onClick={() => updatePeriod(value)}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="time-done-btn"
                    onClick={() => setShowTimePicker(false)}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* To City */}
            <label htmlFor="toTimezone">To City</label>

            <select
              id="toTimezone"
              value={toTimezone}
              onChange={(e) => setToTimezone(e.target.value)}
            >
              {timezones.map((zone) => (
                <option
                  key={`${zone.city}-${zone.country}`}
                  value={zone.timezone}
                >
                  {zone.city}, {zone.country}
                </option>
              ))}
            </select>

            {/* Conversion Result */}
            {convertedTime && (
              <div className="conversion-result">
                <h3>Converted Time</h3>
                <p>{convertedTime}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer>
        <span>Time Zone Converter</span>
        <span>12 / 24 Hour</span>
      </footer>
    </div>
  );
}

export default App;
