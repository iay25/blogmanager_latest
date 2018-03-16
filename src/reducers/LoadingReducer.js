export default function loadingReducer(state=true,action){
    console.log('in loading reducer')
    switch(action.type){
        case 'LOADING_START':{
            console.log('STARTING LOADING')
            return true;
        }
        case 'LOADING_END':{
            console.log('STOPPING LOADING')
            return false;
        }
        default:return state
    }
}
