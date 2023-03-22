// import preact
import { h, render, Component } from 'preact';
import { Link } from 'preact-router/match';

// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';

// import jquery for API calls
import $ from 'jquery';

// import the Button component
import Button from '../button';

// variables for 5 day forecast stored in arrays
let maxtemps = [];
let mintemps = [];
let icons = [];
let dates = [];
let days = []; //stores indexes of only 1 per day
let nights = [];

export default class Iphone extends Component {
	// a constructor with initial set states
	constructor(props){
		super(props);

		// temperature state
		this.state.temp = "";
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		// fetches current weather data
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=94389e8a8d91186a44a860ea125a4e11";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		// fetches 5 day weather forecast data
		let url5day = "http://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=metric&appid=94389e8a8d91186a44a860ea125a4e11";
		$.ajax({
			url: url5day,
			dataType: "jsonp",
			success : this.parseResponse2,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	//displays weather data
	componentWillMount() {
		this.fetchWeatherData ();
	}

	// passes in iconcode and returns image file name for corresponding weather condition
    setWeatherIcon(iconcode) {
		if(iconcode == '01d'){
			return ("sun");
		}else if( iconcode == '01n'){
            return ("night");
        }
        else if(iconcode == '02d'){
			return ("partly cloudy")
		}else if( iconcode == '02n'){
            return ("cloudy night");  
        }else if(iconcode== '03d'|| iconcode == '03n'){
			return ("cloud")
		}else if(iconcode == '04d'|| iconcode == '04n'){
			return ("broken clouds")
		}else if(iconcode == '09d'|| iconcode == '09n'){
			return ("rainy")
		}else if( iconcode == '10d'){
			return ("day rain")
		}else if(iconcode == '10n'){
			return ("night rain")
		}else if(iconcode == '11d'|| iconcode == '11n'){
			return ("storm")
		}else if(iconcode == '13d'|| iconcode == '13n'){
			return ("snowy")
		}else if(iconcode == '50d'|| iconcode == '50n'){
			return ("fog")
		}
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		//This sets the date
		const currentDate = new Date();
		const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const shortdaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon','Tue','Wed','Thu','Fri'];
		const shortDayOfWeek = shortdaysOfWeek[currentDate.getDay()];
		const dayOfMonth = currentDate.getDate();
		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const monthName = monthNames[currentDate.getMonth()];
		const suffixes = ['th', 'st', 'nd', 'rd'];
		const daySuffix = suffixes[(dayOfMonth-20)%10] || suffixes[dayOfMonth] || suffixes[0];
		const formattedDate = `${shortDayOfWeek} ${dayOfMonth}${daySuffix} ${monthName}`;
		
		//This sets 24hr time
		const hours = currentDate.getHours();
		const minutes = currentDate.getMinutes();
		const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
		
		//Sunrise Time
		const riseTime = new Date(this.state.rise * 1000);
		const rTime = riseTime.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		  });

		//Sunset Time
		const setTime = new Date(this.state.set * 1000);
		const sTime = setTime.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});

        //for setting weather icon dynamically
        let weathericon = this.setWeatherIcon(this.state.ico);
		console.log(weathericon);

