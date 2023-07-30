let pokemonRepository = (function(){
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let modalContainer = document.querySelector('#modal-container');

    function getAll() {
        return pokemonList;
    }

    function add(item) {
        if (typeof item === 'object', Object.keys(item).includes('name', 'height', 'types'))  {
            pokemonList.push(item)
        }else {
            alert('Verify the Pokemon information.')
        }
    }

    //creates buttons for each pokemon that displays their name
    function addListItem(pokemon) {
        let pokemonListVar = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button');
        listItem.appendChild(button);
        pokemonListVar.appendChild(listItem);
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    //gets the list of pokemon and their details from the api
    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e)
        })
    }

    //loads the details we want from the api
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.id = details.id;
            item.imageUrl = details.sprites.front_default;
            item.height = details.height / 10;
            item.types = details.types.map((types) => types.type.name);
        }).catch(function (e) {
            console.error(e);
        });
    }

    //hides modal when this function is called
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    //closes the modal if the escape key is pressed while modal is visible
    window.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    //create modal:
    function showModal(pokemon) {
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'close';
        closeButtonElement.addEventListener('click', hideModal);

        let idElement = document.createElement('p');
        idElement.innerText = `# ${pokemon.id}`;

        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;

        let nameElement = document.createElement('h1');
        nameElement.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

        let heightElement = document.createElement('p');
        heightElement.innerText = `${pokemon.height} meters`;

        let typesElement = document.createElement('p');
        typesElement.innerText = pokemon.types;

        modal.appendChild(closeButtonElement);
        modal.appendChild(idElement);
        modal.appendChild(imageElement);
        modal.appendChild(nameElement);
        modal.appendChild(heightElement);
        modal.appendChild(typesElement);
        modalContainer.appendChild(modal);

        //make modal visible when this function is called
        modalContainer.classList.add('is-visible');

        //closes the modal if user clicks outside of modal
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if(target === modalContainer) {
                hideModal();
            }
        });
    }

    //show modal:
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
    })
    };


    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        hideModal: hideModal,
        showDetails: showDetails,
        showModal: showModal
    };
    
})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

function myLoopFunction(pokemon) {
    pokemonRepository.addListItem(pokemon)
}
pokemonRepository.getAll().forEach(myLoopFunction);

//open the modal when a pokemon's button is clicked
document.querySelector(pokemon).addEventListener('click', () => {
    showModal(pokemon)
})