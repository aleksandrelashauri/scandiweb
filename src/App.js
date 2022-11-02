import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import AllProducts from "./components/products/AllProducts";
import ClothesProducts from "./components/products/ClothesProducts";
import TechProducts from "./components/products/TechProducts";
import NavBar from "./components/header/NavBar";
import ProductDetails from "./components/details/ProductDetails";
import { store } from "./store";
import Card from "./components/card/Card";
import "./index.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="main_container">
            <NavBar />
            <div className="components">
              <Switch>
                <Route exact path="/" component={AllProducts} />
                <Route path="/clothes" component={ClothesProducts} />
                <Route path="/tech" component={TechProducts} />
                <Route path="/ProductDetails/:id" component={ProductDetails} />
                <Route path="/card" component={Card} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
