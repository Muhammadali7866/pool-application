import { supabase } from "@/src/lib/supabase";
interface FetchPollsOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: "all" | "active" | "ended" | "mine";
  userId?: string | null;
}
export async function fetchPolls({ page = 1, pageSize = 10, search = "", filter = "all", userId = null }:FetchPollsOptions) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("polls")
    .select("*", { count: "exact" })
    .range(from, to)

  if (search) {
    query = query.ilike("question", `%${search}%`);
  }

  if (filter === "active") {
    query = query.gt("endDate", new Date().toISOString());
  } else if (filter === "ended") {
    query = query.lt("endDate", new Date().toISOString());
  } else if (filter === "mine" && userId) {
    query = query.eq("createdBy", userId);
  }

  const { data, error, count } = await query.order("created_at", { ascending: false });

  if (error) throw error;

  return { polls: data, total: count };
}
