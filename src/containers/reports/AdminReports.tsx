import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

export default function AdminReports() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserContext)!;
  useEffect(() => {
    if (!token) {
      setToken(null);
      navigate("/");
    }
  }, [token]);

  return (
    <div>
      <div>reports slection</div>
      <div> reports body</div>
    </div>
  );
}
