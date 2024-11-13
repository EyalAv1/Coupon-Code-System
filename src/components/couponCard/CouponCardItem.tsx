import "./CouponCardItem.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCouponById } from "../../services/CouponsService";
import { toast } from "react-toastify";
import { Coupon } from "../../Models/Coupon";
import Modal from "../modal/Modal";
import EditCoupon from "../forms/editCouponForm/EditCouponForm";
import { useState } from "react";

interface couponProps {
  coupon: Coupon;
}

export default function CouponCardItem({ coupon }: couponProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onDeleteCoupon = (e: any) => {
    e.preventDefault();
    deleteCouponById(coupon.id!)
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
          <div className="EditIconContent" onClick={openModal}>
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
      <div>Code: {coupon.Code}</div>
      <div>
        Discount:{" "}
        {coupon.IsPercentages
          ? `${coupon.DiscountAmount}%`
          : `${coupon.DiscountAmount} NIS`}
      </div>
      <div>
        {coupon.Description != "" ? `Description: ${coupon.Description}` : null}
      </div>
      <div>Expiration Date: {coupon.ExpirationDate != null ? coupon.ExpirationDate?.toString() : "Unlimited"}</div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <EditCoupon coupon={coupon} />
      </Modal>
    </div>
  );
}
