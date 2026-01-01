Lazzat Grills & Shakes

This repository contains the source code for the Lazzat Grills & Shakes restaurant website and digital menu.
The project is built as a modern, scalable React application with a fully data-driven menu system.

# Project Details 
Restaurant: Lazzat Grills & Shakes
Project Type: Restaurant Website & Dynamic Menu
Framework: React + TypeScript
Build Tool: Vite

# How can I edit this code?
How can I edit this code?
Use your preferred IDE (Local Development)

You can work locally using any IDE (VS Code recommended).

Requirements

Node.js

npm

Install Node using nvm if needed:
https://github.com/nvm-sh/nvm#installing-and-updating

# Steps 
  # Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev

# Edit files directly on GitHub

Open the file you want to edit

Click the Edit (pencil) icon

Make your changes and commit

# Use GitHub Codespaces

Open the repository

Click Code → Codespaces

Create a new Codespace

Edit files and commit changes directly in the browser

# Menu System Overview

The menu is fully data-driven and managed from the src/lib folder.

Important files

menu-types.ts – Global MenuItem type

menu-data.ts – Central menu aggregator

grills-skewers-data.ts

biryani-data.ts

sides-data.ts

desserts-data.ts

shakes-juices-data.ts

# Adding or Updating Menu Items

Open the relevant *-data.ts file

Add or edit a MenuItem object

Import images from src/assets

Save the file — no UI changes needed

Menu updates automatically across the site.

# Dietary & Filters

Supported filters include:

Vegetarian

Vegan

Gluten-Free

Dairy-Free

Nut-Free

Items appear automatically when users apply filters.

# Dietary & Filters

Supported filters include:

Vegetarian

Vegan

Gluten-Free

Dairy-Free

Nut-Free

Items appear automatically when users apply filters.

# Spice Levels

Each item uses a heat level scale:

0 = No spice

5 = Very spicy

Used for icons, labels, and filtering.

# Technologies Used

Vite

React

TypeScript

Tailwind CSS

shadcn-ui

# Build & Deployment

To create a production build:

npm run build

Deploy the generated dist folder to any static hosting provider such as Vercel or Netlify.

# Developer Notes

Do not hardcode menu items inside components

Always follow the MenuItem interface

Keep images inside src/assets

Categories and filters are rendered dynamically

# CopyRight
© Lazzat Grills & Shakes  All rights reserved