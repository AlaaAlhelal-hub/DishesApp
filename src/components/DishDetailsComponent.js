import React, {Component} from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem, Col, Row, Label, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';



function RenderComments({ comments, addComment, dishId}) {
    if (comments != null) {
        const allComents = comments.map((comment) => {
            return (
                <ul className="list-unstyled">
                    <li>{comment.comment}</li>
                    <li>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
                </ul>
            );
        });

        return (
            <div className="col-md-12 col-md-5 m-1">
                <h4>Comments</h4>
                {allComents}
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );

    }
    else {
        return (<div></div>);
    }
}


function RenderDish({ dish }) {
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

    if (props.isLoading) {
        return (
            <div className="container" >
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errorMsg != null){
        return (
            <div className="container" >
                <div className="row">
                    <h4>{props.errorMsg}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
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
                        <RenderComments comments={props.comments}
                                        addComment={props.addComment}
                                        dishId={props.dish.id}
                         />
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


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


export class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.author, values.rating, values.comment);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Col className="form-group">
                                <Label htmlFor='rating' md={10}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Label htmlFor='author' md={10}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name='author' placeholder='Your Name'
                                        className="form-control"
                                        validators={{
                                             minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Label htmlFor='comment' md={10}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea row='6' model=".comment" id="comment" name='comment' placeholder='Comment'
                                        className="form-control" />
                                </Col>
                            </Col>
                            <Row className="form-group mt-5">
                                <Col md={{ size: 3, offset: 0}}>
                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>

                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

