// import "./";
type FilterUserIdReport = {
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  onCreateReportClicked: (e: any) => void;
};

export default function FilterByUserForm({
  setUserId,
  onCreateReportClicked,
}: FilterUserIdReport) {
  return (
    <div className="FormContainer">
      <form className="FormContent">
        <label>
          Enter User ID
          <input
            type="text"
            placeholder="User ID"
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <button onClick={(e) => onCreateReportClicked(e)}>Create Report</button>
      </form>
    </div>
  );
}
