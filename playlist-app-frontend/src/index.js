const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.addEventListener('load', e => {
    getTrainers().then(trainers => renderTrainers(trainers))

});


async function getTrainers() {
    return await fetch(TRAINERS_URL).then(res => res.json()).then(json => json);
}

function renderTrainers(trainers) {
    trainers.forEach(t => {
        document.querySelector('main').innerHTML += `
            <div class="card" data-id="${t.id}"><p>${t.name}</p>
                <button onclick="addPokemon(event)" data-trainer-id="${t.id}">Add Pokemon</button>
                <ul>
                    ${t.pokemons.map(p => `<li>${p.nickname} (${p.species}) <button onclick="releasePokemon(event)" class="release" data-pokemon-id="${p.id}">Release</button></li>`).join('')}
                </ul>
            </div>
        `
    });
}

function addPokemon(event) {
    createPokemon(event.target.getAttribute("data-trainer-id")).then(p => {
        console.log(p)
        event.target.parentNode.querySelector("ul").innerHTML += `<li>${p.nickname} (${p.species}) <button onclick="releasePokemon(event)" class="release" data-pokemon-id="${p.id}">Release</button></li>`
    });
}

function releasePokemon(event) {
    deletePokemon(event.target.getAttribute("data-pokemon-id")).then(res => res.success ? event.target.parentNode.remove() : null);
}

async function createPokemon(trainerId) {
    return await fetch(`${POKEMONS_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            trainer_id: trainerId
        })
    }).then(res => res.json()).then(json => json);
}

async function deletePokemon(pokemonId) {
    return await fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "DELETE"
    }).then(res => res.json()).then(json => json);
}