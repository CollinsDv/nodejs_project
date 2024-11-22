import { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayRecords = () => {
    interface Record {
        Team: string;
        'Games Played': number;
        Win: number;
        Points: number;
    }

    const [records, setRecords] = useState<Record[]>([]);
    const [minWins, setMinWins] = useState<number>(0); // User input for minimum wins
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error message

    useEffect(() => {
        const fetchRecords = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/teams/wins/${minWins}`
                );
                setRecords(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching records:', err);
                setError('Failed to fetch records. Please try again.');
                setRecords([]); // Clear records if an error occurs
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecords();
    }, [minWins]);

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold text-center">Top 10 Records Based on Wins</h2>

            {/* Input for Minimum Wins */}
            <label className="block mt-4">
                <span className="text-gray-700 font-semibold">Minimum Wins:</span>
                <input
                    type="number"
                    value={minWins}
                    onChange={(e) => setMinWins(parseInt(e.target.value) || 0)}
                    className="mt-2 w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                    placeholder="Enter minimum wins"
                    min="0"
                />
            </label>

            {/* Loading Spinner */}
            {isLoading && (
                <p className="text-center text-blue-500 mt-4">Loading records...</p>
            )}

            {/* Error Message */}
            {error && (
                <p className="text-center text-red-500 mt-4">{error}</p>
            )}

            {/* Records Table */}
            {!isLoading && records.length > 0 ? (
                <table className="min-w-full mt-6 border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Team</th>
                            <th className="border border-gray-300 px-4 py-2">Games Played</th>
                            <th className="border border-gray-300 px-4 py-2">Wins</th>
                            <th className="border border-gray-300 px-4 py-2">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr
                                key={index}
                                className={`text-center ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
                            >
                                <td className="border border-gray-300 px-4 py-2">{record.Team}</td>
                                <td className="border border-gray-300 px-4 py-2">{record['Games Played']}</td>
                                <td className="border border-gray-300 px-4 py-2">{record.Win}</td>
                                <td className="border border-gray-300 px-4 py-2">{record.Points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !isLoading && (
                    <p className="text-center mt-4 text-gray-700">
                        {minWins > 0 ? 'No records found for the given criteria.' : 'No records available.'}
                    </p>
                )
            )}
        </div>
    );
};

export default DisplayRecords;
