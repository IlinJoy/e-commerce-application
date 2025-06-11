export const makePromoString = (promoName: string) => {
  const REPEAT_TIMES = 12;

  const promoText = `${promoName} — `;
  return promoText.repeat(REPEAT_TIMES);
};
