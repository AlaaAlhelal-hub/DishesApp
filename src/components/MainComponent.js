import Menu  from './MenuComponent';
import Header  from './HeaderComponent';
import Footer  from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailsComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Component } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  

  render(){

    const HomePage = () => {
      return(
          <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const DishWithId = () => {
      const { dishId } = useParams();
      return(
          <DishDetail 
            dish={this.state.dishes.find((dish) => dish.id === Number(dishId))} 
            comments={this.state.comments.filter((comment) => comment.dishId === Number(dishId))} />
      );
    };

    return (
      <div>
        <Header />
        <Routes>
              <Route path="/home" element={HomePage()}/>
              <Route exact path="/menu" element={<Menu dishes={this.state.dishes} />} />
              <Route path='/menu/:dishId' element={<DishWithId />} />
              <Route exact path="/contactus" element={<Contact  />} />
              <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;
