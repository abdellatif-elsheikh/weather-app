// defin global variables
const baseUrl = "https://api.weatherapi.com/v1/forecast.json?key=";
const apiKey = "e0fdb99e108746b690b105738210205&q=";
let keyWord = "cairo";
const numDays = "&days=3";
const searchBtn = document.querySelector('.search__btn');
const searchInput = document.getElementById("searchInput")

/**
 * start helper functions
 **/

// get all data
const getData = async (url='')=>{
    const req = await fetch(url)

    try {
        const data = await req.json();
        return data
    } catch (error) {
        console.log('Error', error);
    }
}

// Extarct all neded data
async function extractTheData(data){
    // get all neded data from the first day
    const firstDay= data.current;
        const firstDayInfo = {
            location: data.location.name,
            temp: firstDay.temp_c,
            status: firstDay.condition.text,
            humidity: firstDay.humidity,
            windKph: firstDay.wind_kph,
            windDir: firstDay.wind_dir,
            icon: `https:${firstDay.condition.icon}`
        }

        // get all neded data from the second day
        const secondDay = data.forecast.forecastday[1];
        const secondDayInfo = {
            minTemp: secondDay.day.mintemp_c,
            maxTemp: secondDay.day.maxtemp_c,
            status: secondDay.day.condition.text,
            icon: `https:${secondDay.day.condition.icon}`
        }

        // get all neded data from the third day
        const thirdDay = data.forecast.forecastday[2];
        const thirdDayInfo = {
            minTemp: thirdDay.day.mintemp_c,
            maxTemp: thirdDay.day.maxtemp_c,
            status: thirdDay.day.condition.text,
            icon: `https:${thirdDay.day.condition.icon}`
        }
        

        // Combined all data in a single array
        const allData = [firstDayInfo,secondDayInfo,thirdDayInfo]

        console.log(allData);
        return allData
}

/**
 * end helper functions
 **/

/**
 * start main functions
 **/
// TO DO
// 1- Create a post function to send data to server
const postData = async (url='', data=[])=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

// 2- Create an update ui func

// fire all functions
function perfomAction(){
    keyWord = searchInput.value
    getData(baseUrl+apiKey+keyWord+numDays)
    .then((data)=>{
        extractTheData(data)
        .then((allData)=>{
            postData('/postData', allData)
        })
    })
}

/**
 * end main functions
 **/

/**
 * Event listners
 */

searchBtn.addEventListener('click', perfomAction);
