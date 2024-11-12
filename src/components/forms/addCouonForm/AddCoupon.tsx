import { useState } from "react";
import "./AddCoupon.css";

export default function AddCoupon() {
  const [isUsageLimitEnabled, setIsUsageLimitEnabled] = useState(false);
  return (
    <>
      <form className="AddCouponFrom">
        <input type="text" placeholder="Code" />
        <input type="text" placeholder="Description" />
        <label>
          Is the discount in percentages?
          <label>
            <input
              type="radio"
              name="discoutType"
              id="precentage"
              value="Yes"
            />
            &nbsp;Yes
          </label>
          <label>
            <input type="radio" name="discoutType" id="Budget" value="No" />
            &nbsp;No
          </label>
        </label>
        <input type="number" placeholder="Discount Amount" />
        <input type="date" placeholder="Expiery Date" />
        <label>
          Is the coupon enable double promotion?
          <label>
            <input
              type="radio"
              name="doublePromotion"
              id="double"
              value="Yes"
            />
            &nbsp;Yes
          </label>
          <label>
            <input
              type="radio"
              name="doublePromotion"
              id="notDouble"
              value="No"
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
          />
        ) : null}
      </form>
    </>
  );
}
