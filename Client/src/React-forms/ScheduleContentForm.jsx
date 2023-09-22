import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerValue() {
  const [startDate, setStartDate] = React.useState(dayjs("2022-04-17"));
  const [endDate, setEndDate] = React.useState(dayjs("2022-04-17"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label="Start date"
          value={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          label="End date"
          value={endDate}
          onChange={(date) => setEndDate(date)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

/* <LocalizationProvider dateAdapter={AdapterDayjs}>
<DemoContainer components={["DatePicker", "DatePicker"]}>
  <DatePicker
    label="Start date"
    value={startDate}
    onChange={(date) => setStartDate(date)}
  />
  <DatePicker
    label="End date"
    value={endDate}
    onChange={(date) => setEndDate(date)}
  />
</DemoContainer>
</LocalizationProvider> */
