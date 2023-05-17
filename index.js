let city = "Delhi" , country , time , lat , lon;
let max_temp , min_temp , temp , pressure , relHumidity;

let cloudiness , dewPoint , precipProb , precipRate;
let symbolPhrase;

let co , no2 , o3 , pm2_5 , pm10 , so2 , overall_aqi;



let cloud_pct , humidity , wind_degrees , wind_speed , wind_direction , windGust;
// //Weather By APi Ninja 
const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b402cfb368mshc86ca18e236938ap1fe7a3jsn90858846b4ea',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

//Foreca Weather Location Search
const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b402cfb368mshc86ca18e236938ap1fe7a3jsn90858846b4ea',
		'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
	}
};

// Foreca Weather Location Info
const options3 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b402cfb368mshc86ca18e236938ap1fe7a3jsn90858846b4ea',
		'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
	}
};

// Foreca Weather Latest Observations 
const options4 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b402cfb368mshc86ca18e236938ap1fe7a3jsn90858846b4ea',
		'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
	}
};

// Air Quality By Api NINJAS
const options5 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b402cfb368mshc86ca18e236938ap1fe7a3jsn90858846b4ea',
		'X-RapidAPI-Host': 'air-quality-by-api-ninjas.p.rapidapi.com'
	}
};


// Foreca Weather Current
const options6 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b402cfb368mshc86ca18e236938ap1fe7a3jsn90858846b4ea',
		'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
	}
};

//Foreca Weather NowCast
const options7 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b402cfb368mshc86ca18e236938ap1fe7a3jsn90858846b4ea',
		'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
	}
};

//Foreca Weather Hourly
const options8 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b402cfb368mshc86ca18e236938ap1fe7a3jsn90858846b4ea',
		'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
	}
};


//Foreca Weather Daily
const options9 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b402cfb368mshc86ca18e236938ap1fe7a3jsn90858846b4ea',
		'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
	}
};


function locationInfo(id){
	//Foreca Weather Location Info
	fetch(`https://foreca-weather.p.rapidapi.com/location/${id}`, options3)
	.then(response => response.json())
	.then((response) => {
		console.log("Foreca Weather Location Info");

		lat = response["lat"];
		lon = response["lon"];
		latestObservation(id);

		console.log(response);})
	.catch(err => console.error(err));
}


function latestObservation(id){
	//Foreca Weather Latest Observation
	fetch(`https://foreca-weather.p.rapidapi.com/observation/latest/${id}?lang=en`, options4)
	.then(response => response.json())
	.then((response) => {
		console.log("Foreca Weather Latest Observation");

		time = response.observations[0]["time"];
		wind_direction = response.observations[0]["windDirString"];
		pressure = response.observations[0]["pressure"];
		relHumidity = response.observations[0]["relHumidity"];
		airQuality(city);
		console.log(response);})
	.catch(err => console.error(err));
}


function airQuality(city){
	//Air Quality By APi NINJA
	fetch(`https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=${city}`, options5)
	.then(response => response.json())
	.then((response) => {
		console.log("Air Quality");

		co = response["CO"]["concentration"];
		no2 = response["NO2"]["concentration"];
		o3 = response["O3"]["concentration"];
		pm2_5 = response["PM2.5"]["concentration"];
		pm10 = response["PM10"]["concentration"];
		so2 = response["SO2"]["concentration"];
		overall_aqi = response["overall_aqi"];
		current(id);
		console.log(response);})
	.catch(err => console.error(err));
}


