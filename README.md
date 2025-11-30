# STREAMON 🗣️

STREAMON is a language learning application designed to connect users through chat and video calls, enabling them to practice and learn new languages interactively. 🌍💬

## Features ✨

*   **Real-time Chat:** Engage in text-based conversations with other language learners. 💬
*   **Video Calls:** Practice speaking and listening skills through live video interactions. 📞
*   **User Authentication:** Secure sign-up and login functionality. 🔐
*   **Friend Management:** Send and accept friend requests to build your learning network. 🤝
*   **Notifications:** Stay updated with new friend requests and other activities. 🔔
*   **Theme Selection:** Customize your app's appearance with different themes. 🎨

## Tech Stack 💻

### Frontend 🚀

*   **React:** A JavaScript library for building user interfaces. ⚛️
*   **Vite:** A fast build tool for modern web projects. ⚡
*   **Tailwind CSS & DaisyUI:** A utility-first CSS framework and a component library for rapid UI development. 💅
*   **React Query (`@tanstack/react-query`):** Powerful asynchronous state management for data fetching, caching, and synchronization. 📊
*   **Axios:** Promise-based HTTP client for making API requests. 📡
*   **Lucide React:** A collection of beautiful, customizable SVG icons. 🌟
*   **React Hot Toast:** Declarative and accessible toast notifications. 🍞
*   **React Router:** Declarative routing for React applications. 🛣️
*   **Stream Chat & Stream Video SDK:** For real-time chat and video call functionalities. 💬📞
*   **Zustand:** A small, fast, and scalable bearbones state-management solution. 🐻

### Backend ⚙️

*   **Node.js & Express.js:** A robust and flexible web application framework for Node.js. 🟢
*   **MongoDB (via Mongoose):** A NoSQL database and an ODM (Object Data Modeling) library for MongoDB. 🍃
*   **bcryptjs:** Library for hashing passwords. 🔒
*   **cookie-parser:** Middleware to parse Cookie headers and populate `req.cookies`. 🍪
*   **CORS:** Middleware for enabling Cross-Origin Resource Sharing. 🌐
*   **dotenv:** Loads environment variables from a `.env` file. 📝
*   **jsonwebtoken:** For implementing JSON Web Tokens for secure authentication. 🔑
*   **Stream Chat:** Backend integration for real-time chat services. 💬

## Getting Started 🏁

To get a local copy up and running, follow these simple steps.

### Prerequisites ✅

*   Node.js (v18 or higher recommended) 🟢
*   npm or yarn 📦
*   MongoDB instance (local or cloud-based) 🍃
*   Stream API Key and Secret (for chat and video functionalities) 🔑

### Installation ⬇️

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/STREAMON.git
    cd STREAMON
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory with the following variables:
    ```
    PORT=5000
    MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
    JWT_SECRET=YOUR_JWT_SECRET
    STREAM_API_KEY=YOUR_STREAM_API_KEY
    STREAM_API_SECRET=YOUR_STREAM_API_SECRET
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    ```
    Create a `.env` file in the `frontend` directory with the following variables:
    ```
    VITE_BACKEND_URL=http://localhost:5000/api
    VITE_STREAM_API_KEY=YOUR_STREAM_API_KEY
    ```

### Running Locally 🏃‍♀️

1.  **Start the Backend Server:**
    ```bash
    cd backend
    npm run dev
    ```
    The backend server will run on `http://localhost:5000`.

2.  **Start the Frontend Development Server:**
    ```bash
    cd frontend
    npm run dev
    ```
    The frontend application will typically open in your browser at `http://localhost:5173` (or another available port).

## Deployment 🚀

*   **Frontend:** Deployed on Vercel
    *   Live URL: [https://streamon-nine.vercel.app/](https://streamon-nine.vercel.app/)
*   **Backend:** Deployed on Railway

## Contributing 🤝

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License 📄

Distributed under the MIT License. See `LICENSE` for more information.