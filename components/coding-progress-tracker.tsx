"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import readExcelFile from "read-excel-file/browser";
import codingRoadmapData from "@/lib/coding-roadmap.json";

type CodingProblem = {
  key: string;
  id: string;
  name: string;
  rating: number;
  tags: string[];
  url?: string;
  source?: string;
  curation?: string;
  order?: number;
  initialSolved?: boolean;
  initialSolvedOn?: string | null;
};

type Completion = { date: string | null; imported?: boolean };
type LiveActivity = {
  leetcode: Array<{ time: number; count: number }>;
  codeforces: Array<{ time: number }>;
};
type SpreadsheetCell = string | number | boolean | Date | null | undefined;
type SpreadsheetSheet = { sheet: string; data: SpreadsheetCell[][] };

const STORAGE_KEY = "om-coding-progress-v2";
const LEGACY_STORAGE_KEY = "om-coding-progress-v1";
const starterList = codingRoadmapData as CodingProblem[];
const initialCompletions = Object.fromEntries(starterList
  .filter((problem) => problem.initialSolved)
  .map((problem) => [problem.key, { date: problem.initialSolvedOn ?? null, imported: !problem.initialSolvedOn }])) as Record<string, Completion>;

const tagAliases: Record<string, string> = {
  dp: "Dynamic programming",
  "dynamic programming": "Dynamic programming",
  "tree dp": "Dynamic programming",
  "interval dp": "Dynamic programming",
  "bitmask dp": "Dynamic programming",
  "sos dp": "Dynamic programming",
  sorting: "Sorting",
  sortings: "Sorting",
  constructive: "Constructive algorithms",
  "constructive algorithms": "Constructive algorithms",
  dsu: "Disjoint set union",
  "disjoint set union": "Disjoint set union",
  bfs: "BFS",
  dfs: "DFS",
  "dfs and similar": "DFS",
  graphs: "Graphs",
  graph: "Graphs",
  "shortest path": "Shortest paths",
  "shortest paths": "Shortest paths",
  "binary search on answer": "Binary search",
  "two pointers": "Two pointers",
  bitmasks: "Bitmasks",
};

