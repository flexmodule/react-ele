import React,{Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	Switch
} from 'react-router-dom'
import App from '../components/App';
import Common from '../components/Common';
import Search from "../components/Search";
import Shop from "../components/Shop";
import Cast from "../components/Cast";
import Seller from "../components/Seller";
import Kindlist from "../components/Kindlist";
import Order from "../components/Common/Order";
import Home from "../components/Common/Home";
import Discover from "../components/Common/Discover";
import Profile from "../components/Common/Profile";
import {Provider} from "react-redux";
import store from "../Redux/Store"
// import App from "../components/App";
// import App from "../components/App";

const router=(
	<Provider store={store}>
	<Router>
		<App>
		    <Switch>
				<Route path="/common" render={()=>
					<Common>
						<Switch>
							<Route path="/common/discover" component={Discover}/>
							<Route path="/common/home" component={Home}/>
							<Route path="/common/order" component={Order}/>
							<Route path="/common/profile" component={Profile}/>
							<Redirect from="/common" to="/common/home"/>
						</Switch>
					</Common>
				}/>
				<Route path="/kindlist" component={Kindlist}/>
				<Route path="/Seller" component={Seller}/>
				<Route path="/search" component={Search}/>
				<Route path="/shop" component={Shop}/>
				<Route path="/cast" component={Cast}/>
				<Redirect from="*" to="/common/home"/>
			</Switch>
		</App>
	</Router>
	</Provider>
)
export default router;