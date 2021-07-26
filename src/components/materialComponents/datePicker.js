import "moment";
import React from "react";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function MaterialUIPickers(props) {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const hoje = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    0,
    0,
    0
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.onChange(date !== null && date._d >= hoje ? date : "");
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        style={{ width: "170px" }}
        disableToolbar
        disablePast
        autoOk
        invalidDateMessage="Data inválida"
        minDateMessage="Data anteior ao dia de hoje"
        minDate={hoje}
        variant="inline"
        format="DD/MM/YYYY"
        margin="normal"
        id="date-picker-inline"
        label={props.label}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
