import React from "react";
import {connect} from "react-redux"
import {savePost} from '../../actions/actions'
import {bindActionCreators} from "redux";
import swal from 'swal-forms';
var validate = require("validate.js");
var moment = require('moment');
class CreatePost extends React.Component{
  constructor(props){
    super(props);
    this.state={errors:[],hasErrors:false}

  }
    handleSubmit(e){
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
    console.log('in handle')
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
    console.log(info)
    const errors=validate(info,constraints,{format: "detailed"})
    if(typeof errors==="undefined"){
      console.log("no errors found")
      const info={'pauthor':author,
        'ptitle': title,
        'pdate':date,
        'pcontent':content
    }
      var myjson=JSON.stringify(info);
      this.props.savePost(myjson,(status)=>{
        if(status===200){
          swal("Created!", "Your post has been created!", "success");
        }else{
          swal("Oops!", "Something went wrong!,Please check server", "error")
        }
      });
      console.log('post saved successfully')
    }
   else if(errors.length!==0){
      console.log(errors)
      var err=[];
      err=errors.map((errormsg)=>{
        console.log(errormsg)
        return errormsg.error;
      })
      this.setState({errors:err,hasErrors:true})
    }
    }

    render(){
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

         {
           swal.withForm({
            title: 'Create Post',
            text: 'This has different types of inputs',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Create!',
            closeOnConfirm: true,
            formFields: [
              { id: 'author',name:'author', placeholder: 'Add an author' },
              { id: 'title',name:'title', placeholder: 'Add a title' },
              { id: 'date',name:'date', type: 'date' },
              { id:'content',name:'content',type:'textarea'}
            ]

           },function(isConfirm){
            console.log(this.swalForm)
           }
          
          )

        }
         {/* <div className="sidebar-widget">
            <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title">Create New</h3>
                </div>
              <div className="panel-body">
              <form name="createform" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group required">
              <label className="control-label" htmlFor="author">Add Author</label>
              <input className="form-control" name="author" id="author" placeholder="Add Author" type="text" />
            </div>
            <div className="form-group required">
              <label className="control-label"  htmlFor="title">Add Title</label>
              <input className="form-control" name="title" id="title" placeholder="Add Title" type="text" />
            </div>
            <div className="form-group required">
              <label className="control-label"  htmlFor="date">Enter Date</label>
              <input className="form-control" name="date" id="date" placeholder="Enter Date" type="date" />
            </div>
            <div className="form-group">
              <label htmlFor="content">Add Content</label>
              <textarea name="content" className="form-control" placeholder="Add Content" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
              </div>
            </div>
            </div> */}
            </div>
              
                
        )
    }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({savePost:savePost},dispatch);
}
export default connect(null,mapDispatchToProps)(CreatePost)