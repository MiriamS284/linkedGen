# LinkedGen Project

![login](/client/public/img/screenshot/login_linkedgen.png "Login")
![Dashboard Overview](/client/public/img/screenshot/Dashboard.png "Dashboard")
![Settings to be customized](/client/public/img/screenshot/settings.png "Customized Settings")
![Steps Styleguide Creation](/client/public/img/screenshot/step_style.png "Styleguide")
![Content Integration](/client/public/img/screenshot/examples.png "Example Content")
![Postings](/client/public/img/screenshot/post_crud.png "CRUPD Operation Content")
![Account Update](/client/public/img/screenshot/account.png "Profile Update")

## Overview

LinkedGen is designed to create user-specific professional style guides that optimize content generation. This system adapts to both configurations: with or without user data, ensuring that all generated content adheres to professional standards. These style guides form the backbone of content generation, allowing for tailored outputs that meet the unique needs and branding of each user.

Development Approach
The development of LinkedGen was guided by a commitment to professional standards and quality. Here’s a closer look at our development practices:

Modular Design: The application is built using a modular approach, separating concerns effectively between the frontend and backend. This not only enhances maintainability but also simplifies scaling and updating individual aspects of the application.
AI Integration: Leveraging OpenAI's GPT for natural language processing, LinkedGen incorporates advanced AI to dynamically generate content that is both contextually relevant and stylistically consistent.
Responsive and Adaptive UI: The front-end development was carried out with a focus on creating a responsive and adaptive user interface. This ensures a seamless and engaging user experience across different devices and screen sizes.
Security and Data Protection: Given the reliance on user data for customized experiences, stringent measures are in place to protect user information. Data handling procedures strictly adhere to best practices in security and data protection.
Continuous Integration/Continuous Deployment (CI/CD): Utilizing CI/CD pipelines, we ensure that new features, updates, and fixes are frequently pushed to production without disrupting the user experience. This also helps in maintaining high standards of quality and reliability.
Feedback Loop: User feedback is an integral part of our development process. It informs continual improvements and feature enhancements, ensuring that LinkedGen evolves in alignment with user needs and industry trends.
Professional Focus
Every feature and integration in LinkedGen is crafted with a focus on professionalism. From the user interface design to the backend APIs, every component is built to support robust, scalable, and professional-grade performance. This makes LinkedGen not just a tool, but a dependable partner in content generation.

This structured approach to both technology and user experience makes LinkedGen a standout solution for generating high-quality content efficiently and effectively.

## Features

### Authentication

- **User Authentication**: Secure login and registration system with password hashing to ensure data security.
- **Profile Management**: Allows users to update their profile information including password changes with double-entry verification to prevent errors.

### Styleguide Generator

- **Multistep Form**: Users can create custom style guides through a multistep form, enabling personalized content generation strategies.

### Posts

- **CRUD Operations**: Users can create, read, update, and delete posts, providing full control over the content they generate.

### Settings

- **Customizable User Preferences**: Users can customize their experience by enabling dark mode, choosing language preferences, and adjusting other settings.
- **Data Transmission Preferences**: Users can decide how their data is handled and transmitted, ensuring their privacy and control over their information.

### Technology Stack

### Frontend

- **React**: A JavaScript library for building user interfaces
- **Styled-Components**: For modular and reusable CSS in JS
- **React Router**: For navigation in the React app

### Backend

- **Node.js**: A runtime environment for JavaScript
- **Express**: Web application framework for Node.js
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js

### Database

- **MongoDB**: NoSQL database used to store all application data

### Additional Technologies

- **@tanstack/react-query**: For efficient handling of server state and caching in React
- **OpenAI's GPT**: Used for natural language processing and dynamic content generation
- **React Hot Toast**: Provides feedback via notifications on the user interface

## Directory Structure

|-- /client
| |-- /src
| |-- /public
| |-- package.json
|-- /server
| |-- /models
| |-- /routes
| |-- /config
| |-- /middleware
| |-- server.js
| |-- package.json
|-- README.md
|-- .gitignore
