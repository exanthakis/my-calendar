import AuthForm from "./components/AuthForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] text-gray-300 font-sans">
      <div className="w-full mx-auto p-0 h-[100vh]">
        <div className="bg-[#f2f2f2] flex h-full">
          <div className="hidden w-[50%] md:block bg-[url('/bg-photo.jpg')] bg-cover bg-no-repeat bg-center"></div>
          <div className="flex w-full md:w-[50%] p-12 justify-center items-center">
            <div className="w-[100%] md:w-[80%]">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-700 mb-6">
                Welcome to Watch List
              </h1>
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
