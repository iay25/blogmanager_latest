import React,{Component} from "react";

class Navbar extends Component{
    render(){
return(<nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="index.html">Home</a></li>
            <li><a href="#about">Lifestyle</a></li>
            <li><a href="#contact">Travel</a></li>
            <li><a href="#contact">Fashion</a></li>
            <li><a href="about.html">About Me</a></li>
            <li><a href="about.html">Contact</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#"><i className="fa fa-facebook" /></a></li>
            <li><a href="#"><i className="fa fa-twitter" /></a></li>
            <li><a href="#"><i className="fa fa-instagram" /></a></li>
            <li><a href="#"><i className="fa fa-google-plus" /></a></li>
            <li><a href="#"><i className="fa fa-dribbble" /></a></li>
            <li><a href="#"><i className="fa fa-reddit" /></a></li>
          </ul>
        </div>
      
    </nav>
    )
    }

}
export default Navbar;