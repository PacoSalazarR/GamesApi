const uri = 'api/games';
let games = [];

function getGames() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayGames(data))
        .catch(err => console.error('unable to get games', err));
}

function addGame() {
    const addTitleTextbox = document.getElementById('add-title');
    const addGenreTextbox = document.getElementById('add-genre');
    const addDescriptionTextbox = document.getElementById('add-description');
    const addYearTextbox = document.getElementById('add-year');

    const game = {
        title: addTitleTextbox.value.trim(),
        genre: addGenreTextbox.value.trim(),
        description: addDescriptionTextbox.value.trim(),
        year: addYearTextbox.value
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    })
        .then(response => response.json())
        .then(() => {
            getGames();
            addTitleTextbox.value = '';
            addGenreTextbox.value = '';
            addDescriptionTextbox.value = '';
            addYearTextbox.value = 0;
        })
        .catch(error => console.error('unable to add game', error));
}

function deleteGame(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getGames())
        .catch(error => console.error('unable to delete item', error));
}

function displayEditForm(id) {
    document.getElementById('addForm').style.display = 'none';
    const game = games.find(game => game.id === id);

    document.getElementById('edit-id').value = game.id
    document.getElementById('edit-title').value = game.title
    document.getElementById('edit-genre').value = game.genre
    document.getElementById('edit-description').value = game.description
    document.getElementById('edit-year').value = game.year
    document.getElementById('editForm').style.display = 'block';
}

function updateGame() {
    const gameId = document.getElementById('edit-id').value;
    const gameYear = document.getElementById('edit-year').value; 

    const game = {
        id: parseInt(gameId, 10),
        title: document.getElementById('edit-title').value,
        genre: document.getElementById('edit-genre').value,
        description: document.getElementById('edit-description').value,
        year: parseInt(gameYear, 10),
    };

    fetch(`${uri}/${gameId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    })
        .then(() => getGames())
        .catch(error => console.error('Unable to update game', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('addForm').style.display = 'block';
}

function _displayCount(gameCount) {
    const name = (gameCount === 1) ? 'game' : 'games';

    document.getElementById('counter').innerText = `${gameCount} ${name}`;
}

function _displayGames(data) {
    const tBody = document.getElementById('games');
    tBody.innerText = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(game => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${game.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteGame(${game.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNodeId = document.createTextNode(game.id)
        td1.appendChild(textNodeId);

        let td2 = tr.insertCell(1);
        let textNodeTitle = document.createTextNode(game.title)
        td2.appendChild(textNodeTitle);

        let td3 = tr.insertCell(2);
        let textNodeGenre = document.createTextNode(game.genre)
        td3.appendChild(textNodeGenre);

        let td4 = tr.insertCell(3);
        let textNodeDescription = document.createTextNode(game.description)
        td4.appendChild(textNodeDescription);

        let td5 = tr.insertCell(4);
        let textNodeYear = document.createTextNode(game.year)
        td5.appendChild(textNodeYear);

        let td6 = tr.insertCell(5);
        td6.appendChild(editButton);

        let td7 = tr.insertCell(6);
        td7.appendChild(deleteButton);
    });

    games = data;
}
