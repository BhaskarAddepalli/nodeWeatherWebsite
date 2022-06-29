const request=require('request')

const forecast=(latitude,longitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=c4645e5c38319770ea54429f55de1019&query='+latitude+','+longitude+'&units=f'
request({url:url,json:true} /* options object */,(error,response) =>{    //this function will run either we have the data or something went wrong
    //const data=JSON.parse(response.body)
    if(error){
       callback('weather service unavailable !',undefined)
    }
    else if(response.body.error){
    callback('unable to find location',undefined)
    }
    else{
     // console.log(response.body.current);
       callback(undefined,response.body.current.weather_icons);
    }
    }) 
}
module.exports=forecast