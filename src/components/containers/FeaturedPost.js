import React,{ Component } from "react";

class FeaturedPost extends Component{

render(){
  return(
    <article className="widget-post">
    <div className="post-image">
      <a href="post.html"><img src={require('../../utils/images/90x60-1.jpg')} alt="" /></a>
    </div>
    <div className="post-body">
      <h2><a href="post.html">The State of the Word 2014</a></h2>
      <div className="post-meta">
        <span><i className="fa fa-clock-o" /> 2. august 2015</span> <span><a href="post.html"><i className="fa fa-comment-o" /> 23</a></span>
      </div>
    </div>
  </article>)
}

}
export default FeaturedPost;