import "./App.css";
import { useEffect, useState } from "react";

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getPrePadDays = (year, month) => {
  return new Date(year, month - 1, 1).getDay();
};

function App() {
  const [current, setCurrent] = useState(new Date());

  // days of a week
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // the year and month info for the previous month, current month, and the next month
  const currentYear = current.getFullYear();
  const currentMonth = current.getMonth() + 1;
  const lastYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

  // number of days in the current month
  const days = getDaysInMonth(currentYear, currentMonth);
  const lastDays = getDaysInMonth(lastYear, lastMonth);

  // number of days to be appending before and after the current month
  const prePadDays = getPrePadDays(currentYear, currentMonth);
  const postPadDays = (7 - ((days + prePadDays) % 7)) % 7;

  useEffect(() => {
    // console.log(currentYear);
    // console.log(currentMonth);
    // console.log(lastYear);
    // console.log(nextYear);
    // console.log(lastMonth);
    // console.log(nextMonth);
    // console.log(days);
    // console.log(prePadDays);
    // console.log(postPadDays);
  }, []);

  return (
    <div className="calendar-body">
      {[
        weekDays.map((x, i) => (
          <div className="week-day" key={"week-day-" + i}>
            {x}
          </div>
        )),
        [...Array(prePadDays)].map((x, i) => (
          <div className="day" key={"pre-pad-day-" + i}>
            <span className="span-day span-pad-day">
              {lastDays - prePadDays + i + 1}
            </span>
          </div>
        )),
        [...Array(days)].map((x, i) => (
          <div className="day" key={"day-" + i}>
            <span className="span-day">{i + 1}</span>
          </div>
        )),
        [...Array(postPadDays)].map((x, i) => (
          <div className="day" key={"post-pad-day-" + i}>
            <span className="span-day span-pad-day">{i + 1}</span>
          </div>
        )),
      ]}
    </div>
  );
}

export default App;
