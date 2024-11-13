import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

export default function AdminReports() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserContext)!;
//   const [startDate, setStartDate] = useState<Date>();
//   const [endDate, setEndDate] = useState<Date>();

  useEffect(() => {
    if (!token) {
      setToken(null);
      navigate("/");
    }
  }, [token]);
//   const onReportDateSelected = () => {
    
//   }
  return (
    <div>
      <div>reports slection</div>
      <div> reports body</div>
    </div>
  );
}
