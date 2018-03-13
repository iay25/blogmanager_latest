import React,{ Component } from "react";
import {connect} from 'react-redux'
import swal from 'sweetalert';
import {deletePost} from '../../actions/actions'
import {bindActionCreators} from "redux";
class Post extends Component{
  constructor(props){
    super(props);
    console.log('>>>>>>>in post comp'+this.props)
    console.log(this.props)
    this.state={toggleEditForm:false}
  }
handleEdit(post,e){
e.preventDefault();
this.state=({toggleEditForm:!this.state.toggleEditForm})
console.log(this.state.toggleEditForm)
this.props.handleEditClick(this.state.toggleEditForm,post);
}
handleDelete(postid,e){
  e.preventDefault();
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this post!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      (this.props.deletePost(postid,(status)=>{
        if(status===200){
          swal("Deleted!", "Your post has been deleted!", "success");
        }
        else{
          swal("Oops!", "Something went wrong!,Please check server", "error")
        }
      }));
    } else {
      swal("Your post is safe with us!");
    }
    
  }
);
}
render(){
  console.log(this.props.posts)
return (this.props.posts.length===0)?(<div><h3>Sorry no posts available</h3></div>):this.props.posts.map(post=>{
  return(<article key={Math.random()} className="blog-post">
  {/* <div className="blog-post-image">
    <a href="post.html"><img alt="" src={require('../../utils/images/750x500-1.jpg')} /></a>
  </div> */}
  <div className="blog-post-body">
    <h2><a href="post.html">{post.ptitle}</a>
      <button onClick={this.handleEdit.bind(this,post)} type="button" className="btn btn-lg btn-info pull-right">
        <span className="fa fa-edit"/>
      </button>
      <button onClick={this.handleDelete.bind(this,post.pid)} type="button"  id="btndel"  className="btn btn-lg btn-danger pull-right">
        <span className="fa fa-trash"/>
      </button>
      </h2>
    <div className="post-meta"><span>by <a href="#">{post.pauthor}</a></span>/<span><i className="fa fa-clock-o" />{post.pdate}</span>/<span><i className="fa fa-comment-o" /> <a href="#">343</a></span></div>
    <p>{post.pcontent}</p>
    <div className="read-more"><a href="#">Continue Reading</a></div>
  </div>
 </article>)
})
}

}
const mapStateToProps = state => {

  return {
    posts : state.posts,
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({deletePost:deletePost},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Post);