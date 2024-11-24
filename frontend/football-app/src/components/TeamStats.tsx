import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

// Define the shape of the team stats data
interface TeamStatsData {
  _id: string; // Team name
  total_games_played: number;
  total_draws: number;
  total_wins: number;
}

const TeamStats = () => {
  const [team, setTeam] = useState<string>(''); // Team name input
  const [teamStats, setTeamStats] = useState<TeamStatsData | null>(null); // Team stats data
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error message

  // Fetch team stats when team name changes
  const fetchTeamStats = async () => {
    if (!team) {
      return; // Don't fetch if team name is empty
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get<TeamStatsData>(`http://localhost:3000/api/team/stats/${team}`);
      setTeamStats(response.data);
    } catch (err) {
      setError('Failed to fetch team stats. Please try again.');
      setTeamStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetch when the team name changes
  useEffect(() => {
    fetchTeamStats();
  }, [team]);

  // Handle input change for team name
  const handleTeamChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeam(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-center">Team Stats</h2>
      
      {/* Input for Team Name */}
      <label className="block mt-4">
        <span className="text-gray-700 font-semibold">Enter Team Name:</span>
        <input
          type="text"
          value={team}
          onChange={handleTeamChange}
          className="mt-2 w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
          placeholder="Enter team name"
        />
      </label>

      {/* Loading Spinner */}
      {isLoading && (
        <p className="text-center text-blue-500 mt-4">Loading team stats...</p>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500 mt-4">{error}</p>
      )}

      {/* Display Team Stats */}
      {teamStats && !isLoading && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-center">{teamStats._id} Stats</h3>
          <p><strong>Total Games Played:</strong> {teamStats.total_games_played}</p>
          <p><strong>Total Wins:</strong> {teamStats.total_wins}</p>
          <p><strong>Total Draws:</strong> {teamStats.total_draws}</p>
        </div>
      )}
    </div>
  );
};

export default TeamStats;
