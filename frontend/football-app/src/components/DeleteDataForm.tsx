import React, { useState } from 'react';
import axios from 'axios';

const DeleteDataForm = () => {
    const [teamName, setTeamName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Make a DELETE request with the team name in the body
            const response = await axios.delete('http://localhost:3000/api/deleteByTeam', { data: { Team: teamName } });
            
            // Show success message if the request succeeds
            alert(response.data.message || 'Team data deleted successfully!');
        } catch (error) {
            console.error('Error deleting data', error);
            
            // Show an error message if something goes wrong
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.message || 'Failed to delete data');
            } else {
                alert('Failed to delete data. Please try again later.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold">Delete Team Data</h2>
            <div>
                <label className="block text-gray-700">Team Name:</label>
                <input
                    type="text"
                    name="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="Enter team name"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Delete
            </button>
        </form>
    );
};

export default DeleteDataForm;
