import { addWatch } from "../server-actions/addWatch";

const WatchForm = () => {
  return (
    <form action={addWatch} className="mb-9">
      <div className="mb-4">
        <label htmlFor="title" className="block text-white mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
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
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="referenceNumber" className="block text-white mb-2">
          Reference Number
        </label>
        <input
          type="text"
          id="referenceNumber"
          name="referenceNumber"
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
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
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
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
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
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
  );
};

export default WatchForm;
