
# Movies Management Application (CRUD)

This is a project for managing movies and genres, developed with **React** on the frontend and **Node.js** on the backend. It allows you to list, add, edit, and deactivate movies and genres.

## Project Structure

```
.
├── backend/    # Project backend (Node.js + Express + Sequelize)
├── frontend/   # Project frontend (React + Vite)
└── README.md   # Project documentation
````

## Prerequisites

Make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [PostgreSQL](https://www.postgresql.org/) (relational database)

## Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   * Copy the `.env.example` file to `.env`:

     ```bash
     cp .env.example .env
     ```
   * Edit the `.env` file with the correct credentials for your PostgreSQL database.

4. Create the database in PostgreSQL:

   * Access PostgreSQL using the terminal or a GUI (such as pgAdmin), and create a database with the name specified in the `.env` file.

5. Start the backend server:

   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:3000`.

## Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.

## How to Use

1. Open the frontend in your browser at `http://localhost:5173`.
2. Use the interface to manage movies and genres:

   * **Add Genre**: Go to the genres page and add a new genre.
   * **Add Movie**: Go to the movies page and create a new movie, assigning it to an existing genre.
   * **Edit or Deactivate**: Use the action buttons to edit or deactivate records.

## API Endpoints

### Movies

* `GET /filmes/list`: Lists all movies.
* `GET /filmes/get/:id`: Retrieves details of a movie.
* `POST /filmes/create`: Creates a new movie.
* `PUT /filmes/update/:id`: Updates an existing movie.
* `POST /filmes/delete`: Deactivates a movie.

### Genres

* `GET /genero/list`: Lists all genres.
* `GET /genero/get/:id`: Retrieves details of a genre.
* `POST /genero/create`: Creates a new genre.
* `PUT /genero/update/:id`: Updates an existing genre.
* `POST /genero/delete`: Deactivates a genre.

## Technologies Used

* **Frontend**: React, Vite, Bootstrap, React Router, Sonner (notifications)
* **Backend**: Node.js, Express, Sequelize, PostgreSQL

## License

This project is licensed under the MIT License.

