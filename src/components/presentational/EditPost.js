import React from "react";
import {connect} from "react-redux"
import {editPost} from '../../actions/actions'
import {bindActionCreators} from "redux";
import swal from 'sweetalert';
var validate = require("validate.js");
var moment = require('moment');
class EditPost extends React.Component{
  constructor(props){
    super(props);
    this.state={errors:[],hasErrors:false}

  }
  
    handleSubmit(postid,e){
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
              swal("Updated!", "Your post has been successfully updated!", "success");
            }else{
              swal("Oops!", "Something went wrong!,Please check server", "error")
            }
          });
          // console.log('updated successfully')
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
    render(){
      var postid=this.props.defaultval.pid;
        return(<div>
          {console.log(this.state.hasErrors)}
          {console.log(this.state.errors)}
          { (this.state.hasErrors) ? <div>
              {(this.state.errors.map((error,index)=>{
             return <p className="text-danger text-center bg-danger" key={index*Math.random()}>{error}</p>
         }
         )
        )
         }</div>:''}
         <div className="sidebar-widget">
          <div className="panel panel-primary">
            <div className="panel-heading">
               <h3 className="panel-title">Update Post</h3>
            </div>
          <div className="panel-body">
          <form onSubmit={this.handleSubmit.bind(this,postid)}>
        <div className="form-group">
          <label htmlFor="author">Update Author</label>
          <input className="form-control" name="author" id="author" placeholder="Add Author" type="text" defaultValue={this.props.defaultval.pauthor} />
        </div>
        <div className="form-group">
          <label htmlFor="title">Update Title</label>
          <input className="form-control" name="title" id="title" placeholder="Add Title" type="text" defaultValue={this.props.defaultval.ptitle} />
        </div>
        <div className="form-group">
          <label htmlFor="date">Update Date</label>
          <input className="form-control" name="date" id="date" placeholder="Enter Date" type="date" defaultValue={this.props.defaultval.pdate} />
        </div>
        <div className="form-group">
          <label htmlFor="content">Update Content</label>
          <textarea name="content" className="form-control" placeholder="Add Content" rows="3" defaultValue={this.props.defaultval.pcontent}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
          </div>
        </div>
        </div>
         </div>   
        )
    }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({editPost:editPost},dispatch);
}
export default connect(null,mapDispatchToProps)(EditPost)