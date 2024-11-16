import React, { useState } from 'react';
import axios from 'axios';

const AverageGoals = () => {
    const [year, setYear] = useState('');
    const [teams, setTeams] = useState<{ name: string; averageGoals: number }[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/api/averageGoals?year=${year}`);
            setTeams(response.data);
        } catch (error) {
            console.error('Error fetching average goals', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold">Teams with Average Goals for Year</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <label className="block text-gray-700" htmlFor="year">Year:</label>
                <input
                    type="text"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    title="Enter the year"
                    placeholder="e.g., 2023"
                    className="border rounded p-2 w-full"
                />
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
            {teams.length > 0 && (
                <ul className="list-disc ml-4">
                    {teams.map((team, index) => (
                        <li key={index}>{team.name} - {team.averageGoals} goals</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AverageGoals;
