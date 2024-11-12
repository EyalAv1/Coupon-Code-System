import "./CouponCardItem.css";
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCouponById } from "../../services/CouponsService";
import { toast } from "react-toastify";

interface ItemProps {
  couponName: string;
  couponCode: string;
  couponDiscount: number;
  couponDescription : string;
  couponId: number,
}

export default function CouponCardItem({
  couponName,
  couponCode,
  couponDiscount,
  couponDescription,
  couponId,
}: ItemProps) {

  const editCardContent = async () => {
    //edit the card content
  }

    const onDeleteCoupon = (e: any) => {
      e.preventDefault();
      deleteCouponById(couponId)
        .then((res) => {
          if (!res) {
            throw new Error("Coupon not exist");
          }
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err);
        });
    };

  return (
    <div className="CouponItem">
      <div className="SettingsIocnContainer">
        <div className="EditIconContainer">
          <div className="EditIconContent" onClick={editCardContent}>
            <EditIcon />
          </div>
        </div>
        <div className="EditIconContainer" onClick={(e) => onDeleteCoupon(e)}>
          <div className="DeleteIconContent">
            {/* <img src={DeleteIcon} className="DeleteIcon" /> */}
            <DeleteIcon />
          </div>
        </div>
      </div>
      <div>{couponName}</div>
      <div>{couponCode}</div>
      <div>{couponDiscount}</div>
      <div>{couponDescription}</div>
    </div>
  );
}
