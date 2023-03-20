// import preact
import { h, Component } from 'preact';

// import required Components from 'components/'
import Iphone from './iphone';
import Ipad from './ipad';
// import Home from './Home';
// import About from './About';
// import Contact from './Contact';

// import { h } from 'preact';
// import { useEffect, useState } from 'preact/hooks';

// import Forecast from './Forecast';
// import SearchForm from './SearchForm';

// function App(props) {
//   const { location } = props;
//   const [query, setQuery] = useState('');
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     async function fetchWeatherData() {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=YOUR_API_KEY`
//       );
//       const json = await response.json();
//       setData(json);
//     }

//     fetchWeatherData();
//   }, [query]);

//   return (
//     <div>P
//       <h1>Farmer Weather App</h1>
//       <SearchForm query={query} setQuery={setQuery} />
//       {data && <Forecast data={data} />}
//     </div>
//   );
// }

// export default App;




export default class App extends Component {
//var App = React.createClass({

	

	// once the components are loaded, checks if the url bar has a path with "ipad" in it, if so sets state of tablet to be true
	componentDidMount() {
		const urlBar = window.location.href;
		if(urlBar.includes("ipad")) {
			this.setState({
				"isTablet": true
			});
		} else {
			this.setState({
				"isTablet": false
			});
		}
	}

	/*
		A render method to display the required Component on screen (iPhone or iPad) : selected by checking component's isTablet state
	*/
	render(){
		if(this.state.isTablet){
			return (
				<div id="app">
					<Ipad/ >
				</div>   				
			);
		} 
		else {
			return (
				<div id="app">
					<Iphone/ >
				</div>
			);
		}
	}
}