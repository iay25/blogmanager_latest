import React,{ Component } from "react";
import {connect} from 'react-redux'
import swal from 'sweetalert2';
import {deletePost} from '../../actions/actions'
import {editPost} from '../../actions/actions'
import {bindActionCreators} from "redux";
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom'
var validate = require("validate.js");
var moment = require('moment');
var moment = require('moment');

class PostList extends Component{
    constructor(props){
        super(props);
        console.log('>>>>>>>in post comp')
        console.log(props)
        this.state={error:[],hasErrors:false}
      }
      openModal(e) {
        e.preventDefault()
        this.setState({modalIsOpen: true});
      }
    
      afterOpenModal() {
        // references are now sync'd and can be accessed.
      }
    
      closeModal(e) {
        e.preventDefault()
        this.setState({modalIsOpen: false});
      }
    
    handleEdit(postid,pcontent,e){
    e.preventDefault();
            console.log('in handle edit')
            console.log(pcontent)
            console.log(postid)
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
            const content=''
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
     this.state.textarea=value;
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
    render(){
    return (this.props.posts.length===0)?(<div><h3>Sorry no posts available</h3></div>):this.props.posts.map(post=>{
      return(
      <article key={Math.random()} className="blog-post">
      {/* <div className="blog-post-image">
        <a href="post.html"><img alt="" src={require('../../utils/images/750x500-1.jpg')} /></a>
      </div> */}
      <div className="blog-post-body">
        <h2><a href="post.html">{post.ptitle}</a>
          <button type="button" className="btn btn-lg btn-info pull-right">
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
 