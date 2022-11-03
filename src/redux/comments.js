import * as ActionTypes from './ActionTypes';

export const Comments = (state= {
    errorMsg: null,
    comments: []}
    , action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, errorMsg: null, comments: state.comments.concat(comment)}

        case ActionTypes.ADD_COMMENTS:
            return {...state, errorMsg: null, comments: action.payload}
    
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errorMsg: action.playload}
            
        default:
            return state;
    }
};