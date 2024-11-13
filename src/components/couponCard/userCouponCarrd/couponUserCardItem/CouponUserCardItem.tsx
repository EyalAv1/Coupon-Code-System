import "./CouponUserCardItem.css";
import { getReadbaleDate } from "../../../../helpers/CouponValidation";
import { UserCouponCardType } from "../../../../Models/Coupon";

export default function CouponUserCardItem({
  couponCode,
  couponValidationDate,
}: UserCouponCardType) {
  return (
    <div className="CouponCardContainer">
      <div>Code: {couponCode}</div>
      <div>
        Expiery Date:&nbsp;
        {couponValidationDate != null
          ? getReadbaleDate(couponValidationDate).toLocaleDateString()
          : "Unlimited"}
      </div>
    </div>
  );
}
