import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import DateFilterForm from "../../components/forms/adminReportsForms/filterByDate/DateFilterForm";
import { getFiltersCoupons } from "../../services/CouponsService";
import { Coupon } from "../../Models/Coupon";
import { toast } from "react-toastify";

export default function AdminReports() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserContext)!;
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [filteredCoupons, setFilteredCoupons] = useState<Array<Coupon>>([]);

  useEffect(() => {
    if (!token) {
      setToken(null);
      navigate("/");
    }
  }, [token]);
  const onReportDateSelected = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    getFiltersCoupons(startDate, endDate)
      .then((res) => {
        if (!res) {
          throw new Error("Unable to fetch coupons");
        }
        setFilteredCoupons([...res]);
      })
      .catch((err) => {
        toast(err);
      });
  };
  return (
    <div>
      <div>reports slection</div>
      <div></div>
      <DateFilterForm
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onCreateReportClicked={onReportDateSelected}
      />
      <div> reports body</div>
      <div>
        {filteredCoupons.map((coupon) => {
          return (
            <div key={coupon.Code}>
              <div>{coupon.Code}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
