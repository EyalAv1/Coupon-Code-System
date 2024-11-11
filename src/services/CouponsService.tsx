import axios from "axios";
import { toast } from "react-toastify";

const api = "http://localhost:5292/api/Coupons/";

export const getAllCoupons = async () => {
  try {
    const data = await axios.get(api + "AllCoupons/");
    return data;
  } catch (err) {
    return null;
  }
};

export const getCouponByName = async (couponCode: string) => {
  try {
    const data = await fetch(api + `CouponByCode?code=${couponCode}`, {
      method: "POST",
    });
    if (!data.ok) {
      throw new Error("Coupon not found");
    }
    return data.json();
  } catch (err) {
    return null;
  }
};
