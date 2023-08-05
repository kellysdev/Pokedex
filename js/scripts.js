let pokemonRepository = (function(){
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let modalContainer = document.querySelector('#Modal');

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
        listItem.classList.add('list-group-item')
        let button = document.createElement('button');
        button.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
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
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');

        //clear existing content in the modal:
        modalTitle.empty();
        modalBody.empty();

        let imageElement = $('<img class="modal-img" style="width:50%">')
        imageElement.attr('src', pokemon.imageUrl);       
        let nameElement = $('<h1>' + pokemon.name[0].toUpperCase() + pokemon.name.slice(1) + '</h1>');
        let idElement = $('<p>No. ' + pokemon.id + '</p>');
        let heightElement = $('<p>Height: ' + pokemon.height + 'meters</p>' );
        let typesElement = $('<p>Types: ' + pokemon.types + '</p>');

        // let closeButtonElement = document.createElement('button');
        // closeButtonElement.classList.add('modal-close');
        // closeButtonElement.innerText = 'close';
        // closeButtonElement.addEventListener('click', hideModal);

        // modal.appendChild(closeButtonElement);

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(idElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);

        //make modal visible when this function is called
        $('#Modal').on('show.bs.modal', function (event) {
            var button = $() //button that triggered the modal

        })

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