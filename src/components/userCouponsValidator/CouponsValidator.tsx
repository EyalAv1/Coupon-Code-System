import "./CouponsValidator.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function CouponsValidatoer() {
  return (
    <div>
      <form className="Form">
        <TextField
          id="outlined-basic"
          label="Enter Your Coupon"
          variant="outlined"
          sx={{
            paddingRight: "10px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#bdc0f8", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#bdc0f8", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#bdc0f8", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "#bdc0f8", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#bdc0f8", // Label color when focused
            },
            "& .MuiOutlinedInput-input": {
              color: "#bdc0f8", // Text color inside the input field
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#bdc0f8",
          }}
        >
          CHECK IT OUT
        </Button>
      </form>
    </div>
  );
}
