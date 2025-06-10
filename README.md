# Remwaste Skip Selection Redesign - Frontend

## ✨ Features

- **Modern Tech Stack**: Built with Vite for a blazing-fast development experience.
- **Type-Safe Code**: Fully written in TypeScript for robust and maintainable code.
- **Reactive State Management**: Uses Zustand for simple, efficient global state management.
- **Efficient Data Fetching**: Leverages TanStack React Query to handle server state, caching, and data synchronization.
- **Polished UI & Animations**: Styled with Tailwind CSS, featuring a custom design system with a vibrant color palette, GPU-accelerated animations, and modern shadows.
- **Component-Based Architecture**: Organized into reusable and maintainable React components.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/belyazidi56/remwaste.git
    cd remwaste
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` to see the application.

## 📜 Available Scripts

In the project directory, you can run the following commands:

- `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
- `npm run build`: Bundles the app for production into the `dist` folder.
- `npm run lint`: Lints the project files using ESLint to check for code quality and errors.
- `npm run preview`: Starts a local server to preview the production build.

## 📂 Project Structure

```
/remwaste
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable React components
│   ├── services/       # API calls and external services
│   ├── store/          # Zustand store for global state
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Entry point of the application
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Project dependencies and scripts
```
