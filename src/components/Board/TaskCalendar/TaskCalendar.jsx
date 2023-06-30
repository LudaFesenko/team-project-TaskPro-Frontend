// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import './calendar.css';

import React, { useState, forwardRef } from 'react';
// import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { format, isToday } from 'date-fns';
import { BsChevronDown } from 'react-icons/bs';
import { StyledDateTimePicker } from './TaskCalendar.styled';
import styles from './TaskInputDate.module.css';

const TaskCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // const currentDate = new Date();
  // const numberOfDays = 5;

  // const newDate = new Date();
  // newDate.setDate(currentDate.getDate() - numberOfDays);

  // console.log(newDate); // Output: Five days ago from the current date

  const formatDate = date => {
    if (date) {
      if (isToday(date)) {
        return `today, ${format(date, 'MMMM d')}`;
      }
      return format(date, 'EEEE, MMMM d');
    }
    return '';
  };

  const InputOutputBtn = forwardRef(({ _, onClick }, ref) => (
    <button className="input-output-date-btn" onClick={onClick} ref={ref}>
      {formatDate(selectedDate)}
      <BsChevronDown />
    </button>
  ));
  return (
    <StyledDateTimePicker
      // title=
      selected={selectedDate}
      onChange={date => setSelectedDate(date)}
      customInput={<InputOutputBtn />}
      minDate={Date.now()}
      calendarClassName={styles.calendar}
      // dayClassName="day"
      // popperClassName={styles.currentDay}
      // wrapperClassName={styles.currentDay}
      className={styles.currentDay}
    />
  );
};
export default TaskCalendar;
