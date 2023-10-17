let animals = [];

document.addEventListener("DOMContentLoaded", function(){
    getAnimals();
});

function getAnimals() {
    fetch("http://localhost:3000/characters", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(data => data.json())
    .then(response => {
        animals = [...response];
        displayAnimals(response);
        console.log(animals);
    });
}

// Display animals on the front-end
function displayAnimals(animals) {
    const animalbar = document.querySelector("#animal-bar");
    for (const animal of animals) {
        const span = document.createElement("span");
        span.innerText = animal.name;
        span.setAttribute("id", animal.id);
        span.addEventListener("click", (event) => {
            displayAnimalDetails(getAnimalById(animals, parseInt(event.target.id)));
        });
        animalbar.appendChild(span);
    }
}

function displayAnimalDetails(animal) {
    const image = document.querySelector("#image");
    const voteButton = document.querySelector("#cast-votes");
    const animalDetailsText = document.querySelector("#animal-details-text");
    image.src = animal.image;

    // Add an event listener to the vote button
    voteButton.addEventListener("click", () => {
        const votesInput = document.querySelector("#votes");
        const votes = parseInt(votesInput.value);

        // Send the vote to the server
        sendVoteToServer(animal.id, votes);

        // Update the displayed vote count
        animalDetailsText.innerText = `Animal: ${animal.name}, Votes: ${votes}`;
    });
}

function getAnimalById(animals, id) {
    return animals.find(animal => animal.id === id);
}

function sendVoteToServer(animalId, votes) {
    // Implement the code to send the vote to the server using fetch
    fetch(`http://localhost:3000/vote/${animalId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ votes })
    }).then(response => {

    });
}

    