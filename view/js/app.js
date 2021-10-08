// defin global variables
const baseUrl = "https://api.weatherapi.com/v1/forecast.json?key=";
const apiKey = "e0fdb99e108746b690b105738210205&q=";
const keyWord = "cairo";
const numDays = "&days=3";

/**
 * start helper functions
 **/

// get all data
const getData = async (url='')=>{
    const req = await fetch(url)

    try {
        const data = await req.json();
        console.log(data);
        return data
    } catch (error) {
        console.log('Error', error);
    }
}

getData(baseUrl+apiKey+keyWord+numDays);

/**
 * end helper functions
 **/

/**
 * start main functions
 **/
// TO DO
// 1- 


/**
 * end main functions
 **/

