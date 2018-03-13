import React,{ Component } from "react";

class AboutMe extends Component{
    render(){return(
        <div className="sidebar-widget">
        <h3 className="sidebar-title">About Me</h3>
        <div className="widget-container widget-about">
          <a href="post.html"><img src={require('../../utils/images/author.jpg')} alt="" /></a>
          <h4>Jamie Mooz</h4>
          <div className="author-title">Designer</div>
          <p>While everyone’s eyes are glued to the runway, 
                it’s hard to ignore that there are major fashion moments on the front row too.</p>
        </div>  
      </div>)
    } 
}
export default AboutMe;