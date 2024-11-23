# Football Data Management

This project is a full-stack application for managing football data. It allows users to add, update, delete, and display football statistics. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React, TypeScript, and Vite.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add, update, delete, and display football team data
- Display teams with high average goals for a given year
- Responsive UI built with Tailwind CSS
- Proxy setup for seamless API requests from the frontend to the backend

## Project Structure

```
backend/
	.env
	.gitignore
	models/
		connection.js
		model.js
	package.json
	server.js


FootbalCSV.csv


frontend/
	football-app/
		.gitignore
		about.txt
		eslint.config.js
		index.html
		package.json
		postcss.config.js
		public/
		

README.md


		site.webmanifest
		src/
			App.css
			App.tsx
			assets/
			components/
				AddDataForm.tsx
				AverageGoals.tsx
				DeleteDataForm.tsx
				DisplayRecords.tsx
				UpdateDataForm.tsx
			index.css
			main.tsx
			services/
			vite-env.d.ts
		tailwind.config.js
		tsconfig.app.json
		tsconfig.json
		tsconfig.node.json
		vite.config.ts
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Backend Setup

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your MongoDB connection string:
   ```
   DATABASE_URL=mongodb://localhost:27017/your-database-name
   ```

### Frontend Setup

1. Navigate to the `frontend/football-app` directory:
   ```sh
   cd frontend/football-app
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

### Running the Application

1. Build the frontend and start the backend server:
   ```sh
   cd backend
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` to access the application.

### Development

To run the frontend and backend servers separately for development:

1. Start the backend server:
   ```sh
   cd backend
   nodemon server.js
   ```

2. Start the frontend development server:
   ```sh
   cd frontend/football-app
   npm run dev
   ```

## API Endpoints

### Add Data

- **URL:** `/api/add`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "Team": "Team Name",
    "Games Played": 10,
    "Win": 5,
    "Draw": 3,
    "Loss": 2,
    "Goals For": 20,
    "Goals Against": 10,
    "Points": 18,
    "Year": 2022
  }
  ```

### Update Data

- **URL:** `/api/updateByTeam`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "Team": "Team Name",
    "Games Played": 10,
    "Win": 5,
    "Draw": 3,
    "Loss": 2,
    "Goals For": 20,
    "Goals Against": 10,
    "Points": 18,
    "Year": 2022
  }
  ```

### Delete Data

- **URL:** `/api/deleteByTeam`
- **Method:** `DELETE`
- **Body:**
  ```json
  {
    "Team": "Team Name"
  }
  ```

### Get Teams with High Average Goals For

- **URL:** `/api/teams/goals/:year/:minGoalsFor`
- **Method:** `GET`

### Get Total Games Played, Draws, and Wins for a Given Year

- **URL:** `/api/stats/:year`
- **Method:** `GET`

### Get Teams with Wins Greater Than a Given Value

- **URL:** `/api/teams/wins/:minWins`
- **Method:** `GET`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.