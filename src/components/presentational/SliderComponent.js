import React,{Component} from "react";
class Slider extends Component{
    render(){
       return(
          <ul className="bxslider">
            <li><div className="slider-item"><img alt="" src={require('../../utils/images/1140x500-2.jpg')}  title="Funky roots" /><h2><a href="post.html" title="Vintage-Inspired Finds for Your Home">Vintage-Inspired Finds for Your Home</a></h2></div></li>
            <li><div className="slider-item"><img alt="" src={require('../../utils/images/1140x500-1.jpg')}  title="Funky roots" /><h2><a href="post.html" title="Vintage-Inspired Finds for Your Home">Vintage-Inspired Finds for Your Home</a></h2></div></li>
            <li><div className="slider-item"><img alt="" src={require('../../utils/images/1140x500-3.jpg')}  title="Funky roots" /><h2><a href="post.html" title="Vintage-Inspired Finds for Your Home">Vintage-Inspired Finds for Your Home</a></h2></div></li>
          </ul>
      )
    }

}
export default Slider;