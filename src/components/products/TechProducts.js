import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getProductsQuery } from "../../queries/queries";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addItem } from "../../store/action/data";
import bag_wheel_white from "../../assets/bag_wheel_white.svg";
import bag_white from "../../assets/bag_white.svg";
import "./styles.css";

class TechProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      category: "All",
    };
    this.saveItem = this.saveItem.bind(this);
    this.displayBooks = this.displayBooks.bind(this);
  }
  saveItem = () => {
    this.props.addItem({ id: this.state.id, data: this.props.params });
  };

  displayBooks() {
    const cur = this.props.dataState.currency.map((data) => data);
    const { data } = this.props;
    const productsData = data.categories;
    if (data.loading) {
      return <div>Loading ...</div>;
    } else {
      return (
        <div>
          <h2 className="header_cont">{productsData[2].name}</h2>
          <div className="card_container">
            {productsData[2].products.map((categories) => {
              return (
                <div key={categories.id} className="card_items">
                  <ul>
                    {console.log(categories.inStock)}
                    <li
                      className="card"
                      style={{ opacity: categories.inStock ? 1 : 0.5 }}
                    >
                      {categories.inStock ? (
                        <button
                          className="bag_cart"
                          onClick={() => {
                            this.props.addItem({
                              id: categories.id,
                              data: { data: categories },
                            });
                          }}
                        >
                          <img className="bag" src={bag_white} alt="bag_img" />
                          <img
                            className="bag_wheel_right"
                            src={bag_wheel_white}
                            alt="bag_img"
                          />
                          <img
                            className="bag_wheel_left"
                            src={bag_wheel_white}
                            alt="bag_img"
                          />
                        </button>
                      ) : null}
                      <img
                        className="card_img"
                        src={categories.gallery[0]}
                        alt="card_img"
                      ></img>
                      {!categories.inStock ? (
                        <div className="stock">OUT OF STOCK </div>
                      ) : null}
                      <div className="details_cont">
                        {categories.inStock ? (
                          <Link to={`/ProductDetails/${categories.id}`}>
                            {categories.name}
                          </Link>
                        ) : (
                          <div> {categories.name}</div>
                        )}
                        <div>
                          {categories.prices
                            .filter((el) => el.currency.symbol == cur)
                            .map((data) => {
                              return (
                                <div
                                  key={data.currency.symbol}
                                  className="prices_cont"
                                >
                                  {data.currency.symbol} {data.amount}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
  render() {
    return <div>{this.displayBooks()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    dataState: state.data,
  };
};
const WithGraphql = graphql(getProductsQuery)(TechProducts);
export default connect(mapStateToProps, {
  addItem,
})(WithGraphql);
