# Advanced Coding Assistant React Frontend

Welcome to the Advanced Coding Assistant React Frontend project! This README file provides instructions on how to set up, run, and understand the libraries used in this project.

This project is a frontend app designed for [Advanced Coding Assistant backend](https://github.com/telekom/advanced-coding-assistant-backend).

# Project Overview

The Advanced Coding Assistant React Frontend is a modern web application designed to provide [advanced coding assistance features](https://github.com/telekom/advanced-coding-assistant-backend?tab=readme-ov-file#key-features). This project leverages a variety of  libraries and tools to create a responsive, efficient, and user-friendly interface.

## Environment Configuration

To configure the environment variables for this project, follow these steps:

1. Locate the `.env.local-example` file in the root directory of the project.

2. Rename the file to `.env.local`.

3. Open the `.env.local` file and update the variables according to your needs.

## Running the Project Locally

To run the project locally, use the following commands:

```bash
npm install
```

```bash
npm run dev
```

After running these commands, the development server will start, and you can access the project in your browser at `http://localhost:5173`.

## Running Inside a Docker Container

To run the project inside a Docker container, follow these steps:

1. Make sure you have Docker installed on your machine.

2. Build the Docker image by running the following command in the terminal:

```bash
docker build -t aca:latest .
```

3. Once the image is built, you can run the container using the following command:

```bash
docker run -p 5173:5173 aca:latest
```

This will start the container and expose port 5173, allowing you to access the project in your browser at `http://localhost:5173`.

### Libraries Used

- **[Redux](https://redux.js.org/):** A predictable state container for JavaScript applications, Redux helps manage the state of your application in a consistent and scalable manner.

- **[Redux Toolkit](https://redux-toolkit.js.org/):** A set of tools and utilities that simplify working with Redux, making it easier to write reliable and maintainable Redux logic.

- **[Vite](https://vitejs.dev/):** A fast and opinionated web development build tool that provides an optimized development and build process, ensuring quick startup times and efficient hot module replacement.

- **[ESLint](https://eslint.org/):** A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript, helping to maintain code quality and consistency across the project.

- **[TypeScript](https://www.typescriptlang.org/):** A typed superset of JavaScript that compiles to plain JavaScript, TypeScript adds static types to your code, enhancing development efficiency and reducing bugs.

- **[Prettier](https://prettier.io/):** An opinionated code formatter that enforces a consistent code style, making your codebase easier to read and maintain.

- **[Shadcn UI](https://ui.shadcn.com/docs) and [Radix](https://radix-ui.com/):** UI component libraries for building modern and responsive user interfaces, providing a set of customizable and accessible components.

- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapidly building custom designs, Tailwind CSS allows you to style your applications directly in your markup, promoting a highly efficient workflow.

- **[React Markdown](https://github.com/remarkjs/react-markdown):** Is a component for rendering Markdown in React applications. It allows you to convert Markdown content into React elements.

- **[React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)** is a library for adding syntax highlighting to code blocks in React applications. It supports many programming languages and themes.

## License

Copyright 2024 Deutsche Telekom AG

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.