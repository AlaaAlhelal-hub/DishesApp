import Menu  from './MenuComponent';
import Header  from './HeaderComponent';
import Footer  from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishDetailsComponent';
import { Component } from 'react';
import { Routes, Route, Navigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from '../redux/withRouter';
const mapStateToProps = state => {

  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
class Main extends Component {

  
  render(){

    const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const DishWithId = () => {
      const { dishId } = useParams();
      return(
          <DishDetail 
            dish={this.props.dishes.find((dish) => dish.id === Number(dishId))} 
            comments={this.props.comments.filter((comment) => comment.dishId === Number(dishId))} />
      );
    };

    return (
      <div>
        <Header />
        <Routes>
              <Route path="/home" element={HomePage()}/>
              <Route exact path="/menu" element={<Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' element={<DishWithId />} />
              <Route exact path="/aboutus" element={<About leaders={this.props.leaders} />} />
              <Route exact path="/contactus" element={<Contact />} />
              <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
