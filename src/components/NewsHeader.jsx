import React, { Component } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

class NewsHeader extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}

	render(){
		let start = this.props.totalResults ? 20 * (this.props.page - 1) + 1 : 0;
		let end = start + 19;
		if(end > this.props.totalResults) end = this.props.totalResults;

		return(
			<div className="header">
				<div className="text-center py-5">
					{this.props.superTitle && <h5 className="m-0">{this.props.superTitle}</h5>}
					{this.props.title && <h1 className="text-uppercase font-weight-bold m-0">{this.props.title}</h1>}
					{this.props.subTitle && <h5>{this.props.subTitle}</h5>}
				</div>
				<Card className="mt-4">
					<Card.Body className="d-flex align-items-center">
						<h5 className="my-0 mr-3 d-flex w-100">
							Articles
							<Badge variant="secondary" className="mr-3 ml-auto">{start || 0} - {end || 0}</Badge>
							<Badge variant="secondary" className="">Total: {this.props.totalResults || 0}</Badge>
						</h5>
						<Button variant="outline-secondary" onClick={ () => this.props.onClick() }>
							<FontAwesomeIcon icon={ faSyncAlt } spin={ this.props.reload } />
						</Button>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

export default NewsHeader