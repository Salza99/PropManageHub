import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [orientation, setOrientation] = useState("portrait");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 992 && screenWidth > 520) {
      setOrientation("landscape");
    } else if (screenWidth < 520 || screenWidth > 992) {
      setOrientation("portrait");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem>
        <StaticDatePicker
          onChange={handleDateChange}
          defaultValue={selectedDate}
          orientation={`${orientation}`}
          showDaysOutsideCurrentMonth={true}
        />
      </DemoItem>
    </LocalizationProvider>
  );
};
export default Calendar;
