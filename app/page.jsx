import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#152B32] text-gray-300 font-sans">
      <div className="mx-auto py-[8vh] h-[100vh] container px-6 md:px-10">
        <div className="bg-[#f2f2f2] flex h-full rounded-[32px]">
          <div className="hidden w-[50%] md:block bg-[url('/bg-photo.jpg')] bg-cover bg-no-repeat bg-center rounded-l-[30px]">
            <div className="flex items-start justify-end h-full flex-col mb-4 p-10">
              <h2 className="text-white font-JosefinSans text-lg">
                Create a free account and get full access to monthly and weekly
                activity calendars for activity coordinators.
              </h2>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-[60%] lg:w-[50%] p-12 justify-around items-center">
            <div className="w-[100%] md:w-[70%]">
              <h2 className="font-Gabarito text-2xl md:text-3xl text-[#152B32] mb-4">
                Welcome to
              </h2>
              <h2 className="font-Yellowtail text-5xl md:text-6xl font-extrabold text-[#152B32] pb-12">
                My Calendar
              </h2>
              <AuthForm />
            </div>
            <a
              href="https://www.linkedin.com/in/emmanouil-xanthakis/"
              target="_blank"
              className="text-[#152B32] font-JosefinSans text-lg underline "
            >
              About me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