function current(id){

	//Foreca Weather Current
	fetch(`https://foreca-weather.p.rapidapi.com/current/${id}?alt=0&tempunit=C&windunit=MS&tz=Europe%2FLondon&lang=en`, options6)
	.then(response => response.json())
	.then((response) => {
		console.log("Foreca Weather Current");
		cloudiness = response.current["cloudiness"];
		precipProb = response.current["precipProb"];
		precipRate = response.current["precipRate"];
		symbolPhrase = response.current["symbolPhrase"];

		if(screen.width <= 480 && screen.width >= 320){
			if(symbolPhrase.includes("cloudy")){
				document.getElementsByClassName("back-video")[0].setAttribute("src" , "Cloudy Weather Romantic whatsapp status.mp4");
				document.body.style.color = "orange";
			}
			else if(symbolPhrase.includes("clear") || symbolPhrase.includes("sunny")){
				document.getElementsByClassName("back-video")[0].setAttribute("src" , "Palm Tree On A Sunny Day _ Cinematic Background Video _ Video Background Loop _ 4k Footage.mp4");
			}
			else if(symbolPhrase.includes("rain")){
				document.getElementsByClassName("back-video")[0].setAttribute("set" , "Beautiful Rain Scene - Rain video status - Rainy Season Status - Rain Feel - Videos Hub.mp4");
			}
		}

		dewPoint = response.current["dewPoint"];



		document.getElementsByClassName("city")[0].innerHTML = `<h1>${city}</h1>`;
		document.getElementsByClassName("country")[0].innerHTML = `<h1>${country}</h1>`;
		time = new Date(time);
		document.getElementsByClassName("time")[0].innerHTML = `<p>${time}</p>`;
		document.getElementsByClassName("temperature")[0].innerHTML = `<h1>${temp}&#8451</h1><p>${max_temp}&#8451/${min_temp}&#8451</P>`;


		document.getElementsByClassName("pressure")[0].innerHTML = `<h1>Pressure</h1><br><p>Pressure -> ${pressure}</p> <br> <p>RelHumidity -> ${relHumidity}</p><br> <p>Precipitation Rate -> ${precipRate}</p> <br> <p>Symbol Phrase -> ${symbolPhrase}</p>`;


		document.getElementsByClassName("wind")[0].innerHTML = `<h1>Wind</h1>
		<br><p>Wind Direction -> ${wind_direction}</p> <br> <p>Wind Degrees -> ${wind_degrees}</p><br> <p>Cloudiness -> ${cloudiness}</p> <br> <p>Dew Point -> ${dewPoint}</p>`;


		document.getElementsByClassName("airquality")[0].innerHTML = `<h1>Air Quality</h1> <br> <p>CO -> ${co}</p> <br> <p>NO2 -> ${no2}</p> <br> <p>O3 -> ${o3}</p> <br><p>PM2.5 -> ${pm2_5}</p><br> <p>PM10 -> ${pm10}</p><br> <p>SO2 -> ${so2}</p><br><p>Overall AQI -> ${overall_aqi}</p>`;

		document.getElementsByClassName("symbolPhrase")[0].innerHTML = `<h1>${symbolPhrase}</h1>`;

		document.getElementsByClassName("otherInfo")[0].innerHTML = `<p>Precipitation : ${precipProb}&#37<p>Humidity : ${humidity}&#37</p><p>Wind Speed : ${wind_speed} Km/hr</p>`;



		console.log(response);})
		
	.catch(err => console.error(err));

}







function weather(city){
	// APi NINJA
	fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options1)
	.then(response => response.json())
	.then((response) => {
		console.log("API NINJA");
		console.log(response);})
	.catch(err => console.error(err));
}


function locationSearch(city){
	// Foreca Weather Location Search
	fetch(`https://foreca-weather.p.rapidapi.com/location/search/${city}`, options2)
	.then(response => response.json())
	.then((response) =>{
		console.log("Foreca Weather Location Search");
		console.log(response);})
	.catch(err => console.error(err));
}



function search(){

	city = document.getElementsByClassName("search")[0].value;
	// APi NINJA
	fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options1)
	.then(response => response.json())
	.then((response) => {
		console.log("API NINJA");

		cloud_pct = response.cloud_pct;
		humidity = response.humidity;
		wind_degrees = response.wind_degrees;
		wind_speed = response.wind_speed;
		max_temp = response.max_temp;
		min_temp = response.min_temp;
		temp = response.temp;



		console.log(response);})
	.catch(err => console.error(err));


	// Foreca Weather Location Search
	fetch(`https://foreca-weather.p.rapidapi.com/location/search/${city}`, options2)
	.then(response => response.json())
	.then((response) =>{
		console.log("Foreca Weather Location Search");
		id = response.locations[0]["id"];


		country = response.locations[0]["country"];

		locationInfo(id);
		console.log(response);})
	.catch(err => console.error(err));
}

