"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";

type Side = "buy" | "sell";
type Order = { id: number; side: Side; price: number; quantity: number; sequence: number };
type Trade = { id: number; price: number; quantity: number; aggressor: Side };

const seedOrders: Order[] = [
  { id: 1, side: "sell", price: 101.08, quantity: 310, sequence: 1 },
  { id: 2, side: "sell", price: 101.06, quantity: 520, sequence: 2 },
  { id: 3, side: "sell", price: 101.04, quantity: 180, sequence: 3 },
  { id: 4, side: "buy", price: 101.01, quantity: 460, sequence: 4 },
  { id: 5, side: "buy", price: 100.99, quantity: 290, sequence: 5 },
  { id: 6, side: "buy", price: 100.97, quantity: 650, sequence: 6 },
];

const simulatedFlow = [
  { side: "buy" as const, price: 101.04, quantity: 120 },
  { side: "sell" as const, price: 101.01, quantity: 210 },
  { side: "buy" as const, price: 101.07, quantity: 95 },
  { side: "sell" as const, price: 100.99, quantity: 170 },
];

function aggregate(orders: Order[], side: Side) {
  const levels = new Map<number, number>();
  orders.filter((order) => order.side === side).forEach((order) => levels.set(order.price, (levels.get(order.price) ?? 0) + order.quantity));
  return [...levels.entries()]
    .map(([price, quantity]) => ({ price, quantity }))
    .sort((a, b) => side === "buy" ? b.price - a.price : a.price - b.price)
    .slice(0, 5);
}

