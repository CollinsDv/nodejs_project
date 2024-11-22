import React, { useState } from 'react';
import axios from 'axios';

const UpdateDataForm = () => {
    const [teamName, setTeamName] = useState('');
    const [formData, setFormData] = useState({
        "Games Played": '',
        "Win": '',
        "Draw": '',
        "Loss": '',
        "Goals For": '',
        "Goals Against": '',
        "Points": '',
        "Year": '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null); // Feedback message

    // Handle input field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedbackMessage(null);

        // Prepare payload
        const payload = { 
            Team: teamName, 
            ...Object.fromEntries(
                Object.entries(formData).map(([key, value]) => [key, value.trim() || undefined])
            ) 
        };

        try {
            console.log('Submitting payload:', payload); // Debugging aid

            const response = await axios.post('http://localhost:3000/api/updateByTeam', payload);
            setFeedbackMessage('Data updated successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error updating data:', error);
            setFeedbackMessage('Failed to update data. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <form className="space-y-4 bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center">Update Team Data</h2>

                {/* Team Name */}
                <div>
                    <label className="block text-gray-700 font-semibold">Team Name:</label>
                    <input
                        type="text"
                        name="Team"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter team name"
                        required
                    />
                </div>

                {/* Dynamic Fields */}
                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label className="block text-gray-700 font-semibold">{key}:</label>
                        <input
                            type="number" // Ensures numeric input
                            name={key}
                            value={formData[key as keyof typeof formData]}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder={`Enter ${key}`}
                        />
                    </div>
                ))}

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full px-4 py-2 text-white font-semibold rounded ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    disabled={isSubmitting} // Disable button while submitting
                >
                    {isSubmitting ? 'Updating...' : 'Update Data'}
                </button>

                {/* Feedback Message */}
                {feedbackMessage && (
                    <div className={`mt-4 p-3 rounded ${feedbackMessage.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {feedbackMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default UpdateDataForm;
