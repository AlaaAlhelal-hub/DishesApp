import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody} from 'reactstrap';
import dateFormat, { masks } from "dateformat";


class DishDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    renderComments(comments){
        if ( comments != null ) {
            const allComents = comments.map((comment) =>{
                const date = new Date(comment.date)
                const date_frm = dateFormat(date, "mmmm dd, yyyy");
                return(
                    <ul className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>-- {comment.author} , {date_frm}</li>
                    </ul>
                );
            });
    
            return(
                <div>
                    {allComents}
                </div>
            );

        }
        else {
            return(<div></div>);
        }
    }


    renderDish(dish){
        const comments = this.renderComments(dish.comments)
        return (
            <div className="row" >
                <div className="col-sm-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" object src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle><h5>{dish.name}</h5></CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-sm-12 col-md-5 m-1">
                <h4>Comments</h4>
                    {comments}
                </div>
            </div>
        );
    }


    render() {
        const dish = this.props.dish
        if (dish != null) {
            return (this.renderDish(dish));
        }
        else {
            return (
                <div></div>
            );
        }
    }
}

export default DishDetails;