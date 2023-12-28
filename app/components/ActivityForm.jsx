"use client";

import { addActivity } from "../server-actions/addActivity";
import { useState } from "react";

const ActivityForm = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  async function onAdd(formData) {
    const res = await addActivity(formData);

    setIsSuccessful(res.message === "Success" ? true : false);
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
    });
  }

  const handleChange = (e) => {
    setIsSuccessful(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-9">
      <form action={onAdd}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-white mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white outline-none"
            onChange={handleChange}
            value={formData.title}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-white mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white outline-none"
            onChange={handleChange}
            value={formData.description}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-white mb-2">
            Task Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white outline-none"
            onChange={handleChange}
            value={formData.startDate}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-white mb-2">
            Task End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white outline-none"
            onChange={handleChange}
            value={formData.endDate}
            required
          />
        </div>
        <div className="mb-4 mt-6">
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded-[30px] transition ease-in-out delay-150 hover:scale-110 duration-300"
          >
            Add Activity
          </button>
        </div>
      </form>

      {isSuccessful && (
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
                Activity successfully added!
              </p>
            </div>
          </div>
          <span
            className="close text-[var(--custom-color-brand)] text-xl leading-none hover:text-gray-300 cursor-pointer"
            onClick={() => setIsSuccessful(false)}
          >
            &times;
          </span>
        </div>
      )}
    </div>
  );
};

export default ActivityForm;
