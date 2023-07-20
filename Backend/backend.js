const express = require('express');
const cors = require('cors');
const axios = require('axios');
const he = require('he');

const app = express();
const port = 4000;

app.use(cors());

app.get('/fetch-player', async (req, res) => {
  try {
    const response = await axios.get('http://35.154.222.141:4000/fetch-player');
    const decodedResponse = he.decode(response.data);
    const games = JSON.parse(decodedResponse).Games;
    const players = [];

    games.forEach(game => {
      const teams = game.Teams;

      teams.forEach(team => {
        const teamPlayers = team.Players.map(player => ({
          firstName: player.Firstname,
          lastName: player.Lastname,
          position: player.Position,
        }));
        players.push(...teamPlayers);
      });
    });

    res.json(players);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
