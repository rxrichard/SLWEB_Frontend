import React, { useEffect, useState } from "react";
import "moment";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function MaterialUIPickers(props) {
  const [selectedDate, setSelectedDate] = useState(null);
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
    if (props.min) {
      props.onChange(date !== null && date._d >= hoje ? date : "");
    } else {
      props.onChange(date !== null ? date : "");
    }
  };

  useEffect(() => {
    if (props.defaultValue !== null) {
      setSelectedDate(props.defaultValue)
    }
    // eslint-disable-next-line
  }, [props.defaultValue])

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        style={{ width: "170px" }}
        disabled={props.disabled}
        disableToolbar
        disablePast={props.min ? true : false}
        autoOk
        invalidDateMessage="Data inválida"
        minDateMessage={props.min ? "Data anteior ao dia de hoje" : 'Data não suportada'}
        minDate={props.min ? hoje : new Date('1900-01-01')}
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
