# Idea: Household Price Comparison App (Android)

_Noted 2026-11-01. Status: idea, not started._

## Problem
We pay many bills every month: supermarket receipts, monthly medicines, household items. Often the same product is bought from different shops, and prices creep up unnoticed. Receipts are mostly paper and get lost.

## Core idea
Record what we buy and where. The app compares prices of the **same product across stores** and tracks **price increases over time**. Each month it suggests, e.g. *"XYZ Mart sells product P cheaper than ABC Mart, where you usually buy it. Switching saves about X."*

## MVP (price comparison first)
1. **Capture a bill**: photograph the paper receipt (OCR) or enter items manually.
2. **Normalise items**: match "Panadol 500mg 20s" and "PANADOL TAB 20" to one product (name + size/unit, barcode if scanned).
3. **Store price history**: store, product, unit price, date.
4. **Compare**: cheapest store per product; price-per-unit comparison for different pack sizes.
5. **Price-increase alerts**: flag products whose price rose versus earlier purchases.
6. **Monthly report**: "where to buy what" suggestions and estimated savings.

## Add-ons (later)
- Monthly **budget** per category, with overspend warnings
- **Savings** suggestions and goals
- **Retirement** planning / simple projections
- Recurring bill reminders (utilities, medicines)
- Shopping list that suggests the cheapest store for each item
- Export to CSV/PDF

## Technical notes (to decide)
- Android: Kotlin + Jetpack Compose, Room (local SQLite) for offline-first storage.
- Receipt OCR: ML Kit Text Recognition (on-device, free).
- Product matching: start with fuzzy matching + user confirmation; barcode scanning with ML Kit.
- Privacy: keep data on the device by default; optional backup/sync later.
- Cross-user crowd-sourced prices are a possible later phase; this needs a backend.

## Open questions
- Which country/currency and which store chains first?
- Is manual entry acceptable for v1 if OCR is unreliable on local receipts?
- Should this live in this repo or in a new one?
