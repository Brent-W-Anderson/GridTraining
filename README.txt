
GRIDTRAINING
============

Fiber Technician Training Application

GridTraining is a React, TypeScript, Vite, and SCSS application
for fiber technician training.

PACKAGE MANAGER
---------------

Yarn


GETTING STARTED
---------------

Open PowerShell in the GridTraining project directory.

Install dependencies:

yarn install

Start the development server:

yarn dev

Open the local URL displayed in the terminal.


BUILD
-----

Create a production build:

yarn build

Preview the production build locally:

yarn preview

The production build is generated in the dist/ directory.


PROJECT STRUCTURE
-----------------

src/
    assets/
        config/          Training content and configuration
        styles/          Shared application styles

    components/          Reusable UI components

    pages/               Training pages and chapters

    App.tsx              Main application

index.html               Application entry point

package.json             Project dependencies and commands

vite.config.ts           Vite configuration


MEDIA STORAGE
-------------

Training images and videos are hosted externally through
the GridTraining GitHub Release:

https://github.com/Brent-W-Anderson/GridTraining/releases/tag/media-v1

Images and videos should be uploaded as individual release
assets, preserving their filenames and extensions.

Image URLs are managed through:

src/assets/config/releaseMedia.ts

The FDH training video is referenced through:

src/assets/config/distribution.ts

Media files do not need to be stored in the application
source code.

When adding new media:

1. Upload the file to the media-v1 GitHub Release.
2. Copy or construct its release asset URL.
3. Reference that URL in the appropriate training configuration.
4. Verify that the media loads correctly in the application.

GitHub Releases are used for external media storage.
Browser playback and image loading should be verified
after deployment.


DEPLOYMENT
----------

GridTraining is deployed using GitHub Pages.

Live website:

https://brent-w-anderson.github.io/GridTraining/

GitHub repository:

https://github.com/Brent-W-Anderson/GridTraining

The Vite base path is:

/GridTraining/

Build and deployment configuration should preserve this
base path.


DEVELOPMENT GUIDELINES
----------------------

Keep substantial training content in typed configuration files.

Use React components for rendering and application behavior.

Keep component-specific styles alongside their components.

Preserve existing working functionality when updating lessons.

Organize training material in the order technicians encounter
equipment and perform field procedures.

Use Yarn for dependency management.

Do not add unnecessary media downloads or generated files
to the source repository.
