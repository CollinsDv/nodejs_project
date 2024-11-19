import React, { useState } from 'react';
import axios from 'axios';

const UpdateDataForm = () => {
    const [teamName, setTeamName] = useState('');
    const [formData, setFormData] = useState({
        games_played: '',
        win: '',
        draw: '',
        loss: '',
        goals_for: '',
        goals_against: '',
        points: '',
        year: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Change the endpoint URL to '/api/updateByTeam' based on the backend
            const response = await axios.post('http://localhost:3000/api/updateByTeam', { team: teamName, ...formData });
            alert('Data updated successfully');
            console.log(response.data);
        } catch (error) {
            console.error('Error updating data', error);
        }
    };

    return (
        <form className="space-y-4 bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold">Update Team Data</h2>
            <div>
                <label className="block text-gray-700">Team Name:</label>
                <input
                    type="text"
                    name="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    title="teamName"
                    placeholder="Enter team name"
                />
            </div>
            {Object.keys(formData).map((key) => (
                <div key={key}>
                    <label className="block text-gray-700 capitalize">{key.replace(/_/g, ' ')}:</label>
                    <input
                        type="text"
                        name={key}
                        value={formData[key as keyof typeof formData]}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        title={key}
                        placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                    />
                </div>
            ))}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Update
            </button>
        </form>
    );
};

export default UpdateDataForm;
