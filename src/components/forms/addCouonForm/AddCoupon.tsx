import { useContext, useState } from "react";
import "./AddCoupon.css";
import { addCoupon } from "../../../services/CouponsService";
import { Coupon } from "../../../Models/Coupon";
import { UserContext } from "../../../Context/userContext";

export default function AddCoupon() {
  const { currentUser } = useContext(UserContext)!;
  //   const [discountType, setDiscountType] = useState<string>("percentage");
  const [isUsageLimitEnabled, setIsUsageLimitEnabled] = useState<boolean>(true);
  const [code, setCode] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isDiscountInPercentage, setIsDiscountInPercentage] =
    useState<boolean>();
  const [discountAmount, setDiscountAmount] = useState<number>();
  const [isDoublePromotion, setIsDoublePromotion] = useState<boolean>(false);
  const [expieryDate, setExpieryDate] = useState<Date | undefined>(undefined);
  const [usageLimit, setUsageLimit] = useState<number | null>();

  const onDiscountTypeChange = (type: string) => {
    if (type == "percentage") setIsDiscountInPercentage(true);
    else setIsDiscountInPercentage(false);
  };
  const onDoublePromotionChange = (type: string) => {
    if (type == "Yes") setIsDoublePromotion(true);
    else setIsDoublePromotion(false);
  };

  const onAddCoupon = (e: any) => {
    e.preventDefault();
    const newCoupon: Coupon = {
      Code: code,
      Description: description,
      IsPercentages: isDiscountInPercentage!,
      DiscountAmount: discountAmount!,
      CreatedDate: new Date(),
      ExpirationDate: expieryDate,
      AllowDoublePromotion: isDoublePromotion!,
      UsageLimit: usageLimit!,
      UsageCount: 0,
      UserId: currentUser.Id,
    };
    console.log(newCoupon);
    addCoupon(newCoupon)
      .then((res) => {
        if (!res) {
          throw new Error("Invalid Cradentials");
        }
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form className="AddCouponFrom">
        <input
          type="text"
          placeholder="Code"
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>
          Is the discount in percentages?
          <label>
            <input
              type="radio"
              name="discountType"
              id="percentage"
              value="percentage"
              checked={isDiscountInPercentage}
              onChange={(e) => onDiscountTypeChange(e.currentTarget.value)}
            />
            &nbsp;Yes
          </label>
          <label>
            <input
              type="radio"
              name="discountType"
              id="budget"
              value="budget"
              checked={!isDiscountInPercentage}
              onChange={(e) => onDiscountTypeChange(e.currentTarget.value)}
            />
            &nbsp;No
          </label>
        </label>
        <input
          type="number"
          placeholder="Discount Amount"
          onChange={(e) => setDiscountAmount(parseInt(e.target.value))}
        />
        <input
          type="date"
          placeholder="Expiery Date"
          onChange={(e) =>
            setExpieryDate(
              e.target.value ? new Date(e.target.value) : undefined
            )
          }
        />
        <label>
          Is the coupon enable double promotion?
          <label>
            <input
              type="radio"
              name="doublePromotion"
              id="double"
              value="Yes"
              checked={isDoublePromotion}
              onChange={(e) => onDoublePromotionChange(e.currentTarget.value)}
            />
            &nbsp;Yes
          </label>
          <label>
            <input
              type="radio"
              name="doublePromotion"
              id="notDouble"
              value="No"
              checked={!isDoublePromotion}
              onChange={(e) => onDoublePromotionChange(e.currentTarget.value)}
            />
            &nbsp; No
          </label>
        </label>
        <label>
          Does the coupon have a usage limit?
          <input
            type="checkbox"
            id="isUsageLimit"
            checked={isUsageLimitEnabled}
            onChange={() => setIsUsageLimitEnabled(!isUsageLimitEnabled)}
          />
        </label>
        {isUsageLimitEnabled ? (
          <input
            type="text"
            placeholder="Usage Limit"
            disabled={!isUsageLimitEnabled}
            onChange={(e) => setUsageLimit(parseInt(e.target.value))}
          />
        ) : null}
        <button onClick={(e) => onAddCoupon(e)}>ADD</button>
      </form>
    </>
  );
}
