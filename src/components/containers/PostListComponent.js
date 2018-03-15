import React,{ Component } from "react";
import {connect} from 'react-redux'
import swal from 'sweetalert2';
import {deletePost} from '../../actions/actions'
import {bindActionCreators} from "redux";
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import {editPost} from '../../actions/actions'
import { Link } from 'react-router-dom'
var validate = require("validate.js");
var moment = require('moment');
var moment = require('moment');
var textarea;
class PostList extends Component{
    constructor(props){
        super(props);
        console.log('>>>>>>>in post comp')
        console.log(props)
        this.state={error:[],hasErrors:false,textarea:this.props.defaultval.pcontent}
      }
    handleEdit(postid,e){
    e.preventDefault();
   
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
            const content=this.state.textarea
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
                }else{
                  swal("Oops!", "Something went wrong!,Please check server", "error")
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
    handleTextAreaChange(value){
     this.setState({textarea:value})
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
    clearState(){
        this.setState({errors:[],hasErrors:false})
      }
      handleEditClick(post,e){
        e.preventDefault();
        console.log('in hancle edit clickkkkkkkkkkkkkkkkkk')
        console.log(post)
        this.props.handleclick(post)
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
          <button onClick={this.handleEditClick.bind(this,post)}  data-toggle="modal" data-target="#editBox" type="button" className="btn btn-lg btn-info pull-right">
            <span className="fa fa-edit"/>
          </button>
          <button onClick={this.handleDelete.bind(this,post.pid)} type="button"  id="btndel"  className="btn btn-lg btn-danger pull-right">
            <span className="fa fa-trash"/>
          </button>
          </h2>
        <div className="post-meta"><span>by <a href="#">{post.pauthor}</a></span>/<span><i className="fa fa-clock-o" />{(new Date(post.pdate)).toDateString()}</span>/<span><i className="fa fa-comment-o" /> <a href="#">343</a></span></div>
        <div>{Parser(post.pcontent.slice(0,post.pcontent.length/2))}<span>...</span></div>
        <div className="read-more"><Link to={`/post/${post.pid}`}>Continue Reading</Link></div>
      </div>
      <div className="modal fade" id="editBox" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                  <div className="modal-header">
                    { (this.state.hasErrors) ? <div>{(this.state.errors.map((error,index)=>{
                return <p className="text-danger text-center" key={index*Math.random()}>{error}</p>
                    } ) )
                    }</div>: <h5 className="modal-title" id="exampleModalLongTitle">Edit Post</h5>}
           
                  <button type="button" onClick={this.clearState.bind(this)} className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
          </div>
          <div className="modal-body">
          <form onSubmit={this.handleEdit.bind(this,post.pid,)}>
                <div className="form-group required">
                  <label className="control-label" htmlFor="author">Update Author</label>
                  <input className="form-control" name="author" id="author" placeholder="Update Author" defaultValue={post.pauthor} type="text" />
                </div>
                <div className="form-group required">
                  <label className="control-label"  htmlFor="title">Update Title</label>
                  <input className="form-control" name="title" id="title" placeholder="Update Title" defaultValue={post.ptitle} type="text" />
                </div>
                <div className="form-group required">
                  <label className="control-label"  htmlFor="date">Date</label>
                  <input readOnly className="form-control" name="date" id="date" placeholder="Choose Date" defaultValue={post.pdate} type="date" />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Update Content</label>
                  <ReactQuill theme="snow" value={this.state.textarea} onChange={this.handleTextAreaChange.bind(this)} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
          </div>
        </div>
      </div>
    </div>
     </article>
     
    )
    })
    }
    
    }
const mapStateToProps = state => {
    
    return {
      posts : state.posts,
    }
  }
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({deletePost:deletePost,editPost:editPost},dispatch);
  }
  
 
 export default connect(mapStateToProps,mapDispatchToProps)(PostList);