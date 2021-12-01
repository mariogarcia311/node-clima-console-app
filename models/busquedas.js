const fs=require('fs')

const axios = require('axios')

    class Busquedas{
        historial=[]
        dbPath='./db/databes.json'
        constructor(){
            this.leerdb()
        }
        get historialCapitalizado(){
            return this.historial.map(lugar=>{
                let palabras=lugar.split(',');
                palabras=palabras.map(p=>p[0].toUpperCase()+p.substring(1))
                return palabras.join(' ')
            });
        }
        get paramsMapbox(){
            return {
                'access_token':process.env.MAPBOX_KEY,
                'language':'es'
            }
        }
        async ciudad (lugar=''){
            console.log('ciudad',lugar);

            try {
                const intance=axios.create({
                    baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                    params:this.paramsMapbox
                })
                const resp=await intance.get();
                // const resp=await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/bogot.json?language=es&access_token=pk.eyJ1IjoibWFyaW8zMTEiLCJhIjoiY2t3bHFlb3ZlMjRuazJ1bm9ydGY5NXQ3YyJ9.umFiRjFY3t5kTesRQ4W34A')
                return resp.data.features.map(lugar=>({
                    id:lugar.id,
                    nombre:lugar.place_name,
                    lng:lugar.center[0],
                    lat:lugar.center[1],
                }));   
            } catch (error) {
                console.log(error)
                return[];
            }
        }
        get paramsWeather(){
            return {
                appid:process.env.OPENWEATHER_KEY,
                units:'metric',
                lang:'es'
            }
        }
        async climaLugar(lat,lon){
            try {
                const intance=axios.create({
                    baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                    params:{...this.paramsWeather, lat,lon}
                })
                const resp=await intance.get();
                return{
                    desc:resp.data.weather[0].description,
                    min:resp.data.main.temp_min,
                    max:resp.data.main.temp_max,
                    temp:resp.data.main.temp

                }
            } catch (error) {
                console.log(error)
                
            }
        }
        agregarHistorial(lugar){
            if(this.historial.includes(lugar.toLocaleLowerCase())){
                return;
            }
            this.historial=this.historial.splice(0,5)
            this.historial.unshift(lugar.toLocaleLowerCase())
            this.guardardb()
        }
        guardardb(){
            const payload={
                historial:this.historial
            };
            fs.writeFileSync(this.dbPath,JSON.stringify(payload))
        }
        leerdb(){
            if(!fs.existsSync(this.dbPath))return;
            const info=fs.readFileSync(this.dbPath,{encoding:'utf-8'})
            const data=JSON.parse(info);

            this.historial=data.historial;
           
        }
    }

    module.exports=Busquedas;