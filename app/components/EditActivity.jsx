"use client";

import { useState } from "react";
import { updateActivity } from "../server-actions/updateActivity";

export default function EditActivity({ activity }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: activity.title,
    description: activity.description,
    startDate: activity.startDate
      ? activity.startDate.split("+")[0]
      : activity.startDate,
    endDate: activity.endDate
      ? activity.endDate.split("+")[0]
      : activity.endDate,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="flex justify-between items-center gap-2 bg-[var(--custom-color-blue)] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[30px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
        Edit
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center px-4">
          <div className="modal-content bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <span
              className="close text-white text-xl leading-none hover:text-gray-300 cursor-pointer float-right"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <form
              action={updateActivity}
              onSubmit={() => setShowModal(false)}
              className="mt-4"
            >
              <input type="hidden" name="id" value={activity.id} />
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-300 mb-2"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="startDate" className="block text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endDate" className="block text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update Activity
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
