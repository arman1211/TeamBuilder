const handleAllPlayer = () =>{
    fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=")
    .then(res => res.json())
    .then(data => {
        showAllPlayer(data.player);
    })
}

handleAllPlayer()

const showAllPlayer = (players) =>{
    const playerCardParent = document.querySelector(".player-card-container");
    // console.log(players);
    players.map(player =>{
        const div = document.createElement("div");
        div.className = 'player-card';
        div.innerHTML = `
            <img class="player-img" src="${player.strThumb}" alt="">
            <h2> ${player.strPlayer}</h2>
            <p><strong>Country</strong> : ${player.strNationality}</p>
            <p><strong>Team</strong>: ${player.strTeam}</p>
            <p><strong>Sport</strong>: ${player.strSport}</p>
            <p><strong>Desctioption</strong>: ${player.strDescriptionEN.split(' ').slice(0, 10).join(' ')}</p>
            
            <div class="social-icons">
                <a target="_blank" href="${player.strFacebook}"><i class="fab fa-facebook-f fa-xl"></i></a>
                <a target="_blank" href="${player.strInstagram}"><i class="fab fa-instagram fa-xl"></i></a>
                <a target="_blank" href="${player.strTwitter}"><i class="fab fa-twitter fa-xl"></i></a>
            </div>
            <div class="player-btn">
                <button type="button" onclick = "handleModalShow(${player.idPlayer})" class="btn btn-primary" data-bs-toggle="modal"  data-bs-target="#playerDetailsModal"> Details</button>
                <button class="btn btn-primary" onclick = "handleAddToSquad(${player.idPlayer})">Add to Group</button>
            </div>
    
        `
        if(player.strThumb) playerCardParent.appendChild(div);
    })
}


// search by player name

const handleSearchByPlayerName = ()=>{
    const searchInput = document.getElementById("search")

    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchInput.value}`)
    .then(res => res.json())
    .then(data => {
        const playerCardParent = document.querySelector(".player-card-container");
        playerCardParent.innerHTML = ""
        showAllPlayer(data.player);
        console.log(data.player);
    })
    
}

const handleModalShow = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then(res => res.json())
    .then(data => {
        
        player = data.players[0];

        const modalTitle = document.querySelector('#playerDetailsModal .modal-title');
        const modalBody = document.querySelector('#playerDetailsModal #player-info');
        modalTitle.textContent = player.strPlayer;
        modalBody.innerHTML = `
            <img class="player-img-modal" src="${player.strThumb}" alt="">
            <p>ID: ${player.idPlayer}</p>
            <p><strong>Country</strong>: ${player.strNationality}</p>
            <p><strong>Gender</strong>: ${player.strGender}</p>
            <p><strong>Birth Date</strong>: ${player.dateBorn}</p>
            <p><strong>Team</strong>: ${player.strTeam}</p>
            <p><strong>Position</strong>: ${player.strPosition}</p>
            <p><strong>Sport</strong>: ${player.strSport}</p>
            <p><strong>Birth location</strong>: ${player.strBirthLocation}</p>
            <p><strong>Description</strong>:  ${player.strDescriptionEN}</p>
        `;
      
        const playerDetailsModalElement = document.getElementById('playerDetailsModal');
        const playerDetailsModal = bootstrap.Modal.getOrCreateInstance(playerDetailsModalElement);
  
        playerDetailsModal.show();

        const closeButton = playerDetailsModalElement.querySelector('.btn-close');
        closeButton.addEventListener('click', () => playerDetailsModal.hide());


    })
}



const handleAddToSquad = (id) =>{
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then(res => res.json())
    .then(data => {
        
        player = data.players[0];

        const squadParent = document.querySelector(".player-squad");
        const playerCntElement = document.getElementById("player-cnt");
        // console.log(playerCnt);
        let playerCnt = playerCntElement.innerText;
        let playerCount = parseInt(playerCnt);
        playerCount = playerCount + 1;
        const div = document.createElement("div");
        div.className = "player-card-squad";
        div.innerHTML = 
        `
            <img src="${player.strThumb}" alt="Ishan Kishan">
            <div class="player-info">
                <h3>${player.strPlayer}</h3>
                <p>${player.strPosition}</p>
            </div>
        `
        if(playerCount<=11){
            squadParent.appendChild(div)
            playerCntElement.innerText = playerCount.toString();
        }
        else{
            alert("Sorry, player can not be more than 11");
        }
    
    
    })
}