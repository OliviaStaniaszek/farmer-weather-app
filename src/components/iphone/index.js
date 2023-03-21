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


export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		//url Sanchia got 1st attemp online
		// http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=cb932829eacb6a0e9ee4f38bfbf112ed

		//url Sanchia got after creating an account, gives more accurate weather
		//http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=94389e8a8d91186a44a860ea125a4e11

		// Previous url Jane gave
		//http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=cf17e23b1d108b29a4d738d2084baf5


		
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=94389e8a8d91186a44a860ea125a4e11";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}


	// the main render method for the iphone component
	
	//displays weather data
	componentWillMount() {
		this.fetchWeatherData ();
	}

	setWeatherIcon() {
		let iconcode = this.state.ico;
		console.log(iconcode);
		
		if(iconcode == '01d'){
			return ("sun");
		}else if( iconcode == '01n'){
            return ("night");
        }else if(iconcode == '02d'){
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
	  

	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		//This sets the date
		const currentDate = new Date();
		const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const dayOfWeek = daysOfWeek[currentDate.getDay()];
		const dayOfMonth = currentDate.getDate();
		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const monthName = monthNames[currentDate.getMonth()];
		//const year = currentDate.getFullYear();
		const suffixes = ['th', 'st', 'nd', 'rd'];
		const daySuffix = suffixes[(dayOfMonth-20)%10] || suffixes[dayOfMonth] || suffixes[0];
		const formattedDate = `${dayOfWeek} ${dayOfMonth}${daySuffix} ${monthName}`;

		//This sets 24hr time
		const hours = currentDate.getHours();
		const minutes = currentDate.getMinutes();
		const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

		//This sets 12 hour time
		// const hours = currentDate.getHours() % 12 || 12;
		// const minutes = currentDate.getMinutes();
		// const meridian = currentDate.getHours() >= 12 ? 'p.m.' : 'a.m.';
		// const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${meridian}`;

		//const temp = data.main.temp;

		//for setting weather icon dynamically
		let weathericon = this.setWeatherIcon();
		console.log(weathericon);


		// display all weather data
		return (
			// <div class={ style.container }>
			// 	<div class={ style.header }>
			
			<div class={ style.container }> 
				<div class={style.headerbar}> 
					<h1>Farm 39</h1> {/* change text based on current page */}
					{/* Farm logo */}
					<img src="\assets\icons\farm house outline.png" height="50" style="max-width: 65px; position:relative; left: 330px; top:-45px"/>
				</div>
				{/* weather box */}
				<div class={style.bluebox} flex-container>
					<h2>{formattedTime}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formattedDate}</h2> {/* current date and time*/}
					<div class={style.innerbox}>
						<table class={style.weathertable}>
							<tr>
								<td style="width:35%;">
									<img style="margin-left:20%" class = {style.weathericon} src={`/assets/icons/weather icons/${weathericon}.png`} ></img>
								</td>
								<td>
									<h1 class={ style.temperature }>{ Math.round(this.state.temp) }°C</h1>
								</td>
							</tr>
							<tr>
								<td>
									<div style="padding-top:5%; text-align:left;" class={ style.humidity }><b>Humidity</b>: { this.state.hum }%</div>
								</td>
								<td rowSpan="2" style="border: height:3%;">
									<div class={ style.conditions }>{ this.state.cond }</div>
								</td>
							</tr>
							<tr>
							<td>
									<div style="text-align:left;" class={ style.wind }><b>Wind</b>: { Math.round(this.state.win * 10) / 10 }mph</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
				{/* alert box */}
				<div class={style.redbox} flex-container>
					<h2>! Alert</h2>
					<div class={style.innerbox}>
						<p class={style.innerboxtext}>Heavy rain incoming</p>
					</div>
				</div>

				{/* tasks box */}
				<div class={style.greenbox} flex-container>
					<h2>Tasks</h2>
					<div class={style.innerbox}>
						<p class={style.innerboxtext}>Field 3 ready to harvest</p>
					</div>
				</div>

				{/* weekly overview box */}
				<div class={style.greybox} flex-container >
					<h2>To Do</h2>
					<div class={style.innerbox}>
						<p class={style.innerboxtext}>1. Irrigate lettuce</p>
						<p>2. Milk the cows</p>
						<p>3. Prepare compost heap</p>
					
					</div>
					{/* <img class={style.chart} src='\assets\icons\week-chart.jpg' height="120" style="width: 380px; position:relative; left: -4px; top:-4px"></img> */}

				</div>

				<div class={style.bufferbox}>
					box
					{/* adds blank space at the end so stuff isnt hidden behind navbar */}
				</div>

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
				
	

				{/* display weather button */}
				<div class={ style.header }> 
					{/* <div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span> */}
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					// { this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }				</div>
				
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		let location = parsed_json['name'];
		let temp_c = parsed_json['main']['temp'];
		let conditions = parsed_json['weather']['0']['description'];
		let humidity = parsed_json['main']['humidity'];
		let wind = parsed_json['wind']['speed'];
		let icon = parsed_json['weather']['0']['icon'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			hum: humidity,
			win: wind,
			ico: icon
		});      
	}
}
