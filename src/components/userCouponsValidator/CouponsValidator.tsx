import { useState } from "react";
import "./CouponsValidator.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getCouponByName } from "../../services/CouponsService";
import { Coupon } from "../../Models/Coupon";
import {
  CouponValidationStatus,
  isCouponValid,
} from "../../helpers/CouponValidation";
import { toast } from "react-toastify";
import CouponCart from "../cart/CouponCart";

export default function CouponsValidatoer() {
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponsDiscount, setCouponsDiscount] = useState<number>(100);
  const [validateCoupons, setValidateCoupons] = useState<Array<Coupon>>([]);
  const [isCouponDoublePromotionExist, setIsCouponDoublePromotionExist] =
    useState<boolean>(false);
  const onCouponValidate = () => {
    getCouponByName(couponCode)
      .then((res) => {
        if (!res) {
          throw new Error("Coupon not found");
        }
        const coupon: Coupon = res;
        const couponValidationStatus = isCouponValid(
          validateCoupons.length,
          coupon
        );
        if (!validateCoupons.includes(coupon)) {
          if (!isCouponDoublePromotionExist) {
            if (couponValidationStatus == CouponValidationStatus.Valid) {
              // const discount: number = coupon.DiscountAmount;
              // setCouponsDiscount(couponsDiscount * (1 - discount! / 100));
              calculateDiscount(coupon);
              setValidateCoupons([...validateCoupons, coupon]);
              if (!coupon.AllowDoublePromotion) {
                setIsCouponDoublePromotionExist(true);
              }
              toast.info("Coupon Added!");
            } else {
              toast.warning(couponValidationStatus);
            }
          } else {
            toast.warning(CouponValidationStatus.Promorion);
          }
        } else {
          toast.error("Coupon Already In Use");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateDiscount = (coupon: Coupon) => {
    const discount: number = coupon.DiscountAmount;
    if (coupon.IsPercentages) {
      if (couponsDiscount <= 0) {
        toast.error("Oops! too many coupons");
      } else {
        setCouponsDiscount(couponsDiscount * (1 - discount! / 100));
      }
    } else {
      if (couponsDiscount - discount < 0) {
        toast.error("Oops! too many coupons");
      } else {
        setCouponsDiscount(couponsDiscount - discount!);
      }
    }
  };

  return (
    <div>
      <form className="Form">
        <TextField
          id="outlined-basic"
          label="Enter Your Coupon"
          variant="outlined"
          sx={{
            paddingRight: "10px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#b39bde", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#b39bde", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#b39bde", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "#b39bde", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#b39bde", // Label color when focused
            },
            "& .MuiOutlinedInput-input": {
              color: "#b39bde", // Text color inside the input field
            },
          }}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#b39bde",
          }}
          onClick={onCouponValidate}
        >
          Add Coupon
        </Button>
      </form>
      <CouponCart coupons={validateCoupons} setValidateCoupons={setValidateCoupons} totalPrice={couponsDiscount} />
    </div>
  );
}
