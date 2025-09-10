# Puff & Pastry — Staging Theme

This repo mirrors the **unpublished Staging theme** in Shopify.

- **Store:** `aswgfg-ei.myshopify.com`  
- **Staging Theme ID:** `133495586875`  
- **Production = Live** (publishing Staging in Admin makes it live)

---

## 📑 Table of Contents
1. [🚀 Workflow](#-workflow)  
   - [1. Create a feature branch](#1-create-a-feature-branch)  
   - [2. Develop locally (hot reload)](#2-develop-locally-hot-reload)  
   - [3. Commit & push your work](#3-commit--push-your-work)  
   - [4. Open a Pull Request](#4-open-a-pull-request)  
   - [5. Deploy to Staging](#5-deploy-to-staging)  
   - [6. QA & Publish](#6-qa--publish)  
2. [🛠️ Setup (reference for future me)](#️-setup-reference-for-future-me)

---

## 🚀 Workflow

### 1. Create a feature branch
```bash
git checkout -b feature/<short-name>

```
### 2. Develop locally (hot reload)
```bash
git checkout -b feature/<short-name>
```
### 4. Open a Pull Request
Open PR in GitHub → merge into main.
After merge, update your local branch:
```bash
git checkout main
git pull
```
### 5. Deploy to Staging
```bash
shopify theme push --store aswgfg-ei.myshopify.com --theme 133495586875
```
### 6. QA & Publish
- In Admin: Online Store → Themes → Puff & Pastry – Staging → Preview
- When ready: Actions → Publish (this becomes Production)

### 🛠️ Setup (reference for future me)
**Initialize repo & set branch**
```bash
git init
git branch -M main
```
**Add .gitignore**
```bash
cat > .gitignore <<'IGNORE'
node_modules/
.DS_Store
*.log
.shopify/
assets/*.map
IGNORE
```
**Stage & commit initial import**
```bash
git add -A
git commit -m "chore: initial theme import"
```
**Connect to GitHub**
```bash
git remote add origin git@github.com:YOURUSERNAME/puffandpastry-staging.git
git push -u origin main
```
