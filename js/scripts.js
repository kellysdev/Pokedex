let pokemonRepository = (function(){
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 2.3,
            types: ['grass', 'poinson']
        },
        {
            name: 'Ivysaur',
            height: 3.25,
            types: ['grass', 'poison']
        },
        {
            name: 'Venusaur',
            height: 6.58,
            types: ['grass', 'poison']
        },
        {
            name: 'Charmander',
            height: 2.0,
            types: ['fire']
        },
        {
            name: 'Charmeleon',
            height: 3.58,
            types: ['fire']
        },
        {
            name: 'Charizard',
            height:5.58,
            types: ['fire', 'flying']
        },
        {
            name: 'Squirtle',
            height: 1.67,
            types: ['water']
        },
        {
            name: 'Wartortle',
            height: 3.25,
            types: ['water']
        },
        {
            name: 'Blastoise',
            height: 5.25,
            types: ['water']
        }
    ];

    function getAll() {
        return pokemonList;
    }

// problem with code:
    function add(item) {
        if (typeof item === 'object', Object.keys(item).includes('name', 'height', 'types'))  {
            pokemonList.push(item),
            console.log(item)
        }else {
            alert('Verify the Pokemon information.')
        }
    }

    return {
        getAll: getAll,
        add: add
    };
})();

function myLoopFunction(pokemon) {
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ' ft)');
    if (pokemon.height > 6.0) {
        document.write('<span class="special"> - Wow, that\'s big!</span>')
    }else  {
        document.write('</p>')
    }
}
pokemonRepository.getAll().forEach(myLoopFunction);

// testing if my bonus task to add conditionals/validation to the add function works:
pokemonRepository.add (
    {
      name: 'Pikachu',
      height: 1.3,
      types: ['electric']
    }
  );
// even though I get the item in the conosole log, it doesn't add Pikachu to the list