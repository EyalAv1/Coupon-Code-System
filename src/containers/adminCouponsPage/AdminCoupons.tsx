import { useContext, useEffect, useState } from "react";
import "./AdminCoupons.css";
import AddIcon from "../../assets/add_circle.png";
import AddUserIcon from "@mui/icons-material/PersonAdd";
import { getAllCouponsByUserId } from "../../services/CouponsService";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CouponCardItem from "../../components/couponCard/CouponCardItem";

export default function AdminCoupons() {
  const { token, setToken, currentUser } = useContext(UserContext)!;
  const [coupons, setCoupons] = useState<Array<any>>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  const fetchCoupons = async () => {
    // fetch the coupons from the databse
    await getAllCouponsByUserId(1)
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
  }, []);

  const addCoupon = async () => {};
  return (
    <div>
      <div className="AddCouponBTN">
        <button onClick={addCoupon}>
          <div className="AddCouponContent">
            <img src={AddIcon} className="AddIcon" />
            Add Coupon
          </div>
        </button>
        <button>
          <div className="AddCouponContent">
            <AddUserIcon className="AddIcon" />
            Add User
          </div>
        </button>
      </div>
      <div>
        {coupons.length != 0
          ? coupons.map((item: any) => {
              return (
                <CouponCardItem
                  couponCode={item.code}
                  couponDiscount={item.discountAmount}
                  couponName={item.id}
                  couponDescription="test"
                />
              );
            })
          : "No Coupons Found"}
      </div>
      {/* <CouponCardItem couponName="Test" couponCode="1234" couponDiscount={15} couponDescription="Test the coupon card"/> */}
    </div>
  );
}
