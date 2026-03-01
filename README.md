Portfolio-NG21





























Description

This project is a personal Portfolio application built with Angular 21, designed to showcase projects and skills in a professional and engaging manner. The application features a modern and interactive user interface, utilizing Kendo UI components for a rich user experience. It includes main pages such as Home, About, Projects, and Contact.

Features

•
Project Display: A dedicated page to display projects with details and descriptions for each.

•
Interactive Browsing: Utilizes Kendo UI components to provide a smooth browsing experience.

•
Active Page Highlight: Clear visual highlighting of the currently active page in the top navigation bar.

•
Lazy Loading: Components are loaded only when needed, improving application performance.

•
Mock Services: Employs MockHttpInterceptor to simulate API responses, facilitating development and testing without a real backend server.

•
Responsive Design: The design adapts to various screen sizes and devices.

Technical Structure

The project is built on the Angular framework and follows best practices in code organization:

•
src/main.ts: The main entry point of the Angular application, where Angular is bootstrapped and essential providers, including MockHttpInterceptor, are configured.

•
src/app/app.ts: The root component of the application (AppComponent), hosting the navigation bar and other page content via <router-outlet>.

•
src/app/app.html: The HTML template for the root component, containing the structure of the navigation bar.

•
src/app/app.scss: The Sass stylesheet for the root component, containing general application styles and navigation bar styles, including active page highlighting.

•
src/app/app.routes.ts: Defines all routing paths in the application and uses lazy loading for components.

•
src/app/pages/projects/projects.ts: The projects page component, responsible for fetching and displaying the list of projects.

•
src/app/core/services/project.ts: An Angular service for handling CRUD operations related to projects (fetch, add, update, delete).

•
src/app/core/models/project.model.ts: A TypeScript interface defining the data structure of a project object.

•
src/app/core/interceptors/mock-http.interceptor.ts: An HTTP interceptor that simulates API responses for project and contact services.

Quick Start

To set up and run the project locally, follow these steps:

Prerequisites

Ensure you have the following installed:

•
Node.js: It is recommended to use an LTS version (e.g., v20 or v22 ). You can download it from the official Node.js website.

•
Angular CLI: The command-line interface for Angular. You can install it globally using:

Bash


npm install -g @angular/cli





Installation and Running

1.
Clone the repository:

Bash


git clone <YOUR_REPOSITORY_URL>
cd portfolio-ng21/portfolio-ng21





2.
Install dependencies:

Bash


npm install





3.
Run the development server:

Bash


ng serve



The application will be served at http://localhost:4200/ (or another port if 4200 is busy ). The application will automatically reload if you change any of the source files.



Build

To build the project for a production environment, use the following command:

Bash


ng build



This will compile your project and store the build artifacts in the dist/browser/ directory.

