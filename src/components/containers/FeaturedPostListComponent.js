import React,{ Component } from "react";
import FeaturedPost from "./FeaturedPost";
export default class FeaturedPostList extends Component{
    render(){
        return(
        <div className="sidebar-widget">
            <h3 className="sidebar-title">Featured Posts</h3>
            <div className="widget-container">
                <FeaturedPost/>
            </div>
        </div>
    )
    }   
   
}    