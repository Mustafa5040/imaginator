# Imaginator - Retro OS Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-imaginator.vercel.app-blue?style=for-the-badge)](https://imaginator.vercel.app)

**Imaginator** is my interactive personal portfolio website, creatively designed to mimic a classic Windows 95/98 desktop environment. Instead of a standard scrolling webpage, visitors can explore my projects, skills, and background through a fully functional, nostalgic web-based window manager.

You can experience it live right now: **[imaginator.vercel.app](https://imaginator.vercel.app)**

## 🌟 Features

*   **Interactive Portfolio:** Discover my work by opening folders, clicking icons, and navigating through an authentic retro OS interface.
*   **Classic UI/UX:** Accurately styled using `xp.css` to recreate the iconic look and feel of vintage Windows operating systems.
*   **Custom Window Manager (`WindowManager.js`):** Fully draggable, resizable, and stackable windows with active/inactive states and z-index management.
*   **Functional Taskbar (`TaskbarManager.js`):** Minimize, restore, and track open windows just like a real desktop environment.
*   **Start Menu (`StartMenuManager.js`):** A working Start button to launch applications, view contact info, or "shut down" the portfolio.
*   **Pure Client-Side Magic:** Built entirely with Vanilla JavaScript, HTML5, and CSS, demonstrating strong DOM manipulation and modular JS architecture without relying on heavy frontend frameworks.

## 🏗️ Project Structure

The codebase is organized modularly, separating the core OS mechanics into distinct JavaScript classes:

*   **`js/entry.js`**: The main entry point that initializes the desktop environment.
*   **`js/WindowManager.js`**: Handles the lifecycle, Z-ordering, dragging, and state of all open windows.
*   **`js/Win.js`**: The base class representing an individual window instance.
*   **`js/TaskbarManager.js`**: Manages the taskbar UI and links taskbar items to their respective windows.
*   **`js/StartMenuManager.js`**: Controls the logic and animations for the Start Menu.
*   **`js/windows/`**: Contains specific window implementations (e.g., `imaginator_window.js`, `shutdown_dlg_window.js`).
*   **`node_modules/xp.css/`**: Provides the core CSS framework for the authentic Windows 95/98/XP aesthetics.

## 🚀 Running Locally

If you want to run the code locally instead of using the live version:

1.  Clone the repository:
    ```bash
    git clone [https://github.com/mustafa5040/imaginator.git](https://github.com/mustafa5040/imaginator.git)
    cd imaginator
    ```
2.  Install dependencies (if you want to build or use local `http-server`):
    ```bash
    npm install
    ```
3.  Start a local development server:
    ```bash
    npx http-server
    ```
4.  Open your browser and navigate to `http://localhost:8080`.

## 🛠️ Technologies Used

*   **HTML5 & CSS3**
*   **Vanilla JavaScript (ES6)**
*   **[XP.css](https://botoxparty.github.io/XP.css/)** (for the classic Windows aesthetic)
*   **Vercel** (for CI/CD and Hosting)

## 👤 Author

**mustafa5040**  
Come visit my digital desktop: [imaginator.vercel.app](https://imaginator.vercel.app)
