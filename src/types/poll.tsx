export interface Poll {
  id: string;
  question: string;
  options: string[];
  createdBy: string;
  createdAt: string;
  endDate?: string | null;
  voteCount?: number;
}
