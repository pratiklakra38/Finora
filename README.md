# Finora — Personal Finance Website

Finora is a local personal finance and expense tracking website built with **HTML, CSS and JavaScript**. It includes transactions, monthly budgets, analytics, savings goals and appearance preferences, with fictional INR data for demonstrations.

## Clone and run

Install **Git** and **Node.js 18 or newer**, then run:

```powershell
git clone https://github.com/pratiklakra38/Finora.git
cd Finora/HCI_CA3_Finora_Group/02_HTML_CSS_Code
node server.mjs
```

Open **http://127.0.0.1:4173/** in your browser. Keep the terminal running during the demonstration. Press **Ctrl+C** to stop it.

**No dependency installation, build step or login is required.** The local server uses Node.js built-in modules; the logo and Inter font are bundled.

### If you have already cloned the repository

Open a terminal in your clone's `HCI_CA3_Finora_Group/02_HTML_CSS_Code` folder:

```powershell
node server.mjs
```

Your absolute folder path depends on where you saved the project. On the original development device, the existing website is located here:

```powershell
cd E:\Finora\HCI_CA3_Finora_Group\02_HTML_CSS_Code
node server.mjs
```

Use the browser address above rather than opening `index.html` directly.

## What you can demonstrate

| Page | Features |
| --- | --- |
| Overview | Available balance, monthly income/expenses, net savings, trends and recent records |
| Transactions | Add/edit/delete, description and notes search, filters, sorting and totals |
| Budgets | Category limits, spending, remaining amounts and near/over-budget status |
| Analytics | History selection, chart legends and exact numerical data tables |
| Savings goals | Create/edit/delete goals, allocate/release savings and view progress |
| Settings | Demo profile, Light/Dark/System theme, feedback preferences and confirmed reset |

For a short walkthrough, add a fictional transaction, review the changed totals, edit a budget and allocate savings to a goal. Use **Settings → Reset demo data** when you want a fresh demonstration.

## Local data

The website saves changes in the current browser's `localStorage`. Each browser and port has its own workspace. Data stays available after restarting the server unless you reset the demo or clear site data. All records are fictional; the app uses INR and has no real banking or cloud connection.

The sample reporting month is October 2026. October records cover 1–11 October, and earlier months use fictional summary records.

## Repository structure

```text
Finora/
├── README.md
├── .gitignore
└── HCI_CA3_Finora_Group/
    └── 02_HTML_CSS_Code/
        ├── index.html
        ├── package.json
        ├── server.mjs
        ├── README.md
        ├── assets/
        ├── css/
        ├── js/
        └── tests/domain.test.js
```

This repository contains the website source. [Website documentation](HCI_CA3_Finora_Group/02_HTML_CSS_Code/README.md) explains the files, calculations and optional domain checks.

## Troubleshooting

- **`node` is not recognized:** install Node.js and reopen your terminal.
- **`server.mjs` cannot be found:** change into `HCI_CA3_Finora_Group/02_HTML_CSS_Code` inside your clone first.
- **Port 4173 is occupied:** stop the previous server, or run `$env:PORT = "4174"` in PowerShell before `node server.mjs`, then open http://127.0.0.1:4174/.
- **You want the original sample records:** reset demo data from Settings.

Inter is distributed under the [SIL Open Font License](HCI_CA3_Finora_Group/02_HTML_CSS_Code/assets/Inter-LICENSE.txt).
