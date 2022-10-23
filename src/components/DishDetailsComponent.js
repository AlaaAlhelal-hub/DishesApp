import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';


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
                        <Card>
                            <CardImg width="100%" object src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle><h5>{dish.name}</h5></CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
        );
    }


    const DishDetails = (props) => {
        if (props.dish != null) {
            return (
                <div className="container" >
                    <div className="row">
                        <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div> 
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments} />
                        </div>
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