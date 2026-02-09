# Deploying the Backend

This guide explains how to deploy your **Node.js/Express backend** to a cloud provider like **Render.com** (recommended for ease of use and free tier).

## Prerequisites

1.  **GitHub Account**: You need a GitHub account to push your code.
2.  **Render Account**: Sign up at [render.com](https://render.com).

## Step 1: Push Code to GitHub

You need to push your `backend` folder to a new GitHub repository.

1.  **Create a New Repository** on GitHub (e.g., `smm-panel-backend`).
2.  **Push your code**:
    Open your terminal in the `backend` folder and run:

    ```bash
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/smm-panel-backend.git
    git push -u origin main
    ```
    *(Replace `YOUR_USERNAME` with your actual GitHub username)*

## Step 2: Deploy to Render

1.  **Dashboard**: Go to your [Render Dashboard](https://dashboard.render.com).
2.  **New Web Service**: Click **New +** -> **Web Service**.
3.  **Connect GitHub**: Connect your GitHub account and select the `smm-panel-backend` repository.
4.  **Configure Service**:
    *   **Name**: `smm-backend` (or whatever you like)
    *   **Region**: Closest to you (e.g., Singapore, Frankfurt)
    *   **Branch**: `main`
    *   **Root Directory**: `.` (leave details as is since we are in the root of the repo)
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
5.  **Environment Variables**:
    You MUST add your secret keys here. Click **"Advanced"** or **"Environment Variables"** and add:
    *   `MONGO_URI`: `mongodb+srv://asharam2753_db_user:raviverma@cluster0.nqttqc0.mongodb.net/smmpanel?retryWrites=true&w=majority`
    *   `JWT_SECRET`: `your_secret_key_here` (Change this to a strong random string!)
    *   `SMM_API_KEY`: `9e8a989ad85ed3ae473ccf5f8811ce548578ab74`
    *   `SMM_API_URL`: `https://www.likeradda.in/api/v2`
    *   `PORT`: `10000` (Render sets this automatically, but good to know)

6.  **Create Web Service**: Click **"Create Web Service"**.

## Step 3: Verify Deployment

Render will start building your app. Watch the logs. Once it says "Live", your backend is deployed!

You will get a URL like `https://smm-backend.onrender.com`.
**Copy this URL** and use it in your Frontend `.env` file as `NEXT_PUBLIC_API_URL`.
