import React, { Component } from "react";
import { Pagination as BtPagination } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

class Pagination extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}

	render(){
		let paginationItems = [];
		for (let number = 1; number <= this.props.pages; number++) {
			paginationItems.push(
				<BtPagination.Item key={number} onClick={ () => this.props.changePage(number) } active={number === this.props.page}>
					{number}
				</BtPagination.Item>
			);
		}

		if(this.props.pages <= 1) return null;
		return(
			<div className="d-flex text-center mt-4">
				<BtPagination className="mx-auto">
					{
						this.props.page !== 1 && (
							<BtPagination.Item key={0} onClick={ () => this.props.changePage(this.props.page - 1) } disabled={this.props.page === 1 ? true : false}>
								<FontAwesomeIcon icon={ faChevronLeft } />
							</BtPagination.Item>
						)
					}
					{paginationItems}
					{
						this.props.page !== this.props.pages && (
							<BtPagination.Item key={this.props.pages + 1} onClick={ () => this.props.changePage(this.props.page + 1) }>
								<FontAwesomeIcon icon={ faChevronRight } />
							</BtPagination.Item>
						)
					}
				</BtPagination>
			</div>
		)
	}
}

export default Pagination;