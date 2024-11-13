export type Coupon = {
  id?: number;
  Code: string;
  Description: string;
  DiscountAmount: number;
  IsPercentages: boolean;
  CreatedDate: Date;
  ExpirationDate?: Date;
  AllowDoublePromotion: boolean;
  UsageLimit: number;
  UsageCount: number;
  UserId: number;
};

export type UserCouponCardType = {
  couponCode: string;
  couponValidationDate: Date;
}
