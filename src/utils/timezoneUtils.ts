
export function convertTimezone(
  dateTime: string,
  fromTimezone: string,
  toTimezone: string
): string {
  const [datePart, timePart] = dateTime.split("T");

  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  // Treat entered date/time as UTC temporarily.
  const desiredTime = Date.UTC(
    year,
    month - 1,
    day,
    hours,
    minutes
  );

  let timestamp = desiredTime;

  // Find the UTC instant matching the selected source timezone.
  for (let i = 0; i < 4; i++) {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: fromTimezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date(timestamp));

    const values: Record<string, number> = {};

    parts.forEach((part) => {
      if (part.type !== "literal") {
        values[part.type] = Number(part.value);
      }
    });

    const actualTime = Date.UTC(
      values.year,
      values.month - 1,
      values.day,
      values.hour,
      values.minute
    );

    const difference = desiredTime - actualTime;

    if (difference === 0) break;

    timestamp += difference;
  }

  // Format the converted time in the destination timezone.
  return new Intl.DateTimeFormat("en-US", {
    timeZone: toTimezone,
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(timestamp));
}
