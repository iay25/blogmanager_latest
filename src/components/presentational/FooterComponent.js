import React,{ Component } from "react";
export default class Footer extends Component{
render(){return(
<footer className="container footer">
        <div className="footer-socials">
          <a href="#"><i className="fa fa-facebook" /></a>
          <a href="#"><i className="fa fa-twitter" /></a>
          <a href="#"><i className="fa fa-instagram" /></a>
          <a href="#"><i className="fa fa-google-plus" /></a>
          <a href="#"><i className="fa fa-dribbble" /></a>
          <a href="#"><i className="fa fa-reddit" /></a>
        </div>
        <div className="footer-bottom">
          <i className="fa fa-copyright" /> Copyright 2018. All rights reserved.<br />
          Made With love <i className="fa fa-heart"/> 
        </div>
      </footer>)
}
}