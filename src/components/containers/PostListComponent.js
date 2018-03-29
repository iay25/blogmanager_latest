import React,{ Component } from "react";
import {connect} from 'react-redux'
import swal from 'sweetalert2';
import {deletePost} from '../../actions/actions'
import {editPost} from '../../actions/actions'
import {bindActionCreators} from "redux";
import { Link } from 'react-router-dom'
import Img from 'react-image'
import Loader from 'react-loader-spinner'
var validate = require("validate.js");
var moment = require('moment');

class PostList extends Component{
    constructor(props){
        super(props);
        console.log('>>>>>>>in post comp')
        console.log(props)
        this.state={open: false}
      }
      onOpenModal(post,e){
        this.setState({ open: true});
      };
    
      onCloseModal = () => {
        this.setState({ open: false });
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
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: true,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.props.deletePost(postid,(status)=>{
            if(status===200){
              swal(
                'Deleted!',
                'Your post has been deleted.',
                'success'
              )
            }
            else{
              swal(
                'Sorry',
                'Unable to contact server,Please try later',
                'error'
              )
            }
          });
        
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swal(
            'Cancelled',
            'Your post is safe with us :)',
            'error'
          )
        }
      })
    }
    onChangePage=(pageOfItems)=>{
      // update state with new page of items
      this.setState({ pageOfItems: pageOfItems });
  }
    render(){
return<div>
{ this.props.posts.map((post)=>{
  {
    console.log(post.pimgurls)
  var array=post.pimgurls.split(',')
  console.log(array)
  
  }
   return <article key={Math.random()*post.pid} className="blog-post">
   <div className="blog-post-image">
   <Img
    src={array[0]}
    loader={<Loader 
      type="Puff"
      color="#00BFFF"
      height="100"	
      width="100"
   />   }
  />
   </div>
   <div className="blog-post-body">
     <h2><Link to={`/posts/${post.pid}`}>{post.ptitle}</Link>
       <button type="button" onClick={this.onOpenModal.bind(this,post)} className="btn btn-lg btn-info pull-right">
         <span className="fa fa-edit"/>
       </button>

       <button onClick={this.handleDelete.bind(this,post.pid)} type="button"  id="btndel"  className="btn btn-lg btn-danger pull-right">
         <span className="fa fa-trash"/>
       </button>
       </h2>
     <div className="post-meta"><span>by <a href="#">{post.pauthor}</a></span>/<span><i className="fa fa-clock-o" />{new Date(post.pdate).toDateString()}</span>/<span><i className="fa fa-comment-o" /> <a href="#">343</a></span></div>
     <div>{(post.pcontent.slice(0,post.pcontent.length/2))}<span>...</span></div>
     <div className="read-more"><Link to={`/posts/${post.pid}`}>Continue Reading</Link></div>
   </div>
  </article>
 })
}
 {/* <Pagination items={this.props.posts} onChangePage={this.onChangePage}></Pagination> */}
 </div>
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
 