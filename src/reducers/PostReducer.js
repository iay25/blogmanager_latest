
export default function postReducer(state=[],action){
    console.log('in post reducer')
    console.log(state)
    switch(action.type){
        case 'SAVE_POST':{
            console.log('saving post')
            return [action.payload,...state];
        }
        case 'UPDATE_POST':{
            console.log('updating post with new info')
            
            return state.map((post) => {
                var info=JSON.parse(action.payload)
                console.log('post id '+post.pid+' action payload pid '+ info.pid)
                if(post.pid !== info.pid) {
                    console.log('we dont care')
                    return post;
                }
                else{
                    console.log('we care')
                    return info
                }
                
                    
            });
            
        }
        case 'DELETE_POST':{
            console.log('deleting post')
            return state.filter((post) => post.pid !== action.payload);
        }
        case 'FETCH_ALL':{
            console.log(action.payload)
            return [...state,...action.payload]
        }
        default:return state
    }
}
