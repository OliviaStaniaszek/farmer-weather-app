// import preact
import { h, render, Component } from 'preact';
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
		//url Sanchia got
		// http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=cb932829eacb6a0e9ee4f38bfbf112ed

		// Previous url Jane gave
		//http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=cf17e23b1d108b29a4d738d2084baf5

		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=cb932829eacb6a0e9ee4f38bfbf112ed";
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
		const year = currentDate.getFullYear();
		const suffixes = ['th', 'st', 'nd', 'rd'];
		const daySuffix = suffixes[(dayOfMonth-20)%10] || suffixes[dayOfMonth] || suffixes[0];
		const formattedDate = `${dayOfWeek} ${dayOfMonth}${daySuffix} ${monthName} ${year}`;

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

		
		// display all weather data
		return (
			// <div class={ style.container }>
			// 	<div class={ style.header }>
			<div class={ style.container }> 
				<div class={style.headerbar}> 
					<h1>Farm 39</h1> {/* change text based on current page */}
					<img src="\assets\icons\farm-logo.jpg" height="50" style="max-width: 50px; position:relative; left: 350px; top:-60px"/>
					<img src="\assets\icons\lines.png" height="50" style="max-width: 50px; position:relative; left: 10px; top:-110px"/>
				</div>
				{/* weather box */}
				<div class={style.bluebox} flex-container>
					<h2>{formattedDate}</h2> {/* current date*/}
					<h2>{formattedTime}</h2> {/* current time */}
					<div class={style.innerbox}>
						<img class = {style.weathericon} src="\assets\icons\cloudy.png" ></img>
						
						<p class={style.innerboxtext}>°C</p>
						{/* <span class={ tempStyles }>{ this.state.temp }</span>
						<div class={ style.conditions }>{ this.state.cond }</div> */}
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
					<h2>Weekly overview</h2>
					<div class={style.innerbox}>
						<p class={style.innerboxtext}>graph goes here</p>
					</div>
				</div>

				{/* nav bar */}
				<div class={style.navbar} flex-container>
					<ul>
						{/* will link to different pages */}
						<li><a href="crops.js" >crops</a></li>
						<li><a>to do</a></li>
						<li>
							{/* <img href='\assets\icons\cloudy.png' style="width:40px;"></img> */}
							<a class="active">Weather</a>
						</li>
						<li><a>trends</a></li>
						<li><a>calendar</a></li>
					</ul>
				</div>

				{/* display weather button */}
				<div class={ style.header }> 
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
					<p>'hey there'</p>
				</div>
				
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions
		});      
	}
}
