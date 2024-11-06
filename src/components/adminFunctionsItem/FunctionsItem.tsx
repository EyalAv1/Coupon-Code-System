import "./FunctionsItem.css";

interface ItemProps{
    couponName : string;
    couponCode : string;
    couponDiscount: number;
}

export default function CouponCardItem({couponName, couponCode, couponDiscount} : ItemProps) {
  return (
    <div>
      <div>{couponName}</div>
      <div>{couponCode}</div>
      <div>{couponDiscount}</div>
    </div>
  );
}
