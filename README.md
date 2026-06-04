# Bet the Hand — Mahjong Hi-Lo Betting Game

A web-based Hi-Lo betting game built with Mahjong tiles. Predict whether the next hand will be higher or lower, survive the reshuffles, and climb the leaderboard.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/hand-betting-game.git
cd hand-betting-game
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Play

1. Start a session from the landing page
2. You're dealt 3 tiles — note the combined total
3. Bet **Higher** or **Lower** for the next hand
4. Correct → earn points equal to the next hand's value
5. Wrong → no points, game continues
6. Survive until a tile hits 0 or 10, or the deck runs out 3 times

### Tile Types

| Type                                 | Tiles | Value                               |
| ------------------------------------ | ----- | ----------------------------------- |
| Number (Characters, Bamboo, Circles) | 108   | Face value (1–9), never changes     |
| Dragon (Red, Green, White)           | 12    | Starts at 5, shifts with each round |
| Wind (East, West, North, South)      | 16    | Starts at 5, shifts with each round |

**Total deck: 136 tiles** — 4 copies of each tile, following standard Mahjong set composition.

### Dynamic Tile Values

Dragon and Wind tiles are alive. Win a round with one in your hand and its value goes up by 1. Lose and it drops by 1. Each copy tracks its own value independently — push any tile to 0 or 10 and the session ends.

### Game Over Conditions

- Any Dragon or Wind tile reaches **0** or **10**
- The draw pile runs out for the **3rd time**

### Reshuffling

When the draw pile runs out, a fresh 136-tile deck is added, combined with the discard pile, and reshuffled into a new draw pile. This can happen up to 3 times before the game ends.

---

## Tech Stack

| Technology              | Purpose                         |
| ----------------------- | ------------------------------- |
| Next.js 16 (App Router) | Framework                       |
| TypeScript              | Type safety                     |
| Tailwind CSS v4         | Styling                         |
| Zustand + persist       | State management + localStorage |
| Framer Motion           | Animations and page transitions |
| Lucide React            | Icons                           |

---

## Project Structure

```
app/
  layout.tsx              Global layout, fonts, background
  template.tsx            Page fade transitions
  page.tsx                Landing page
  game/page.tsx           Game screen
  game-over/page.tsx      Score summary screen
  leaderboard/page.tsx    Top 5 leaderboard

components/
  Game/
    TopBar.tsx            Score, draw/discard counts, reshuffle indicator
    HandHistory.tsx       Previous round result bar
    CurrentHand.tsx       Active tiles and hand total
    BetControls.tsx       Higher / Lower bet buttons
  Leaderboard/
    LeaderboardHeader.tsx
    LeaderboardEntries.tsx
    LeaderboardActions.tsx
    RankIcon.tsx
  Tile/
    Tile.tsx              Reusable tile component (sm / md / lg)

lib/
  config/                 UI display data — colors, sizes, labels
  constants/              Game rules — hand size, tile counts, value limits
  engine/
    deckEngine.ts         Deck creation, drawing, reshuffling
    handEngine.ts         Hand building and comparison
    betEngine.ts          Bet resolution and point calculation
    tileEngine.ts         Dynamic tile value updates
  store/
    gameStore.ts          All game state (Zustand)
    leaderboardStore.ts   Persistent scores (Zustand + localStorage)
  types/                  TypeScript interfaces
```

### Architecture

The engine layer is entirely pure — no React, no state, just functions that take inputs and return outputs. The store orchestrates the engines and owns the state. Components only read from the store and call store actions — they never touch game logic directly.

This separation means adding a new feature touches one layer at a time: write an engine function, wire it in the store, update the UI. Each layer stays independent.

---

## Assets

Tile SVG images sourced from [FluffyStuff/riichi-mahjong-tiles](https://github.com/FluffyStuff/riichi-mahjong-tiles) — released under the **CC0 public domain license**.

---

## AI Usage

### Written by me

- Full project architecture and folder structure
- All game engine logic (`deckEngine`, `handEngine`, `betEngine`, `tileEngine`)
- Zustand store design and the complete game state flow
- Game mechanics — dynamic tile value system, reshuffle logic, scoring rules
- TypeScript type definitions and interfaces
- Component structure and how components connect to the store
- All debugging — traced and fixed the reshuffle deck-doubling bug, the orphaned tile edge case, and the draw pile progress bar calculation

### AI assisted with

- UI polish — Tailwind refinements, spacing consistency, visual hierarchy
- Framer Motion animation patterns and transition timing
- Catching edge cases during code review (reshuffle logic, tile id uniqueness across deck generations)
- Code cleanup — extracting config from components, simplifying pure functions
- README writing

Every line of AI-suggested code was reviewed, understood, and intentionally chosen. All architectural and logic decisions were made by me.

---

## Local Development Notes

- Leaderboard scores persist in `localStorage` under the key `mahjong_leaderboard`
- To reset scores: DevTools → Application → Local Storage → delete the key
