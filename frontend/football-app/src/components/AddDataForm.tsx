import React, { useState } from 'react';
import axios from 'axios';

const AddDataForm = () => {
    const [teamData, setTeamData] = useState({
        team: '',
        gamesPlayed: 0,
        win: 0,
        draw: 0,
        loss: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
        year: 2023
    });

    // Handle input field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTeamData((prevData) => ({
            ...prevData,
            [name]: name === "year" ? parseInt(value) : value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/add', {
                Team: teamData.team,
                "Games Played": teamData.gamesPlayed,
                Win: teamData.win,
                Draw: teamData.draw,
                Loss: teamData.loss,
                "Goals For": teamData.goalsFor,
                "Goals Against": teamData.goalsAgainst,
                Points: teamData.points,
                Year: teamData.year
            });
            alert('Data added successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error adding data', error);
            alert('Failed to add data');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold">Add Team Data</h2>

            {/* Team Name */}
            <div>
                <label className="block text-gray-700">Team:</label>
                <input
                    type="text"
                    name="team"
                    value={teamData.team}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter team name"
                />
            </div>

            {/* Games Played */}
            <div>
                <label className="block text-gray-700">Games Played:</label>
                <input
                    type="number"
                    name="gamesPlayed"
                    value={teamData.gamesPlayed}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter number of games played"
                />
            </div>

            {/* Wins */}
            <div>
                <label className="block text-gray-700">Wins:</label>
                <input
                    type="number"
                    name="win"
                    value={teamData.win}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter number of wins"
                />
            </div>

            {/* Draws */}
            <div>
                <label className="block text-gray-700">Draws:</label>
                <input
                    type="number"
                    name="draw"
                    value={teamData.draw}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter number of draws"
                />
            </div>

            {/* Losses */}
            <div>
                <label className="block text-gray-700">Losses:</label>
                <input
                    type="number"
                    name="loss"
                    value={teamData.loss}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter number of losses"
                />
            </div>

            {/* Goals For */}
            <div>
                <label className="block text-gray-700">Goals For:</label>
                <input
                    type="number"
                    name="goalsFor"
                    value={teamData.goalsFor}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter goals for"
                />
            </div>

            {/* Goals Against */}
            <div>
                <label className="block text-gray-700">Goals Against:</label>
                <input
                    type="number"
                    name="goalsAgainst"
                    value={teamData.goalsAgainst}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter goals against"
                />
            </div>

            {/* Points */}
            <div>
                <label className="block text-gray-700">Points:</label>
                <input
                    type="number"
                    name="points"
                    value={teamData.points}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter points"
                />
            </div>

            {/* Year */}
            <div>
                <label className="block text-gray-700">Year:</label>
                <input
                    type="number"
                    name="year"
                    value={teamData.year}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter the year"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add Data
            </button>
        </form>
    );
};

export default AddDataForm;