		// screen content
		return (
			<div class={ style.container }> 
				{/* header bar */}
				<div class={style.headerbar}> 
					<h1>Farm 39</h1>
					{/* Farm logo */}
					<img src="\assets\icons\farm house outline.png" height="50" style="max-width: 65px; position:relative; left: 330px; top:-45px"/>
				</div>

				{/* weather box */}
				<div class={style.bluebox} flex-container>
					<h2>{formattedTime}&nbsp; - &nbsp;{formattedDate}</h2> {/* current date and time*/}
					<div class={style.innerbox}>
						<table class={style.weathertable}>
							{/* icon and temperature */}
							<tr>
								<td style="width:40%;">
									<img style="margin-left:20%" class = {style.weathericon} src={`/assets/icons/weather icons/${weathericon}.png`} ></img>
								</td>
								<td>
									<h1 class={ style.temperature }>{ Math.round(this.state.temp) }°C</h1>
								</td>
							</tr>
							<tr>
								{/* humidity */}
								<td>
									<div style="padding-top:15%; text-align:left; font-size:19px" class={ style.humidity }><b>Humidity:</b> { this.state.hum }%</div>
								</td>
								{/* conditions */}
								<td rowSpan="2" style="border: height:3%;">
									<div class={ style.conditions }>{ this.state.cond }</div>
								</td>
							</tr>
							<tr>
								{/* wind */}
								<td>
									<div style="text-align:left; font-size:19px" class={ style.wind }><b>Wind:</b> { Math.round(this.state.win * 10) / 10 }mph</div>
								</td>
							</tr>
						</table>
					</div>

					<br></br>
					{/* 5 day forecast */}
					<div class={style.innerbox}>
						<table class={style.weathertable} style="padding: 3% 0;">
							<tr style="font-weight:bold;">
								{/* date */}
								<td style="width:20%;" >{shortDayOfWeek} {dayOfMonth}</td>
								<td style="width:20%;">{shortdaysOfWeek[currentDate.getDay()+1]} {currentDate.getDate()+1}</td>
								<td style="width:20%;">{shortdaysOfWeek[currentDate.getDay()+2]} {currentDate.getDate()+2}</td>
								<td style="width:20%;">{shortdaysOfWeek[currentDate.getDay()+3]} {currentDate.getDate()+3}</td>
								<td style="width:20%;">{shortdaysOfWeek[currentDate.getDay()+4]} {currentDate.getDate()+4}</td>
							</tr>
							<tr>
								{/* icon */}
								<td><img class={style.forecasticon} src={`/assets/icons/weather icons/${this.setWeatherIcon(icons[days[0]])}.png`}></img></td>
								<td><img class={style.forecasticon} src={`/assets/icons/weather icons/${this.setWeatherIcon(icons[days[1]])}.png`}></img></td>
								<td><img class={style.forecasticon} src={`/assets/icons/weather icons/${this.setWeatherIcon(icons[days[2]])}.png`}></img></td>
								<td><img class={style.forecasticon} src={`/assets/icons/weather icons/${this.setWeatherIcon(icons[days[3]])}.png`}></img></td>
								<td><img class={style.forecasticon} src={`/assets/icons/weather icons/${this.setWeatherIcon(icons[days[4]])}.png`}></img></td>
							</tr>
							<tr>
								{/* day max temp */}
								<td>{Math.round(maxtemps[days[0]])}°C</td>
								<td>{Math.round(maxtemps[days[1]])}°C</td>
								<td>{Math.round(maxtemps[days[2]])}°C</td>
								<td>{Math.round(maxtemps[days[3]])}°C</td>
								<td>{Math.round(maxtemps[days[4]])}°C</td>
							</tr>
							<tr style="color:grey;">
								{/* night min temp */}
								<td>{Math.round(mintemps[nights[0]])}°C</td>
								<td>{Math.round(mintemps[nights[1]])}°C</td>
								<td>{Math.round(mintemps[nights[2]])}°C</td>
								<td>{Math.round(mintemps[nights[3]])}°C</td>
								<td>{Math.round(mintemps[nights[4]])}°C</td>
							</tr>
						</table>
					</div>

					<br></br>

					{/* more weather detail box */}
                    <div class={style.innerbox}>
                        <table class={style.weathertable}>
                        	<tr>
                                <td>
                                    <p>High</p>
                                </td>
                                <td>
                                    <p>Clouds</p>
                                </td>
                                <td>
                                    <p>Sunrise</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
									{/* high temp */}
                                    <h3>{ Math.round(this.state.hi) }°C</h3>
                                </td>
                                <td>
									{/* cloud cover */}
                                    <h3 style="padding:1%">{ this.state.cl }%</h3>
                                </td>
                                <td>
									{/* sunrise time */}
                                    <h3>{ rTime }</h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Low</p>
                                </td>
                                <td>
                                    <p>Pressure (hPa)</p>
                                </td>
                                <td>
                                    <p>Sunset</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
									{/* low temp */}
                                    <h3>{ Math.round(this.state.lo) }°C</h3>
                                </td>
                                <td>
									{/* pressure */}
                                    <h3 style="padding:1%">{ this.state.pres } </h3>
                                </td>
                                <td>
									{/* sunset time */}
                                    <h3>{ sTime }</h3>
                                </td>
                            </tr>
                        </table>
                    </div>

				</div>
				
                <div class={style.bufferbox}>
                    box
					{/* adds blank space at the end so stuff isnt hidden behind navbar */}
				</div>
				
				{/* navbar */}
				<nav>
					<div class={style.navbar} flex-box-container> 
						<div class={style.navbarelement}>
							<Link activeClassName="active" href="/weather">
								<img class={style.navbarimg} src='\assets\icons\weather outline.png'></img>
								<p>Weather</p>
							</Link>
						</div>
						<div class={style.navbarelement}>
							<Link activeClassName="active" href="/" >
								<img class={style.navbarimg} src='\assets\icons\farm house outline.png'></img>
								<p>Home</p>
							</Link>
						</div>
						<div class={style.navbarelement}>
							<Link activeClassName="active" href="/crops">
								<img class={style.navbarimg} src='\assets\icons\crops outline.png'></img>
								<p>Crops</p>
							</Link>
						</div>
					</div>
				</nav>
				
			</div>	
		);
	}
	
	// live weather
	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];
		var humidity = parsed_json['main']['humidity'];
		var wind = parsed_json['wind']['speed'];
		var high = parsed_json['main']['temp_max'];
		var low = parsed_json['main']['temp_min'];
		var pressure = parsed_json['main']['pressure'];
		var clouds = parsed_json['clouds']['all'];
		var sunrise = parsed_json['sys']['sunrise'];
		var sunset = parsed_json['sys']['sunset'];
        let icon = parsed_json['weather']['0']['icon'];


		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			hum: humidity,
			win: wind,
			hi: high,
			lo: low,
			pres: pressure,
			cl: clouds,
			rise: sunrise,
			set: sunset,
            ico: icon
		});      
	}

	//5 day forecast
	parseResponse2 = (parsed_json) => {
		for(let i=0; i<40; i++){
			//adds data to arrays
			maxtemps.push(parsed_json['list'][i]['main']['temp_max']);
			mintemps.push(parsed_json['list'][i]['main']['temp_min']);
			icons.push(parsed_json['list'][i]['weather']['0']['icon']);
			dates.push(parsed_json['list'][i]['dt_txt']);

			let date = new Date(dates[i]);
			let time = date.getHours();
			if(time == 12){ //gets all fields at 12 noon
				days.push(i);
			}else if(time == 0){ //gets all fields at midnight
				nights.push(i);
			}
			this.setState({
			});
		}
	}
}
