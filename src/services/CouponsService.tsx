import axios from "axios";
import { Coupon } from "../Models/Coupon";
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

export const getAllCouponsByUserId = async (userId: number) => {
  try {
    const data = await fetch(api + `CouponsByUser?userId=${userId}`, {
      method: "POST",
    });
    if (!data.ok) {
      throw new Error("User Not Found");
    }
    return data.json();
  } catch (err) {
    return null;
  }
};

export const addCoupon = async (coupon: Coupon) => {
  try {
    const data = await fetch(api + `AddCoupon/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coupon),
    });
    if (!data.ok) {
      throw new Error(await data.json());
    }
    return data.json();
  } catch (err) {
    console.log("[err0r:]", err);
    return null;
  }
};

export const deleteCouponById = async (couponId: number) => {
  try {
    const response = await fetch(api + `DeleteCoupon?couponId=${couponId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Coupon not found");
    }
    return response.json();
  } catch (err: any) {
    toast.error(err);
    return null;
  }
};

export const updateCouponUsageCount = async (newCoupon: Coupon) => {
  try {
    const patchDoc = newCoupon;
    patchDoc.UsageCount += 1;
    const response = await fetch(api + `updateUsageCount/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchDoc),
    });
    if (!response.ok) {
      throw new Error(`Failed to update coupon usage count ${response.status}`);
    }
    return response.json();
  } catch (err: any) {
    toast.warning(err);
    return null;
  }
};

// fetch all coupons by asked dated period
export const getFiltersCoupons = async (startDate: Date, endDate: Date) => {
  try {
    const response = await fetch(
      api +
        `CouponsByDates?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error("unable to load the coupons");
    }
    return response.json();
  } catch (err) {
    return null;
  }
};
