import { useState, useEffect } from 'react';
import axios from 'axios';

const AverageGoals = () => {
    interface Record {
        team: string;
        games_played: number;
        win: number;
        draw: number;
        loss: number;
        goals_for: number;
        goals_against: number;
        points: number;
        year: number;
        avg_goals_for: number;
    }

    const [year, setYear] = useState<number>(2024); // Default year
    const [minGoalsFor] = useState<number>(0); // User input for average goals
    const [records, setRecords] = useState<Record[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecords = async () => {
            // Clear previous records and set loading state
            setRecords([]);
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `http://localhost:3000/api/teams/goals/${year}/${minGoalsFor}`
                );
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching records:', error);
                setError('Failed to fetch records. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (year && minGoalsFor >= 0) {
            fetchRecords();
        }
    }, [year, minGoalsFor]);

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold">Teams with High Average Goals For</h2>

            <div className="mt-4 flex gap-4">
                <label className="block w-1/2">
                    <span className="text-gray-700">Year:</span>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value))}
                        className="mt-1 block w-full px-3 py-2 border rounded shadow focus:ring focus:ring-blue-500"
                        placeholder="Enter year"
                    />
                </label>
            </div>

            {loading && <p className="text-blue-500 mt-4">Loading records...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {records.length > 0 && !loading ? (
                <table className="min-w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-3 py-2">Team</th>
                            <th className="border border-gray-300 px-3 py-2">Games Played</th>
                            <th className="border border-gray-300 px-3 py-2">Wins</th>
                            <th className="border border-gray-300 px-3 py-2">Draws</th>
                            <th className="border border-gray-300 px-3 py-2">Losses</th>
                            <th className="border border-gray-300 px-3 py-2">Goals For</th>
                            <th className="border border-gray-300 px-3 py-2">Goals Against</th>
                            <th className="border border-gray-300 px-3 py-2">Points</th>
                            <th className="border border-gray-300 px-3 py-2">Year</th>
                            <th className="border border-gray-300 px-3 py-2">Avg Goals For</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr key={index} className="text-center">
                                <td className="border border-gray-300 px-3 py-2">{record.team}</td>
                                <td className="border border-gray-300 px-3 py-2">{record.games_played}</td>
                                <td className="border border-gray-300 px-3 py-2">{record.win}</td>
                                <td className="border border-gray-300 px-3 py-2">{record.draw}</td>
                                <td className="border border-gray-300 px-3 py-2">{record.loss}</td>
                                <td className="border border-gray-300 px-3 py-2">{record.goals_for}</td>
                                <td className="border border-gray-300 px-3 py-2">{record.goals_against}</td>
                                <td className="border border-gray-300 px-3 py-2">{record.points}</td>
                                <td className="border border-gray-300 px-3 py-2">{record.year}</td>
                                <td className="border border-gray-300 px-3 py-2">{record.avg_goals_for.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !loading && <p className="text-center mt-4">No records found.</p>
            )}
        </div>
    );
};

export default AverageGoals;