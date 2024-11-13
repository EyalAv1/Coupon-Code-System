import "./DateFilterForm.css";
type FilterDateReport = {
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  onCreateReportClicked: (e: any) => void;
};

export default function DateFilterForm({
  setStartDate,
  setEndDate,
  onCreateReportClicked,
}: FilterDateReport) {
  return (
    <div className="FormContainer">
      <form className="FormContent">
        <label>
          From:
          <input
            type="date"
            placeholder="Enter Start Date"
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            placeholder="Enter End Date"
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        </label>
        <button onClick={(e) => onCreateReportClicked(e)}>Create Report</button>
      </form>
    </div>
  );
}
