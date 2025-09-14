export default function formatMileage(mileage) {
  const number = Number(mileage);

  return number.toLocaleString("uk-UA") + " km";
}