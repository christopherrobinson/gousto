export const toISODuration = (input) => {
  const regex = /(\d+)\s*(hour|hours|minute|minutes|second|seconds)/gi;
  let match;
  let hours = 0, minutes = 0, seconds = 0;

  while ((match = regex.exec(input)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    if (unit.startsWith('hour')) hours += value;
    else if (unit.startsWith('minute')) minutes += value;
    else if (unit.startsWith('second')) seconds += value;
  }

  if (hours === 0 && minutes === 0 && seconds === 0) return null;

  let iso = 'PT';
  if (hours) iso += `${hours}H`;
  if (minutes) iso += `${minutes}M`;
  if (seconds) iso += `${seconds}S`;

  return iso;
}
