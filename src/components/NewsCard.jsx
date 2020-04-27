import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Placeholder } from "semantic-ui-react";

class NewsCard extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}

	placeholder = (
		<div className="w-100 d-flex flex-rows align-items-center">
			<Placeholder style={{ width : 100, height : 100 }}>
				<Placeholder.Image square />
			</Placeholder>
			<Placeholder className="w-100 ml-3 mt-0" style={{ maxWidth: "100%" }}>
				<Placeholder.Paragraph>
					<Placeholder.Line />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line length="full" />
					<Placeholder.Line />
				</Placeholder.Paragraph>
			</Placeholder>
		</div>
	)

	render(){
		return (
			<Card className="my-3">
				<Card.Body className="flex-row d-flex align-items-center">
					{
						this.props.placeholder ? this.placeholder : (
							<div>
								{
									this.props.urlToImage && (
										<a href={this.props.url} target="_blank" rel="noopener noreferrer">
											<img src={this.props.urlToImage || require("../assets/images/image-placeholder.png")} alt="" width="200" className="mr-4"/>
										</a>
									)
								}
								{
									this.props.error && (
										<span><strong className="mr-2">ERROR:</strong>{this.props.error}</span>
									)
								}
								{
									!this.props.error && (
										<blockquote className="blockquote mb-0 w-100">
											<a href={this.props.url} target="_blank" rel="noopener noreferrer">
												<p><strong>{this.props.title}</strong></p>
											</a>
											<p className="text-muted"><small>{this.props.content}</small></p>
											<footer className="blockquote-footer d-flex mt-2">
												<cite title="this.props.sourceName">{this.props.sourceName}</cite>
												<cite className="ml-auto" title="this.props.publishedAt">{this.props.publishedAt}</cite>
											</footer>
										</blockquote>
									)
								}
							</div>
						)
					}
				</Card.Body>
			</Card>
		);
	}
}

export default NewsCard;