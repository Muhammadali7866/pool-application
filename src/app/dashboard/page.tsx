"use client";

import { useEffect, useState } from "react";
import { fetchPolls } from "@/src/lib/fetchPolls";
import { Poll } from "@/src/types/poll";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
type FileType = "all" | "active" | "ended" | "mine";
export default function PollListPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FileType>("all");
  const [total, setTotal] = useState(0);

  const pageSize = 10;
  const user = useUser();

  useEffect(() => {
    const loadPolls = async () => {
      try {
        const { polls, total } = await fetchPolls({
          page,
          pageSize,
          search,
          filter,
          userId: user?.id ?? null,
        });
        setPolls(polls);
        setTotal(total ?? 0);
        console.log({ polls });
      } catch (error) {
        console.error("Failed to load polls:", error);
      }
    };
    loadPolls();
  }, [page, search, filter, user]);

  return (
    <div className="flex p-12 gap-5">
      <div className="w-full flex-[3]">
        <h2 className="text-white font-bold text-lg">PollsApp</h2>
        <div className="text-white pl-3 pt-2 flex flex-col gap-4 font-semibold list-none">
          <li className="bg-[#223649] p-3 rounded-2xl">Home</li>
          <li className="bg-[#223649] p-3 rounded-2xl">My Polls</li>
          <li className="bg-[#223649] p-3 rounded-2xl">
            <Link href="/poll">Create Poll</Link>
          </li>
          <li className="bg-[#223649] p-3 rounded-2xl">Profile</li>
        </div>
      </div>

      <div className="flex-[7] pl-8">
        <input
          type="text"
          className="bg-[#223649] w-full p-2 rounded-lg border-[#223649] text-white"
          placeholder="Search for pool"
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* filters */}
        <div className="flex gap-3 mt-5">
          <button
            className="bg-[#223649] rounded-lg p-2 cursor-pointer"
            onClick={() => setFilter("all")}
          >
            All Polls
          </button>
          <button
            className="bg-[#223649] rounded-lg p-2 cursor-pointer"
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className="bg-[#223649] rounded-lg p-2 cursor-pointer"
            onClick={() => setFilter("ended")}
          >
            Ended
          </button>
          <button
            className="bg-[#223649] rounded-lg p-2 cursor-pointer"
            onClick={() => setFilter("mine")}
          >
            MyPolls
          </button>
        </div>
        {/* all polls details */}
        <div className="flex gap-5 flex-wrap">
          {polls.map((poll) => (
            <Link href={`/poll/${poll.id}`} key={poll.id}>
              <li key={poll.id} className="w-[150px] h-[230px] rounded-xl mt-5">
                <Image
                  src="/vote.png"
                  alt="Logo"
                  className="w-full rounded-xl h-[150px]"
                  width={200}
                  height={100}
                />

                <h2 className="text-white font-semibold mt-1 pl-1">
                  {poll.question}
                </h2>
                <p className="text-[#223649] text-md font-semibold pl-1">
                  Author
                </p>
                <p className="text-[#223649] text-md font-semibold pl-1">
                  {poll.voteCount}
                </p>
              </li>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
