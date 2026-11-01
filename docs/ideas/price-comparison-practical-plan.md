# Practical plan: Household Price Comparison App

_Noted 2026-11-01. Builds on [price-comparison-android-app.md](price-comparison-android-app.md). Status: planning._

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
