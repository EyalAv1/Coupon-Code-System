import "./CouponCardItem.css";
import EditIcon from "@mui/icons-material/Edit"

interface ItemProps {
  couponName: string;
  couponCode: string;
  couponDiscount: number;
  couponDescription : string
}

export default function CouponCardItem({
  couponName,
  couponCode,
  couponDiscount,
  couponDescription,
}: ItemProps) {

  const editCardContent = async () => {
    //edit the card content
  }

  return (
    <div className="CouponItem">
      <div className="EditIconContainer">
        <div className="EditIconContent" onClick={editCardContent}>
          <EditIcon />
        </div>
      </div>
      <div>{couponName}</div>
      <div>{couponCode}</div>
      <div>{couponDiscount}</div>
      <div>{couponDescription}</div>
    </div>
  );
}
