import type { ReactNode } from "react";

export function ProjectCaseStudy({ status, problem, approach, result, next, planned = false }: {
  status: string; problem: ReactNode; approach: ReactNode; result: ReactNode; next: ReactNode; planned?: boolean;
}) {
  return <section className="case-study" aria-label="Project case study">
    <header className="case-study-heading"><h2>Project notes</h2><span className="status">{status}</span></header>
    <dl className="case-study-rows">
      <div><dt>The problem</dt><dd>{problem}</dd></div>
      <div><dt>{planned ? "My approach" : "What I built"}</dt><dd>{approach}</dd></div>
      <div className="case-study-result"><dt>What I can show</dt><dd>{result}</dd></div>
      <div><dt>What’s next</dt><dd>{next}</dd></div>
    </dl>
  </section>;
}
