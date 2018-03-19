import React,{ Component } from "react";
import  './utils/css/bootstrap.css'
import './utils/css/styles.css'
import 'react-quill/dist/quill.snow.css';
import Spinner from './components/presentational/SpinnerLoader'
import { PageLoading } from './actions/actions'
import { PageLoaded } from './actions/actions'
import { fetchAllPosts } from './actions/actions'
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import swal from 'sweetalert2'
import Layout from './components/presentational/LayoutComponent'
class App extends Component {
  componentWillMount(){
    this.props.fetchAll((status) => {
      if (status !== 200) {
        swal("Oops!", "Unable to fetch posts", "error")
      } else {
        swal("More coming soon!", "dev working hard", "info")
      }
      }
    )
    }
  render() {
     return <div>
        <Layout/>
       </div>
  }
}
// const mapStateToProps = state => {
//   return {
//     isloading: state.isLoading,
//   }
// }
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchAll: fetchAllPosts,
  }, dispatch);
}
export default connect(null, mapDispatchToProps)(App)
