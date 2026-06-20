# Task Manager — CI/CD Demo

A small real React app (add/check/delete/filter tasks) deployed through a real GitHub Actions pipeline to GitHub Pages.

## Pipeline

```
git push main
      │
      ▼
🧪 Test & Lint        (npm ci → eslint → 9 jest tests)
      │  (must pass)
      ▼
🚀 Build & Deploy      (npm run build → push /build to gh-pages branch)
      │
      ▼
🌐 Live on GitHub Pages
```

Two jobs, visible by name in the **Actions** tab: `Test & Lint` and `Build & Deploy`. The deploy job only runs if tests pass, and only on pushes to `main` (not on pull requests).

## Why your previous attempt showed the README instead of the app

GitHub Pages was pointed at the `main` branch, which only contains source code — not the built app. The pipeline builds the app and pushes the compiled output to a **separate branch called `gh-pages`**. Pages must point at `gh-pages`, not `main`. That branch does not exist until the pipeline has run successfully at least once.

## Setup

```bash
npm install
git init
git add .
git commit -m "feat: task manager app with CI/CD pipeline"
git branch -M main
git remote add origin https://github.com/chedi-khlifi/cicd-demo.git
git push -u origin main
```

Then:

1. Go to the **Actions** tab — watch `Test & Lint` then `Build & Deploy` run.
2. Once `Build & Deploy` finishes (green ✅), a `gh-pages` branch will exist.
3. Go to **Settings → Pages → Source** → switch to **Deploy from a branch** → select `gh-pages` / `(root)` → Save.
4. Visit `https://chedi-khlifi.github.io/cicd-demo`

Any future `git push` to `main` re-runs the whole pipeline automatically.

## Local development

```bash
npm start       # dev server at localhost:3000
npm test        # run the 9 tests
npm run lint    # run ESLint
npm run build   # production build
```
esjfjensjfjkesfjksekjf