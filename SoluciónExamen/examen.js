var require;
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const arregloRespuestaTypes = [];
const arregloRespuestaAbilities = [];
const arregloRespuestaMove = [];
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
        console.log('1) Busque los tipos de "types" en el arreglo data.json');
        console.log(arregloRespuestaTypes);
        console.log('\n2) Busque los tipos de "abilities" en el arreglo data.json');
        console.log(arregloRespuestaAbilities);
        console.log('\n3) Busque los tipos de "move" en el arreglo data.json');
        console.log(arregloRespuestaMove);
    });
}
main();
