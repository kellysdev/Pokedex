let pokemonRepository = (function(){
    let repository = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let modalContainer = document.querySelector('#exampleModal');

    function getAll() {
        return repository;
    }

    function add(item) {
        if (typeof item === 'object', Object.keys(item).includes('name', 'height', 'types'))  {
            repository.push(item)
        }else {
            alert('Verify the Pokemon information.')
        }
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

    //creates buttons for each pokemon that displays their name
    function addListItem(pokemon) {
    
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item.flex-fill');
        
        let button = document.createElement('button');
        button.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        button.classList.add('button');
        button.classList.add('btn');
        button.classList.add('data-toggle');
        button.classList.add('data-target');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#exampleModal');
        
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        button.addEventListener('click', function() {
            loadDetails(pokemon).then(function () {
            populateModal(pokemon);
            })
        })

    }
    
    //create modal:
    function populateModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        //clear existing content in the modal:
        modalTitle.empty();
        modalBody.empty();

        let imageElement = $('<img class="modal-img" style="width:50%">')
        imageElement.attr('src', pokemon.imageUrl);
        let nameElement = $('<h1>' + pokemon.name[0].toUpperCase() + pokemon.name.slice(1) + '</h1>');
        let idElement = $('<p>' + 'No.' + pokemon.id + '</p>');
        let heightElement = $('<p>' + 'Height: ' + pokemon.height + ' meters' + '</p>');
        let typesElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(idElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        populateModal: populateModal
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