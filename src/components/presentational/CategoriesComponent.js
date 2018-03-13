import React,{ Component } from "react";
export default class Categories extends Component{
render(){
    return(
        <div className="sidebar-widget">
        <h3 className="sidebar-title">Categories</h3>
        <div className="widget-container">
          <ul>
            <li><a href="#">Fashion</a></li>
            <li><a href="#">Art</a></li>
            <li><a href="#">Design</a></li>
            <li><a href="#">Featured</a></li>
            <li><a href="#">Graphics</a></li>
            <li><a href="#">Peoples</a></li>
            <li><a href="#">Uncategorized</a></li>
          </ul>
        </div>
      </div>
    )
}
}