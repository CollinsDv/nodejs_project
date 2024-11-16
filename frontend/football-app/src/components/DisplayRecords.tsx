import { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayRecords = () => {
    interface Record {
        team: string;
        gamesPlayed: number;
        win: number;
        points: number;
    }
    
    const [records, setRecords] = useState<Record[]>([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get('/api/records');
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching records', error);
            }
        };
        fetchRecords();
    }, []);

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold">Team Records</h2>
            <table className="min-w-full border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Team</th>
                        <th className="border border-gray-300 px-4 py-2">Games Played</th>
                        <th className="border border-gray-300 px-4 py-2">Win</th>
                        <th className="border border-gray-300 px-4 py-2">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{record.team}</td>
                            <td className="border border-gray-300 px-4 py-2">{record.gamesPlayed}</td>
                            <td className="border border-gray-300 px-4 py-2">{record.win}</td>
                            <td className="border border-gray-300 px-4 py-2">{record.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayRecords;
