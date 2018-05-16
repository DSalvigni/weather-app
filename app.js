const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

var URL = require('url');

const arg = yargs
    .options({
        a:{
            demand: true,
            alias: 'address',
            describe: 'Address to fetch the weather',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;




geocode.geocodeAddress(arg.address,(errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    } else {
        //console.log(JSON.stringify(results,undefined,2));
        console.log('Address: '+results.address);
        //console.log('Latitude -> '+results.latitude);
        //console.log('Longitude -> '+results.longitude);
        weather.getWeather(results.latitude,results.longitude,(errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            } else {
                //console.log(JSON.stringify(weatherResults,undefined,2));
                console.log('Currently the weather looks like: '+weatherResults.summary+' and the Temperature(F) is: '+weatherResults.apparentTemperature+'.')
            }
        });
    }
});


