import React, { Component } from 'react';
import { connect } from "react-redux";

import Utils from "../assets/utils";
import NewsCard from "../components/NewsCard";
import NewsPlaceholder from "../components/NewsPlaceholder";
import NewsHeader from "../components/NewsHeader";
import Pagination from "../components/Pagination";

class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			country : this.props.country,
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
		if(!page || typeof page !== "number") page = 1;

		this.setState({
			reload: true,
			news : {}
		});

		Utils.getNews("top-headlines", this.props.country.code, {
			category: this.props.match.params.category,
			page
		})
		.then((res) => {
			let total = res.totalResults > 100 ? 100 : res.totalResults;
			this.setState({
				news : res,
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
		return (
			<div className="content">
				<NewsHeader
					title={this.props.match.params.category}
					superTitle={"CATEGORY"}
					subTitle={ (this.props.country.name) ? <span>IN {this.props.country.name.toUpperCase()}</span> : "" }
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

export default connect(mapStateToProps, null)(Categories);