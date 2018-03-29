import axios from "axios";
export const savePost=(info,callback)=>{
    console.log(info)
    var request=axios({
        method: 'post',
        url: 'http://localhost:8080/save',
        data: info,
        headers: {'content-type': 'application/json'}
      });
      console.log('request gyi bhyi save ki')
    return (dispatch)=>{
        request.then((response)=>{
            console.log('post saved successfully')
            dispatch({type:'SAVE_POST',payload:response.data})
            callback(response.status)
        }).catch((err)=>{
            callback(err)
        })
    }
    
}

export const fetchAllPosts=(callback)=>{
    console.log('in fetchpost')
    var request=axios({
        method: 'get',
        url: 'http://localhost:8080/getAll',
        headers: {'content-type': 'application/json'}
      });
      console.log('request gyi bhyi')
        return(dispatch)=>{
        request.then((response)=>{
            console.log(response)
            dispatch({type:'FETCH_ALL',payload:response.data})
            callback(response.status)
        }).catch((err)=>{
            callback(err)
        })
    }
       
     
}  
export const PageLoading=()=>{
    console.log('in ispageloading')
        return(dispatch)=>{
            dispatch({type:'LOADING_START'})
    }    
}      
export const PageLoaded=()=>{
    console.log('page has loaded')
        return(dispatch)=>{
            dispatch({type:'LOADING_END'})
    }    
}       
export const editPost=(info,callback)=>{
    console.log(info);
    console.log('in editpost action')
    var request=axios({
        method: 'put',
        url: 'http://localhost:8080/update',
        data: info,
        headers: {'content-type': 'application/json'}
      });
    
    return (dispatch)=>{
        request.then((response)=>{
            console.log('post updated successfully')
            dispatch({type:'UPDATE_POST',payload:info})
            callback(response.status)

        }).catch((err)=>{
            callback(err)
        })
    }
    
}
export const deletePost=(pid,callback)=>{
    console.log(pid);
    console.log('in deletepost action')
    var request=axios({
        method: 'delete',
        url: `http://localhost:8080/delete?id=`+pid,
        headers: {'content-type': 'application/json'}
      });
      return (dispatch)=>{
        request.then((response)=>{
            console.log('dispatching delete') 
            dispatch({type:'DELETE_POST',payload:pid})
            callback(response.status);
            // (response.status===200)?dispatch({type:'DELETE_SUCCESS',payload:true}):
            // dispatch({type:'DELETE_FAILURE',payload:false})
        }).catch((err)=>{
            callback(err)
        })
    }
}