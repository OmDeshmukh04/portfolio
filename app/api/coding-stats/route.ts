// Allow time for the three upstream Codeforces requests and rate-limit pauses.
export const maxDuration = 60;

const CODEFORCES_HANDLE = "Om_Deshmukh_";
const LEETCODE_HANDLE = "ExpertD19";

type CodeforcesEnvelope<T> = { status: "OK" | "FAILED"; result: T; comment?: string };

async function fetchCodeforces<T>(method: string, query: string) {
  const response = await fetch(`https://codeforces.com/api/${method}?${query}`, {
    headers: { "User-Agent": "OmDeshmukhPortfolio/1.0" },
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Codeforces returned ${response.status}`);
  const data = await response.json() as CodeforcesEnvelope<T>;
  if (data.status !== "OK") throw new Error(data.comment || "Codeforces data is unavailable");
  return data.result;
}

async function getCodeforcesStats() {
  const profile = await fetchCodeforces<Array<{
    handle: string;
    rank?: string;
    rating?: number;
    maxRating?: number;
    maxRank?: string;
  }>>("user.info", `handles=${encodeURIComponent(CODEFORCES_HANDLE)}`);

  // Codeforces asks clients to leave at least two seconds between API calls.
  await new Promise((resolve) => setTimeout(resolve, 2100));
  const history = await fetchCodeforces<Array<{
    contestName: string;
    newRating: number;
    ratingUpdateTimeSeconds: number;
  }>>("user.rating", `handle=${encodeURIComponent(CODEFORCES_HANDLE)}`);
  await new Promise((resolve) => setTimeout(resolve, 2100));
  const submissions = await fetchCodeforces<Array<{
    contestId?: number;
    creationTimeSeconds: number;
    verdict?: string;
    problem: { contestId?: number; index: string };
  }>>("user.status", `handle=${encodeURIComponent(CODEFORCES_HANDLE)}&from=1&count=1000`);
  const user = profile[0];
  if (!user) throw new Error("Codeforces profile not found");
  const acceptedByProblem = new Map<string, number>();
  for (const submission of submissions) {
    if (submission.verdict !== "OK") continue;
    const contestId = submission.problem.contestId ?? submission.contestId;
    if (contestId === undefined) continue;
    const key = `${contestId}:${submission.problem.index}`;
    const previous = acceptedByProblem.get(key);
    if (previous === undefined || submission.creationTimeSeconds < previous) {
      acceptedByProblem.set(key, submission.creationTimeSeconds);
    }
  }

  return {
    handle: user.handle,
    rank: user.rank ?? "Unrated",
    rating: user.rating ?? null,
    maxRating: user.maxRating ?? null,
    maxRank: user.maxRank ?? "Unrated",
    contests: history.length,
    acceptedSolves: Array.from(acceptedByProblem.values()).map((time) => ({ time })),
    history: history.map((contest) => ({
      contest: contest.contestName,
      rating: contest.newRating,
      time: contest.ratingUpdateTimeSeconds,
    })),
  };
}

async function getLeetCodeStats() {
  const query = `query userPublicProfile($username: String!, $year: Int!, $previousYear: Int!) {
    matchedUser(username: $username) {
      username
      profile { ranking }
      submitStats { acSubmissionNum { difficulty count submissions } }
      currentYearCalendar: userCalendar(year: $year) { submissionCalendar }
      previousYearCalendar: userCalendar(year: $previousYear) { submissionCalendar }
    }
    userContestRanking(username: $username) { attendedContestsCount rating globalRanking totalParticipants topPercentage }
    userContestRankingHistory(username: $username) { attended rating ranking contest { title startTime } }
  }`;
  const response = await fetch("https://leetcode.com/graphql/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com/",
      "User-Agent": "Mozilla/5.0 OmDeshmukhPortfolio/1.0",
    },
    body: JSON.stringify({
      query,
      variables: { username: LEETCODE_HANDLE, year: new Date().getUTCFullYear(), previousYear: new Date().getUTCFullYear() - 1 },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`LeetCode returned ${response.status}`);
  const payload = await response.json() as {
    errors?: Array<{ message?: string }>;
    data?: {
      matchedUser?: {
        username: string;
        profile?: { ranking?: number };
        submitStats?: { acSubmissionNum?: Array<{ difficulty: string; count: number; submissions: number }> };
        currentYearCalendar?: { submissionCalendar?: string } | null;
        previousYearCalendar?: { submissionCalendar?: string } | null;
      } | null;
      userContestRanking?: { attendedContestsCount?: number; rating?: number; globalRanking?: number; topPercentage?: number } | null;
      userContestRankingHistory?: Array<{ attended: boolean; rating: number; ranking: number; contest: { title: string; startTime: number } }>;
    };
  };
  if (payload.errors?.length) throw new Error(payload.errors[0].message || "LeetCode data is unavailable");
  const user = payload.data?.matchedUser;
  if (!user) throw new Error("LeetCode profile not found");
  const counts = user.submitStats?.acSubmissionNum ?? [];
  const contestRanking = payload.data?.userContestRanking;
  const contestHistory = (payload.data?.userContestRankingHistory ?? []).filter((contest) => contest.attended);
  const calendars = [user.currentYearCalendar?.submissionCalendar, user.previousYearCalendar?.submissionCalendar]
    .filter((value): value is string => Boolean(value));
  const activity = calendars.flatMap((calendar) => {
    try {
      return Object.entries(JSON.parse(calendar) as Record<string, number>)
        .map(([time, count]) => ({ time: Number(time), count }))
        .filter((item) => Number.isFinite(item.time) && Number.isFinite(item.count));
    } catch {
      return [];
    }
  });
  const count = (difficulty: string) => counts.find((item) => item.difficulty === difficulty)?.count ?? 0;

  return {
    handle: user.username,
    rank: user.profile?.ranking ?? null,
    solved: { total: count("All"), easy: count("Easy"), medium: count("Medium"), hard: count("Hard") },
    contestRating: contestRanking?.rating ?? null,
    contestRank: contestRanking?.globalRanking ?? null,
    contests: contestRanking?.attendedContestsCount ?? contestHistory.length,
    activity,
    contestHistory: contestHistory.map((contest) => ({
      contest: contest.contest.title,
      rating: contest.rating,
      time: contest.contest.startTime,
      ranking: contest.ranking,
    })),
  };
}

export async function GET() {
  const [codeforces, leetcode] = await Promise.allSettled([getCodeforcesStats(), getLeetCodeStats()]);
  return Response.json({
    updatedAt: new Date().toISOString(),
    codeforces: codeforces.status === "fulfilled" ? codeforces.value : null,
    codeforcesError: codeforces.status === "rejected" ? "Codeforces data is temporarily unavailable." : null,
    leetcode: leetcode.status === "fulfilled" ? leetcode.value : null,
    leetcodeError: leetcode.status === "rejected" ? "LeetCode data is temporarily unavailable." : null,
  }, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900" },
  });
}
