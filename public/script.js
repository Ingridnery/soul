function saveSoul(event) {
  event.preventDefault();

  const nameInput = document.getElementById('soul-name');
  const ownerInput = document.getElementById('soul-owner');
  const locationInput = document.getElementById('soul-location');
  const saveButton = document.getElementById('save-btn');
  const soulId = saveButton.dataset.id;

  const name = nameInput.value;
  const owner = ownerInput.value;
  const location = locationInput.value;
  const soul = {
    name: name,
    owner: owner,
    location: location
  };

  let requestUrl = 'http://localhost:3000/souls';
  let requestMethod = 'POST';

  if (soulId) {
    requestUrl = `http://localhost:3000/souls/${soulId}`;
    requestMethod = 'PUT';
  }

  fetch(requestUrl, {
    method: requestMethod,
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
      saveButton.textContent = 'Salvar';
      saveButton.dataset.id = ''; // Limpa o atributo "data-id" do botão de salvar
      const cancelButton = document.getElementById('cancel-btn');
      cancelButton.style.display = 'none';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function editSoul(soulId) {
  const nameInput = document.getElementById('soul-name');
  const ownerInput = document.getElementById('soul-owner');
  const locationInput = document.getElementById('soul-location');

  const saveButton = document.getElementById('save-btn');
  saveButton.textContent = 'Atualizar';
  saveButton.dataset.id = soulId;

  const cancelButton = document.getElementById('cancel-btn');
  cancelButton.style.display = 'inline-block';

  fetch(`http://localhost:3000/souls/${soulId}`)
    .then(response => response.json())
    .then(data => {
      nameInput.value = data.name;
      ownerInput.value = data.owner;
      locationInput.value = data.location;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function deleteSoul(soulId) {
  if (confirm('Tem certeza de que deseja excluir esta alma?')) {
    fetch(`http://localhost:3000/souls/${soulId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        updateTable();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

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
        const optionsCell = createOptionsCell(soul.id);

        [idCell, nameCell, ownerCell, locationCell].forEach(cell => {
          cell.classList.add('py-2', 'text-center');
        });

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(ownerCell);
        row.appendChild(locationCell);
        row.appendChild(optionsCell);

        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Erro ao obter os dados do servidor:', error);
    });
}

// =============== END OF CRUD FUNCTIONS ===============

function createTableCell(content) {
  const cell = document.createElement('td');
  cell.textContent = content;
  return cell;
}

function createOptionsCell(soulId) {
  const cell = document.createElement('td');

  const editButton = document.createElement('button');
  editButton.className = 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer edit-btn';
  editButton.textContent = 'Editar';
  editButton.addEventListener('click', () => editSoul(soulId));

  const deleteButton = document.createElement('button');
  deleteButton.className = 'bg-red-500 hover:bg-red-600 text-white ml-3 mt-3 px-4 py-2 rounded cursor-pointer delete-btn';
  deleteButton.textContent = 'Excluir';
  deleteButton.addEventListener('click', () => deleteSoul(soulId));

  cell.appendChild(editButton);
  cell.appendChild(deleteButton);

  return cell;
}

function cancelEdit(event) {
  event.preventDefault();
  const nameInput = document.getElementById('soul-name');
  const ownerInput = document.getElementById('soul-owner');
  const locationInput = document.getElementById('soul-location');
  const saveButton = document.getElementById('save-btn');

  nameInput.value = '';
  ownerInput.value = '';
  locationInput.value = '';
  saveButton.textContent = 'Salvar';
  saveButton.dataset.id = ''; // Limpa o atributo "data-id" do botão de salvar
  const cancelButton = document.getElementById('cancel-btn');
  cancelButton.style.display = 'none';
}

const form = document.querySelector('form');
form.addEventListener('submit', saveSoul);
window.addEventListener('DOMContentLoaded', updateTable);

const cancelButton = document.getElementById('cancel-btn');
cancelButton.addEventListener('click', cancelEdit);