function canonicalTag(value: string) {
  const key = value.trim().toLowerCase();
  return tagAliases[key] ?? key.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizeHeader(value: SpreadsheetCell) {
  return String(value ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function textValue(value: SpreadsheetCell) {
  return String(value ?? "").trim();
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateFromCell(value: SpreadsheetCell) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return localDateKey(value);
  if (typeof value === "number" && value > 0) {
    const excelEpoch = new Date(1899, 11, 30);
    excelEpoch.setDate(excelEpoch.getDate() + Math.floor(value));
    return localDateKey(excelEpoch);
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return localDateKey(parsed);
  }
  return null;
}

function dateLabel(date: string) {
  if (!date) return "";
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function PracticeHeatmap({ today, liveActivity, completions }: {
  today: string;
  liveActivity: LiveActivity;
  completions: Record<string, Completion>;
}) {
  const heatmap = useMemo(() => {
    if (!today) return null;
    const [year, month, day] = today.split("-").map(Number);
    const end = new Date(year, month - 1, day, 12);
    const first = new Date(end);
    first.setDate(first.getDate() - 364);
    const gridStart = new Date(first);
    gridStart.setDate(gridStart.getDate() - gridStart.getDay());
    const startKey = localDateKey(first);
    const endKey = localDateKey(end);
    const counts = new Map<string, { leetcode: number; codeforces: number; roadmap: number }>();
    const entryFor = (key: string) => {
      const existing = counts.get(key) ?? { leetcode: 0, codeforces: 0, roadmap: 0 };
      counts.set(key, existing);
      return existing;
    };
    liveActivity.leetcode.forEach(({ time, count }) => {
      const key = localDateKey(new Date(time * 1000));
      entryFor(key).leetcode += count;
    });
    liveActivity.codeforces.forEach(({ time }) => {
      const key = localDateKey(new Date(time * 1000));
      entryFor(key).codeforces += 1;
    });
    Object.values(completions).forEach((completion) => {
      if (completion.date) entryFor(completion.date).roadmap += 1;
    });

    const cells = Array.from({ length: 371 }, (_, index) => {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + index);
      const key = localDateKey(date);
      const withinRange = key >= startKey && key <= endKey;
      const activity = withinRange ? counts.get(key) ?? { leetcode: 0, codeforces: 0, roadmap: 0 } : { leetcode: 0, codeforces: 0, roadmap: 0 };
      const total = activity.leetcode + activity.codeforces + activity.roadmap;
      const level = total === 0 ? 0 : total === 1 ? 1 : total <= 3 ? 2 : total <= 6 ? 3 : 4;
      return { key, date, withinRange, activity, total, level };
    });
    const months = cells.flatMap((cell, index) => cell.withinRange && cell.date.getDate() === 1
      ? [{ column: Math.floor(index / 7) + 1, label: cell.date.toLocaleDateString(undefined, { month: "short" }) }]
      : []);
    const totals = cells.filter((cell) => cell.withinRange).reduce((sum, cell) => ({
      leetcode: sum.leetcode + cell.activity.leetcode,
      codeforces: sum.codeforces + cell.activity.codeforces,
      roadmap: sum.roadmap + cell.activity.roadmap,
    }), { leetcode: 0, codeforces: 0, roadmap: 0 });
    return { cells, months, totals };
  }, [today, liveActivity, completions]);

  if (!heatmap) return null;
  const endLabel = dateLabel(today);
  const startCell = heatmap.cells.find((cell) => cell.withinRange);
  const startLabel = startCell ? dateLabel(startCell.key) : "";

  return <section className="practice-heatmap" aria-labelledby="practice-heatmap-title">
    <div className="practice-heatmap-heading">
      <div>
        <p className="eyebrow">Activity</p>
        <h3 id="practice-heatmap-title">Practice activity</h3>
        <p>LeetCode submissions · Codeforces accepted solves · roadmap checkmarks</p>
      </div>
      <span className="practice-heatmap-range">{startLabel} – {endLabel}</span>
    </div>
    <div className="practice-heatmap-content">
      <div className="practice-heatmap-day-labels" aria-hidden="true">
        <span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span>
      </div>
      <div className="practice-heatmap-scroll">
        <div className="practice-heatmap-months" aria-hidden="true">
          {heatmap.months.map(({ column, label }, index) => <span key={`${label}-${index}`} style={{ gridColumn: column }}>{label}</span>)}
        </div>
        <div className="practice-heatmap-grid" role="img" aria-label="Daily activity heatmap for the last 365 days">
          {heatmap.cells.map(({ key, date, withinRange, activity, total, level }) => {
            const label = date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
            const description = `${label}: ${activity.leetcode} LeetCode submissions, ${activity.codeforces} Codeforces accepted solves, ${activity.roadmap} roadmap checkmarks`;
            return <span
              key={key}
              className={`practice-heatmap-cell heat-level-${level}${withinRange ? "" : " is-outside"}`}
              title={withinRange ? `${description} (${total} activity)` : undefined}
              aria-label={withinRange ? description : undefined}
              aria-hidden={!withinRange}
            />;
          })}
        </div>
      </div>
    </div>
    <div className="practice-heatmap-footer">
      <div className="practice-heatmap-totals">
        <span><i className="heat-source-dot leetcode-dot" />{heatmap.totals.leetcode} LeetCode submissions</span>
        <span><i className="heat-source-dot codeforces-dot" />{heatmap.totals.codeforces} Codeforces solves</span>
        <span><i className="heat-source-dot roadmap-dot" />{heatmap.totals.roadmap} roadmap checkmarks</span>
      </div>
      <div className="practice-heatmap-legend" aria-label="Activity intensity: less to more">
        <span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} className={`practice-heatmap-cell heat-level-${level}`} />)}<span>More</span>
      </div>
    </div>
  </section>;
}

