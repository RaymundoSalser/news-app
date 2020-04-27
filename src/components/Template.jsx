import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link, matchPath } from "react-router-dom";
import ReactCountryFlag from "react-country-flag"
import { connect } from "react-redux";

import { setCountry } from "../assets/redux/actions";
import { categories, countries } from "../assets/utils/Objects";
import Util from "../assets/utils";
import "../assets/scss/template.scss";

class Template extends Component{
	constructor(props) {
		super(props);
		this.state = {
			category : "All",
			...this.props.location.state,
			searchCountry : ""
		};
	}

	search = (evt) => {
		const query = evt.target.value;
		if(query.length > 0){
			evt.target.classList.remove("has-error");
			if(evt.keyCode === 13) this.submit();
		}else
			evt.target.classList.add("has-error");

	}

	validateInput = (evt) => {
		var val = evt.target.value;
		if(val.length > 0) evt.target.classList.add("no-empty");
		else{
			evt.target.classList.remove("no-empty");
			evt.target.parentNode.classList.remove("active");
		}
	}

	activateSearch = (active) => {
		document.getElementById("searchGroup").classList[active ? "add" : "remove"]("active");
	}

	submit = () => {
		const searchInput = document.getElementById("searchInput");
		let query = searchInput.value;

		if(query.length > 0)
			this.props.history.push({
				pathname : `/search/${encodeURI(query)}`
			});
		else
			searchInput.classList.add("has-error");
	}

	onSubmit = (evt) => {
		evt.preventDefault();
	}

	selectCategory = (category) => {
		this.setState({
			category
		})
	}

	selectCountry = (country) => {
		this.props.setCountry(country)
	}

	searchCountry = (evt) => {
		this.setState({
			searchCountry : evt.target.value
		});
	}

	render(){
		const match = matchPath(this.props.location.pathname, {
			path: "/search/:query"
		})

		return(
			<div className="page">
				<Navbar bg="primary" variant="dark" expand="lg" className="py-lg-4 px-lg-5 px-0 py-3 pb-0">
					<Link to="/" className="mx-4 navbar-brand">
						<img src="https://www.workit-software.com/wp-content/uploads/2018/02/logo_workit.png" alt="Workit Software"/>
					</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-4" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto w-100">
							<Link className="nav-link" to="/">Top News</Link>
							<NavDropdown title="Categories" id="basic-nav-dropdown">
								{
									categories.map((e, ind) => (
										<Link key={ind} to={`/categories/${e.toLowerCase()}`} className="dropdown-item">{e}</Link>
									))
								}
							</NavDropdown>
							<Nav.Link className="activateSearch ml-lg-auto" onClick={ () => this.activateSearch(true) }>
								<FontAwesomeIcon icon={ faSearch } className="mr-2 mr-lg-0" />
								<span className="d-lg-none">Search</span>
							</Nav.Link>
							<NavDropdown alignRight title={
								<span>
									{this.props.country && <ReactCountryFlag countryCode={this.props.country && this.props.country.code} style={{ fontSize: 20 }} className="mr-2 mr-lg-0" />}
									<span className="d-lg-none">{this.props.country.name}</span>
								</span>
							} className="ml-lg-2">
								<div className="py-2 px-3 text-center">
									<Form.Control type="text" placeholder="Search Country" name="search_country" onKeyUp={ this.searchCountry } defaultValue={this.state.searchCountry} />
								</div>
								<NavDropdown.Divider />
								<NavDropdown.Item key={1} onClick={ () => this.selectCountry("All") }>All</NavDropdown.Item>
								{
									countries.map((country, ind) => {
										if(this.state.searchCountry && (country.code.toLowerCase().search(new RegExp(this.state.searchCountry, "g")) < 0 &&Util.clearStr(country.name, " ", true).search(new RegExp(this.state.searchCountry, "g")) < 0))
											return null;
										return(
											<NavDropdown.Item key={ind+2} onClick={ () => this.selectCountry(country) }>
												<ReactCountryFlag countryCode={country.code} /> {country.name}
											</NavDropdown.Item>
										)
									})
								}
							</NavDropdown>
						</Nav>
						<Form inline className={`searchGroup ${match && match.params.query ? "active" : ""}`} id="searchGroup" onSubmit={ this.onSubmit }>
							<Form.Group>
								<Button variant="outline-light" className="closeButton" onClick={ () => this.activateSearch(false) }>
									<FontAwesomeIcon icon={ faTimes } />
								</Button>
								<div className="searchGroupInput d-flex">
									<Form.Control id="searchInput" onBlur={ this.validateInput } type="text" placeholder="Search" name="query" className="mr-sm-2" onKeyUp={ this.search } defaultValue={match && (match.params.query || "")} />
								</div>
								<Button variant="outline-light" className="searchButton" onClick={ this.submit }>
									Search
									<FontAwesomeIcon icon={ faSearch } />
								</Button>
							</Form.Group>
						</Form>
					</Navbar.Collapse>
				</Navbar>
				<div id="content">
					{this.props.children}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { country: state.country };
};

const mapDispatchToProps = {
	setCountry
}

export default connect(mapStateToProps, mapDispatchToProps)(Template);