'use client';

import { useEffect, useState } from "react";
import { fetchPolls } from "@/src/lib/fetchPolls";
import { Poll } from "@/src/types/poll";
import { useUser } from "@supabase/auth-helpers-react";
type FileType = 'all' | 'active' | 'ended' | 'mine'
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
    <div className="flex p-12 gap-3">
      <div className="w-full flex-[3]">
        <h2 className="text-white font-bold text-lg">PollsApp</h2>
        <div className="text-white pl-3 pt-2 flex flex-col gap-4 font-semibold list-none">
          <li className="bg-gray-600 p-3 rounded-2xl">Home</li>
          <li className="bg-gray-600 p-3 rounded-2xl">My Polls</li>
          <li className="bg-gray-600 p-3 rounded-2xl">Create Poll</li>
          <li className="bg-gray-600 p-3 rounded-2xl">Profile</li>
        </div>
      </div>

      <div className="flex-[7] bg-white">
        <input type="text" />

      </div>
     
    </div>

  );
}



//  <div className="p-6  mx-auto space-y-4 flex-[7]">
//         <div className="flex items-center gap-4">
//           <input
//             type="text"
//             placeholder="Search polls..."
//             className="border p-2 rounded w-full"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <select
//             className="border p-2 rounded"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value as FileType)}
//           >
//             <option value="all">All</option>
//             <option value="active">Active</option>
//             <option value="ended">Ended</option>
//             {user && <option value="mine">My Polls</option>}
//           </select>
//         </div>

//         <ul className="space-y-4">
//           {polls.map((poll) => (
//             <li key={poll.id} className="border p-4 rounded shadow">
//               <h3 className="text-lg font-bold">{poll.question}</h3>
//               <p className="text-sm text-gray-600">
//                 Ends: {poll.endDate ? new Date(poll.endDate).toLocaleString() : "No end date"}
//               </p>
//               <a href={`/poll/${poll.id}`} className="text-blue-600 underline">
//                 View Poll
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Pagination */}
//         <div className="flex justify-between pt-4">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="px-4 py-2">Page {page}</span>
//           <button
//             disabled={page * pageSize >= total}
//             onClick={() => setPage(page + 1)}
//             className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>