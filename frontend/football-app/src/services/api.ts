// services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Your backend API URL

// Define types for data that will be sent/received
export interface FootballData {
  team: string;
  gamesPlayed: number;
  win: number;
  draw: number;
  loss: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  year: number;
}

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add new football data to the database
export const addFootballData = async (data: FootballData) => {
  try {
    const response = await api.post('/api/football', data);
    return response.data;
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
};

// Update an existing football team's data by team name
export const updateFootballData = async (team: string, data: Partial<FootballData>) => {
  try {
    const response = await api.post(`/api/football/update/${team}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Delete football data by team name
export const deleteFootballData = async (team: string) => {
  try {
    const response = await api.post(`/api/football/delete/${team}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

// Get total games played, drawn, and won for a given year
export const getTeamStatsByYear = async (year: number) => {
  try {
    const response = await api.get(`/api/football/stats/${year}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

// Get the first 10 teams where "won" matches are greater than a given number
export const getTeamsByWins = async (minWins: number) => {
  try {
    const response = await api.get(`/api/football/wins/${minWins}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams by wins:', error);
    throw error;
  }
};

// Get the average goals scored by teams in a given year
export const getAverageGoalsByYear = async (year: number) => {
  try {
    const response = await api.get(`/api/football/average-goals/${year}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching average goals:', error);
    throw error;
  }
};

export default api;
