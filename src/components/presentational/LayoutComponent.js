import React,{Component} from "react";
import Post from "../containers/PostComponent";
import Navbar from "./NavbarComponent";
import Footer from "./FooterComponent";
import CreatePost from "./CreatePost"
import EditPost from "./EditPost"
import Slider from './SliderComponent'
import {fetchAllPosts} from '../../actions/actions'
import {PageLoading} from '../../actions/actions'
import {PageLoaded} from '../../actions/actions'
import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import {savePost} from '../../actions/actions'
import swal from 'sweetalert2'
import Spinner from './SpinnerLoader'
var validate = require("validate.js");
var moment = require('moment');
class Layout extends Component{
  constructor(props){
    super(props);
    this.state={editPostDefaultVal:null,
      errors:[],hasErrors:false }
  }
  componentWillMount(dispatch){
    console.log('dispaching load start')
    this.props.pageLoading();
    this.props.fetchAll((status)=>{
      if(status!==200){
        swal("Oops!", "Unable to fetch posts", "error")
      }else{
        setTimeout(()=>{
          this.props.pageLoaded();
        },500)
       
      }
    
    });
  }
  // componentDidUpdate(){
  //   this.props.fetchAll();
  //   console.log('in did update')
  // }
  async handleCreate(e){
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
    const {value: formValues}=await swal({
      title: 'Create Post',
      width: 500,
      padding: 50,
      background:'#ECECEA',
      html:
        '<label for="author">Add Author</label>'+
        '<input id="author" placeholder="Add an author" type="text" class="swal2-input">' +
        '<label for="title">Add Title</label>'+
        '<input id="title" placeholder="Add a title" type="text" class="swal2-input">'+
        '<label for="date">Select Date</label>'+
        '<input id="date" type="date" class="swal2-input">'+
        '<label for="content">Write something</label>'+
        '<input id="content" placeholder="Write Something..." type="textarea" class="swal2-textarea">',
      focusConfirm: false,
      confirmButtonText: 'Create!',
      preConfirm: () => {
        return [
          document.getElementById('author').value,
          document.getElementById('title').value,
          document.getElementById('date').value,
          document.getElementById('content').value
        ]
      }
    })
    if (formValues) {
      console.log(formValues)
      const info={'author':formValues[0],
        'title': formValues[1],
        'date': formValues[2],
        'content':formValues[3]
    }
    console.log(info)
    const errors=validate(info,constraints,{format: "detailed"})
    if(typeof errors==="undefined"){
      console.log("no errors found")
      const info={'pauthor':formValues[0],
      'ptitle': formValues[1],
      'pdate': formValues[2],
      'pcontent':formValues[3]
    }
      var myjson=JSON.stringify(info);
      this.props.savePost(myjson,(status)=>{
        if(status===200){
          swal({
            position: 'top-end',
            type: 'success',
            title: 'Post Created Successfully',
            showConfirmButton: false,
            timer: 1000
          })
        }else{
          swal({
            position: 'top-end',
            type: 'error',
            title: 'Error creating your post',
            showConfirmButton: false,
            timer: 1000
          })
        }
      });
      console.log('post saved successfully')
    }
    else if(errors.length!==0){
      var err=[];
      err=errors.map((errormsg)=>{
        return errormsg.error;
      })
      var emsg=(err.join('\n'));
      this.setState({errors:err,hasErrors:true})
      swal({
        type: 'error',
        title:'Errors',
        text:{
          a:'aaa',
          b:'dddd'
        }
      });
    }
      
    }

    // swal1.withForm({
    //   title: 'Create Post',
    //   text: 'This has different types of inputs',
    //   showCancelButton: true,
    //   confirmButtonColor: '#DD6B55',
    //   confirmButtonText: 'Create!',
    //   closeOnConfirm: true,
    //   formFields: [
    //     { id: 'author',name:'author', placeholder: 'Add an author' },
    //     { id: 'title',name:'title', placeholder: 'Add a title' },
    //     { id: 'date',name:'date', type: 'date' },
    //     { id:'content',name:'content',type:'textarea'}
    //   ]

    //  },function(isConfirm){
    //   console.log(this.swalForm)
    //  }
    
   // )
    // this.setState({toggleCreateForm:!this.state.toggleCreateForm,toggleEditForm:false})
    }
  handleEditFormChange=(toggleEdit,post)=>{
    // this.setState({toggleEditForm:toggleEdit,toggleCreateForm:false,editPostDefaultVal:post})
  }  
    render(){
       return(    
       <div>
         {this.props.isloading?<Spinner />:<div>
         <Navbar/>
        <div className="container">
          <header>
            <a href="index.html"><img alt="logo" src={require('../../utils/images/logo.png')} /></a>
          </header>
          {/* <section className="main-slider">
          <Slider/>
          </section> */}
          <section>
          <div className="row">
              <div className="col-md-10 col-md-offset-1">
              <button onClick={this.handleCreate.bind(this)} className="btn btn-lg btn-primary">Create New</button>
               <Post handleEditClick={this.handleEditFormChange}/>
              </div>
              {/* <div className="col-md-4 sidebar-gutter">
                <aside>
                 {this.state.toggleCreateForm &&<CreatePost/>}
                 {this.state.toggleEditForm &&<EditPost defaultval={this.state.editPostDefaultVal} />}
                </aside>
              </div> */}
            </div>
          </section>
        </div>
          <Footer/>
          </div>
        }
       </div>  
      )
    }

}
const mapStateToProps = state => {

  return {
    isloading : state.isLoading,
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchAll:fetchAllPosts,
    pageLoading:PageLoading,
    pageLoaded:PageLoaded,
    savePost:savePost
  },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Layout)