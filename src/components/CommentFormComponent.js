import React, { Component } from 'react';
import { Col, Row, Label, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

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
        alert('Current State is: ' + JSON.stringify(values));
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

export default CommentForm;