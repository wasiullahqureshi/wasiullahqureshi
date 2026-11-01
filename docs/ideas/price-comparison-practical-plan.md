# Practical plan: Household Price Comparison App

_Noted 2026-11-01. Builds on [price-comparison-android-app.md](price-comparison-android-app.md). Status: planning._

> **Revision (owner decision): global from day one, receipts captured by camera.**
> This supersedes the "local market" and "manual entry first" assumptions below. See section 8.

## 1. Market check (what already exists)
Research was a quick web search, not a full market study. Verify each app yourself before deciding.

| Type | Examples | What they do | Gap vs. your idea |
|------|----------|--------------|-------------------|
| Flyer / deal aggregators | Flipp | Weekly store ads and coupons in one place | Shows advertised prices, not what *you* actually paid; US/Canada focus |
| Crowdsourced list pricing | Basket | Build a list, see which nearby store is cheapest | Mostly US chains; needs a big user base to be accurate |
| Receipt-scan price books (closest to your idea) | Price Book, GrocSnap, Aisle, GroceryGlow | Scan receipt, keep price history per item/store, trends, some budget | Mostly new, iPhone-first, freemium (alerts/history behind paywall), little local-store/language support |
| Online-shop comparison (Pakistan) | LowPrice.pk, PriceOye, Sasta Tareen (grocery) | Compare online store prices | Online listings only; not your paper bills, medicines, or neighbourhood shops |
| Cashback | Savyour, Receipt Hog | Rewards for purchases/receipts | Not price comparison |

**Takeaway:** "Scan receipts, track prices, compare stores" is *not* a new idea; several apps do it. Competing on the generic feature set is hard.

## 2. Where this idea can still win (differentiators)
1. **Your actual paper bills, in your local market**: shops and receipt formats (mixed Urdu/English, faded thermal print) that global apps ignore.
2. **Medicines as a first-class category**: recurring monthly purchases, same brand/strength/pack size, large price differences between pharmacies.
3. **"Switch savings" number**: not just a price list, but "buy your usual 15 items at XYZ instead of ABC and save Rs X this month".
4. **Android-first, offline-first, private**: data stays on the phone, no ads, no account.
5. **Light budget/savings add-ons built on the same data** (not generic finance features).

## 3. Honest risks
- **Needs repeat purchases at 2+ stores.** The comparison only works for items you actually bought in more than one place. Early on there will be little to compare.
- **Receipt OCR on local bills may be unreliable.** Product names are abbreviated and inconsistent.
- **Product matching is the hardest part** (same item, different name or pack size). Needs user confirmation at first.
- **Savings may be small** for many households; the app must show a clear monthly benefit or people stop logging.
- **Budget/retirement features are crowded.** Keep them minimal; don't build a banking app.
- Retail loyalty-program or price-data deals are out of reach early; plan on your own users' data only.

## 4. Practical MVP (v1, build in ~4–6 weeks part-time)
Goal: prove one thing: *"I can see which shop is cheaper for the things I buy every month."*
- Track only a **"My Basket" of recurring items** (about 20–50: groceries + medicines), not every line on every bill.
- Add a purchase fast: **photo of receipt for reference + manual entry assisted by autocomplete** (store, item, qty, total price → app computes unit price). OCR suggestions come in v1.5.
- **Per-item view**: price history chart and cheapest store.
- **Monthly summary**: items that got more expensive, and "switch savings" estimate.
- Android, Kotlin + Jetpack Compose, Room (local DB), export CSV backup.

### Roadmap
| Phase | Scope |
|-------|-------|
| 0. Validate (1–2 wks, no code) | Log 1 month of own receipts in a spreadsheet; check whether real savings show up. Show 5–10 families a mock-up. |
| 1. MVP | As above. |
| 1.5 | On-device OCR (ML Kit) to prefill items; barcode scan for packaged goods and medicines. |
| 2. Add-ons | Monthly category budget, overspend alert, savings goal, shopping list that suggests cheapest store. |
| 3. Optional | Cloud backup/sync, family sharing, crowd-sourced anonymous prices (needs backend + moderation). |
| Later | Retirement/long-term savings projections, bill reminders. |

## 5. Money (if it becomes a product)
Free core. Paid tier: unlimited history, price-rise alerts, family sharing, export. No ads or selling personal data; that is itself a selling point.

