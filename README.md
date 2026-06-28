# Udith Babu K N - Personal Portfolio

Hey! Welcome to the repository for my personal portfolio and blog. 

I'm a Digital Marketing Expert, and I wanted my website to be a bit more than just a standard text resume. It's built with React and Vite, and acts as a central hub for my projects, my professional experience, and a bunch of digital marketing blogs I've written.

## What's in here?

- **Interactive 3D Elements:** The site features a custom 3D model floating in the background that actually rotates and follows you as you scroll through different sections.
- **Custom Zen Theme:** I recently overhauled the design to have a clean, calming "Zen" aesthetic. It features a seamless light and dark mode, frosted glass UI components, and soft mesh gradients.
- **The Blog:** I've written over 100 marketing articles—covering everything from SEO basics to complex B2B sales workflows—which are all baked right into the site.

## Tech Stack

I kept the stack modern but fairly straightforward:
- **React + Vite** for the frontend framework and fast local builds.
- **Vanilla CSS** with a heavy reliance on CSS variables for instant light/dark theme switching.
- **Phosphor Icons** for clean, minimal iconography.
- **Google Model Viewer** for handling the 3D `.glb` assets.

## Running it locally

If you want to spin this up on your own machine to poke around:

1. Clone the repo
2. Run `npm install` to grab the dependencies
3. Run `npm run dev` to start the Vite development server
4. Open up `http://localhost:5173` in your browser

## Project Structure

- `/src`: All the React components (`Sidebar`, `Background3D`, `Blog`, etc.) and the main CSS styles.
- `/public`: Static assets, the 3D model files (`.glb`), images, and the individual static HTML blog pages.
- `/src/data`: Contains the data arrays for the blog posts and other site content.

## Note on Forking

Feel free to draw inspiration from the design or the codebase! However, if you fork this repo, please make sure to swap out my personal information, my blog posts, and my custom 3D models for your own.
