require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

console.log('holamundo')

const main=async()=>{
    const busquedas=new Busquedas();
    let opt;
    do {
        console.clear()
        opt=await inquirerMenu();
        switch (opt) {
            case 1:
                const lugar=await leerInput('Ciudad: ');
                const lugares=await busquedas.ciudad(lugar)
                const id=await listarLugares(lugares)
                if(id==='0') continue;
                const lugarSel=lugares.find(l=>l.id===id)
                busquedas.agregarHistorial(lugarSel.nombre)
                const clima=await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                console.log('\n Información de la ciudad \n')
                console.log('Ciudad:',lugarSel.nombre.green)
                console.log('Lat:',lugarSel.lat)
                console.log('Lng:',lugarSel.lng)
                console.log('Temperatura:',clima.temp)
                console.log('Mínima:',clima.min)
                console.log('Máxima:',clima.max)
                console.log('Cómo está el clima:',clima.desc.green)
            break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i)=>{
                    const idx=`${i+1}.`.green;
                    console.log(`${idx} ${lugar}`)
                })
            break;
            case 3:
                
            break;
            default:

            break;
        }
        if (opt!==0) await pausa();
    } while (opt!==0);
}
main();