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
]

function myLoopFunction(pokemon) {
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ' ft)');
    if (pokemon.height > 6.0) {
        document.write('<span class="special"> - Wow, that\'s big!</span>')
    }else  {
        document.write('</p>')
    }
}
pokemonList.forEach(myLoopFunction);