export default function formatMileageInput(mileage) {
  if (!mileage) {
    return "";
  }
  const number = Number(mileage);

  if (isNaN(number)) {
    return "";
  }

  return number.toLocaleString("en-US");
}