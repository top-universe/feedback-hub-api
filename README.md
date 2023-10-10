# FeedbackHub API

This repository contains the backend API for the FeedbackHub application. FeedbackHub is a platform that allows users to submit feedback and suggestions for various products or services.

## Table of Contents

Features
Requirements
Getting Started
Installation
Configuration
Running the Server
API Endpoints
Contributing
License

## Features

- **User Authentication:** Secure endpoints with user authentication using JWT.
- **Feedback Management:** Create, read, update, and delete feedback items.
- **Category Management:** Manage feedback categories for better organization.
- **Tagging System:** Assign tags to feedback for easy categorization.
- **Search Functionality:** Search for feedback using various parameters.
- **Pagination:** Paginate through large sets of feedback results.

## Requirements

- Node.js (v12.x or higher)
- npm or Yarn
- MongoDB

## Getting Started

### Installation

1. Clone this repository:

- `git clone https://github.com/top-universe/feedback-hub-api.git`
- `cd FeedbackHub-api`

2. Install dependencies:

> `npm install`

3. Configuration

1. Create a .env file in the root directory based on the provided .env.template file.
1. Modify the .env file and set the appropriate values for your environment.

### Running the Server

> npm start

The server will run at http://localhost:3000 by default.

## API Endpoints

- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Log in a user and get an authentication token.
- **GET /api/feedback:** Get a list of feedback items.
- **POST /api/feedback:** Create a new feedback item.
- **GET /api/feedback/:id:** Get a specific feedback item by ID.
- **PUT /api/feedback/:id:** Update a specific feedback item.
- **DELETE /api/feedback/:id:** Delete a specific feedback item.

For detailed API documentation and usage, refer to the API documentation.

## License

This project is licensed under the ISC License.
