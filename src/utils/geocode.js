
const request=require('request');

const geocode=(address,callback)=>{
    const geoUrl='http://api.positionstack.com/v1/forward?access_key=46022744e66d8dbb07d2dc9a045033d5&query='+address
    request({url:geoUrl,json:true},(error,response)=>{
       // console.log(response.body.data)
        if(error){
            callback('unable to connect location service!',undefined)
        }
        else if(response.body.data.length===0){
        callback('unable to find location',undefined)
        }else{
        // console.log(response.body.data[0].latitude)
        // console.log(response.body.data[0].longitude)
        callback(undefined,{
            latitude:response.body.data[0].latitude,
            longitude:response.body.data[0].longitude,
            location:response.body.data[0].label
        })
        }
})
}

module.exports=geocode;