import React,{Component} from 'react'
import {withFormik,Form,Field} from 'formik';
import yup from 'yup'
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
                    <div className="form-group">
                      <label className="control-label" htmlFor="imgurl">Paste image url here...</label>
                      {errors.imgurl && <p className="text-danger">{errors.imgurl}</p> }
                      <Field className="form-control" type="text" name="imgurl" placeholder="Paste the img url here..."/>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="content">Add Content</label>
                      {errors.content && <p className="text-danger">{errors.content}</p> }
                      <Field className="form-control" component="textarea" name="content" placeholder="Add Content"/>
                    </div>
                    <button className="btn btn-primary">Create</button>
      </Form>
    );
  };

const EnhancedForm=withFormik({
validationSchema:yup.object().shape({
    author:yup.string().required('Post must have an author!'),
    title:yup.string().min(10,'Title must be 10 characters or longer...').required('Post must have a title!'),
    date:yup.date('Please enter a valid date').required('Date is required'),
    imgurl:yup.string().url('Please enter a valid url'),
    content:yup.string().min(10,'Content must be 10 characters or longer...').max(600,"Can't have more than 600 characters")
}),
handleSubmit(values){
    console.log(values)
}
})(MyForm)
export default EnhancedForm;