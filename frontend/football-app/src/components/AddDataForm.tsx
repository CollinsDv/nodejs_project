import React, { useState } from 'react';
import axios from 'axios';

const AddDataForm = () => {
    const [formData, setFormData] = useState({
        team: '',
        gamesPlayed: '',
        win: '',
        draw: '',
        loss: '',
        goalsFor: '',
        goalsAgainst: '',
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
            const response = await axios.post('/api/add', formData);
            alert('Data added successfully');
            console.log(response.data);
        } catch (error) {
            console.error('Error adding data', error);
        }
    };

    return (
        <form className="space-y-4 bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold">Add Team Data</h2>
            {Object.keys(formData).map((key) => (
                <div key={key}>
                    <label className="block text-gray-700 capitalize">{key}:</label>
                    <input
                        type="text"
                        name={key}
                        value={formData[key as keyof typeof formData]}
                        onChange={handleChange}
                        placeholder={`Enter ${key}`}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            ))}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Submit
            </button>
        </form>
    );
};

export default AddDataForm;
