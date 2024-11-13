import { Coupon } from "../Models/Coupon";

export enum CouponValidationStatus {
  Expiered = "Coupon Expiered",
  Promorion = "Coupon Not Allowed Double Promotion",
  Limit = "The Coupon Limit Is Over",
  Valid = "Valid",
}

export const isCouponValid = (
  numOfValidatedCoupons: number,
  coupon: Coupon
) => {
  if (coupon.ExpirationDate != null) {
    const expieryDate = getReadbaleDate(coupon.ExpirationDate);
    const currentDate = new Date();
    if (expieryDate < currentDate) {
      return CouponValidationStatus.Expiered;
    }
  }

  if (numOfValidatedCoupons > 0) {
    if (!coupon.AllowDoublePromotion) {
      return CouponValidationStatus.Promorion;
    }
  }

  if (coupon.UsageLimit <= coupon.UsageCount) {
    return CouponValidationStatus.Limit;
  }

  return CouponValidationStatus.Valid;
};

export const getReadbaleDate = (rawDate: Date) => {
  const date = rawDate.toString().split("-");
  const dateDay = parseInt(date[date.length - 1].split("T")[0]);
  const validDate = new Date();
  validDate.setDate(dateDay);
  validDate.setFullYear(parseInt(date[0]));
  validDate.setMonth(parseInt(date[1]) - 1);
  validDate.setHours(0);
  validDate.setMinutes(0);
  validDate.setMilliseconds(0);
  return validDate;
};
