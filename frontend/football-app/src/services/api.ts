import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// Add Data API
export const addData = async (teamData: any) => {
    // Change camelCase to snake_case to match backend
    const payload = {
        Team: teamData.team,
        "Games Played": teamData.gamesPlayed,
        Win: teamData.win,
        Draw: teamData.draw,
        Loss: teamData.loss,
        "Goals For": teamData.goalsFor,
        "Goals Against": teamData.goalsAgainst,
        Points: teamData.points,
        Year: teamData.year,
    };
    return axios.post(`${BASE_URL}/add`, payload);
};

// Update Data API
export const updateData = async (teamData: any) => {
    // Change camelCase to snake_case to match backend
    const payload = {
        Team: teamData.team,
        "Games Played": teamData.gamesPlayed,
        Win: teamData.win,
        Draw: teamData.draw,
        Loss: teamData.loss,
        "Goals For": teamData.goalsFor,
        "Goals Against": teamData.goalsAgainst,
        Points: teamData.points,
        Year: teamData.year,
    };
    return axios.post(`${BASE_URL}/updateByTeam`, payload);
};

// Delete Data API
export const deleteData = async (team: string) => {
    return axios.delete(`${BASE_URL}/deleteByTeam`, { data: { Team: team } });
};

// Display Stats for a Year
export const fetchStatsForYear = async (year: string) => {
    return axios.get(`${BASE_URL}/stats/${year}`);
};

// Fetch Teams with Minimum Wins
export const fetchTeamsByWins = async (minWins: number) => {
    return axios.get(`${BASE_URL}/teams/wins/${minWins}`);
};

// Fetch Teams with Goals for Average
export const fetchTeamsByGoalsFor = async (year: string, minGoals: number) => {
    return axios.get(`${BASE_URL}/teams/goals/${year}/${minGoals}`);
};
