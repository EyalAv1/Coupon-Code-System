import { useState } from "react";
import "./CouponsValidator.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getCouponByName } from "../../services/CouponsService";

export default function CouponsValidatoer() {
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponsDiscount, setCouponsDiscount] = useState<number>(100);
  const [validateCoupons, setValidateCoupons] = useState<Array<string>>([]);
  const onCouponValidate = () => {
    console.log(couponCode);
    getCouponByName(couponCode)
      .then((res) => {
        if (!res) {
          throw new Error("Coupon not found");
        }
        console.log(res);
        setValidateCoupons([...validateCoupons, couponCode]);
        const coupon = res;
        console.log("coupon => ", coupon);
        const discount: number = coupon.discountAmount;
        console.log(coupon.discountAmount);
        setCouponsDiscount(couponsDiscount * (1 - discount! / 100));
      })
      .catch((err) => {
        console.log(err);
      });
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
                borderColor: "#bdc0f8", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#bdc0f8", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#bdc0f8", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "#bdc0f8", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#bdc0f8", // Label color when focused
            },
            "& .MuiOutlinedInput-input": {
              color: "#bdc0f8", // Text color inside the input field
            },
          }}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#bdc0f8",
          }}
          onClick={onCouponValidate}
        >
          CHECK IT OUT
        </Button>
      </form>
      {validateCoupons
        ? validateCoupons.map((c) => {
            return <div>{c}</div>;
          })
        : null}
      <div> your current coupons discount : {couponsDiscount}</div>
    </div>
  );
}
