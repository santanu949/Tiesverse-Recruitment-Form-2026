# Tiesverse Recruitment Form 2026

A high-performance, responsive React web application designed to streamline the recruitment process. This project features a modern, high-contrast user interface with strict client-side validation and a serverless Google Apps Script backend that securely stores applicant data in Google Sheets and uploads resumes directly to Google Drive.

## 🚀 Features

* **Modern UI/UX:** Built with a high-contrast light theme, featuring custom glassmorphism-inspired inputs, smooth layout transitions, and interactive hover states.
* **Strict Validation:** Powered by Zod and React Hook Form for lightning-fast, secure client-side validation, including dynamic conditional fields (e.g., UPSC attempts, Portfolio links).
* **Serverless Backend:** Integrates directly with a Google Apps Script API endpoint.
* **Duplicate Prevention:** Backend logic checks against existing Google Sheet records to prevent duplicate email submissions.
* **Automated File Handling:** Converts resume uploads (PDF/DOC) to base64, securely transferring and storing them in a designated Google Drive folder.

## 🛠️ Tech Stack

* **Frontend Framework:** React.js (via Vite)
* **Styling:** Tailwind CSS (v3)
* **Animation:** Framer Motion
* **Form State & Validation:** React Hook Form + Zod
* **Icons:** Lucide React
* **Backend / Database:** Google Apps Script + Google Sheets + Google Drive

## 📦 Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/santanu949/Tiesverse-Recruitment-Form-2026.git](https://github.com/santanu949/Tiesverse-Recruitment-Form-2026.git)
    cd Tiesverse-Recruitment-Form-2026
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be running at `http://localhost:5173`.

## ⚙️ Backend Configuration

To point the frontend to your own database:
1. Open `src/components/RecruitmentForm.jsx`.
2. Locate the `SCRIPT_URL` constant at the top of the file.
3. Replace the URL with your deployed Google Apps Script Web App endpoint.

## 📄 License

© 2026 Tiesverse Foundation. All Rights Reserved.
