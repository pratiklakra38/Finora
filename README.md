# Finora — Personal Finance Website

Finora is a personal finance and expense tracking website built with HTML, CSS and JavaScript. It includes Login, Signup, transactions, budgets, analytics, savings goals and Settings, with sample financial records in INR.

## Clone and run

Install **Git** and **Node.js 18 or newer**, then run:

```powershell
git clone https://github.com/pratiklakra38/Finora.git
cd Finora
node server.mjs
```

Open **http://127.0.0.1:4173/**. Keep the terminal running while using the website; press **Ctrl+C** to stop it.

**No dependency installation or build step is needed to run the website.** The server uses Node.js built-in modules, and the logo and Inter font are bundled locally.

For the existing development folder on this device:

```powershell
cd E:\Finora
node server.mjs
```

The folder path may be different on another computer. Run the command from the folder containing `server.mjs` and `index.html`. Opening `index.html` directly can prevent JavaScript modules from loading.

## Login and Signup

Use the following demo credentials:

- **Email:** `demo@finora.com`
- **Password:** `Finora@123`

Signup accepts a name, valid email, password of 8–128 characters and matching confirmation, then opens Overview. Use made-up registration details and a password you do not use elsewhere.

**Continue with Google** signs in a predefined `google.demo@finora.com` account. It is simulated: Google OAuth, Firebase and external authentication services are not connected.

The session is stored in `sessionStorage` and survives refresh in the same tab. **Settings → Logout** clears the session and returns to Login while keeping transactions, budgets, goals, preferences and registrations. Every demo account uses the same browser financial workspace.

Registration credentials are stored locally in plain text. This frontend demonstration is not a secure authentication system and has no real banking connection.

## Website pages

| Page | What you can do |
| --- | --- |
| Login / Signup | Sign in, register a local demo account or use the Google demo interaction |
| Overview | Review balance, monthly income, expenses, net savings, trends and recent records |
| Transactions | Add, edit or delete records; search descriptions/notes; filter and sort the list |
| Budgets | Edit category limits and review spending, remaining amounts and status |
| Analytics | Compare financial history, focus chart points and open exact data tables |
| Savings goals | Create/edit/remove goals, allocate or release savings and review progress |
| Settings | Save a profile, choose Light/Dark/System appearance, change feedback preferences, open the guide, reset the workspace or log out |

Use **Settings → Reset workspace** to restore the sample financial records and preferences after confirmation.

## Local data and calculations

Financial data is stored in this browser's `localStorage` under `finora-demo-v1`. Registrations use `finora-demo-accounts-v1`; the session uses `finora-demo-session-v1`. Each browser and origin, including its port, has a separate workspace. Clearing site data removes saved changes.

Amounts are stored as integer paise. Available balance is opening balance plus income minus expenses. Monthly net savings is monthly income minus monthly expenses. Goal allocations reserve existing funds without creating another expense; category budget limits repeat across months.

The initial reporting month is October 2026. October sample records cover 1–11 October; earlier months contain fictional summary records.

## Repository structure

```text
Finora/
├── index.html
├── server.mjs
├── package.json
├── README.md
├── .gitignore
├── assets/                 # Finora logo, Inter font and licence
├── css/
│   ├── styles.css          # Workspace styles and themes
│   └── auth.css            # Login and Signup styles
├── js/
│   ├── app.js              # Financial pages, dialogs and navigation
│   ├── auth.js             # Frontend demo authentication and session
│   └── domain.js           # Sample data, validation and calculations
└── tests/                  # Existing unit and browser checks
```

The website entry files live directly in the repository root. Design files, presentation assets, local QA output and migration backups are excluded from Git.

[Open the Finora Figma design](https://www.figma.com/design/aPa40i3bdTIzJMfYLbV2wI/Finora-Product-Design?node-id=3-3).

## Optional development checks

These checks are separate from running the website:

```powershell
npm test
```

The existing browser checks additionally require Playwright and a running website server:

```powershell
npm install --no-save playwright
npx playwright install chromium
node tests/demo-auth.cjs
node tests/browser-workflows.cjs
node tests/accessibility.cjs
```

To use an installed Google Chrome browser, set `$env:CHROME_PATH = "C:\Program Files\Google\Chrome\Application\chrome.exe"` first. Browser checks use isolated browser data; generated reports and screenshots are written under `test-results/`, which is ignored by Git.

## Troubleshooting

- **`node` is not recognized:** install Node.js and reopen the terminal.
- **`server.mjs` cannot be found:** change into the root `Finora` folder first.
- **Port 4173 is occupied:** stop the earlier server, or run `$env:PORT = "4174"` before `node server.mjs` and open http://127.0.0.1:4174/.
- **You want fresh sample records:** use **Settings → Reset workspace**.

Inter is distributed under the [SIL Open Font License](assets/Inter-LICENSE.txt). The Finora logo and interface are original project assets.