## 6. Success measures for v1
- 30 days of logging by the first 5–10 testers
- Each tester sees at least one concrete "buy X at Y, save Z" suggestion
- Time to add a bill under 2 minutes

## 7. Decisions needed from the owner
1. Country/city and first 3–5 store chains and pharmacies to support.
2. Receipt language(s) and whether most bills are thermal print.
3. Build for yourself/family first, or as a public product?
4. Okay to start with manual entry and add OCR later?

## 8. Revised scope: global + camera-first

### What changes
- **Camera scan is the core feature**, not a later add-on. Low effort per bill is the whole product.
- **Global means** any country, currency, language, receipt layout, tax format and store chain.
- Local-market differentiation (section 2, point 1) becomes: *works on any receipt anywhere*.

### Receipt pipeline
1. Camera capture with edge detection, auto-crop, de-skew, and a "retake" hint for blur or glare (faded thermal paper is common).
2. **Extraction to structured data**: store name, date, currency, line items (name, qty, unit/pack size, price), tax, total.
3. **Validation**: line items must add up to the total; if not, flag for the user to fix instead of saving silently.
4. **Review screen**: user confirms or corrects items (fast, one tap per line). Corrections feed the product-matching memory.
5. Save locally, keep the receipt image on the device.

### OCR approach for a global app
- On-device OCR (Google ML Kit) is free and private, but its text recognition covers only some scripts (Latin, Chinese, Devanagari, Japanese, Korean; check the current docs, I don't believe Arabic/Urdu is supported). That leaves out many large markets.
- A **cloud vision model** reads any language and layout and returns structured JSON directly, but costs money per receipt and sends images off-device.
- **Recommended hybrid:** on-device for capture/crop quality checks and (where supported) quick extraction; cloud vision model as the main extractor or fallback. Make cloud use explicit in the privacy policy and let users opt out (manual entry stays available).
- Per-receipt cloud cost must be measured on real receipts before pricing the product. Don't assume a number.

### Product matching worldwide
- Receipt text is abbreviated and in many languages ("PANADOL TAB 20", "بنادول ٢٠").
- Use **barcode/GTIN** whenever the receipt or a quick scan provides it (global standard), plus a cross-language embedding or LLM match to propose "same product as ..." with user confirmation.
- Normalise **unit price** (per kg / litre / 100 g / tablet) and **convert currencies** only for display; compare within one currency unless the user shops across borders.

### Data and privacy (global)
- Receipts can reveal health purchases (medicines) and location. Default to **on-device storage**; cloud backup opt-in.
- GDPR (EU/UK) and similar laws: consent, export and delete-my-data are required once any server is involved.
- **Crowd-sourced prices** become more valuable globally (no local data needed) but need a backend, anonymisation, and abuse moderation. Keep for phase 3; v1 compares only the user's own receipts.

### Revised MVP
- Camera scan → review → save, for any language the extractor supports.
- Per-item price history and "cheapest store" from the user's own receipts.
- Monthly summary: price increases and switch-savings estimate.
- Multi-currency and locale-aware formatting from the start (store the currency on every receipt).
- Android, Kotlin + Jetpack Compose, Room, CameraX; cloud extraction service behind a thin backend (keeps API keys off the phone).

### Revised roadmap
| Phase | Scope |
|-------|-------|
| 0. Prototype extraction (1–2 wks) | Collect ~50 real receipts from several countries/languages. Run them through candidate extractors. Measure accuracy and cost per receipt. This decides feasibility. |
| 1. MVP | Revised MVP above. Closed test with 10–20 users in 2–3 countries. |
| 2. Add-ons | Budgets, savings goals, price-rise alerts, shopping list with cheapest store. |
| 3. Network effects | Opt-in anonymous price sharing, so users can see prices at stores they haven't bought from yet. |
| Later | Retirement projections, bill reminders, family sharing. |

### Key risks added by this scope
- **Extraction accuracy and cost** across languages is now the make-or-break issue. Phase 0 exists to test it.
- **App store, tax and privacy compliance** differ by country.
- Without crowd-sourced data, a global app still only helps users who shop at 2+ stores; network effects (phase 3) are what make it scale.

### Open questions
1. Cloud extraction acceptable (needs a backend and has per-receipt cost), or strictly on-device?
2. Free with limits (e.g. N scans/month) or paid from the start, to cover extraction cost?
3. Which 3–4 countries/languages to test first in Phase 0?

## 9. Decision: this is a public product
_Owner confirmed 2026-11-01. It is not a personal or family tool._

### What this requires beyond the MVP
- **Backend from day one**: user accounts (or anonymous IDs), the receipt-extraction proxy (keeps API keys off the phone), rate limiting, and abuse protection. Plan for a managed stack (e.g. serverless + managed DB) rather than running servers.
- **Cost control**: every cloud scan costs money. Needs per-user scan limits, caching, image compression, and cost monitoring before launch. Measure real cost per receipt in Phase 0.
- **Business model** (decide before launch): free tier with a monthly scan limit; paid tier for unlimited scans, price-rise alerts, family sharing, export. No ads and no selling personal data.
- **Legal and compliance**: privacy policy and terms; GDPR/UK GDPR consent, data export and deletion; Google Play Data Safety form; children's-data and health-data (medicine purchases) handling; regional rules where launched.
- **Play Store readiness**: Play Console account, store listing, screenshots, content rating, closed testing track (new personal developer accounts must run a closed test with a minimum number of testers before production; check current Play policy), crash reporting and analytics (privacy-respecting).
- **Support and trust**: in-app feedback, a way to report wrong extractions, clear message that savings suggestions are estimates.
- **Localization**: translated UI for launch markets; locale-aware dates, numbers and currencies.

### Public-launch roadmap (replaces the personal-use framing)
| Phase | Goal |
|-------|------|
| 0. Feasibility | 50+ real receipts, several countries and languages; measure extraction accuracy and cost per scan. Go/no-go. |
| 1. Private alpha | Working scan, review, price history. 10-20 testers in 2-3 countries. |
| 2. Closed beta on Play | Billing, scan limits, privacy and consent flows, backend hardening. Aim for a few hundred users. |
| 3. Public launch | One or two launch markets first, not worldwide at once; localize UI and tune matching for those. |
| 4. Network effects | Opt-in anonymous crowd-sourced prices, to make comparison work even for stores a user hasn't visited. |
| 5. Add-ons | Budgets, savings goals, shopping list with cheapest store, then long-term savings projections. |

### Risks specific to a public product
- **Cold-start**: value is low until a user has logged receipts from 2+ stores. Needs onboarding that shows value on the first scan (e.g. unit-price insight, price-rise note on a repeated item).
- **Competition**: Price Book, GrocSnap, Aisle and others already exist. Position on accuracy of scanning in many languages, medicines, and a clear monthly savings number.
- **Unit economics**: if cost per scan exceeds what the free/paid tiers earn, the product loses money. Validate in Phase 0 and 1.
- **Data quality** once prices are crowd-sourced: wrong or malicious entries need validation and moderation.

### Next concrete step
Run Phase 0: gather receipts, test extractors, and record accuracy and cost in `docs/ideas/` so the go/no-go is based on data.

## 10. Scope: which purchases are covered
_Owner confirmed 2026-11-01._

The app covers **groceries, medicines, and any routine or monthly repeated purchase** (for example household supplies, toiletries, baby items, pet food, cooking gas, school supplies, recurring pharmacy refills).

### What this means for the design
- **Category is a tag, not a separate mode.** One receipt scanner and one price history serve all categories. Suggested starting categories: Groceries, Medicines, Household, Personal care, Other. Users can add their own.
- **"Repeat purchase" is the core concept.** The app detects items bought more than once (by product match) and promotes them to the user's **My Basket**. Comparison, price-rise alerts and savings estimates focus on Basket items, since those are what a switch actually saves money on.
- **Purchase rhythm**: record how often each item is bought (weekly, monthly), so the app can estimate monthly spend per item and the real value of switching stores.
- **Medicines need extra care**: match on active ingredient, strength and pack size (not brand alone); show generic vs brand price when the user chooses to; never give medical advice or suggest changing a prescribed medicine. Show a disclaimer. Treat these records as sensitive health data in privacy design.
- **One-off purchases** (appliances, clothes) are stored from the receipt but excluded from comparison and alerts by default, to keep suggestions relevant.
- **Non-store repeat bills** (utilities, subscriptions) are out of scope for v1; revisit as a later add-on with bill reminders.

### Effect on the MVP
- The review screen asks for or auto-suggests a category per item, and offers "add to My Basket" on items seen more than once.
- The monthly report is grouped by category: spend, price increases, and switch savings per category.
