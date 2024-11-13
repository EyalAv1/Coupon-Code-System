import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import DateFilterForm from "../../components/forms/adminReportsForms/filterByDate/DateFilterForm";
import {
  getAllCouponsByUserId,
  getFiltersCoupons,
} from "../../services/CouponsService";
import { Coupon } from "../../Models/Coupon";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import "./AdminReport.css";
import FilterByUserForm from "../../components/forms/adminReportsForms/filterByUserId/FilterByUserForm";

enum FilerReportType {
  Date,
  UserID,
}

export default function AdminReports() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserContext)!;
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [userId, setUserID] = useState<string>("");
  const [filteredCoupons, setFilteredCoupons] = useState<Array<Coupon>>([]);
  const [filterType, setFilterType] = useState<FilerReportType>(
    FilerReportType.Date
  );

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

  const onReportUserIdSelected = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    getAllCouponsByUserId(parseInt(userId))
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

  const exportToExcel = (data: any[], fileName: string) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "AdminReport");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <div>
      <div className="UserFunctions">
        <div className="FunctionBTN">
          <button onClick={() => setFilterType(FilerReportType.Date)}>
            <div className="FunctionBTNContent">Filter By Date</div>
          </button>
        </div>
        <div className="FunctionBTN">
          <button onClick={() => setFilterType(FilerReportType.UserID)}>
            <div className="FunctionBTNContent">Filter By User Id</div>
          </button>
        </div>
      </div>
      {filterType == FilerReportType.Date ? (
        <DateFilterForm
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onCreateReportClicked={onReportDateSelected}
        />
      ) : (
        <FilterByUserForm
          setUserId={setUserID}
          onCreateReportClicked={onReportUserIdSelected}
        />
      )}
      <div>
        {filteredCoupons.map((coupon) => {
          return (
            <div key={coupon.Code}>
              <div>{coupon.Code}</div>
            </div>
          );
        })}
      </div>
      {filteredCoupons.length == 0 ? null : (
        <button
          onClick={() => exportToExcel(filteredCoupons, "Coupons Reapot")}
        >
          Export to Excel
        </button>
      )}
    </div>
  );
}
