# 🔌 API Tester

A sleek and modern web-based API testing tool built with **Vite + React + TypeScript + Tailwind CSS**. Test your REST APIs with support for GET, POST, PUT, DELETE methods, raw/coded JSON viewing, cards & table display, request history, and import/export functionality — all in one clean interface.


---

## 🚀 Features

- 🌐 Supports `GET`, `POST`, `PUT`, `DELETE` methods
- 🧪 JSON request editor and pretty response viewer
- 📊 Switch between `Raw JSON`, `Table`, or `Card` views
- 📁 Import/Export API request history
- ⏳ Loading indicators and error handling
- 🖼️ Responsive UI with Tailwind CSS
- 🧠 Built with TypeScript and React functional components

---

## 📦 Tech Stack

| Tech           | Use Case                          |
|----------------|-----------------------------------|
| React + TS     | Core frontend logic               |
| Vite           | Lightning-fast dev environment    |
| Tailwind CSS   | Modern, responsive UI styling     |
| Axios          | API request handling              |
| react-icons    | Clean icon components             |
| react-json-pretty | Render formatted JSON          |

---

## Preview

![App Preview](screenshot.png)
![Screenshot 2025-07-03 033133](https://github.com/user-attachments/assets/0a448e44-8bc9-4ca4-8bcc-3d88cdaf2c6d)


---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Swayam098/api-tester.git
cd api-tester


2. Install dependencies
npm install

3. Start development server
npm run dev


🧪 Testing APIs
Select a method (GET/POST/PUT/DELETE)

Enter your API URL

(Optional) Add headers or request body (for POST/PUT)

Click Send Request

View the response in raw, table, or card format


📤 Export & Import
💾 Export your saved API requests as .json

📂 Re-import them anytime to resume testing


📁 Project Structure
src/
├── components/
│   ├── HeaderBar.tsx
│   ├── Sidebar.tsx
│   ├── RequestForm.tsx
│   └── ResponseViewer.tsx
├── App.tsx
├── main.tsx
└── index.css


