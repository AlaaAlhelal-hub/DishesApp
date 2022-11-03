import * as ActionTypes from './ActionTypes';

export const Feedbacks = ( state = {
    isLoading: true,
    errorMsg: null,
    feedback: null}
    ,action) => {
    switch(action.type) {

        case ActionTypes.ADD_FEEDBACK:
            var feedback = action.payload;
            alert("Thank you for your feedback! \n"+ JSON.stringify(feedback));
            return {...state, isLoading: false, errorMsg: null, feedback: feedback}

        default:
            return state;
    }
};