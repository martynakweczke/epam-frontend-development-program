# 🌐 Viewing the App

The app is deployed and accessible at:

- **GitHub Pages**: [https://martynakweczke.github.io/epam-frontend-development-program/](https://martynakweczke.github.io/epam-frontend-development-program/)
- **Vercel**: [https://epam-frontend-development-program.vercel.app/](https://epam-frontend-development-program.vercel.app/)

# 📱 App Description

This is a capstone project implemented during EPAM System Frontend Development Internship. The project is a client-side e-commerce application featuring:

- Product catalog loaded from local data.json
- Product details view with ratings and reviews
- Shopping cart with full CRUD operations
- Advanced filtering and sorting capabilities
- Responsive design for all screen sizes
- Form validation (login, review, contact forms)
- Built with Vite for optimal performance

# 🚀 Running the app locally

To run the project locally, follow these steps:

1.  **Install dependencies**

    Run the following command to install all required packages:

    ```bash
    npm install
    ```

2.  **Start development server**

    After installing the dependencies, run:

    ```bash
    npm run dev
    ```

    This starts the Vite development server with hot module replacement. The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

3.  **Build for production**

    To create a production build:

    ```bash
    npm run build
    ```

    This creates an optimized build in the `dist/` folder for Vercel or other platforms.

4.  **Build for GitHub Pages**

    To create a production build specifically for GitHub Pages:

    ```bash
    npm run build:gh-pages
    ```

    This creates an optimized build with the correct base path (`/epam-frontend-development-program/`) for GitHub Pages deployment.

5.  **Preview production build**

    To preview the production build locally:

    ```bash
    npm run preview
    ```

# 📦 Deployment

## GitHub Pages

1. Build the project for GitHub Pages: `npm run build:gh-pages`
2. Commit the `dist/` folder to your repository
3. Configure GitHub Pages to serve from the `main` branch `/dist` folder
4. Your app will be available at `https://[username].github.io/[repository-name]/`

## Vercel

1. Connect your repository to Vercel
2. Set build command to: `npm run build`
3. Set output directory to: `dist`
4. Deploy - Vercel will automatically build and deploy your app

# 🛠️ Tech Stack

- **Build Tool**: Vite
- **Styles**: SCSS
- **JavaScript**: ES6 Modules
- **Deployment**: GitHub Pages, Vercel
