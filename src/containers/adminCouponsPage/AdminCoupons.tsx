import { useContext, useEffect, useState } from "react";
import "./AdminCoupons.css";
import AddIcon from "../../assets/add_circle.png";
import ReportIcon from "@mui/icons-material/Summarize";
import { getAllCouponsByUserId } from "../../services/CouponsService";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CouponCardItem from "../../components/couponCard/CouponCardItem";
import AddCoupon from "../../components/forms/addCouonForm/AddCoupon";
import Modal from "../../components/modal/Modal";

export default function AdminCoupons() {
  const { token, currentUser } = useContext(UserContext)!;
  const [coupons, setCoupons] = useState<Array<any>>([]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const fetchCoupons = () => {
    // fetch the coupons from the databse
    if (!currentUser) return;
    getAllCouponsByUserId(currentUser.Id)
      .then((res) => {
        if (!res) {
          throw new Error("Invalid User ID");
        }
        setCoupons([...res]);
      })
      .catch((err) => {
        toast.warning(err);
      });
  };
  useEffect(() => {
    fetchCoupons();
  }, [currentUser]);

  return (
    <div>
      <div className="UserFunctions">
        <div className="AddCouponBTN">
          <button onClick={openModal}>
            <div className="AddCouponContent">
              <img src={AddIcon} className="AddIcon" />
              Add Coupon
            </div>
          </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <AddCoupon />
        </Modal>
        <div className="AddCouponBTN">
          <button
            onClick={() => {
              navigate("/Reports");
            }}
          >
            <div className="AddCouponContent">
              <ReportIcon className="AddIcon" />
              Reports
            </div>
          </button>
        </div>
      </div>
      <div className="AdminCoupons">
        {coupons.length != 0
          ? coupons.map((item: any) => {
              return (
                <CouponCardItem
                  key={item.Code}
                  couponCode={item.Code}
                  couponDiscount={item.DiscountAmount}
                  couponName={item.ExpirationDate}
                  couponDescription={item.Description}
                  couponId={item.Id}
                />
              );
            })
          : "No Coupons Found"}
      </div>
    </div>
  );
}
