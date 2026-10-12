# Finora website source

Finora is a personal finance and expense tracking website built with HTML, CSS and JavaScript ES modules. It runs locally with Node.js and uses fictional INR records for demonstrations.

## Start locally

Install **Node.js 18 or newer**. Open a terminal in this folder and run:

```powershell
node server.mjs
```

Open **http://127.0.0.1:4173/** in your browser. Keep the terminal open while presenting; press **Ctrl+C** to stop the server. No `npm install`, build step or account is needed to run the website.

From a fresh clone, the complete commands are:

```powershell
git clone https://github.com/pratiklakra38/Finora.git
cd Finora/HCI_CA3_Finora_Group/02_HTML_CSS_Code
node server.mjs
```

The `cd` path depends on where you clone the repository. On the original development device, the existing website can be started with:

```powershell
cd E:\Finora\HCI_CA3_Finora_Group\02_HTML_CSS_Code
node server.mjs
```

Use the HTTP address above instead of opening `index.html` directly, because the app uses JavaScript modules.

### Another port

If port 4173 is occupied, stop the earlier server or choose a different port in PowerShell:

```powershell
$env:PORT = "4174"
node server.mjs
```

Then open http://127.0.0.1:4174/. The server listens on your own computer at `127.0.0.1`.

## Website features

- **Overview:** select a reporting month and review balance, income, expenses, spending trends, recent transactions and savings.
- **Transactions:** add, edit or delete records; search descriptions and notes; filter by type, category and date; sort results and clear filters.
- **Budgets:** edit category limits and see spending, remaining amounts, utilization and warnings.
- **Analytics:** choose 3, 6 or 12 months and open exact chart data tables.
- **Savings goals:** create and edit goals, allocate or release savings, view progress and delete with confirmation.
- **Settings:** edit the demo profile, choose Light/Dark/System appearance, configure in-app feedback and reset demo data with confirmation.
- **Getting started:** use the sidebar guide for a walkthrough. Keyboard focus and Escape are supported for dialogs and navigation.

## Data and calculations

Changes are stored in this browser's `localStorage` under `finora-demo-v1`. Data belongs to the current browser and address, including the port. Clearing site data removes saved changes. Use **Settings → Reset demo data** to restore the demonstration records.

All amounts use integer paise. Available balance equals opening balance plus all income minus all expenses. Monthly net savings equals income minus expenses for the selected month. Goal allocations reserve money without creating another expense. Category limits repeat each month.

The demonstration opens in October 2026. October records cover 1–11 October; May–September use fictional monthly summary records. This is a local demonstration without real banking, payments, cloud storage or authentication.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | HTML shell, skip link, live status and dialog |
| `css/styles.css` | Website layout, themes, responsive rules and focus styling |
| `js/domain.js` | Seed data, validation and money calculations |
| `js/app.js` | Pages, charts, forms, navigation and browser storage |
| `server.mjs` | Local static HTTP server using Node.js built-in modules |
| `package.json` | JavaScript module configuration and optional scripts |
| `assets/finora.svg` | Finora logo |
| `assets/Inter.ttf` | Bundled Inter font for offline use |
| `assets/Inter-LICENSE.txt` | SIL Open Font License for Inter |
| `tests/domain.test.js` | Existing optional domain checks |

## Optional domain checks

These are separate from starting the website:

```powershell
node --test tests/domain.test.js
```

The normal demonstration uses only `node server.mjs`. All runtime assets are included in this repository.