function safeUrl(value: SpreadsheetCell) {
  const raw = textValue(value);
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function parseSheet(sheet: SpreadsheetSheet) {
  const headerRowIndex = sheet.data.findIndex((row) => {
    const headers = row.map(normalizeHeader);
    const hasTitle = headers.some((header) => ["problem", "problem name", "title", "name"].includes(header));
    const hasRating = headers.some((header) => ["rating", "problem rating", "difficulty", "level"].includes(header));
    const hasId = headers.some((header) => ["problem id", "id", "problem code", "code"].includes(header));
    return hasTitle && hasRating && hasId;
  });
  if (headerRowIndex < 0) return [];

  const headers = sheet.data[headerRowIndex].map(normalizeHeader);
  const column = (...names: string[]) => headers.findIndex((header) => names.includes(header));
  const idIndex = column("problem id", "id", "problem code", "code");
  const nameIndex = column("problem", "problem name", "title", "name");
  const ratingIndex = column("rating", "problem rating", "difficulty", "level");
  const tagIndex = column("classic tags focus", "tags", "tag", "topic", "topics", "pattern");
  const urlIndex = column("problem url", "url", "link", "problem link");
  const contestIdIndex = column("contest id");
  const problemIndexIndex = column("index", "problem index");
  const statusIndex = column("status", "solve status", "progress");
  const dateIndex = column("attempt date", "solved date", "completion date", "date solved");
  const curationIndex = column("curation", "problem type");
  const orderIndex = column("global", "number", "order");
  const inferredRating = Number(sheet.sheet.match(/\b(\d{3,4})\b/)?.[1]);

  return sheet.data.slice(headerRowIndex + 1).flatMap((row) => {
    const name = textValue(row[nameIndex]);
    const rawId = textValue(row[idIndex]);
    const ratingCell = row[ratingIndex];
    const parsedRating = typeof ratingCell === "number" ? ratingCell : Number.parseInt(textValue(ratingCell).match(/\d{3,4}/)?.[0] ?? "", 10);
    const rating = Number.isFinite(parsedRating) && parsedRating > 0 ? parsedRating : inferredRating;
    if (!name || !Number.isFinite(rating) || rating <= 0) return [];

    const id = rawId || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const explicitUrl = safeUrl(urlIndex >= 0 ? row[urlIndex] : undefined);
    const contestId = contestIdIndex >= 0 ? textValue(row[contestIdIndex]) : "";
    const problemIndex = problemIndexIndex >= 0 ? textValue(row[problemIndexIndex]) : "";
    const idParts = id.match(/^(\d+)([A-Z][A-Z0-9]*)$/i);
    const url = explicitUrl ?? (contestId && problemIndex
      ? `https://codeforces.com/problemset/problem/${contestId}/${problemIndex}`
      : idParts
        ? `https://codeforces.com/problemset/problem/${idParts[1]}/${idParts[2].toUpperCase()}`
        : undefined);
    const rawTags = tagIndex >= 0 ? textValue(row[tagIndex]) : "";
    const tags = rawTags ? rawTags.split(/[,;/|]+/).map((tag) => tag.trim()).filter(Boolean).map(canonicalTag) : [];
    const status = statusIndex >= 0 ? normalizeHeader(row[statusIndex]) : "";
    const isSolved = ["solved", "done", "completed", "accepted", "finished"].includes(status);
    const date = dateIndex >= 0 ? dateFromCell(row[dateIndex]) : null;

    return [{
      problem: {
        key: `${rating}:${id.toUpperCase()}`,
        id,
        name,
        rating,
        tags,
        url,
        source: sheet.sheet,
        curation: curationIndex >= 0 ? textValue(row[curationIndex]) : undefined,
        order: orderIndex >= 0 && typeof row[orderIndex] === "number" ? row[orderIndex] as number : undefined,
      } satisfies CodingProblem,
      completion: isSolved ? { date, imported: !date } satisfies Completion : undefined,
    }];
  });
}

function mergeProblems(existing: CodingProblem[], incoming: CodingProblem[]) {
  const merged = new Map(existing.map((problem) => [problem.key, problem]));
  for (const problem of incoming) {
    const previous = merged.get(problem.key);
    merged.set(problem.key, previous ? {
      ...previous,
      ...problem,
      tags: problem.tags.length ? problem.tags : previous.tags,
      url: problem.url ?? previous.url,
    } : problem);
  }
  return Array.from(merged.values());
}

function completionFromUnknown(value: unknown): value is Completion {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return record.date === null || (typeof record.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(record.date));
}

export function CodingProgressTracker({ liveActivity }: { liveActivity: LiveActivity }) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [problems, setProblems] = useState<CodingProblem[]>(starterList);
  const [completions, setCompletions] = useState<Record<string, Completion>>(initialCompletions);
  const [reviews, setReviews] = useState<Record<string, boolean>>({});
  const [selectedRating, setSelectedRating] = useState<number | "all">(800);
  const [selectedTag, setSelectedTag] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [today, setToday] = useState("");
  const [storageError, setStorageError] = useState(false);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { version?: number; problems?: unknown; completions?: unknown; reviews?: unknown };
        if (Array.isArray(saved.problems)) {
          const validProblems = saved.problems.filter((problem): problem is CodingProblem => {
            if (!problem || typeof problem !== "object") return false;
            const item = problem as Partial<CodingProblem>;
            return typeof item.key === "string" && typeof item.name === "string" && typeof item.id === "string" && typeof item.rating === "number" && Array.isArray(item.tags);
          });
          setProblems(mergeProblems(starterList, validProblems));
        }
        if (saved.completions && typeof saved.completions === "object") {
          const validCompletions = Object.fromEntries(Object.entries(saved.completions).filter(([, value]) => completionFromUnknown(value)));
          setCompletions(saved.version === 2
            ? validCompletions as Record<string, Completion>
            : { ...initialCompletions, ...validCompletions as Record<string, Completion> });
        }
        if (saved.reviews && typeof saved.reviews === "object") {
          const validReviews = Object.fromEntries(Object.entries(saved.reviews).filter(([, value]) => typeof value === "boolean"));
          setReviews(validReviews as Record<string, boolean>);
        }
      }
    } catch {
      setMessage("I couldn't restore saved progress, so the seeded roadmap is ready to start again.");
    } finally {
      setToday(localDateKey());
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 2, problems, completions, reviews }));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [ready, problems, completions, reviews]);

  const ratings = useMemo(() => Array.from(new Set(problems.map((problem) => problem.rating))).sort((a, b) => a - b), [problems]);
  const topicOptions = useMemo(() => Array.from(new Set(problems.flatMap((problem) => problem.tags))).sort((a, b) => a.localeCompare(b)), [problems]);
  const ratingProblems = useMemo(() => selectedRating === "all" ? problems : problems.filter((problem) => problem.rating === selectedRating), [problems, selectedRating]);
  const filteredProblems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return ratingProblems.filter((problem) => {
      const matchesQuery = !query || `${problem.id} ${problem.name} ${problem.tags.join(" ")} ${problem.curation ?? ""}`.toLowerCase().includes(query);
      const matchesTag = selectedTag === "all" || (selectedTag === "unclassified" ? problem.tags.length === 0 : problem.tags.includes(selectedTag));
      const complete = Boolean(completions[problem.key]);
      const matchesStatus = statusFilter === "all"
        || (statusFilter === "open" && !complete)
        || (statusFilter === "solved" && complete)
        || (statusFilter === "review" && reviews[problem.key]);
      return matchesQuery && matchesTag && matchesStatus;
    });
  }, [ratingProblems, search, selectedTag, statusFilter, completions, reviews]);

  const solvedCount = problems.reduce((total, problem) => total + (completions[problem.key] ? 1 : 0), 0);
  const remainingCount = problems.length - solvedCount;
  const reviewCount = problems.reduce((total, problem) => total + (reviews[problem.key] ? 1 : 0), 0);
  const overallPercent = problems.length ? Math.round(solvedCount / problems.length * 100) : 0;
  const todayCount = problems.reduce((total, problem) => total + (completions[problem.key]?.date === today ? 1 : 0), 0);
  const week = useMemo(() => {
    if (!today) return [];
    const [year, month, dayOfMonth] = today.split("-").map(Number);
    const todayDate = new Date(year, month - 1, dayOfMonth, 12);
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(todayDate);
      day.setDate(day.getDate() - (6 - index));
      const key = localDateKey(day);
      return {
        key,
        label: day.toLocaleDateString(undefined, { weekday: "short" }),
        count: Object.values(completions).filter((completion) => completion.date === key).length,
      };
    });
  }, [today, completions]);
  const weekMax = Math.max(1, ...week.map((day) => day.count));

  async function importWorkbook(file?: File) {
    if (!file) return;
    setImporting(true);
    setError("");
    setMessage("");
    try {
      const sheets = await readExcelFile(file) as SpreadsheetSheet[];
      const imported = sheets.flatMap(parseSheet);
      if (!imported.length) {
        throw new Error("I couldn't find a problem table. Include columns for Rating, Problem, and Problem ID.");
      }

      const importedProblems = imported.map((row) => row.problem);
      const uniqueImported = mergeProblems([], importedProblems);
      const existingKeys = new Set(problems.map((problem) => problem.key));
      const newCount = uniqueImported.filter((problem) => !existingKeys.has(problem.key)).length;
      setProblems((current) => mergeProblems(current, uniqueImported));
      setCompletions((current) => {
        const next = { ...current };
        for (const row of imported) {
          if (!next[row.problem.key] && row.completion) next[row.problem.key] = row.completion;
        }
        return next;
      });
      const countsByRating = Array.from(new Set(uniqueImported.map((problem) => problem.rating)))
        .sort((a, b) => a - b)
        .map((rating) => `${rating}: ${uniqueImported.filter((problem) => problem.rating === rating).length}`)
        .join(" · ");
      setMessage(`${newCount} new problems added from ${file.name}; ${uniqueImported.length - newCount} already in the roadmap${countsByRating ? ` (${countsByRating})` : ""}. Your saved progress was kept.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "That workbook couldn't be read. Please try an .xlsx file.");
    } finally {
      setImporting(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  function toggleProblem(problem: CodingProblem, checked: boolean) {
    setCompletions((current) => {
      const next = { ...current };
      if (checked) next[problem.key] = { date: localDateKey() };
      else delete next[problem.key];
      return next;
    });
  }

  function toggleReview(problem: CodingProblem) {
    setReviews((current) => ({ ...current, [problem.key]: !current[problem.key] }));
  }

  const selectedSolved = ratingProblems.filter((problem) => Boolean(completions[problem.key])).length;

  return <section className="coding-progress" aria-labelledby="coding-progress-title">
    <div className="coding-progress-heading">
      <div>
        <p className="eyebrow">Codeforces practice</p>
        <h2 id="coding-progress-title">Problem roadmap</h2>
      </div>
      <label className="roadmap-upload">
        <input
          ref={fileInput}
          type="file"
          accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={(event) => void importWorkbook(event.currentTarget.files?.[0])}
          disabled={importing}
        />
        <span>{importing ? "Reading workbook…" : "Import another roadmap"}</span>
      </label>
    </div>

    <p className="tracker-private-note">The 800–2400 roadmap is preloaded. Check a problem to save today’s date; progress stays in this browser.</p>

    <div className="coding-progress-summary" aria-label="Coding progress summary">
      <article><span>Total problems</span><strong>{problems.length}</strong></article>
      <article><span>Solved</span><strong>{solvedCount}</strong></article>
      <article><span>Remaining</span><strong>{remainingCount}</strong></article>
      <article><span>Marked for review</span><strong>{reviewCount}</strong></article>
      <article className="coding-week-card">
        <span>Last 7 days</span>
        <div className="coding-week-bars" aria-label={`${week.reduce((total, day) => total + day.count, 0)} problems solved in the last seven days`}>
          {week.map((day) => <div key={day.key} className="coding-week-day" title={`${day.count} solved · ${day.key}`}>
            <i><b style={{ height: `${day.count ? Math.max(14, day.count / weekMax * 100) : 4}%` }} /></i>
            <small>{day.label.slice(0, 1)}</small>
          </div>)}
        </div>
      </article>
    </div>

    <div className="coding-overall-progress">
      <div><span>Overall roadmap progress</span><strong>{overallPercent}%</strong></div>
      <span className="coding-overall-track"><i style={{ width: `${overallPercent}%` }} /></span>
      <small>{todayCount} solved today</small>
    </div>

    <div className="coding-problem-toolbar">
      <div>
        <p className="eyebrow">Problem list</p>
        <h3>{selectedSolved} of {ratingProblems.length} solved</h3>
      </div>
      <div className="coding-problem-filters">
        <label>
          <span className="sr-only">Filter by rating</span>
          <select value={selectedRating === "all" ? "all" : String(selectedRating)} onChange={(event) => setSelectedRating(event.currentTarget.value === "all" ? "all" : Number(event.currentTarget.value))}>
            <option value="all">All ratings</option>
            {ratings.map((rating) => <option key={rating} value={rating}>{rating} rated</option>)}
          </select>
        </label>
        <label>
          <span className="sr-only">Filter by algorithm or topic</span>
          <select value={selectedTag} onChange={(event) => setSelectedTag(event.currentTarget.value)}>
            <option value="all">All algorithms</option>
            <option value="unclassified">Unclassified</option>
            {topicOptions.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
          </select>
        </label>
        <label>
          <span className="sr-only">Filter by completion status</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.currentTarget.value)}>
            <option value="all">All progress</option>
            <option value="open">To solve</option>
            <option value="solved">Solved</option>
            <option value="review">Marked for review</option>
          </select>
        </label>
        <label className="coding-problem-search">
          <span className="sr-only">Search problems</span>
          <input value={search} onChange={(event) => setSearch(event.currentTarget.value)} placeholder="Search ID or problem" />
        </label>
      </div>
    </div>

    <div className="coding-problem-list">
      {filteredProblems.length ? filteredProblems.map((problem) => {
        const completion = completions[problem.key];
        return <article key={problem.key} className={`coding-problem-row${completion ? " is-complete" : ""}${reviews[problem.key] ? " needs-review" : ""}`}>
          <label className="coding-problem-check">
            <input type="checkbox" checked={Boolean(completion)} onChange={(event) => toggleProblem(problem, event.currentTarget.checked)} aria-label={`${completion ? "Unmark" : "Mark"} ${problem.id}, ${problem.name} ${completion ? "complete" : "solved"}`} />
          </label>
          <span className="coding-problem-id">{problem.id}</span>
          <div className="coding-problem-detail">
            {problem.url ? <a href={problem.url} target="_blank" rel="noreferrer">{problem.name}<span aria-hidden="true"> ↗</span></a> : <strong>{problem.name}</strong>}
            <div className="coding-problem-tags">
              <span className="coding-problem-rating">{problem.rating} rated</span>
              {problem.curation && problem.curation !== "Starter" && <span className="coding-curation-tag">{problem.curation}</span>}
              {problem.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
              {!problem.tags.length && <span>Unclassified</span>}
            </div>
          </div>
          <div className="coding-problem-actions">
            <span className="coding-problem-date">{completion ? completion.date ? `Solved ${dateLabel(completion.date)}` : "Already solved" : "Not solved"}</span>
            <button type="button" className={`coding-review-toggle${reviews[problem.key] ? " is-marked" : ""}`} onClick={() => toggleReview(problem)} aria-pressed={Boolean(reviews[problem.key])}>
              {reviews[problem.key] ? "In review" : "Mark for review"}
            </button>
          </div>
        </article>;
      }) : <p className="coding-problem-empty">No problems match this search.</p>}
    </div>

    {(message || error || storageError) && <p className={`coding-tracker-message${error || storageError ? " is-error" : ""}`} role={error || storageError ? "alert" : "status"}>
      {error || (storageError ? "The browser couldn't save this much progress. Export or keep a copy of your workbook." : message)}
    </p>}
    <p className="coding-tracker-footnote">Solved dates and review marks are saved in this browser. You can import another .xlsx without replacing this roadmap.</p>
    <PracticeHeatmap today={today} liveActivity={liveActivity} completions={completions} />
  </section>;
}
