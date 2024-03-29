// import preact
import { h, render, Component } from 'preact';
import { Link } from 'preact-router/match';

// import stylesheets for ipad & button
import style from './style';

// import jquery for API calls
import $ from 'jquery';

export default class Iphone extends Component {

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state

		this.state.temp = "";
		
		// button display state
		this.setState({ display: true });
	}

	// the main render method for the iphone component
	render() {
		// page content
		return (			
			<div class={ style.container }> 
				{/* header */}
				<div class={style.headerbar}> 
					<h1>Farm 39</h1> 
					{/* Farm logo */}
					<img src="\assets\icons\farm house outline.png" height="50" style="max-width: 65px; position:relative; left: 330px; top:-45px"/>
				</div>
				{/* grey box */}
				<div class={style.greybox} flex-container>
					<h2>Your farm</h2>
					<img src="\assets\icons\farm fields.png" style="width: 375px;"></img>
				</div>

				{/* field boxes */}
				<div class={style.yellowbox} flex-container>
					<h2>Field 1</h2>
					<div class={style.innerbox}>
						<table class={style.croptable}>
							<tr>
								<th>Crop</th>
								<th>Wheat</th>
							</tr>
							<tr>
								<td>Plant date</td>
								<td>April</td>
							</tr>
							<tr>
								<td>Harvest date</td>
								<td>August</td>
							</tr>
							<tr>
								<td>Last irrigation</td>
								<td>2 days ago</td>
							</tr>
							<tr>
								<td>Last fertilisation</td>
								<td>1 week ago</td>
							</tr>
						</table>
					</div>
				</div>

				<div class={style.orangebox} flex-container>
					<h2>Field 2</h2>
					<div class={style.innerbox}>
						<table class={style.croptable}>
							<tr>
								<th>Crop</th>
								<th>Oats</th>
							</tr>
							<tr>
								<td>Plant date</td>
								<td>April</td>
							</tr>
							<tr>
								<td>Harvest date</td>
								<td>August</td>
							</tr>
							<tr>
								<td>Last irrigation</td>
								<td>2 days ago</td>
							</tr>
							<tr>
								<td>Last fertilisation</td>
								<td>1 week ago</td>
							</tr>
						</table>
					</div>
				</div>

				<div class={style.greenbox} flex-container>
					<h2>Field 3</h2>
					<div class={style.innerbox}>
						<table class={style.croptable}>
							<tr>
								<th>Crop</th>
								<th>Barley</th>
							</tr>
							<tr>
								<td>Plant date</td>
								<td>April</td>
							</tr>
							<tr>
								<td>Harvest date</td>
								<td>August</td>
							</tr>
							<tr>
								<td>Last irrigation</td>
								<td>2 days ago</td>
							</tr>
							<tr>
								<td>Last fertilisation</td>
								<td>1 week ago</td>
							</tr>
						</table>
					</div>
				</div>

				<div class={style.bluebox} flex-container>
					<h2>Field 4</h2>
					<div class={style.innerbox}>
						<table class={style.croptable}>
							<tr>
								<th>Crop</th>
								<th>Corn</th>
							</tr>
							<tr>
								<td>Plant date</td>
								<td>April</td>
							</tr>
							<tr>
								<td>Harvest date</td>
								<td>August</td>
							</tr>
							<tr>
								<td>Last irrigation</td>
								<td>2 days ago</td>
							</tr>
							<tr>
								<td>Last fertilisation</td>
								<td>1 week ago</td>
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
}
