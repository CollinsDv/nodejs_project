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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/teams/wins/${minWins}`
                );
                setRecords(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching records:', error);
                setError('Failed to fetch records. Please try again.');
            }
        };

        fetchRecords();
    }, [minWins]);

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold">Top 10 Records Based on Wins</h2>

            <label className="block mt-4">
                <span className="text-gray-700">Minimum Wins:</span>
                <input
                    type="number"
                    value={minWins}
                    onChange={(e) => setMinWins(parseInt(e.target.value))}
                    className="mt-1 block w-full px-3 py-2 border rounded shadow focus:ring focus:ring-blue-500"
                    placeholder="Enter minimum wins"
                />
            </label>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {records.length > 0 ? (
                <table className="min-w-full border-collapse border border-gray-300 mt-4">
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
                            <tr key={index} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{record.Team}</td>
                                <td className="border border-gray-300 px-4 py-2">{record['Games Played']}</td>
                                <td className="border border-gray-300 px-4 py-2">{record.Win}</td>
                                <td className="border border-gray-300 px-4 py-2">{record.Points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center mt-4">No records found.</p>
            )}
        </div>
    );
};

export default DisplayRecords;
