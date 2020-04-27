import React, { Component } from "react";

import NewsCard from "../components/NewsCard";

class NewsPlaceholder extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}

	render(){
		let placeholder = [];
		for (var i = 1; i <= this.props.count; i++) {
			placeholder.push(
				<NewsCard key={i} placeholder/>
			)
		}

		return (
			<div>{placeholder}</div>
		);
	}
}

export default NewsPlaceholder;