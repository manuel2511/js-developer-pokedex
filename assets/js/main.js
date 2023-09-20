const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
            <li class="pokemon ${pokemon.type}" onclick="openModal('viewModal','${pokemon.number }','${pokemon.name }','${pokemon.type }','${[pokemon.types] }','${pokemon.photo }','${pokemon.stats_name }','${pokemon.stats_base }'  )" >
                <span class="number">#${pokemon.number.toFixed(0).padStart(3, "0") }</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type white-type">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>   
            <div id="viewModal" class="modal ">
                <div id="pokemon-details">
                    <!--content-->
                </div>
            </div>

        `
}



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


async function openModal(viewModal, idPokemon, namePokemon,typePokemon, typesPokemon, photoPokemon, statsNamePokemon,statsBasePokemon) {
    debugger
    const modal = document.getElementById(viewModal)
    const listTypes = typesPokemon
    const types = listTypes.split(",")
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'    
    const detailsContainer = document.getElementById("pokemon-details");
        detailsContainer.innerHTML = `
        <div class="content-modal ${typePokemon} ">
            <div class= "hender-modal ">
                <div class= "hender-modal-icon ">
                    <i class="fa-solid fa-arrow-left" onclick="closeModal('viewModal')"></i>   
                    <i class="fa-regular fa-heart"></i> 
                </div>
                <span class="name">${namePokemon}</span>
                <span class="number">#${idPokemon}</span>
                <div class= "hender-modal-types ">
                     <ol class="types-detail ">
                        ${types.map((typeDetail) => `<li class="types-detail-li white-type">${typeDetail}</li>`).join(' ')}
                    </ol>
                </div>
                <img src="${photoPokemon}"
                alt="${namePokemon}">
            </div>
            <div class="body-modal">
                <div class"menu-modal-detail">
                    <button class="tab-button active-button" onclick="openTab('tab1')" >About</button>
                    <button class="tab-button " onclick="openTab('tab2')">Base Stats</button>
                    <button class="tab-button " onclick="openTab('tab3')">Evolution</button>
                    <button class="tab-button " onclick="openTab('tab4')">Moves</button>
                </div>
                <div id="tab1" class="tab-content active-tab">
                    <h2>Detalhes da Aba 1</h2>
                    <p>Conteúdo da Aba 1 vai aqui.</p>
                </div>
                <div id="tab2" class="tab-content">
                    <h2>Detalhes da Aba 2</h2>
                    <p>Conteúdo da Aba 2 vai aqui.</p>
                </div>
                <div id="tab3" class="tab-content">
                    <h2>Detalhes da Aba 3</h2>
                    <p>Conteúdo da Aba 3 vai aqui.</p>
                </div>
                <div id="tab4" class="tab-content">
                    <h2>Detalhes da Aba 4</h2>
                    <p>Conteúdo da Aba 4 vai aqui.</p>
                </div>            
            </div>
            <div class="footer-modal">
                
            </div>
        </div>
        
        `
    }
    
 function openTab(tabId) {
        const tabContents = document.querySelectorAll('.tab-content');
        const tabButtons = document.querySelectorAll('.tab-button');

        tabContents.forEach(tab => {
            tab.classList.remove('active-tab');
        });

        tabButtons.forEach(button => {
            button.classList.remove('active-button');
        });

        const selectedTab = document.getElementById(tabId);
        const selectedButton = document.querySelector(`[onclick="openTab('${tabId}')"]`);

        selectedTab.classList.add('active-tab');
        selectedButton.classList.add('active-button');
}

function closeModal(viewModal) {
    const modal = document.getElementById(viewModal)
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'
}
