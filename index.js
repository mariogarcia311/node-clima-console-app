require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

console.log('holamundo')

const main=async()=>{
    const busquedas=new Busquedas();
    let opt;
    do {
        opt=await inquirerMenu();
        switch (opt) {
            case 1:
                const lugar=await leerInput('Ciudad: ');
                const lugares=await busquedas.ciudad(lugar)
                const id=await listarLugares(lugares)
                const lugarSel=lugares.find(l=>l.id===id)
                console.log('\n Información de la ciudad \n')
                console.log('Ciudad:',lugarSel.nombre)
                console.log('Lat:',lugarSel.lat)
                console.log('Lng:',lugarSel.lng)
                console.log('Temperatura:',)
                console.log('Mínima:',)
                console.log('Máxima:',)
            break;
            case 2:
                
            break;
            case 3:
                
            break;
            default:

            break;
        }
        console.log({opt})
        if (opt!==0) await pausa();
    } while (opt!==0);
}
main();