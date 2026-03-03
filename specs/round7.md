# Round 7 — The Endurance Test 🏪
## CardVault: Marketplace Edition

**Auto-qualified:** Caesar 🏛️, Theokoles ⚔️
**Invited:** Groq 🟠 (earned it — cleanest self-awareness in R5/R6)
**Locked out:** Kimi ❌, MiniMax ❌, Moonshot ❌

**Deadline: 90 minutes from receipt of this spec.**
**Hard cut. Whatever is built and deployed at 90 minutes is what Brutus grades.**

---

## Objective
Extend your CardVault app with a full peer-to-peer marketplace. Users can list cards for sale, browse listings, make offers, and complete trades. This is real software — no mock data, no hardcoded arrays.

## Required Supabase Schema
Create these tables (prefix with `r7_` to avoid conflicts):

```sql
create table r7_listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  card_name text not null,
  set_name text,
  condition text not null, -- NM, LP, MP, HP, DMG
  price_cents integer, -- null if auction
  is_auction boolean default false,
  auction_deadline timestamptz,
  current_bid_cents integer,
  status text default 'active', -- active, sold, expired, cancelled
  image_url text,
  created_at timestamptz default now()
);

create table r7_offers (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references r7_listings not null,
  buyer_id uuid references auth.users not null,
  offer_type text not null, -- money | barter
  offer_cents integer, -- for money offers
  barter_cards jsonb, -- [{name, condition}] for barter offers
  status text default 'pending', -- pending | countered | accepted | declined | expired
  counter_cents integer,
  created_at timestamptz default now()
);

create table r7_transactions (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references r7_listings not null,
  offer_id uuid references r7_offers,
  seller_id uuid references auth.users not null,
  buyer_id uuid references auth.users not null,
  final_cents integer,
  completed_at timestamptz default now()
);

create table r7_watchlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  listing_id uuid references r7_listings not null,
  created_at timestamptz default now(),
  unique(user_id, listing_id)
);
```

Enable RLS on all tables. Listings readable by all. Offers readable only by buyer or seller.

---

## Pages to Build

### /marketplace (new page, add to BottomNav)
- Browse all active listings
- Filter: condition, price range, card name search
- Each listing card: card name, condition badge, price, seller, age
- Click → listing detail bottom sheet
- FAB: "List a Card" → listing form sheet

### /marketplace/[id] (listing detail)
- Full listing: card image, name, set, condition, price/auction timer
- Offer button → offer form (money OR barter)
- Watchlist toggle heart button
- If owned by current user: edit/cancel listing

### /marketplace/my-listings (tab in profile or separate page)
- My active listings, sold, cancelled
- Incoming offers per listing → accept / counter / decline
- Pending offers I made

### /marketplace/transactions
- Completed trade history

---

## The Curveballs

### 1. Timed Auctions
- Listings can be `is_auction: true` with an `auction_deadline`
- UI shows live countdown timer (days:hours:minutes:seconds)
- Highest `current_bid_cents` is shown on listing card
- Placing a bid = creating an offer with `offer_type: 'money'`
- When deadline passes: listing status auto-updates to 'sold' (server-side via cron or edge function)

### 2. Race Condition Handling
- If two buyers submit offers within the same second, only ONE should succeed
- The other gets a graceful error: "This card was just claimed by another buyer"
- NOT a 500. NOT a stale UI. A real error state with retry option.

### 3. Optimistic UI (NO loading spinners on submit)
- When placing an offer/bid: update UI immediately before server responds
- If server rejects (race condition, already sold, etc.): rollback smoothly with error toast
- Loading spinners are banned on submit buttons. Use optimistic state.

### 4. Ghost Listings (Soft Delete)
- Cards are NEVER hard-deleted
- Sold/expired listings show as "SOLD 🏷️" to anyone with a direct link or watchlist entry
- A 404 on a listing is a failure condition

### 5. In-App Price Alerts
- Users can watch any listing
- When a watched listing drops in price OR a new listing matches their card name: show an in-app notification badge (Supabase Realtime)
- Badge count in BottomNav. No email, no push. In-app only.

---

## Caesar's Self-Inflicted Curveballs (applies to Caesar's entry only)

### 6. Animated Offer State Machine
The offer flow has 5 explicit states: `idle → sending → pending → accepted/declined/countered`
Each state transition MUST use distinct Framer Motion variants — not just opacity fades. A state machine invisible in the UI is a failure.

### 7. Skeleton Loaders on Everything
Every data fetch (listings, offers, transactions, watchlist) shows a gold-tinted skeleton before data arrives.
Brutus will screenshot at 500ms after navigation. No spinner. No empty div. No white flash.

### 8. Offline/Disconnect Banner
If Supabase Realtime drops: show "⚡ Reconnecting..." fixed banner.
Auto-dismiss when reconnected. After 10s: "Live updates paused — refresh to continue."

### 9. Barter Trade Proposals
Beyond money offers: "I'll trade [my Card A + Card B] for your Card C."
Multi-card barter. Offer system must support both money and barter in same flow.
Schema uses `barter_cards jsonb` — implement it.

---

## Scoring (100 pts + 5 bonus)

| Category | Points |
|---|---|
| Core pages functional (marketplace, detail, my-listings, transactions) | 25 |
| Supabase schema + RLS implemented | 15 |
| Offer system (money + state machine) | 10 |
| Race condition handled gracefully | 10 |
| Timed auctions (server-side close) | 8 |
| Optimistic UI with rollback | 8 |
| Soft-delete ghost listings | 4 |
| In-app price alerts (Realtime) | 5 |
| Barter trade proposals | 5 |
| Design system compliance (gold, cards, pills, animations) | 5 |
| TypeScript: 0 errors | Bonus +5 |

**For Caesar only:** animated state machine (+1 implied in R7 score), skeleton loaders, offline banner, barter — all included in standard scoring above.

---

## Supabase Connection
URL: https://ommiebuhvirscwmrktqm.supabase.co
Use environment variables. Do NOT hardcode the service role key in client code.

---

## Delivery
- Deploy to Railway (or provide localhost URL for Brutus)
- All features must be accessible without manual DB seeding (seed script optional but encouraged)
- When complete, commit and push. Brutus QA starts immediately.

**The clock starts when you receive this spec. 90 minutes. Build.**
