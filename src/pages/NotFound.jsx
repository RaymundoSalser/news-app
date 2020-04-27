import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

class NotFound extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}

	render(){
		return(
			<div className="d-flex w-100 h-100 align-items-center justify-content-center flex-column">
				<img src={require("../assets/images/page-not-found.svg")} alt="" style={{ width: "90%", maxWidth: 400 }} className="m-0" />
				<h1 style={{ marginTop: -50 }} className="font-weight-bolder text-uppercase">Page Not Found</h1>
				<p className="m-0">Oops. The page you're looking for doesn't exist.</p>
				<Link to="/" className="btn btn-lg btn-success mt-5">
					<FontAwesomeIcon icon={ faHome } className="mr-2" />
					Back to Home
				</Link>
			</div>
		);
	}
}

export default NotFound;