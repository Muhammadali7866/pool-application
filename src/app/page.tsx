"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/signin");
  };
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <hr />

      {/* hero image */}
      <div className="relative bg-white h-[500px] w-[1100px] rounded-2xl ml-[280px] mt-5 overflow-hidden">
        <Image
          src="/voting2.webp"
          alt="Full Screen Image"
          fill
          className="object-cover rounded-2xl"
          priority
        />{" "}
        <div className="absolute inset-0 flex flex-col items-center justify-center  text-black text-center rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Create and Participate in Real-Time Polls
          </h2>
          <p className="mb-4">
            Engage your audience with interactive polls and get instant
            feedbacks
          </p>
          <button
            className="px-6 py-2 rounded-2xl bg-white text-black font-semibold hover:bg-gray-500 cursor-pointer"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
