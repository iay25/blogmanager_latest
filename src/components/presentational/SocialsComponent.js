import React,{ Component } from "react";
export default class Social extends Component{
    render(){return(
    
        <div className="sidebar-widget">
        <h3 className="sidebar-title">Socials</h3>
        <div className="widget-container">
          <div className="widget-socials">
            <a href="#"><i className="fa fa-facebook" /></a>
            <a href="#"><i className="fa fa-twitter" /></a>
            <a href="#"><i className="fa fa-instagram" /></a>
            <a href="#"><i className="fa fa-google-plus" /></a>
            <a href="#"><i className="fa fa-dribbble" /></a>
            <a href="#"><i className="fa fa-reddit" /></a>
          </div>
        </div>
      </div>
    )
    }   
   
}    