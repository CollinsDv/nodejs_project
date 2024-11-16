import React, { useState } from 'react';
import axios from 'axios';

const DeleteDataForm = () => {
    const [teamName, setTeamName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/delete', { teamName });
            alert('Data deleted successfully');
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting data', error);
        }
    };

    return (
        <form className="space-y-4 bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold">Delete Team Data</h2>
            <div>
                <label className="block text-gray-700">Team Name:</label>
                <input
                    type="text"
                    name="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    title="Team Name"
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
