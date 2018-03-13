import React,{ Component } from "react";
import Post from "./PostComponent";
import SideBar from "../presentational/SideBarComponent"
export default class PostList extends Component{
    render(){return(
        <div className="row">
        <div className="col-md-8">
                <Post/>
        </div>
            <SideBar/>
      </div>)
    }

}