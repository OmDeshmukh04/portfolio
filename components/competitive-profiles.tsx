"use client";

import { useEffect, useState } from "react";
import { CodingProgressTracker } from "@/components/coding-progress-tracker";

type LeetCodeStats = {
  handle: string;
  rank: number | null;
  solved: { total: number; easy: number; medium: number; hard: number };
  contestRating: number | null;
  contestRank: number | null;
  contests: number;
  activity: Array<{ time: number; count: number }>;
  contestHistory: ContestHistoryPoint[];
};

type ContestHistoryPoint = { contest: string; rating: number; time: number; ranking?: number };

type CodeforcesStats = {
  handle: string;
  rank: string;
  rating: number | null;
  maxRating: number | null;
  maxRank: string;
  contests: number;
  acceptedSolves: Array<{ time: number }>;
  history: ContestHistoryPoint[];
};

type StatsResponse = {
  updatedAt: string;
  leetcode: LeetCodeStats | null;
  leetcodeError: string | null;
  codeforces: CodeforcesStats | null;
  codeforcesError: string | null;
};

const numberFormat = new Intl.NumberFormat("en-IN");

function rankLabel(rank: string) {
  return rank.charAt(0).toUpperCase() + rank.slice(1);
}

function localDayKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function currentPracticeStreak(stats: StatsResponse | null) {
  const activeDays = new Set<string>();
  stats?.leetcode?.activity.forEach(({ time }) => activeDays.add(localDayKey(new Date(time * 1000))));
  stats?.codeforces?.acceptedSolves.forEach(({ time }) => activeDays.add(localDayKey(new Date(time * 1000))));

  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  if (!activeDays.has(localDayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  if (!activeDays.has(localDayKey(cursor))) return 0;

  let streak = 0;
  while (activeDays.has(localDayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function CompetitiveOverview({ data }: { data: StatsResponse | null }) {
  const leetcode = data?.leetcode;
  const streak = currentPracticeStreak(data);

  return <section className="project-overview competitive-overview" aria-label="Coding profile summary">
    <article className="competitive-achievement" aria-label="LeetCode Knight achievement">
      <span className="competitive-knight-mark" aria-hidden="true">♞</span>
      <strong>LeetCode Knight</strong>
    </article>
    <article>
      <span>Questions solved</span>
      <strong>{leetcode ? numberFormat.format(leetcode.solved.total) : "—"}</strong>
    </article>
    <article>
      <span>Practice streak</span>
      <strong>{data ? `${streak} ${streak === 1 ? "day" : "days"}` : "—"}</strong>
    </article>
  </section>;
}

function RatingHistory({ history, platform }: { history: ContestHistoryPoint[]; platform: string }) {
  const points = [...history].sort((a, b) => a.time - b.time).slice(-20);
  if (!points.length) return <figure className="platform-rating-chart platform-rating-empty">
    <svg viewBox="0 0 720 220" role="img" aria-label={`${platform} contest rating chart; no rated contests yet`}>
      {[42, 98, 154].map((y) => <line key={y} x1="28" x2="692" y1={y} y2={y} className="platform-chart-gridline" />)}
      <text x="360" y="108" textAnchor="middle" className="platform-empty-label">No rated contests yet</text>
    </svg>
    <figcaption><span>Contest rating history</span><span>Appears after the first rated contest</span></figcaption>
  </figure>;

  const width = 720;
  const height = 220;
  const paddingX = 28;
  const paddingY = 22;
  const ratings = points.map((point) => point.rating);
  const min = Math.floor(Math.min(...ratings) / 100) * 100;
  const max = Math.ceil(Math.max(...ratings) / 100) * 100 || min + 100;
  const span = max - min || 100;
  const coords = points.map((point, index) => ({
    x: points.length === 1 ? width / 2 : paddingX + index * ((width - paddingX * 2) / (points.length - 1)),
    y: height - paddingY - ((point.rating - min) / span) * (height - paddingY * 2),
    point,
  }));
  const polyline = coords.map(({ x, y }) => `${x},${y}`).join(" ");
  const ticks = [min, min + span / 2, max];

  return <figure className="platform-rating-chart">
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${platform} contest rating history across ${points.length} rated contests`}>
      {ticks.map((tick) => {
        const y = height - paddingY - ((tick - min) / span) * (height - paddingY * 2);
        return <g key={tick}>
          <line x1={paddingX} x2={width - paddingX} y1={y} y2={y} className="platform-chart-gridline" />
          <text x="2" y={y + 4} className="platform-chart-tick">{Math.round(tick)}</text>
        </g>;
      })}
      <polyline points={polyline} className="platform-chart-line" />
      {coords.map(({ x, y, point }) => <circle key={`${point.time}-${point.rating}`} cx={x} cy={y} r="3.4" className="platform-chart-point">
        <title>{`${point.contest}: ${point.rating}`}</title>
      </circle>)}
    </svg>
    <figcaption><span>{points.length > 1 ? points[0].contest : "First rated contest"}</span><span>{points.length > 1 ? points[points.length - 1].contest : "Contest 1"}</span></figcaption>
  </figure>;
}

function LeetCodePanel({ stats, error }: { stats: LeetCodeStats | null; error: string | null }) {
  const difficulties = [
    { label: "Easy", count: stats?.solved.easy ?? 0 },
    { label: "Medium", count: stats?.solved.medium ?? 0 },
    { label: "Hard", count: stats?.solved.hard ?? 0 },
  ];
  const max = Math.max(1, ...difficulties.map((item) => item.count));

  return <section className="platform-section" aria-labelledby="leetcode-title">
    <header className="platform-section-heading">
      <div><p className="eyebrow">LeetCode</p><h2 id="leetcode-title">{stats?.handle ?? "ExpertD19"}</h2></div>
      <a href="https://leetcode.com/u/ExpertD19/" target="_blank" rel="noreferrer">Open profile ↗</a>
    </header>
    {stats ? <>
      <div className="platform-stat-grid platform-stat-grid-leetcode">
        <article><span>Problems solved</span><strong>{numberFormat.format(stats.solved.total)}</strong></article>
        <article><span>Contest rating</span><strong>{stats.contestRating ? Math.round(stats.contestRating) : "—"}</strong></article>
        <article><span>Contest ranking</span><strong>{stats.contestRank ? `#${numberFormat.format(stats.contestRank)}` : "—"}</strong></article>
        <article><span>Rated contests</span><strong>{numberFormat.format(stats.contests)}</strong></article>
      </div>
      <div className="platform-chart-heading"><h3>Contest rating</h3><span>{stats.contests} rated contests</span></div>
      <RatingHistory history={stats.contestHistory} platform="LeetCode" />
      <div className="platform-chart-heading"><h3>Problems solved</h3><span>{stats.rank ? `Global rank #${numberFormat.format(stats.rank)}` : ""}</span></div>
      <div className="leetcode-chart" role="img" aria-label={`Solved by difficulty: ${stats.solved.easy} easy, ${stats.solved.medium} medium, ${stats.solved.hard} hard`}>
        {difficulties.map(({ label, count }) => <div className="leetcode-chart-row" key={label}>
          <span>{label}</span><div><i style={{ width: `${Math.max(count ? 4 : 0, count / max * 100)}%` }} /></div><strong>{numberFormat.format(count)}</strong>
        </div>)}
      </div>
    </> : <p className={`platform-load-message${error ? " is-error" : ""}`}>{error || "Loading live profile data…"}</p>}
  </section>;
}

function CodeforcesPanel({ stats, error }: { stats: CodeforcesStats | null; error: string | null }) {
  return <section className="platform-section" aria-labelledby="codeforces-title">
    <header className="platform-section-heading">
      <div><p className="eyebrow">Codeforces</p><h2 id="codeforces-title">{stats?.handle ?? "Om_Deshmukh_"}</h2></div>
      <a href="https://codeforces.com/profile/Om_Deshmukh_" target="_blank" rel="noreferrer">Open profile ↗</a>
    </header>
    {stats ? <>
      <div className="platform-stat-grid platform-stat-grid-codeforces">
        <article><span>Current rating</span><strong>{stats.rating ?? "Unrated"}</strong><small>{rankLabel(stats.rank)}</small></article>
        <article><span>Peak rating</span><strong>{stats.maxRating ?? "—"}</strong><small>{rankLabel(stats.maxRank)}</small></article>
        <article><span>Rated contests</span><strong>{numberFormat.format(stats.contests)}</strong></article>
      </div>
      <div className="platform-chart-heading"><h3>Contest rating</h3><span>Most recent 20</span></div>
      <RatingHistory history={stats.history} platform="Codeforces" />
    </> : <p className={`platform-load-message${error ? " is-error" : ""}`}>{error || "Loading live profile data…"}</p>}
  </section>;
}

export function CompetitiveProfiles() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/coding-stats", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Profile data is temporarily unavailable.");
        return await response.json() as StatsResponse;
      })
      .then(setData)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadError("Profile data is temporarily unavailable.");
      });
    return () => controller.abort();
  }, []);

  const updatedLabel = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
    : "";

  return <div className="competitive-sections">
    <CompetitiveOverview data={data} />
    <div className="competitive-platform-grid">
      <LeetCodePanel stats={data?.leetcode ?? null} error={data?.leetcodeError ?? (loadError || null)} />
      <CodeforcesPanel stats={data?.codeforces ?? null} error={data?.codeforcesError ?? (loadError || null)} />
    </div>
    <p className="platform-updated">{updatedLabel ? `Updated ${updatedLabel}` : loadError ? "Live data unavailable" : "Loading live profile data…"}</p>
    <section className="codeforces-roadmap-section" aria-labelledby="codeforces-roadmap-title">
      <CodingProgressTracker liveActivity={{
        leetcode: data?.leetcode?.activity ?? [],
        codeforces: data?.codeforces?.acceptedSolves ?? [],
      }} />
    </section>
  </div>;
}
