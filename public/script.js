function updateTable() {
    const tbody = document.querySelector('tbody'); 
  
    tbody.innerHTML = '';
  
    fetch('http://localhost:3000/souls')
      .then(response => response.json())
      .then(data => {
        data.forEach((soul) => {
          const row = document.createElement('tr'); 
  
          const idCell = createTableCell(soul.id);
          const nameCell = createTableCell(soul.name);
          const ownerCell = createTableCell(soul.owner);
          const locationCell = createTableCell(soul.location);
  
          [idCell, nameCell, ownerCell, locationCell].forEach(cell => {
            cell.classList.add('py-2', 'text-center');
          });
  
          row.appendChild(idCell);
          row.appendChild(nameCell);
          row.appendChild(ownerCell);
          row.appendChild(locationCell);
  
          tbody.appendChild(row); 
        });
      })
      .catch(error => {
        console.error('Erro ao obter os dados do servidor:', error);
      });
  }
  
  function createTableCell(content) {
    const cell = document.createElement('td');
    cell.textContent = content;
    return cell;
  }

  function saveSoul(event) {
    event.preventDefault();
  
    const nameInput = document.getElementById('soul-name');
    const ownerInput = document.getElementById('soul-owner');
    const locationInput = document.getElementById('soul-location');
  
    const name = nameInput.value;
    const owner = ownerInput.value;
    const location = locationInput.value;
    const soul = {
      name: name,
      owner: owner,
      location: location
    };
  
    fetch('http://localhost:3000/souls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(soul)
    })
      .then(response => response.json())
      .then(data => {
        updateTable(); 
        nameInput.value = ''; 
        ownerInput.value = ''; 
        locationInput.value = '';
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  const form = document.querySelector('form');
  form.addEventListener('submit', saveSoul);
  window.addEventListener('DOMContentLoaded', updateTable);
  