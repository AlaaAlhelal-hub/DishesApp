import React  from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody} from 'reactstrap';



    function RenderComments({comments}){
        if ( comments != null ) {
            const allComents = comments.map((comment) =>{
                return(
                    <ul className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                    </ul>
                );
            });
    
            return(
                <div className="col-sm-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {allComents}
                </div>
            );

        }
        else {
            return(<div></div>);
        }
    }


    function RenderDish({dish}){
        return (
            <div className="col-sm-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" object src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle><h5>{dish.name}</h5></CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
            </div>
                    
        );
    }


    const DishDetails = (props) => {
        if (props.dish != null) {
            return (
                <div className="container" >
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.dish.comments} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }


export default DishDetails;