export function OrderBookDemo({ compact = false }: { compact?: boolean }) {
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [side, setSide] = useState<Side>("buy");
  const [price, setPrice] = useState("101.04");
  const [quantity, setQuantity] = useState("100");
  const [sequence, setSequence] = useState(7);
  const [message, setMessage] = useState("Book ready — submit a limit order.");

  const asks = useMemo(() => aggregate(orders, "sell"), [orders]);
  const bids = useMemo(() => aggregate(orders, "buy"), [orders]);
  const bestAsk = asks[0]?.price;
  const bestBid = bids[0]?.price;
  const spread = bestAsk !== undefined && bestBid !== undefined ? bestAsk - bestBid : undefined;

  function submit(nextSide = side, nextPrice = Number(price), nextQuantity = Number(quantity)) {
    if (!Number.isFinite(nextPrice) || !Number.isSafeInteger(nextQuantity) || nextPrice <= 0 || nextPrice > 100000000 || nextQuantity <= 0 || nextQuantity > 1000000000 || Math.abs(nextPrice * 100 - Math.round(nextPrice * 100)) > 1e-6) {
      setMessage("Use a positive price with at most two decimals and a whole-number quantity (maximum 1 billion).");
      return;
    }
    nextPrice = Math.round(nextPrice * 100) / 100;

    const working = orders.map((order) => ({ ...order }));
    const generatedTrades: Trade[] = [];
    let remaining = Math.floor(nextQuantity);
    const opposite: Side = nextSide === "buy" ? "sell" : "buy";
    const candidates = working
      .filter((order) => order.side === opposite)
      .sort((a, b) => {
        if (a.price !== b.price) return nextSide === "buy" ? a.price - b.price : b.price - a.price;
        return a.sequence - b.sequence;
      });

    for (const resting of candidates) {
      const crosses = nextSide === "buy" ? nextPrice >= resting.price : nextPrice <= resting.price;
      if (!crosses || remaining === 0) break;
      const fill = Math.min(remaining, resting.quantity);
      resting.quantity -= fill;
      remaining -= fill;
      generatedTrades.push({ id: sequence * 100000 + generatedTrades.length, price: resting.price, quantity: fill, aggressor: nextSide });
    }

    const matchedIds = new Map(candidates.map((order) => [order.id, order]));
    const nextOrders = working
      .map((order) => matchedIds.get(order.id) ?? order)
      .filter((order) => order.quantity > 0);

    if (remaining > 0) nextOrders.push({ id: sequence, side: nextSide, price: nextPrice, quantity: remaining, sequence });

    setOrders(nextOrders);
    setSequence((value) => value + 1);
    setTrades((current) => [...generatedTrades.reverse(), ...current].slice(0, 6));
    setMessage(generatedTrades.length ? `${generatedTrades.length} trade${generatedTrades.length > 1 ? "s" : ""} executed · ${remaining} resting` : `Order added · ${remaining} resting`);
  }

  function simulate() {
    const event = simulatedFlow[(sequence - 7) % simulatedFlow.length];
    setSide(event.side);
    setPrice(event.price.toFixed(2));
    setQuantity(String(event.quantity));
    submit(event.side, event.price, event.quantity);
  }

  function reset() {
    setOrders(seedOrders);
    setTrades([]);
    setSequence(7);
    setSide("buy");
    setPrice("101.04");
    setQuantity("100");
    setMessage("Book reset to the deterministic seed state.");
  }

  const maxQuantity = Math.max(1, ...asks.map((row) => row.quantity), ...bids.map((row) => row.quantity));

  return (
    <div className={`demo-shell ${compact ? "demo-compact" : ""}`}>
      <div className="demo-toolbar">
        <div>
          <span className="demo-kicker">LIVE BROWSER DEMO</span>
          <strong>Price-time matching</strong>
        </div>
        <div className="demo-actions">
          <button type="button" onClick={simulate}><Sparkles aria-hidden="true" /> Simulate event</button>
          <button type="button" className="icon-button" onClick={reset} aria-label="Reset order book"><RotateCcw aria-hidden="true" /></button>
        </div>
      </div>

      <div className="demo-grid">
        <div className="ticket-panel">
          <div className="side-toggle" aria-label="Order side">
            <button type="button" className={side === "buy" ? "active buy" : ""} onClick={() => setSide("buy")}>Buy</button>
            <button type="button" className={side === "sell" ? "active sell" : ""} onClick={() => setSide("sell")}>Sell</button>
          </div>
          <label>Limit price<input value={price} onChange={(event) => setPrice(event.target.value)} inputMode="decimal" /></label>
          <label>Quantity<input value={quantity} onChange={(event) => setQuantity(event.target.value)} inputMode="numeric" /></label>
          <button type="button" className={`submit-order ${side}`} onClick={() => submit()}>Submit {side} order</button>
          <p className="demo-message" aria-live="polite">{message}</p>
        </div>

        <div className="book-panel">
          <div className="book-head"><span>Side</span><span>Price</span><span>Quantity</span></div>
          <div className="book-levels asks">
            {[...asks].reverse().map((row) => <BookLevel key={`ask-${row.price}`} side="ask" {...row} max={maxQuantity} />)}
          </div>
          <div className="spread-line"><span>Spread</span><strong>{spread === undefined ? "—" : spread.toFixed(2)}</strong></div>
          <div className="book-levels bids">
            {bids.map((row) => <BookLevel key={`bid-${row.price}`} side="bid" {...row} max={maxQuantity} />)}
          </div>
        </div>

        {!compact && <div className="tape-panel">
          <div className="tape-title"><span>Trade tape</span><span>{trades.length ? "LIVE" : "WAITING"}</span></div>
          {trades.length ? trades.map((trade) => (
            <div className="trade-row" key={trade.id}><span className={trade.aggressor}>{trade.aggressor.toUpperCase()}</span><strong>{trade.price.toFixed(2)}</strong><em>{trade.quantity}</em></div>
          )) : <p className="empty-tape">Cross the spread or run a simulated event to create a trade.</p>}
        </div>}
      </div>
      <p className="demo-caption">Educational TypeScript model · price-time priority · prices in 0.01 ticks. The C++ baseline is available below; latency benchmarks are planned.</p>
    </div>
  );
}

function BookLevel({ side, price, quantity, max }: { side: "ask" | "bid"; price: number; quantity: number; max: number }) {
  return (
    <div className="live-book-row">
      <span className={`depth-fill ${side}`} style={{ width: `${Math.max(12, (quantity / max) * 100)}%` }} />
      <span className={side}>{side.toUpperCase()}</span><strong>{price.toFixed(2)}</strong><em>{quantity}</em>
    </div>
  );
}
