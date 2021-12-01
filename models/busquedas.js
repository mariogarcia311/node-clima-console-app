const axios = require('axios')

    class Busquedas{
        historial=['tegucigalpa','Madrid','San José']
        constructor(){

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
    }

    module.exports=Busquedas;