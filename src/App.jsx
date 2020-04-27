import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Template from "./components/Template";
import Categories from "./pages/Categories";
import TopNews from "./pages/TopNews";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

const AnimatedSwitch = withRouter((props) => {
	var { location } = props;
	return (
		<Template {...props}>
			<TransitionGroup>
				<CSSTransition 
					key={location.key} 
					classNames="slide" 
					timeout={1000}
				>
					<Switch location={location}>
						<Route path="/" exact={true} component={TopNews} />
						<Route path="/page-not-found" exact={true} component={NotFound} />
						<Route path="/search/:query" exact={true} component={Search} />
						<Route path="/categories/:category" exact={true} component={Categories} />
						<Redirect from='*' to='/page-not-found' />
					</Switch>
				</CSSTransition>
			</TransitionGroup>
		</Template>
	)
});

class App extends Component {
	render() {
		return (
			<Router>
				<AnimatedSwitch />
			</Router>
		);
	};
}

export default App;
