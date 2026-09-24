import type { Pattern, PatternGenerateContext, PatternDrawContext } from "./types";

interface LineNode {
  x: number;
  y: number;
}

interface Connection {
  a: LineNode;
  b: LineNode;
  // Seconds after the animation starts before this line begins drawing
  // itself in. Randomized per line so the whole network fills in
  // gradually, staggered, rather than every line appearing at once.
  growDelay: number;
  // How many seconds this line's own draw-in takes, once it starts.
  growDuration: number;
}

const AREA_PER_NODE = 12000;

// Two nodes only get connected by a line if they're within this many
// pixels of each other. Also, indirectly, why lines never visually cut
// through the content column even though only their individual node
// positions are checked against it (see generate() below): this distance
// is far smaller than the content column's width, so two nodes on
// opposite sides of the column could never be close enough to connect in
// the first place.
const MAX_CONNECTION_DISTANCE = 160;

// The real fix for over-saturated clusters: even if a node has many
// other nodes within MAX_CONNECTION_DISTANCE (which happens naturally
// wherever noise placement puts several nodes close together), it only
// ever connects to its closest few. Without this cap, a dense pocket of
// nodes would each connect to every other nearby node, and that pocket
// would turn into a visually cluttered hub with lines crossing through
// it from every direction. Lowering this number thins the network out
// further; raising it allows denser clusters again.
const MAX_CONNECTIONS_PER_NODE = 3;

const MAX_OPACITY = 0.3;

const GROWTH_DELAY_MAX = 3.5;
const GROWTH_DURATION_MIN = 0.5;
const GROWTH_DURATION_MAX = 2;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function generate({ width, height, noise2D }: PatternGenerateContext): Connection[] {
  const nodeCount = Math.floor((width * height) / AREA_PER_NODE);

  const nodes: LineNode[] = Array.from({ length: nodeCount }, (_, i) => {
    const nx = noise2D(i * 0.9, 100);
    const ny = noise2D(100, i * 0.9);
    return {
      x: ((nx + 1) / 2) * width,
      y: ((ny + 1) / 2) * height,
    };
  });

  const connections: Connection[] = [];
  // Tracks which pairs have already been connected, as "i-j" strings
  // (always with the smaller index first) - needed because both node i
  // and node j independently consider connecting to each other below,
  // and without this a pair could otherwise end up connected twice.
  const connectedPairs = new Set<string>();

  for (let i = 0; i < nodes.length; i++) {
    const candidates: { index: number; distance: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= MAX_CONNECTION_DISTANCE) {
        candidates.push({ index: j, distance });
      }
    }

    candidates.sort((a, b) => a.distance - b.distance);
    const closest = candidates.slice(0, MAX_CONNECTIONS_PER_NODE);

    for (const { index: j } of closest) {
      const pairKey = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (connectedPairs.has(pairKey)) continue;
      connectedPairs.add(pairKey);

      connections.push({
        a: nodes[i],
        b: nodes[j],
        growDelay: Math.random() * GROWTH_DELAY_MAX,
        growDuration:
          GROWTH_DURATION_MIN + Math.random() * (GROWTH_DURATION_MAX - GROWTH_DURATION_MIN),
      });
    }
  }

  return connections;
}

function draw(
  connections: Connection[],
  { ctx, time, color, reducedMotion }: PatternDrawContext
) {
  for (const connection of connections) {
    const growElapsed = time - connection.growDelay;
    const growRaw = reducedMotion
      ? 1
      : Math.min(Math.max(growElapsed / connection.growDuration, 0), 1);
    const scale = easeOutCubic(growRaw);

    if (scale <= 0) continue;

    // The "drawing itself" quality for a line specifically means the
    // line's endpoint travels from point a toward point b as scale
    // climbs from 0 to 1 - at scale 0 it's a zero-length line sitting at
    // a, at scale 1 it reaches all the way to b. Different from dots and
    // honeycomb, where growth scales a shape's size outward from its own
    // center - a line has two distinct ends instead, so "growing" means
    // extending toward the far one instead.
    const currentEndX = connection.a.x + (connection.b.x - connection.a.x) * scale;
    const currentEndY = connection.a.y + (connection.b.y - connection.a.y) * scale;

    ctx.beginPath();
    ctx.moveTo(connection.a.x, connection.a.y);
    ctx.lineTo(currentEndX, currentEndY);
    ctx.strokeStyle = `rgba(${color}, ${MAX_OPACITY * scale})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

export const linesPattern: Pattern<Connection[]> = { generate, draw };