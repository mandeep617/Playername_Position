import React, { useState } from 'react';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const handleFetchClick = () => {
    fetch('http://localhost:4000/fetch-player')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPlayers(data);
        setIsDataFetched(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="container">
      <h1>Player List</h1>
      <button onClick={handleFetchClick}>Click to Fetch</button>
      {isDataFetched && (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player,index) => (
              <tr key={index}>
                <td>{player.firstName}</td>
                <td>{player.lastName}</td>
                <td>{player.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
