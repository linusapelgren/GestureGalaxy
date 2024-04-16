// Get the scores from localStorage
let scores = JSON.parse(localStorage.getItem('scores'));

// Get the table
let table = document.querySelector('.leaderboardsTable table');

// Create a new row for the player's score
let row = document.createElement('tr');
row.innerHTML = `
    <td>Player</td>
    <td>${scores.player}</td>
    <td>${scores.computer}</td>
`;

// Add the row to the table
table.appendChild(row);