"use client";

import { supabase } from "@/src/lib/supabase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PollDetail() {
  const [poll, setPoll] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { id: pollId } = useParams();
  console.log({ pollId });

  useEffect(() => {
    if (!pollId) return;

    const fetchPoll = async () => {
      const { data, error } = await supabase
        .from("polls")
        .select("*")
        .eq("id", pollId as string)
        .single();
      console.log({ data });

      if (error) console.error(error);
      else setPoll(data);
      setLoading(false);
    };

    fetchPoll();
  }, [pollId]);
  console.log({ poll });
  if (loading) return <div className="text-white">Loading poll details...</div>;

  return (
    <>
      <div className="px-12 py-10">
        <h2 className="text-white font-bold text-2xl tracking-light leading-tight pt-5">
          {poll.question}
        </h2>
        <div className="px-4">
          {poll.options.map((option, index) => (
            <>
              <label key={index} className="flex pt-5 gap-5 items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 appearance-none rounded border-2 border-[#314d68] bg-transparent checked:bg-[#0b80ee] checked:border-[#0b80ee] focus:outline-none relative
    after:content-[''] after:absolute after:top-[2px] after:left-[6px] after:w-[4px] after:h-[9px] after:border-r-[2px] after:border-b-[2px] after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                />
                <p className="text-white text-base font-normal leading-normal">
                  {option}
                </p>
              </label>
            </>
          ))}
        </div>
        <div className="flex justify-end pt-3">
          <button className="px-5 py-1 rounded-md text-white font-bold bg-blue-500 cursor-pointer">
            Vote
          </button>
        </div>
        <div>
          <h2 className="font-bold text-2xl text-white leading-tight">
            Live Result
          </h2>
          <p className="text-white font-thin py-7">Vote Distribution</p>
        </div>
      </div>
    </>
  );
}
