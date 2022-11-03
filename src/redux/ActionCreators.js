import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// DISHES
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok)
                return response;
            else {
                var error = new Error('Error ' + + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errorMsg = new Error(error.message);
            throw errorMsg;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errorMsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errorMsg
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

// COMMENTS 
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});


export const postComment = (dishId, author, rating, comment) => (dispatch) => {
    var newComment = {
        dishId: dishId,
        author: author,
        rating: rating,
        comment: comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok)
                return response;
            else {
                var error = new Error('Error ' + + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errorMsg = new Error(error.message);
            throw errorMsg;
        })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => { alert('can not add comment') });
};

export const commentFailed = (errorMsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errorMsg
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok)
                return response;
            else {
                var error = new Error('Error ' + + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errorMsg = new Error(error.message);
            throw errorMsg;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(dishesFailed(error.message)));
}
export const commentsFailed = (errorMsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errorMsg
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

// PROMOTIONS
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok)
                return response;
            else {
                var error = new Error('Error ' + + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errorMsg = new Error(error.message);
            throw errorMsg;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(dishesFailed(error.message)));

}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errorMsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errorMsg
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});


// LEADERS
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok)
                return response;
            else {
                var error = new Error('Error ' + + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errorMsg = new Error(error.message);
            throw errorMsg;
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(dishesFailed(error.message)));

}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errorMsg) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errorMsg
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

// FEEDBACK
export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});


export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
        var newFeedback = {
            firstname: firstname,
            lastname: lastname,
            telnum: telnum,
            email: email,
            agree: agree,
            contactType: contactType,
            message: message
        }


        return fetch(baseUrl + 'feedback', {
            method: 'POST',
            body: JSON.stringify(newFeedback),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok)
                    return response;
                else {
                    var error = new Error('Error ' + + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            }, error => {
                var errorMsg = new Error(error.message);
                throw errorMsg;
            })
            .then(response => response.json())
            .then(response => dispatch(addFeedback(response)))
            .catch(error => { alert('can not add feedback') });
    };