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
		
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=94389e8a8d91186a44a860ea125a4e11";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

	//displays weather data
	componentWillMount() {
		this.fetchWeatherData ();
	}

	// sets icon based on icon value from API 
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
	  
	// the main render method for the iphone component
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
		const suffixes = ['th', 'st', 'nd', 'rd'];
		const daySuffix = suffixes[(dayOfMonth-20)%10] || suffixes[dayOfMonth] || suffixes[0];
		const formattedDate = `${dayOfWeek} ${dayOfMonth}${daySuffix} ${monthName}`;

		//This sets 24hr time
		const hours = currentDate.getHours();
		const minutes = currentDate.getMinutes();
		const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

		//for setting weather icon dynamically
		let weathericon = this.setWeatherIcon();

		// what shows on the screen
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
							<tr>
							<td style="width:40%;" rowSpan={2}>
									<img style="margin-left:20%; width:100px;" class = {style.weathericon} src={`/assets/icons/weather icons/${weathericon}.png`} ></img>
								</td>
								<td >
									<h1 class={ style.temperature }>{ Math.round(this.state.temp) }°C</h1>
								</td>
							</tr>
							<tr>
								<td style="border: height:3%;">
									<div style="font-size:30px" class={ style.conditions }>{ this.state.cond }</div>
								</td>
							</tr>
						</table>
					</div>
					<br></br>

					{/* humidity and wind */}
					<div class={style.innerbox}>
						<table class={style.weathertable}>
							<tr>
								<td style="width:50%">
									<div style="text-align:left; font-size:30px" class={ style.humidity }>
										<img style="width:60px;" src="\assets\icons\humidity.png">
									</img><div style="display:inline; position:relative; bottom:10pt;">{ this.state.hum }%</div></div>
								</td>
								<td>
									<div style="text-align:left; font-size:30px" class={ style.wind }>
										<img style="width:60px;" src="\assets\icons\wind flag.png"></img> 
										<div style="display:inline; position:relative; bottom:10pt;"> { Math.round(this.state.win * 10) / 10 }mph</div></div>
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
						<ol class={style.innerboxtext} style=" list-style-position: inside; padding:0; margin:0;">
							<li>Irrigate field 1</li>
							<li>Milk cows</li>
							<li>Order barley seeds</li>
						</ol>
					</div>
				</div>

				<div class={style.bufferbox}>
					box
					{/* adds blank space at the end so stuff isnt hidden behind navbar */}
				</div>

				{/* navigation bar */}
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

	//fetches data from open weather API and sets to states
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
