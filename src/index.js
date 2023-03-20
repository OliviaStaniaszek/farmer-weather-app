// import 'promise-polyfill';
// import 'isomorphic-fetch';
import { h, render } from 'preact';
import Router from 'preact-router';

import './style';

import Index from './components/iphone/index';
import Crops from './components/iphone/crops';

const Routes = () => (
<div>
	<Router>
		<Index path="/" />
		<Crops path="/crops" />
		
	</Router>
	</div>
)


let root;
function init() {
	let App = require('./components/app').default;
	root = render(<Routes />, document.body, root);
}

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
	require('./pwa');
}

// in development, set up HMR:
if (module.hot) {
	//require('preact/devtools');   // turn this on if you want to enable React DevTools!
	module.hot.accept('./components/app', () => requestAnimationFrame(init) );
}

init();
