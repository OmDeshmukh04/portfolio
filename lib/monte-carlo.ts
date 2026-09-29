function random(seed: number) { let a=seed; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t=Math.imul(a ^ a>>>15,1|a); t=t+Math.imul(t ^ t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
export function runSimulation(volatility: number, days: number, seed: number) {
  const rng=random(seed), dt=days/365/64, sigma=volatility/100, paths:number[][]=[], terminals:number[]=[];
  for(let i=0;i<2000;i++){ let value=100; const path=[value]; for(let j=0;j<64;j++){ const z=Math.sqrt(-2*Math.log(Math.max(rng(),1e-12)))*Math.cos(2*Math.PI*rng()); value*=Math.exp((.05-.5*sigma*sigma)*dt+sigma*Math.sqrt(dt)*z); path.push(value); } if(i<24) paths.push(path); terminals.push(value); }
  const losses=terminals.map(v=>100-v).sort((a,b)=>a-b), tail=losses.slice(1900);
  const mean=terminals.reduce((s,v)=>s+v,0)/terminals.length, low=Math.min(...terminals), high=Math.max(...terminals), step=(high-low)/18 || 1, bins=Array<number>(18).fill(0);
  terminals.forEach(v=>bins[Math.min(17,Math.floor((v-low)/step))]++);
  return {paths,mean,var95:losses[1899],es95:tail.reduce((s,v)=>s+v,0)/tail.length,bins,low,high};
}
