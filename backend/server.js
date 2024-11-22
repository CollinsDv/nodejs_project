const express = require('express');
const connection = require('./models/connection');
const Model = require('./models/model');
const path = require('path');

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
// Serve the frontend build files
app.use(express.static(path.join(__dirname, '../frontend/football-app/dist')));

// Post Method
app.post('/api/add', async (req, res) => {
  console.log(req.body);
  const data = new Model({
    "Team": req.body["Team"],
    "Games Played": req.body["Games Played"],
    "Win": req.body["Win"],
    "Draw": req.body["Draw"],
    "Loss": req.body["Loss"],
    "Goals For": req.body["Goals For"],
    "Goals Against": req.body["Goals Against"],
    "Points": req.body["Points"],
    "Year": req.body["Year"]
  });

  try {
    const dataToSave = await data.save();
    console.log(`Data saved to collection: ${Model.collection.name}`);
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update by Team Method
app.post('/api/updateByTeam', async (req, res) => {
  const { Team, "Games Played": gamesPlayed, Win, Draw, Loss, "Goals For": goalsFor, "Goals Against": goalsAgainst, Points, Year } = req.body;

  try {
    const updatedData = {
      "Games Played": gamesPlayed,
      "Win": Win,
      "Draw": Draw,
      "Loss": Loss,
      "Goals For": goalsFor,
      "Goals Against": goalsAgainst,
      "Points": Points,
      "Year": Year
    };

    const options = { new: true }; // ensures updated items are returned
    const result = await Model.findOneAndUpdate({ "Team": Team }, updatedData, options);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete by Team Method
app.delete('/api/deleteByTeam', async (req, res) => {
  const { Team } = req.body;

  try {
    const result = await Model.findOneAndDelete({ "Team": Team });

    if (result) {
      res.status(200).json({ message: `Team ${Team} has been deleted.` });
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get total games played, draws, and wins for a given year
app.get('/api/stats/:year', async (req, res) => {
  const { year } = req.params;

  if (!year) {
    return res.status(400).json({ message: 'Year parameter is required' });
  }

  try {
    const stats = await Model.aggregate([
      { $match: { "Year": parseInt(year) } },
      {
        $group: {
          _id: "$Year",
          total_games_played: { $sum: "$Games Played" },
          total_draws: { $sum: "$Draw" },
          total_wins: { $sum: "$Win" }
        }
      }
    ]);

    if (stats.length > 0) {
      res.status(200).json(stats[0]);
    } else {
      res.status(404).json({ message: 'No data found for the given year' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get first 10 records with wins greater than a given value
app.get('/api/teams/wins/:minWins', async (req, res) => {
  const { minWins } = req.params;

  if (!minWins) {
    return res.status(400).json({ message: 'Minimum wins parameter is required' });
  }

  try {
    const teams = await Model.find({ "Win": { $gt: parseInt(minWins) } })
      .limit(10)
      .exec();

    if (teams.length > 0) {
      res.status(200).json(teams);
    } else {
      res.status(404).json({ message: 'No teams found with wins greater than the given value' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get teams with average "Goals For" greater than a given value for a given year
app.get('/api/teams/goals/:year/:minGoalsFor', async (req, res) => {
  const { year, minGoalsFor } = req.params;

  if (!year || !minGoalsFor) {
    return res.status(400).json({ message: 'Year and minimum goals for parameters are required' });
  }

  try {
    const teams = await Model.aggregate([
      { $match: { "Year": parseInt(year) } },
      {
        $group: {
          _id: "$Team",
          team: { $first: "$Team" },
          games_played: { $first: "$Games Played" },
          win: { $first: "$Win" },
          draw: { $first: "$Draw" },
          loss: { $first: "$Loss" },
          goals_for: { $first: "$Goals For" },
          goals_against: { $first: "$Goals Against" },
          points: { $first: "$Points" },
          year: { $first: "$Year" },
          avg_goals_for: { $avg: "$Goals For" }
        }
      },
      { $match: { avg_goals_for: { $gt: parseInt(minGoalsFor) } } }
    ]);

    if (teams.length > 0) {
      res.status(200).json(teams);
    } else {
      res.status(404).json({ message: 'No teams found with average goals for greater than the given value for the specified year' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log('server started at port 3000');
});