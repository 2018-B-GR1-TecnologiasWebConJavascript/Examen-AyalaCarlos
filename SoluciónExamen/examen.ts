var require : any;
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;

const typesP = [];
const abilitiesP = [];

function inicialiarBDD() {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                'data.json',
                'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {
                        reject({
                            mensaje: 'esta mal leido'
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    )
};


// 1) Busque los tipos de "types" en el arreglo data.json
async function main() {
    const inicializarBDD$ = rxjs.from(inicialiarBDD());
    inicializarBDD$
        .subscribe(res => {

            res.bdd.forEach(element => {
                element.types.forEach(tipo => {
                    const arregloRespuestaTypes = {
                        tipo: tipo.type.name
                    }
                    typesP.push(arregloRespuestaTypes)

                })
            });
            console.log('1) Busque los tipos de "types" en el arreglo data.json');
            console.log(typesP);
        })
}

main()

// 2) Busque los tipos de "abilities" en el arreglo data.json
async function main2() {
    const inicializarBDD$ = rxjs.from(inicialiarBDD());
    inicializarBDD$
        .subscribe(res => {

            res.bdd.forEach(element => {
                element.abilities.forEach(habilidad => {
                    const arregloRespuestaAbilities = {
                        habilidad: habilidad.ability.name
                    }
                    abilitiesP.push(arregloRespuestaAbilities)

                })
            });
            console.log('\n2) Busque los tipos de "abilities" en el arreglo data.json');
            console.log(abilitiesP);
        })
}

main2()