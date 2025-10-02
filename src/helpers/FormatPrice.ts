export function formatPrice(
  amount?: number | null,
  currency = "USD",
  locale = "en-US"
) {
  const safeAmount = typeof amount === "number" ? amount : 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(safeAmount);
}
