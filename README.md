
# Book Valley

## Description

Book Valley aims to simplify the reader, writer and publisher system 
among the reader and books by providing them with effective and efficient 
solution.
- To create a centralized platform for reader, writer, and publisher. 
- To open scope for new writer to reach out publisher. 
- To provide low-cost e-book facility to reader

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nakib1948/Book-Valley-Server-Side.git
   ```

2. Install dependencies:

   ```bash
   cd Book-Valley-Server-Side
   npm install
   ```

3. Set up environment variables:

   Create a .env file in the root directory with the following content:

   ```env
   PORT=3000
   MONGO_URI=your_mongo_db_connection_string
   ```

   Replace `your_mongo_db_connection_string` with your actual MongoDB connection string.

4. Running the Application

   ### Development

   Run the application in development mode:

   ```bash
   npm run dev
   ```

   The server will restart automatically on file changes.

   ### Production

   Build the application:

   ```bash
   npm run build
   ```

   Start the application:

   ```bash
   npm start
   ```

   The application will be accessible at http://localhost:5000 (or the port specified in your .env file).

5. Linting and Formatting

   ### Linting

   Lint the code:

   ```bash
   npm run lint
   ```

   ### Fixing Linting Issues

   ```bash
   npm run lint:fix
   ```

   ### Prettier Formatting

   Check Prettier formatting:

   ```bash
   npm run prettier:check
   ```

   Format the code with Prettier:

   ```bash
   npm run prettier:fix
   ```
### Documentation
 Follow the link to see the example how the api endpoint works with example:
  ```bash
   https://documenter.getpostman.com/view/31289209/2s9YsDjZsE
   ```
