var require;
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const arregloRespuestaTypes = [];
const arregloRespuestaAbilities = [];
const arregloRespuestaMove = [];
const arregloRespuestaXTypes = [];
const arregloRespuestaXAbilities = [];
const arregloRespuestaXMoves = [];
function inicialiarBDD() {
    return new Promise((resolve, reject) => {
        fs.readFile('data.json', 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                reject({
                    mensaje: 'esta mal leido'
                });
            }
            else {
                resolve({
                    mensaje: 'BDD leida',
                    bdd: JSON.parse(contenidoArchivo)
                });
            }
        });
    });
}
;
// 1) Busque los tipos de "types" en el arreglo data.json
// 2) Busque los tipos de "abilities" en el arreglo data.json
// 3) Busque los tipos de "move" en el arreglo data.json
// 4) Clasifique a los pokemon por types
// 5) Clasifique a los pokemon por abilities
async function main() {
    const inicializarBDD$ = rxjs.from(inicialiarBDD());
    inicializarBDD$
        .subscribe(res => {
        res.bdd.forEach(element => {
            element.types.forEach(tipo => {
                const respuestaTypes = {
                    tipo: tipo.type.name
                };
                arregloRespuestaTypes.push(respuestaTypes);
            });
        });
        res.bdd.forEach(element => {
            element.abilities.forEach(habilidad => {
                const respuestaAbilities = {
                    habilidad: habilidad.ability.name
                };
                arregloRespuestaAbilities.push(respuestaAbilities);
            });
        });
        res.bdd.forEach(element => {
            element.moves.forEach(movimiento => {
                const respuestaMove = {
                    movimiento: movimiento.move.name
                };
                arregloRespuestaMove.push(respuestaMove);
            });
        });
        res.bdd.forEach(element => {
            element.types.forEach(tipo => {
                const pokemonXTipo = {
                    nombre: tipo.type.name,
                    pokemons: [
                        {
                            id: element.id,
                            nombre: element.name
                        }
                    ]
                };
                arregloRespuestaXTypes.push(pokemonXTipo);
            });
        });
        res.bdd.forEach(element => {
            element.abilities.forEach(habilidad => {
                const pokemonXHabilidad = {
                    nombre: habilidad.ability.name,
                    pokemons: [
                        {
                            id: element.id,
                            nombre: element.name
                        }
                    ]
                };
                arregloRespuestaXAbilities.push(pokemonXHabilidad);
            });
        });
        res.bdd.forEach(element => {
            element.moves.forEach(habilidad => {
                const pokemonXMovimiento = {
                    nombre: habilidad.move.name,
                    pokemons: [
                        {
                            id: element.id,
                            nombre: element.name
                        }
                    ]
                };
                arregloRespuestaXMoves.push(pokemonXMovimiento);
            });
        });
        console.log('1) Busque los tipos de "types" en el arreglo data.json');
        console.log(arregloRespuestaTypes);
        console.log('\n2) Busque los tipos de "abilities" en el arreglo data.json');
        console.log(arregloRespuestaAbilities);
        console.log('\n3) Busque los tipos de "move" en el arreglo data.json');
        console.log(arregloRespuestaMove);
        console.log('\n4) Clasifique a los pokemon por types');
        console.log(JSON.stringify(arregloRespuestaXTypes));
        console.log('\n5) Clasifique a los pokemon por abilities');
        console.log(JSON.stringify(arregloRespuestaXAbilities));
        console.log('\n6) Clasifique a los pokemon por move');
        console.log(JSON.stringify(arregloRespuestaXMoves));
    });
}
main();
