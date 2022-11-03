import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishDetailsComponent';
import { Component } from 'react';
import { Routes, Route, Navigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from '../redux/withRouter';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders, postComment, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}


const mapDispatchToProps = dispatch => ({
  postComment: (dishId, author, rating, comment) => dispatch(postComment(dishId, author, rating, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeaders: () => { dispatch(fetchLeaders()) },
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),

});


class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrorMsg={this.props.dishes.errorMsg}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrorMsg={this.props.promotions.errorMsg}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrorMsg={this.props.leaders.errorMsg}
        />
      );
    }

    const DishWithId = () => {
      const { dishId } = useParams();
      return (
        <DishDetail
          dish={this.props.dishes.dishes.find((dish) => dish.id === Number(dishId))}
          isLoading={this.props.dishes.isLoading}
          errorMsg={this.props.dishes.errorMsg}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === Number(dishId))}
          commentsErrorMsg={this.props.comments.errorMsg}
          postComment={this.props.postComment} />
      );
    };




    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Routes location={this.props.location}>
              <Route path="/home" element={HomePage()} />
              <Route exact path="/menu" element={<Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' element={<DishWithId />} />
              <Route exact path="/aboutus" element={<About leaders={this.props.leaders} isLoading={this.props.leaders.isLoading} errorMsg={this.props.leaders.errorMsg}/>} />
              <Route exact path="/contactus" element={<Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
              <Route path="/" element={<Navigate replace to="/home" />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
