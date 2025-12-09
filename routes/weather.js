// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')

router.get('/',function(req, res, next){
    let apiKey = process.env.API_WEATHER
            let city = 'london'
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                        
            request(url, function (err, response, body) {
            if(err){
                next(err)
            } else {
                //    res.send(body)
                var weather = JSON.parse(body)
                if (weather!==undefined && weather.main!==undefined) {
                    var wmsg = 'It is '+ weather.main.temp + 
                    ' degrees in '+ weather.name +
                    '! <br> The humidity now is: ' + 
                    weather.main.humidity + ' with the wind blowing at ' + weather.wind.speed + 
                    ' <br> and the sky look has ' + weather.clouds.all + ' % of clouds';

                    res.send (wmsg);
                }
                else {
                        res.send ("No data found");
                }
            }
        }) 
    });
    

// Export the router object so index.js can access it
module.exports = router
