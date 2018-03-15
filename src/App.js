import React,{ Component } from "react";
import Layout from "./components/presentational/LayoutComponent"
import  './utils/css/bootstrap.css'
import './utils/css/styles.css'
import 'react-quill/dist/quill.snow.css';
class App extends Component {
  render() {
      return(    
        <Layout/>     
    )
  }
}

export default App
