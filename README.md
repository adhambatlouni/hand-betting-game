# Bet the Hand — Mahjong Hi-Lo Betting Game

> A web-based Hi-Lo betting game built with Mahjong tiles. Read the hand, predict higher or lower, and survive as long as you can.

---

## Table of Contents

- [Getting Started](#getting-started)
- [How to Play](#how-to-play)
- [Game Mechanics](#game-mechanics)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Assets](#assets)
- [AI Usage](#ai-usage)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/adhambatlouni/hand-betting-game.git
cd hand-betting-game
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Play

1. Hit **Start Game** from the landing page
2. You are dealt 3 Mahjong tiles — note the combined hand total
3. Predict whether the **next** hand will be **Higher** or **Lower**
4. **Correct** → earn points equal to the next hand's total value
5. **Wrong** → no points, but the game continues
6. Keep going until a tile value hits 0 or 10, or the deck reshuffles 3 times

---

## Game Mechanics

### Tile Types

| Type                                 | Tiles | Starting Value          |
| ------------------------------------ | ----- | ----------------------- |
| Number — Characters, Bamboo, Circles | 108   | Face value (1–9), fixed |
| Dragon — Red, Green, White           | 12    | 5, dynamic              |
| Wind — East, West, North, South      | 16    | 5, dynamic              |

**Total deck: 136 tiles** — 4 copies of each tile, following standard Mahjong set composition.

### Dynamic Tile Values

Dragon and Wind tiles are not static. Every time one appears in a winning hand, its value increases by 1. Every time it appears in a losing hand, it decreases by 1. Each of the four copies of a tile tracks its own value independently using a unique id — so two Red Dragons in the same game can have completely different values depending on their history.

### Scoring

Points earned per round = the total value of the **next** hand at the moment it is revealed. Higher value hands reward more — this incentivises riskier predictions.

### Game Over Conditions

- Any Dragon or Wind tile reaches **0** (decayed) or **10** (overflowed)
- The draw pile runs out for the **3rd time**

### Reshuffling

When the draw pile runs out, a fresh 136-tile deck is combined with the existing discard pile and shuffled into a new draw pile. The game tracks how many reshuffles have occurred and ends on the third.

---

## Tech Stack

| Technology      | Version         | Purpose                                  |
| --------------- | --------------- | ---------------------------------------- |
| Next.js         | 16 (App Router) | Framework and routing                    |
| TypeScript      | 5               | Type safety across all layers            |
| Tailwind CSS    | v4              | Utility-first styling                    |
| Zustand         | latest          | Global state management                  |
| Zustand persist | —               | Leaderboard persistence via localStorage |
| Framer Motion   | latest          | Animations and page transitions          |
| Lucide React    | latest          | Icon system                              |

---

## Project Structure

```
app/
├── layout.tsx                  Global layout — fonts, background, body sizing
├── template.tsx                Page transition fade (re-mounts on every route)
├── page.tsx                    Landing page
├── game/
│   └── page.tsx                Game screen
├── game-over/
│   └── page.tsx                Score summary and save screen
└── leaderboard/
    └── page.tsx                Top 5 leaderboard

components/
├── Game/
│   ├── TopBar.tsx              Score display, draw/discard counts, reshuffle warning
│   ├── HandHistory.tsx         Previous round summary — tiles, bet, result
│   ├── CurrentHand.tsx         Active tiles, hand total, delta vs previous hand
│   └── BetControls.tsx         Higher / Lower bet buttons with pending state
├── Leaderboard/
│   ├── LeaderboardHeader.tsx   Navigation header
│   ├── LeaderboardEntries.tsx  Ranked score list with empty state
│   ├── LeaderboardActions.tsx  Home and Play Again buttons
│   └── RankIcon.tsx            Crown / Trophy / Medal rank icons
└── Tile/
    └── Tile.tsx                Reusable tile card — sm, md, lg sizes

lib/
├── config/                     UI display data — colors, sizes, messages
├── constants/
│   ├── game.constants.ts       Game rules — hand size, reshuffle limit, tile value bounds
│   └── tile.constants.ts       Deck builder, tile image paths, display names
├── engine/
│   ├── deckEngine.ts           Deck creation, tile drawing, reshuffling (Fisher-Yates)
│   ├── handEngine.ts           Hand building and comparison
│   ├── betEngine.ts            Bet resolution and point calculation
│   └── tileEngine.ts           Dynamic tile value updates, game over detection
├── store/
│   ├── gameStore.ts            All game state — Zustand
│   └── leaderboardStore.ts     Top 5 scores — Zustand + localStorage persist
└── types/
    ├── tile.types.ts
    ├── game.types.ts
    └── leaderboard.types.ts
```

---

## Architecture

The project is built in four distinct layers:

```
UI Layer          →  Components and pages — only reads store, calls store actions
Store Layer       →  Zustand stores — orchestrates engine calls, owns all state
Engine Layer      →  Pure functions — game logic with no React or state dependency
Foundation        →  Types, constants, and config — shared across all layers
```

**The engine layer is intentionally pure.** Every function takes inputs and returns outputs with no side effects. This means game logic is completely decoupled from the UI — changing how the game renders never risks breaking how it plays, and adding a new mechanic means writing one engine function and wiring it into the store.

**The store is the orchestrator.** `placeBet` in `gameStore.ts` is the clearest example: it draws tiles, compares hands, resolves the bet, applies tile value changes, syncs those changes back into the deck via `mergeTileUpdates`, and checks for game over — all by calling engine functions in sequence. The store coordinates; the engines compute.

**Components are thin.** `TopBar` reads two numbers from the store. `BetControls` calls one action. No component contains game logic. This makes the UI straightforward to change, extend, or replace without touching anything below it.

---

## Assets

Tile SVG images sourced from [FluffyStuff/riichi-mahjong-tiles](https://github.com/FluffyStuff/riichi-mahjong-tiles), released under the **CC0 1.0 Universal public domain license**.

---

## AI Usage

### Written and owned by me

- Full project architecture — layered separation of engine, store, and UI
- All game engine logic — `deckEngine`, `handEngine`, `betEngine`, `tileEngine`
- Zustand store structure and the complete game state flow
- Core game mechanics — dynamic tile value system, unique tile id tracking, reshuffle logic, scoring design
- TypeScript type definitions and interfaces
- Component structure and the data flow between components and the store
- All debugging — identified and fixed the reshuffle deck-doubling bug, the orphaned tile edge case when the draw pile has leftover tiles, and the draw pile progress bar calculation after reshuffle

### AI assisted with

- UI polish — Tailwind class refinements, spacing, and visual consistency across pages
- Framer Motion animation patterns and transition timing
- Code cleanup — extracting config objects out of components
- README and documentation writing

Every AI suggestion was reviewed, understood, and deliberately chosen before being used. Architecture decisions, logic design, and debugging were done by me throughout.

---

## Local Development Notes

- Leaderboard scores are stored in `localStorage` under the key `mahjong_leaderboard`
- To reset scores: **DevTools → Application → Local Storage → delete the key**, or run `localStorage.removeItem('mahjong_leaderboard')` in the console
