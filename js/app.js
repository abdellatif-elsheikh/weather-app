// defin global variables
const baseUrl = "https://api.weatherapi.com/v1/forecast.json?key=";
const apiKey = "e0fdb99e108746b690b105738210205&q=";
let keyWord = "cairo";
const numDays = "&days=3";
const searchBtn = document.querySelector('.search__btn');
const searchInput = document.getElementById("searchInput");

const myUrl = "http://localhost:5000/"

/**
 * start helper functions
 **/

// Extarct all neded data
async function extractTheData(data){
    // get all neded data from the first day
    const firstDay= data.current;
        const firstDayInfo = {
            location: data.location.name,
            temp: firstDay.temp_c,
            icon: `https:${firstDay.condition.icon}`,
            status: firstDay.condition.text,
            humidity: firstDay.humidity,
            windKph: firstDay.wind_kph,
            windDir: firstDay.wind_dir,
        }

        // get all neded data from the second day
        const secondDay = data.forecast.forecastday[1];
        const secondDayInfo = {
            icon: `https:${secondDay.day.condition.icon}`,
            maxTemp: secondDay.day.maxtemp_c,
            minTemp: secondDay.day.mintemp_c,
            status: secondDay.day.condition.text
        }

        // get all neded data from the third day
        const thirdDay = data.forecast.forecastday[2];
        const thirdDayInfo = {
            icon: `https:${thirdDay.day.condition.icon}`,
            maxTemp: thirdDay.day.maxtemp_c,
            minTemp: thirdDay.day.mintemp_c,
            status: thirdDay.day.condition.text
        }
        

        // Combined all data in a single array
        const allData = [firstDayInfo,secondDayInfo,thirdDayInfo]

        return allData
};

// Loop to fill data
function fillDataWithLoop(nodeList, data){
    nodeList.forEach((ele, index)=>{
        if(ele.tagName === 'IMG'){
            ele.setAttribute('src', data[index]);
        }else {
            ele.innerHTML = data[index]
        }
    })
}

/**
 * end helper functions
 **/

/**
 * start main functions
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

// Create an update UI func
const fillCardBody = (data)=>{
    // Fill all first day body data
    const firstDay = document.querySelectorAll('.firstDay');
    fillDataWithLoop(firstDay, Object.values(data[0]));
    
    // Fill all second day body data
    const secondDay = document.querySelectorAll('.secondDay')
    fillDataWithLoop(secondDay, Object.values(data[1]));
    
    // Fill all third day body data
    const thirdDay = document.querySelectorAll('.thirdDay')
    fillDataWithLoop(thirdDay, Object.values(data[2]));
}


// fire all functions
async function perfomAction(){
    keyWord = searchInput.value ? keyWord = searchInput.value : keyWord
    getData(baseUrl+apiKey+keyWord+numDays)
    .then((data)=>{
        extractTheData(data)
        .then((allData)=>{
            fillCardBody(allData)
        });
    })
}
perfomAction()
/**
 * end main functions
 **/

/**
 * Event listners
 */

searchBtn.addEventListener('click', perfomAction);
searchInput.addEventListener('keypress', perfomAction)

/**
 * // Set all icons
    const icons = document.querySelectorAll('img.icon');
    icons.forEach((icon, index)=> icon.setAttribute('src', data[index].icon) );
    // Set all weather status
    const statuses = document.querySelectorAll('.weather-status');
    statuses.forEach((status, index) => status.innerHTML =  data[index].status );
    // Set firs day temp
    document.getElementById('tempreture').innerHTML = data[0].temp;
    // Set next 2 days temps
    const maxTemperatures = document.querySelectorAll('.maxTemperature');
    maxTemperatures.forEach((max, index)=> max.innerHTML = data[index+1].maxTemp);
    const minTemperatures = document.querySelectorAll('.minTemperature');
    minTemperatures.forEach((min, index)=> min.innerHTML = data[index+1].minTemp);
    // Set the city name
    document.querySelector('.city-name').innerHTML = data[0].location;
 */