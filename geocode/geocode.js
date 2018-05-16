const request = require('request');

//API google key
var googleKey = '';
//Geocode Function to manage the API call and errors
var geocodeAddress = (address, callback) =>{
    var encodedAddress = encodeURIComponent(address);
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?key='+googleKey+'&address='+encodedAddress,
        //url: 'https://maps.googleapis.com/maps/api/geocode/json?key=&address='+encodedAddress,
        json: true
    },(error,response,body)=>{
        if(error){
            callback('Unable to connect to Google API');
        }else if(body.status === 'ZERO_RESULTS'){
            callback('The address has been not found from Google API');
        }else if(!error && body.status === 'OK'){
            callback(undefined,{
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
                
            });
        }
    });
};






module.exports.geocodeAddress=geocodeAddress;