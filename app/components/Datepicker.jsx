"use client";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import moment from "moment";
import { useState } from "react";
import { addActivitytoGoogle } from "../server-actions/addActivitytoGoogle";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DatePicker({ activities }) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const previousMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };
  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const selectedDayMeetings = activities.filter((meeting) =>
    isSameDay(parseISO(meeting.startDate), selectedDay)
  );

  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  return (
    <div className="py-10 bg-[var(--custom-color-secondary)]">
      <div className="px-4 mx-auto">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="text-center flex-auto font-semibold text-white">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "py-1.5"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-red-500",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-400",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>

                  <div className="w-1 h-1 mx-auto mt-1">
                    {activities.some((meeting) =>
                      isSameDay(parseISO(meeting.startDate), day)
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-white">
              Schedule for{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting meeting={meeting} key={meeting.id} />
                ))
              ) : (
                <p>No meetings for today.</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

function Meeting({ meeting }) {
  const [isSuccessful, setIsSuccessful] = useState("");

  let startDateTime = moment.utc(meeting.startDate).format("DD/MM, hh:mm a");
  let endDateTime = moment.utc(meeting.endDate).format("DD/MM, hh:mm a");

  const formStartDate =
    meeting.startDate && meeting.startDate.indexOf("+") > 0
      ? meeting.startDate.split("+")[0]
      : meeting.startDate;

  const formEndDate =
    meeting.endDate && meeting.endDate.indexOf("+") > 0
      ? meeting.endDate.split("+")[0]
      : meeting.endDate;

  async function onGoogleAdd(formData) {
    const res = await addActivitytoGoogle(formData);
    setIsSuccessful(res.message);
  }

  return (
    <div>
      <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl  hover:bg-[--custom-color-brand]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="flex-none w-5 h-5 rounded-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>

        <div className="flex-auto">
          <p className="text-white">{meeting.title}</p>
          <p className="text-white">{meeting.description}</p>
          <p className="mt-0.5">
            <time dateTime={meeting.startDate}>{startDateTime}</time> -{" "}
            <time dateTime={meeting.endDate}>{endDateTime}</time>
          </p>
        </div>
        <form action={onGoogleAdd}>
          <div className="mb-4 hidden">
            <label htmlFor="titleGoogle" className="block text-white mb-2">
              Title
            </label>
            <input
              type="text"
              id="titleGoogle"
              name="titleGoogle"
              className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white outline-none"
              value={meeting.title}
              readOnly
            />
          </div>
          <div className="mb-4 hidden">
            <label
              htmlFor="descriptionGoogle"
              className="block text-white mb-2"
            >
              DescriptionGoogle
            </label>
            <input
              type="text"
              id="descriptionGoogle"
              name="descriptionGoogle"
              className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white outline-none"
              value={meeting.description}
              readOnly
            />
          </div>
          <div className="mb-4 hidden">
            <label htmlFor="startDateGoogle" className="block text-white mb-2">
              Task Start Date
            </label>
            <input
              type="datetime-local"
              id="startDateGoogle"
              name="startDateGoogle"
              className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white outline-none"
              value={formStartDate}
              readOnly
            />
          </div>
          <div className="mb-4 hidden">
            <label htmlFor="endDateGoogle" className="block text-white mb-2">
              Task End Date
            </label>
            <input
              type="datetime-local"
              id="endDateGoogle"
              name="endDateGoogle"
              className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white outline-none"
              value={formEndDate}
              readOnly
            />
          </div>
          <div className="mb-4 mt-6">
            <button
              title="Add this activity to your Google calendar"
              type="submit"
              className="flex  justify-center items-center gap-1 bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded-[30px]"
            >
              <svg width="36" height="36" viewBox="0 0 36 36">
                <path fill="#34A853" d="M16 16v14h4V20z"></path>
                <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
                <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
                <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
                <path fill="none" d="M0 0h36v36H0z"></path>
              </svg>{" "}
              Google Calendar
            </button>
          </div>
        </form>
      </li>
      {isSuccessful === "Success" && (
        <div
          className="flex items-center w-full justify-between bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex items-center gap-3">
            <div className="py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#152b32"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold text-[var(--custom-color-brand)]">
                Activity successfully added to Google Calendar!
              </p>
            </div>
          </div>
          <span
            className="close text-[var(--custom-color-brand)] text-xl leading-none hover:text-gray-300 cursor-pointer"
            onClick={() => setIsSuccessful("")}
          >
            &times;
          </span>
        </div>
      )}

      {isSuccessful != "Success" && isSuccessful != "" && (
        <div
          className="flex items-center w-full justify-between bg-red-500 border-t-4  border-red-700 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex items-center gap-3">
            <div className="py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#152b32"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold text-[var(--custom-color-brand)]">
                {isSuccessful === "UNAUTHENTICATED"
                  ? "You need to login with your Google account!"
                  : "Activity wasn't added!"}
              </p>
            </div>
          </div>
          <span
            className="close text-[var(--custom-color-brand)] text-xl leading-none hover:text-gray-300 cursor-pointer"
            onClick={() => setIsSuccessful("")}
          >
            &times;
          </span>
        </div>
      )}
    </div>
  );
}
