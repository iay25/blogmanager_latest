import React,{Component} from "react";
import { Link } from 'react-router-dom'
class Navbar extends Component{
    render(){
return(
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon" />
</button>
<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
  <a className="navbar-brand" href="#">The Girl Who Loves Travel</a>
  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
    <li className="nav-item active">
      <Link to={`/`} className="nav-link">Home <span className="sr-only">(current)</span></Link>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">Lifestyle</a>
    </li>
    <li className="nav-item">
    <a className="nav-link" href="#">Travel</a>
    </li>
    <li className="nav-item">
    <a className="nav-link" href="#">About Me</a>
    </li>
    <li className="nav-item">
    <a className="nav-link" href="#">Contact</a>
    </li>
  </ul>
  <ul className="nav navbar-nav ml-auto">
    <li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-facebook"></i></a>
    </li>
    <li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-twitter"></i></a>
    </li>
    <li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-instagram"></i></a>
    </li>
    <li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-google-plus"></i></a>
    </li>
    <li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-dribbble"></i></a>
    </li>
    <li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-reddit"></i></a>
    </li>
</ul>
</div>
</nav>
    )
    }

}
export default Navbar;