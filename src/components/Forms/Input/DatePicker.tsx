import { useState } from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/DatePickerStyles.css";
import { IDateInput } from "../../../modals/FormModal";
import { BsCalendarDate } from "react-icons/bs";

const DatePickerComponent: React.FC<IDateInput> = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd-MM-yyyy"
        className="appearance-none border border-gray-300 rounded min-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        placeholderText="dd-MM-yyyy"
      />

      <BsCalendarDate className="h-5 w-5 absolute top-2/3 right-3 transform -translate-y-1/2 text-gray-600" />
    </>
  );
};

export default DatePickerComponent;
