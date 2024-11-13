import "./CouponCart.css";

type CartItem = {
  coupons: Array<string>;
  totalPrice: number;
};
export default function CouponCart({ coupons, totalPrice }: CartItem) {
  const onCheckoutClicked = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
  };
  return (
    <div className="Cart">
      <div className="CartOutline">
        {coupons.map((coupon) => {
          return (
            <div key={coupon} className="CartItem">
              <h2>{coupon}</h2>
            </div>
          );
        })}
        <div
          className="CartCheckoutOutline"
          onClick={(e) => onCheckoutClicked(e)}
        >
          <button className="CheckoutBTN">Checkout</button>
          <div className="CartTotal">
            <h3>Total: {totalPrice} NIS</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
