import React, { Component } from "react";
import Post from "../containers/PostComponent";
import Navbar from "./NavbarComponent";
import Footer from "./FooterComponent";
import PostList from "../containers/PostListComponent"
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import ReactQuill from 'react-quill';
import { savePost } from '../../actions/actions'
import swal from 'sweetalert2'

var validate = require("validate.js");
var moment = require('moment');
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [], hasErrors: false}
  }
  componentWillMount() { 
 
  }
  handleCreate(e) {
    e.preventDefault();
    validate.extend(validate.validators.datetime, {
      // The value is guaranteed not to be null or undefined but otherwise it
      // could be anything.
      parse: function (value, options) {
        return +moment.utc(value);
      },
      // Input is a unix timestamp
      format: function (value, options) {
        var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
        return moment.utc(value).format(format);
      }
    });

    var constraints = {
      author: {
        presence: { allowEmpty: false }
      },
      title: {
        presence: { allowEmpty: false },
        length: {
          minimum: 10,
          maximum: 255
        }
      },
      date: {
        presence: { allowEmpty: false },
        datetime: { dateOnly: true }
      },
      content: {
        length: {
          minimum: 10,
          maximum: 700
        }
      }
    };

    const data = new FormData(e.target);
    const author = data.get('author')
    const title = data.get('title')
    const date = data.get('date')
    const content = this.state.textarea
    const info = {
      'author': author,
      'title': title,
      'date': date,
      'content': content
    }
    console.log(info)
    const errors = validate(info, constraints, { format: "detailed" })
    if (typeof errors === "undefined") {
      console.log("no errors found")
      const info = {
        'pauthor': author,
        'ptitle': title,
        'pdate': date,
        'pcontent': content
      }
      var myjson = JSON.stringify(info);
      this.props.savePost(myjson, (status) => {
        if (status === 200) {
          swal("Created!", "Your post has been created!", "success");
        } else {
          swal("Oops!", "Something went wrong!,Please check server", "error")
        }
      });
      console.log('post saved successfully')
    }
    else if (errors.length !== 0) {
      console.log(errors)
      var err = [];
      err = errors.map((errormsg) => {
        console.log(errormsg)
        return errormsg.error;
      })
      this.setState({ errors: err, hasErrors: true })
    }
  }
  clearState(){
    this.setState({errors:[],hasErrors:false})
  }
  handleTextAreaChange(value) {
    this.setState({ textarea: value })
  }
  handleEditChange=(post,openModal)=>{
    console.log('inhandleditchange')
    console.log(post)
    console.log(openModal)
    this.setState({editPostDefaultValue:post})
}
  render() {
    return (
       <div>
          <Navbar />
          <div className="container">
            <header>
              <a href="index.html"><img alt="logo" src={require('../../utils/images/logo.png')} /></a>
            </header>
            <section>
              <div className="row">
                <div className="col-md-12">
                  <button  type="button" onClick={this.clearState.bind(this)} className="btn btn-lg btn-primary" data-toggle="modal" data-target="#createBox">Create New</button>
                  <div className="modal fade" id="createBox" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          {(this.state.hasErrors) ? <div>{(this.state.errors.map((error, index) => {
                            return <p className="text-danger text-center" key={index * Math.random()}>{error}</p>
                          }))
                          }</div> : <h5 className="modal-title" id="exampleModalLongTitle">Create Post</h5>}

                          <button type="button" onClick={this.clearState.bind(this)} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={this.handleCreate.bind(this)} >
                            <div className="form-group required">
                              <label className="control-label" htmlFor="author">Add Author</label>
                              <input className="form-control" name="author" id="author" placeholder="Add Author" type="text" />
                            </div>
                            <div className="form-group required">
                              <label className="control-label" htmlFor="title">Add Title</label>
                              <input className="form-control" name="title" id="title" placeholder="Add Title" type="text" />
                            </div>
                            <div className="form-group required">
                              <label className="control-label" htmlFor="date">Enter Date</label>
                              <input className="form-control" name="date" id="date" placeholder="Enter Date" type="date" />
                            </div>
                            <div className="form-group">
                              <label htmlFor="content">Add Content</label>
                              <ReactQuill theme="snow" value={this.state.textarea} onChange={this.handleTextAreaChange.bind(this)} />
                            </div>
                            <button type="submit" className="btn btn-primary">Create</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <PostList handleclick={this.handleEditChange}/>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
     
    )
  }

}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    savePost: savePost
  }, dispatch);
}
export default connect(null, mapDispatchToProps)(Layout)