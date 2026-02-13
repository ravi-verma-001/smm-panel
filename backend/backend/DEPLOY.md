# SMM Panel Deployment Guide

This guide describes how to deploy your SMM Panel manually.
- **Backend**: Deployed on **Render** (Free Tier).
- **Frontend**: Deployed on **Netlify** (Drag & Drop).

---

## Part 1: Backend Deployment (Render)

Since the backend is a Node.js/Express app, it **cannot** be hosted on static hosts like Netlify. We will use Render.

### Prerequisites
1.  **GitHub Repository**: You must push your code to a GitHub repository.
    - If you haven't, create a repo "smm-panel" on GitHub.
    - Run these commands in your project folder:
      ```powershell
      git init
      git add .
      git commit -m "Initial commit"
      git branch -M main
      git remote add origin https://github.com/YOUR_USERNAME/smm-panel.git
      git push -u origin main
      ```

### Deployment Steps
1.  Go to [dashboard.render.com](https://dashboard.render.com/) and log in.
2.  Click **"New +"** -> **"Web Service"**.
3.  Select **"Build and deploy from a Git repository"**.
4.  Connect your GitHub account and select your `smm-panel` repository.
5.  **Configure the Service**:
    - **Name**: `smm-panel-backend` (or similar)
    - **Root Directory**: `backend` (Important! Your backend code is in this subfolder)
    - **Runtime**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
    - **Instance Type**: `Free`
6.  **Environment Variables**:
    - Scroll down to "Environment Variables" and click "Add Environment Variable".
    - Add the variables from your local `backend/.env` file:
        - `MONGO_URI`: (Your MongoDB Connection String)
        - `JWT_SECRET`: (Your Secret Key)
        - `PORT`: `5000` (Optional, Render sets this automatically)
7.  Click **"Create Web Service"**.
8.  Wait for the deployment to finish. Copy the **Service URL** (e.g., `https://smm-panel-backend.onrender.com`). You will need this for the frontend!

---

## Part 2: Frontend Deployment (Netlify Drag & Drop)

The frontend is a static Next.js export. You will build it locally and upload it to Netlify.

### Step 1: Prepare the Build
You need to tell the frontend where your backend lives **before** you build it.

1.  Open your terminal (PowerShell) in the project root (`c:\Users\raviv\OneDrive\Desktop\SMMPANEL`).
2.  Run the build command with your **Render Backend URL**:

    ```powershell
    # REPLACE THE URL BELOW WITH YOUR ACTUAL RENDER BACKEND URL
    $env:NEXT_PUBLIC_API_URL="https://your-app-name.onrender.com"; npm run build
    ```

    *If using Command Prompt (cmd), use:*
    ```cmd
    set NEXT_PUBLIC_API_URL=https://your-app-name.onrender.com && npm run build
    ```

3.  Wait for the build to complete. You should see a new folder named `out` in your project directory.

### Step 2: Upload to Netlify
1.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2.  Locate the `out` folder in your project (`c:\Users\raviv\OneDrive\Desktop\SMMPANEL\out`).
3.  **Drag and drop** the `out` folder onto the Netlify page.
4.  Netlify will deploy your site instantly.

---

## Troubleshooting

- **Images not showing?**
  - Ensure `images: { unoptimized: true }` is in `next.config.ts`. (We already added this).
- **Backend calls failing?**
  - Check the Network tab in your browser.
  - If requests are going to `localhost:5000`, you didn't set the `NEXT_PUBLIC_API_URL` correctly during the build step. Re-run the build command with the correct URL.
  - If requests are failing with "CORS" errors, you may need to add your Netlify frontend URL to the backend's allowed origins, or allow all origins (`cors()`) in `backend/server.js`.
