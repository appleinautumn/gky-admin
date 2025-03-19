# Church Web Administration - Web (Frontend)

This directory contains the frontend website for the Church Web Administration project, built using Astro. It provides the user interface for interacting with the church's data and services.

## Overview

This Astro application serves as the public-facing website for the church. It leverages Astro's static site generation (SSG) capabilities to deliver a fast and performant user experience. Dynamic content is fetched from the backend API (`api` directory).

## Key Features

- **Static Site Generation (SSG):** Optimized for speed and SEO.
- **Dynamic Content:** Fetches data from the NestJS API for events, sermons, news, and other dynamic content.
- **Member Directory:** Displays information about church members (with appropriate privacy controls).
- **Event Calendar:** Shows upcoming events and allows users to view details.
- **Donation/Giving:** Provides a way for users to make online donations.
- **Sermon/Media Library:** Allows users to browse and listen to/watch sermons.
- **News/Blog:** Displays the latest news and blog posts.
- **Contact Forms:** Enables users to contact the church.
- **Responsive Design:** Adapts to different screen sizes and devices.
- **User Authentication:** Allow users to login and manage their profile.

## Technologies

- Astro: A modern web framework for building content-driven websites.
- React or Preact (Likely): For interactive components.
- TypeScript: A typed superset of JavaScript.
- Tailwind CSS (Likely): For styling.
- Axios or Fetch API (Likely): For making API requests.

## Getting Started

1.  **Installation:**

    ```bash
    $ npm install
    ```

2.  **Environment Variables:**

    - Create a `.env` file in the root of the `web` directory.
    - Define necessary environment variables (e.g., API base URL).

3.  **Running the Website:**

    ```bash
    # Development mode (with hot-reloading)
    $ npm run dev

    # Build for production
    $ npm run build

    # Preview the production build
    $ npm run preview
    ```

## Contributing

Contributions to the website are welcome! Please see the `CONTRIBUTING.md` file for guidelines.

## License

MIT
