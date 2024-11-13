import { Dispatch, SetStateAction } from "react";
import { Coupon } from "../../Models/Coupon";
import { updateCouponUsageCount } from "../../services/CouponsService";
import "./CouponCart.css";
import { toast } from "react-toastify";

type CartItem = {
  coupons: Array<Coupon>;
  totalPrice: number;
  setValidateCoupons: Dispatch<SetStateAction<Coupon[]>>;
};
export default function CouponCart({
  coupons,
  totalPrice,
  setValidateCoupons,
}: CartItem) {
  const deleteCouponFromCart = (coupon: Coupon) => {
    const updatedCoupons = coupons.filter((item) => item.id !== coupon.id);
    setValidateCoupons([...updatedCoupons]);
  };
  const onCheckoutClicked = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    coupons.forEach((coupon) => {
      updateCouponUsageCount(coupon)
        .then((res) => {
          if (!res) {
            throw new Error(res);
          }
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err);
        });
    });
  };
  return (
    <div className="Cart">
      <div className="CartOutline">
        {coupons.map((coupon) => {
          return (
            <div key={coupon.Code} className="CartItem">
              <h2>{coupon.Code}</h2>
              <h4>
                Discount:
                {coupon.IsPercentages
                  ? `${coupon.DiscountAmount}%`
                  : `${coupon.DiscountAmount} NIS`}
              </h4>
              <div
                className="Delete"
                onClick={() => deleteCouponFromCart(coupon)}
              >
                Delete
              </div>
            </div>
          );
        })}
        <div
          className="CartCheckoutOutline"
          onClick={(e) => onCheckoutClicked(e)}
        >
          <button disabled={coupons.length == 0} className="CheckoutBTN">
            Checkout
          </button>
          <div className="CartTotal">
            <h3>Total: {totalPrice} NIS</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
