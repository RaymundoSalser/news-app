import React, { Component } from 'react';
import { connect } from "react-redux";

import Utils from "../assets/utils";
import NewsCard from "../components/NewsCard";
import NewsPlaceholder from "../components/NewsPlaceholder";
import NewsHeader from "../components/NewsHeader";
import Pagination from "../components/Pagination";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.location.state,
			news : {},
			reload : false,
			page : 1,
			pages : 1
		};
	}

	componentDidMount(){
		this.getNews();
	}

	componentDidUpdate(nProps){
		if(this.state.country !== this.props.country){
			this.setState({
				country : this.props.country
			});

			this.getNews();
		}
	}

	getNews = (page) => {
		if(!page || typeof page != "number") page = 1;

		this.setState({
			reload: true,
			news : {}
		});

		let query = {
			q : this.props.match.params.query,
			page
		};
		if(this.state.category) query = {
			...query,
			category: this.state.category
		}

		Utils.getNews("everything", null, query)
		.then((res) => {
			let total = res.totalResults > 100 ? 100 : res.totalResults;
			this.setState({
				news: res,
				totalResults: total,
				reload: false,
				pages : Math.ceil(total / 20),
				page
			});
		});
	}

	changePage = (page) => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		this.getNews(page);
	}

	render() {
		let paginationItems = [];

		for (let number = 1; number <= this.state.pages; number++) {
			paginationItems.push(
				<Pagination.Item key={number} onClick={ () => this.changePage(number) } active={number === this.state.page}>
					{number}
				</Pagination.Item>
			);
		}
		return (
			<div className="content">
				<NewsHeader
					title={this.props.match.params.query}
					superTitle={"SEARCH"}
					totalResults={this.state.totalResults}
					onClick={ this.getNews }
					page={this.state.page}
					reload={this.state.reload}
				/>
				<div className="articles">
					{
						this.state.news.status ? (this.state.news.status === "ok" ? this.state.news.articles.map((article, ind) => {
							return(
								<NewsCard
									key={ind}
									img={article.urlToImage}
									url={article.url}
									title={article.title}
									content={article.content}
									sourceName={article.source.name}
									publishedAt={article.publishedAt}
								/>
							)
						}) : <NewsCard error={this.state.news.error} />
						) : <NewsPlaceholder count={5} />
					}
					<Pagination page={this.state.page} pages={this.state.pages} changePage={ page => this.changePage(page) } />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { country: state.country };
};

export default connect(mapStateToProps, null)(Search);