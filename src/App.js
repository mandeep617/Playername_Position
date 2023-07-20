import React, { useState } from 'react';
import './App.css';

function App() {
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const positions = ['all','C', 'LW', 'D'];
  const fetchAllPlayers = (position) => {
    fetch('http://localhost:4000/fetch-player')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setIsDataFetched(true);
        if (position === 'all') {
          setFilteredPlayers(data);
        } else {
          const filtered = data.filter(player => player.position === position);
          setFilteredPlayers(filtered);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

   
  };


  return (
    <div className="container">
      <h1>Players List</h1>

      {positions.map((position, index) => (
        <button key={index} onClick={() =>{fetchAllPlayers(position)}}>
          Show Players with Position '{position}'
        </button>
      ))}
      {isDataFetched && (
      <table><thead>
          <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Position</th>
        </tr>
        </thead>
        <tbody>
        {filteredPlayers.map((player,index) => (
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
