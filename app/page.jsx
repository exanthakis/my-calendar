import AuthForm from "./components/AuthForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#152B32] text-gray-300 font-sans">
      <div className="mx-auto py-[8vh] h-[100vh] container px-6 md:px-10">
        <div className="bg-[#f2f2f2] flex h-full rounded-[32px]">
          <div className="hidden w-[50%] md:block bg-[url('/bg-photo.jpg')] bg-cover bg-no-repeat bg-center rounded-l-[30px]"></div>
          <div className="flex w-full md:w-[60%] lg:w-[50%] p-12 justify-center items-center">
            <div className="w-[100%] md:w-[70%]">
              <h1 className="font-Gabarito text-2xl md:text-3xl text-[#152B32] mb-4">
                Welcome to
              </h1>
              <h1 className="font-Yellowtail text-5xl md:text-6xl font-extrabold text-[#152B32] pb-12">
                My Calendar
              </h1>
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
