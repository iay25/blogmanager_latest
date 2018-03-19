import React,{ Component } from "react";
import {connect} from 'react-redux'
import swal from 'sweetalert2';
import {deletePost} from '../../actions/actions'
import {editPost} from '../../actions/actions'
import {bindActionCreators} from "redux";
import { Link } from 'react-router-dom'
import Modal from 'react-responsive-modal';
var validate = require("validate.js");
var moment = require('moment');

class PostList extends Component{
    constructor(props){
        super(props);
        console.log('>>>>>>>in post comp')
        console.log(props)
        this.state={error:[],hasErrors:false,open: false,currentPost:null}
      }
      onOpenModal(post,e){
        console.log(post)
        this.setState({ open: true,currentPost:post});
      };
    
      onCloseModal = () => {
        this.setState({ open: false,errors:[],hasErrors:false });
      };
    handleEdit(postid,e){
      console.log(postid)
    e.preventDefault();
            console.log('in handle edit')

            validate.extend(validate.validators.datetime, {
              // The value is guaranteed not to be null or undefined but otherwise it
              // could be anything.
              parse: function(value, options) {
                return +moment.utc(value);
              },
              // Input is a unix timestamp
              format: function(value, options) {
                var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
                return moment.utc(value).format(format);
              }
            });
    
            var constraints = {
              author:{
                presence:{allowEmpty: false}
              },
              title:{
                presence:{allowEmpty: false},
                length: {
                  minimum: 10,
                  maximum: 255
                }
              },
              date:{
                presence:{allowEmpty: false},
                datetime:{dateOnly: true}
              },
              content:{
                length:{
                  minimum:10,
                  maximum:700
                }
              }
        };
            // console.log(postid);
            const data = new FormData(e.target);
            console.log(data)
            const author=data.get('author')
            const title=data.get('title')
            const date=data.get('date')
            const content=data.get('content')
            const info={'author':author,
                'title': title,
                'date': date,
                'content': content
            }
            const errors=validate(info,constraints,{format: "detailed"})
            if(typeof errors==="undefined"){
              console.log("no errors found")
              const info={
                'pid':postid,
                'pauthor':author,
                'ptitle': title,
                'pdate':date,
                'pcontent':content
            }
              var myjson=JSON.stringify(info);
              this.props.editPost(myjson,(status)=>{
                if(status===200){
                  console.log('status 200')
                  swal("Updated!", "Your post has been successfully updated!", "success");
                  this.onCloseModal();

                }else{
                  swal("Oops!", "Something went wrong!,Please check server", "error");
                  this.onCloseModal();
                }
              });
              console.log('updated successfully')
            }
            else if(errors.length!==0){
              console.log(errors)
              var err=[];
              err=errors.map((errormsg)=>{
                return errormsg.error;
              })
              this.setState({errors:err,hasErrors:true})
            }
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
    return (this.props.posts.length===0)?(<div><h3>Sorry no posts available</h3></div>):this.props.posts.map(post=>{
      return(
      <article key={Math.random()} className="blog-post">
      {/* <div className="blog-post-image">
        <a href="post.html"><img alt="" src={require('../../utils/images/750x500-1.jpg')} /></a>
      </div> */}
      <div className="blog-post-body">
        <h2><Link to={`/posts/${post.pid}`}>{post.ptitle}</Link>
          <button type="button" onClick={this.onOpenModal.bind(this,post)} className="btn btn-lg btn-info pull-right">
            <span className="fa fa-edit"/>
          </button>
          {this.state.currentPost===null?<Modal open={this.state.open} onClose={this.onCloseModal} closeIconSize={14} little>
     { (this.state.hasErrors) ? <div>
       {(this.state.errors.map((error,index)=>{
       return <p className="text-danger text-center" key={index*Math.random()}>{error}</p>
     }
)
)
}</div>:''}
     <form onSubmit={this.handleEdit.bind(this)}>
       <div className="form-group required">
         <label className="control-label"  htmlFor="author">Update Author</label>
         <input className="form-control" defaultValue='Provide Author Name' name="author" id="author"  type="text" />
       </div>
       <div className="form-group required">
         <label className="control-label"   htmlFor="title">Change Title</label>
         <input className="form-control" defaultValue='Please add a title' name="title" id="title"  type="text" />
       </div>
       <div className="form-group required">
         <label className="control-label"  htmlFor="date">Date</label>
         <input className="form-control" readOnly  defaultValue='Please select a date' name="date" id="date"  type="date" />
       </div>
       <div className="form-group">
         <label htmlFor="content">Update Content</label>
         <textarea name="content" className="form-control" defaultValue='Please add content'  rows="3"></textarea>
       </div>
       <button type="submit" className="btn btn-primary">Update</button>
     </form>
     </Modal>:<Modal open={this.state.open} onClose={this.onCloseModal} closeIconSize={14} little>
     { (this.state.hasErrors) ? <div>
       {(this.state.errors.map((error,index)=>{
       return <p className="text-danger text-center" key={index*Math.random()}>{error}</p>
     }
)
)
}</div>:''}
     <form onSubmit={this.handleEdit.bind(this,this.state.currentPost.pid)}>
       <div className="form-group required">
         <label className="control-label"  htmlFor="author">Update Author</label>
         <input className="form-control" defaultValue={this.state.currentPost.pauthor} name="author" id="author"  type="text" />
       </div>
       <div className="form-group required">
         <label className="control-label"   htmlFor="title">Change Title</label>
         <input className="form-control" defaultValue={this.state.currentPost.ptitle} name="title" id="title"  type="text" />
       </div>
       <div className="form-group required">
         <label className="control-label"  htmlFor="date">Date</label>
         <input className="form-control" readOnly  defaultValue={this.state.currentPost.pdate}  name="date" id="date"  type="date" />
       </div>
       <div className="form-group">
         <label htmlFor="content">Update Content</label>
         <textarea name="content" className="form-control" defaultValue={this.state.currentPost.pcontent}  rows="3"></textarea>
       </div>
       <button type="submit" className="btn btn-primary">Update</button>
     </form>
     </Modal>}
          
          <button onClick={this.handleDelete.bind(this,post.pid)} type="button"  id="btndel"  className="btn btn-lg btn-danger pull-right">
            <span className="fa fa-trash"/>
          </button>
          </h2>
        <div className="post-meta"><span>by <a href="#">{post.pauthor}</a></span>/<span><i className="fa fa-clock-o" />{(new Date(post.pdate)).toDateString()}</span>/<span><i className="fa fa-comment-o" /> <a href="#">343</a></span></div>
        <div>{(post.pcontent.slice(0,post.pcontent.length/2))}<span>...</span></div>
        <div className="read-more"><Link to={`/posts/${post.pid}`}>Continue Reading</Link></div>
      </div>
     </article>

    )
    })
    }
    
    }
const mapStateToProps = state => {
    
    return {
      posts : state.posts
    }
  }
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({deletePost:deletePost,editPost:editPost},dispatch);
  }
  
 
 export default connect(mapStateToProps,mapDispatchToProps)(PostList);
 