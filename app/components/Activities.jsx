"use client";

import { deleteActivity } from "../server-actions/deleteActivity";
import EditActivity from "../components/EditActivity";
import DatePicker from "../components/Datepicker";
import { useState } from "react";

export default function Activities({ activities }) {
  const [isCalendar, setIsCalendar] = useState(true);
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <h2 className="text-white text-2xl">Activities: {activities.length}</h2>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            onClick={() => setIsCalendar(!isCalendar)}
            value={isCalendar}
            className="sr-only peer outline-none border-transparent focus:border-transparent focus:ring-0"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--custom-color-secondary)]"></div>
          <span className="ms-3 text-sm font-medium text-white dark:text-gray-300"></span>
          {!isCalendar ? "List View" : "Calendar view"}
        </label>
      </div>
      <div className="mt-6">
        {isCalendar ? (
          <DatePicker activities={activities} />
        ) : (
          <>
            {activities && activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex justify-between items-center gap-[20px] md:gap-[30px] flex-col md:flex-row mb-4 p-4 bg-[var(--custom-color-secondary)] shadow"
                >
                  <h2 className="text-xl text-white mb-2">
                    {activity.title} - {activity.description} -{" "}
                    {activity.startDate} - {activity.endDate}
                  </h2>
                  <div className="flex space-x-2">
                    <form action={deleteActivity}>
                      <input type="hidden" name="id" value={activity.id} />
                      <button
                        type="submit"
                        className="flex justify-between items-center gap-2 bg-[var(--custom-color-red)] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[30px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        Delete
                      </button>
                    </form>
                    <EditActivity activity={activity} />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center md:gap-[10px] flex-col md:flex-row mb-4 p-4 bg-[var(--custom-color-secondary)] rounded-lg shadow ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
                Zero Items found!
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
