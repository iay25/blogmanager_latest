import React,{Component} from 'react'
import {withFormik,Form,Field} from 'formik';
import yup from 'yup'
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import { savePost } from '../../actions/actions'
import swal from 'sweetalert2';
const MyForm = ({values,errors,handleReset,dirty,touched}) => {
    return (
        <Form>
           <div className="row">
                    <div className="col">
                    <div className="form-group required">
                      <label className="control-label" htmlFor="author">Add Author</label>
                      {errors.author && <p className="text-danger">{errors.author}</p> }
                      <Field className="form-control" type="text" name="author" placeholder="Add an Author"/>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-group required">
                      <label className="control-label"  htmlFor="title">Add Title</label>
                      {errors.title && <p className="text-danger">{errors.title}</p> }
                      <Field className="form-control" type="text" name="title" placeholder="Add a title"/>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-group required">
                      <label className="control-label"  htmlFor="date">Select Date</label>
                      {errors.date && <p className="text-danger">{errors.date}</p> }
                      <Field className="form-control" type="date" name="date" placeholder="Select date"/>
                    </div>
                    </div>
                  </div>
                    <a href='https://www.flickr.com/' target="_blank" className="btn btn-sm btn-info">Want to upload pics?</a>
                    <div className="row">
                    <div className="col">
                    <div className="form-group">
                      <label className="control-label" htmlFor="imgurl">Paste image url here...</label>
                      <Field className="form-control" type="text" name="imgurl1" placeholder="Paste the img url here..."/>
                    </div>
                    </div>
                    <div className="col">
                      {errors.imgurl1 && <div><br/><p className="text-danger">{errors.imgurl1}</p></div> }    
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                    <div className="form-group">
                      <label className="control-label" htmlFor="imgurl">Paste image url here...</label>
                      <Field className="form-control" type="text" name="imgurl2" placeholder="Paste the img url here..."/>
                    </div>
                    </div>
                    <div className="col">
                      {errors.imgurl2 && <div><br/><p className="text-danger">{errors.imgurl2}</p></div> }    
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                    <div className="form-group">
                      <label className="control-label" htmlFor="imgurl">Paste image url here...</label>
                      <Field className="form-control" type="text" name="imgurl3" placeholder="Paste the img url here..."/>
                    </div>
                    </div>
                    <div className="col">
                      {errors.imgurl3 &&<div><br/> <p className="text-danger">{errors.imgurl3}</p></div> }    
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                    <div className="form-group">
                    <label className="control-label" htmlFor="content">Add Content</label>
                    <Field className="form-control" component="textarea" name="content" placeholder="Add Content"/>
                    </div>
                    </div>
                    <div className="col">
                      {errors.content && <div><br/><br/><p className="text-danger">{errors.content}</p></div> }   
                    </div>
                  </div>
                    <button className="btn btn-primary">Create</button>
                </Form>
    );
  };

const EnhancedForm=withFormik({
mapPropsToValues(){
  return{
    author:'',
    title :'',
    date:'',
    imgurl1:'',
    imgurl2:'',
    imgurl3:'',
    content:''
  }
  
},
validationSchema:yup.object().shape({
    author:yup.string().required('Post must have an author!'),
    title:yup.string().min(10,'Title must be 10 characters or longer...').required('Post must have a title!'),
    date:yup.date('Please enter a valid date').required('Date is required'),
    imgurl1:yup.string().url('Please enter a valid url'),
    imgurl2:yup.string().url('Please enter a valid url'),
    imgurl3:yup.string().url('Please enter a valid url'),
    content:yup.string().min(10,'Content must be 10 characters or longer...')
}),
handleSubmit(values,e){
    console.log(values)
    let pimgurlsarray=new Array();
    pimgurlsarray.push(values.imgurl1)
    pimgurlsarray.push(values.imgurl2)
    pimgurlsarray.push(values.imgurl3)
    let info={
      pauthor:values.author,
      ptitle:values.title,
      pdate:values.date,
      pimgurls:pimgurlsarray.toString(),
      pcontent:values.content
    }
    savePost(JSON.stringify(info),(status)=>{
      if(status===200){
        swal(
          'Saved!',
          'Your post has been saved.',
          'success'
        )
      }
      swal(
        'Sorry',
        'Unable to contact server,Please try later',
        'error'
      )
    })
}
})(MyForm)

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    savePost: savePost
  }, dispatch);
}
export default connect(null, mapDispatchToProps)(EnhancedForm)