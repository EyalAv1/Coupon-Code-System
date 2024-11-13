import { useContext, useState } from "react";
import { updateCoupn } from "../../../services/CouponsService";
import { Coupon } from "../../../Models/Coupon";
import { UserContext } from "../../../Context/userContext";

type EditCouponType = {
  coupon: Coupon;
};

export default function EditCoupon({ coupon }: EditCouponType) {
  const { currentUser } = useContext(UserContext)!;
  //   const [discountType, setDiscountType] = useState<string>("percentage");
  const [isUsageLimitEnabled, setIsUsageLimitEnabled] = useState<boolean>();
  const [code, setCode] = useState<string>(coupon.Code);
  const [description, setDescription] = useState<string>(coupon.Description);
  const [isDiscountInPercentage, setIsDiscountInPercentage] = useState<boolean>(
    coupon.IsPercentages
  );
  const [discountAmount, setDiscountAmount] = useState<number>(
    coupon.DiscountAmount
  );
  const [isDoublePromotion, setIsDoublePromotion] = useState<boolean>(
    coupon.AllowDoublePromotion
  );
  const [expieryDate, setExpieryDate] = useState<Date | undefined>(
    coupon.ExpirationDate
  );
  const [usageLimit, setUsageLimit] = useState<number | undefined>(
    coupon.UsageLimit
  );

  const onDiscountTypeChange = (type: string) => {
    if (type == "percentage") setIsDiscountInPercentage(true);
    else setIsDiscountInPercentage(false);
  };
  const onDoublePromotionChange = (type: string) => {
    if (type == "Yes") setIsDoublePromotion(true);
    else setIsDoublePromotion(false);
  };

  const onAddCoupon = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    updateCoupn(newCoupon)
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
        <div>
          <h2>Add New Coupon</h2>
        </div>
        <input
          type="text"
          placeholder="Code"
          onChange={(e) => setCode(e.target.value)}
          value={code}
          disabled
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
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
          value={expieryDate?.toString()}
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
        <button onClick={(e) => onAddCoupon(e)}>Update</button>
      </form>
    </>
  );
}
