import "./App.css";
import { useEffect, useState } from "react";
import dailyEvents from "./daily_events";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYearAndMonth, setCurrentYearAndMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const getPrePadDays = (year, month) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const isSameDate = (year, month, day) => {
    return (
      currentDate.getFullYear() === year &&
      currentDate.getMonth() === month &&
      currentDate.getDate() === day
    );
  };

  // days of a week
  const dayOfWeeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // the year and month info for the previous month, current month, and the next month
  const currentYear = currentYearAndMonth.year;
  const currentMonth = currentYearAndMonth.month;
  const lastYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

  // number of days in the current month
  const days = getDaysInMonth(currentYear, currentMonth);
  const daysOfLastMonth = getDaysInMonth(lastYear, lastMonth);

  // number of days to be appending before and after the current month
  const prePadDays = getPrePadDays(currentYear, currentMonth);
  const postPadDays = (7 - ((days + prePadDays) % 7)) % 7;

  // render daily events
  const getRenderDailyEvents = (dailyEvents) => {
    let renderDailyEvents = [...Array(days)].map((e) => []);

    dailyEvents.forEach((event, idx) => {
      // render birthday members
      renderBirthdayMembers(renderDailyEvents, idx + 1, event.birthdayMembers);

      // render bank holiday
      renderBankHoliday(renderDailyEvents, idx + 1, event.bankHoliday);

      // render company holiday
      renderCompanyHoliday(renderDailyEvents, idx + 1, event.companyHoliday);
    });

    return renderDailyEvents;
  };

  const renderBirthdayMembers = (renderDailyEvents, date, data) => {
    // render tooltip along with the label
    let slot = renderDailyEvents[date - 1];
    if (data.length >= 5) {
      slot.push(<div>{`${data.length} Birthday Member`}</div>);
    } else if (0 < data.length && data.length < 5) {
      data.forEach((member) => {
        slot.push(
          <div>{`${member.firstName} ${member.lastName}'s birthday`}</div>
        );
      });
    }
  };

  const renderBankHoliday = (renderDailyEvents, date, data) => {
    let slot = renderDailyEvents[date - 1];
    if (data) {
      slot.push(<div>bank holiday</div>);
    }
  };

  const renderCompanyHoliday = (renderDailyEvents, date, data) => {
    let slot = renderDailyEvents[date - 1];
    data.forEach((holiday) => {
      slot.push(<div>{holiday}</div>);
    });
  };

  const renderDailyEvents = getRenderDailyEvents(dailyEvents);

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
    // console.log(currentYearAndMonth);
  }, []);

  return (
    <div className="calendar-body">
      <div className="calendar-week-body">
        {[
          dayOfWeeks.map((day, i) => (
            <div className="day-of-week" key={"day-of-week-" + i}>
              {day}
            </div>
          )),
        ]}
      </div>
      <div className="calendar-day-body">
        {[
          [...Array(prePadDays)].map((x, i) => (
            <div className="day-of-month" key={"pre-pad-day-" + i}>
              <span className="date-number pad-date-number">
                {daysOfLastMonth - prePadDays + i + 1}
              </span>
            </div>
          )),
          [...Array(days)].map((x, i) => (
            <div
              className={`day-of-month ${
                isSameDate(currentYear, currentMonth - 1, i + 1) ? "today" : ""
              }`}
              key={"day-" + i}
            >
              <span className="date-number">{i + 1}</span>
              {renderDailyEvents[i]}
            </div>
          )),
          [...Array(postPadDays)].map((x, i) => (
            <div className="day-of-month" key={"post-pad-day-" + i}>
              <span className="date-number pad-date-number">{i + 1}</span>
            </div>
          )),
        ]}
      </div>
      <div>
        <div>{`${currentYear}-${currentMonth}`}</div>
        <button
          onClick={() => {
            const { year, month } = currentYearAndMonth;
            const newYear = month === 1 ? year - 1 : year;
            const newMonth = month === 1 ? 12 : month - 1;
            setCurrentYearAndMonth({ year: newYear, month: newMonth });
          }}
        >
          Last Month
        </button>
        <button
          onClick={() => {
            const { year, month } = currentYearAndMonth;
            const newYear = month === 12 ? year + 1 : year;
            const newMonth = month === 12 ? 1 : month + 1;
            setCurrentYearAndMonth({ year: newYear, month: newMonth });
          }}
        >
          Next Month
        </button>
      </div>
    </div>
  );
}

export default App;
