import React,{ Component } from "react";
import {connect} from 'react-redux'
import swal from 'sweetalert2';
import {deletePost} from '../../actions/actions'
import {bindActionCreators} from "redux";
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import {editPost} from '../../actions/actions'
import { Link } from 'react-router-dom'
import Navbar from '../presentational/NavbarComponent'
var validate = require("validate.js");
var moment = require('moment');
var moment = require('moment');

var textarea;
class Post extends Component{
  constructor(props){
    super(props);
    console.log('>>>>>>>in post comp')
  
  }
render(){
  var postid=parseInt(this.props.match.params.post);
  console.log(postid)
  console.log(typeof postid)
 var post=this.props.posts.filter((post)=>{
   console.log(post.pid)
   console.log(typeof post.pid)
   return post.pid===postid
 })
  return(
   <div>
    <Navbar/>
    <div className="container">
   
   <article key={Math.random()} className="blog-post">
   <Link to={`/`}><i class="fa fa-arrow-circle-left fa-4x"></i></Link>
   {/* <div className="blog-post-image">
     <a href="post.html"><img alt="" src={require('../../utils/images/750x500-1.jpg')} /></a>
   </div> */}
   <div className="blog-post-body">
     <h2><Link to={`/post/${post[0].pid}`}>{post[0].ptitle}</Link>
       </h2>
     <div className="post-meta"><span>by {post[0].pauthor}</span>/<span><i className="fa fa-clock-o" />{(new Date(post[0].pdate)).toDateString()}</span>/<span><i className="fa fa-comment-o" /> <a href="#">343</a></span></div>
     {Parser(post[0].pcontent)}
   </div>
  </article>
  </div>

  </div>
  
)
}
}
const mapStateToProps = state => {
    
  return {
    posts : state.posts,
  }
}
export default connect(mapStateToProps,null)(Post);