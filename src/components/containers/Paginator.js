import React from 'react';
var _ = require('underscore');

const defaultProps = {
    initialPage: 1
}
 
class Pagination extends React.Component {
    constructor(props) {
        super(props);
        console.log('in paginator..................')
       
        this.state = { pager: {} };
    }
 
    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            console.log('calling setpage')
            this.setPage(this.props.initialPage);
        }
    }
 
    componentDidUpdate(prevProps, prevState) {
        console.log(this.props)
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            console.log('calling setpage from did update')
            this.setPage(1);
        }
    }
 
    setPage(page) {
        console.log('in set page')
        console.log(page)
        var items = this.props.items;
        console.log(items)
        var pager = this.state.pager;
        console.log(pager)
        if (page < 1 || page > pager.totalPages) {
            return;
        }
 
        // get new pager object for specified page
        pager = this.getPager(items.length, page);
 
        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
 
        // update state
        this.setState({ pager: pager });
 
        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }
 
    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
 
        // default page size is 10
        pageSize = pageSize || 10;
 
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
 
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
 
    render() {
        var pager = this.state.pager;
 
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
        console.log('in render of paginator')
        return (
            // <ul>
            //     <li className={pager.currentPage === 1 ? 'disabled' : ''}>
            //         <a onClick={() => this.setPage(1)}>First</a>
            //     </li>
            //     <li className={pager.currentPage === 1 ? 'disabled' : ''}>
            //         <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
            //     </li>
            //     {pager.pages.map((page, index) =>
            //         <li key={index} className={pager.currentPage === page ? 'active' : ''}>
            //             <a onClick={() => this.setPage(page)}>{page}</a>
            //         </li>
            //     )}
            //     <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
            //         <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
            //     </li>
            //     <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
            //         <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
            //     </li>
            // </ul>
            <div>HElllllllllllllllllllllllllooooo</div>
        );
    }
}

export default Pagination;