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
