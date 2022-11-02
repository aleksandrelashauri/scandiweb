import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getProductQuery } from "../../queries/queries";
import DOMPurify from "dompurify";
import { connect } from "react-redux";
import AddItem from "./addproduct/AddItem";
import { v4 as uuidv4 } from 'uuid'
import "./styles.css";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImg: "",
      attributes: {
        Capacity: "",
        Color: "",
        Size: "",
      },
    };
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      mainImg: event.target.value,
    });
  }

  handleAttributes(event) {
    const obj = Object.keys(this.state.attributes).find(
      (key) => key === event.target.id
    );
    if (obj === "Capacity")
      this.setState({
        attributes: { ...this.state.attributes, Capacity: event.target.value },
      });
    if (obj === "Color")
      this.setState({
        attributes: { ...this.state.attributes, Color: event.target.value },
      });
    if (obj === "Size")
      this.setState({
        attributes: { ...this.state.attributes, Size: event.target.value },
      });
  }

  displayBookDetails() {
    const { product } = this.props.data;
    const createMarkup = () => {
      return { __html: `${DOMPurify.sanitize(product.description)}` };
    };
    const cur = this.props.dataState.currency.map((data) => data);

    if (product) {
      return (
        <div className="container">
          <div className="img_container">
            <ul>
              {product.gallery.map((item) => {
                return (
                  <div key={item}>
                    <div>
                      <img
                        className="images"
                        src={item}
                        onLoad={() =>
                          this.setState({
                            mainImg: item,
                          })
                        }
                        onClick={() =>
                          this.setState({
                            mainImg: item,
                          })
                        }
                        alt="product"
                      />
                    </div>
                  </div>
                );
              })}
            </ul>
            <div>
              {this.state.mainImg ? (
                <img
                  className="main_image"
                  src={this.state.mainImg}
                  alt="main"
                />
              ) : null}
            </div>
            <div className="product_info">
              <div className="product_brand">{product.brand}</div>
              <div className="product_name">{product.name}</div>
              {product.attributes.map(({ name, items, id }) => (
                <div key={uuidv4()}>
                  <div className="product_atr">{name}:</div>
                  <div>
                    {items.map(({ value }) => (
                      <button
                        key={uuidv4()}
                        onClick={(event) => this.handleAttributes(event)}
                        value={value}
                        id={name}
                        style={{
                          background: value,
                          color: value,
                          cursor: "pointer",
                          maxWidth: "54px",
                          height: "",
                          margin: "10px",
                          overflow: "hidden",
                          padding: "10px",
                        }}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <div className="product_price">Price</div>
                <div className="product_amount">
                  {product.prices
                    .filter((el) => el.currency.symbol == cur)
                    .map((data) => {
                      return (
                        <div key={uuidv4()}>
                          {data.currency.symbol} {data.amount}
                        </div>
                      );
                    })}
                </div>
              </div>
              <AddItem
                params={{ data: product, attributes: this.state.attributes }}
              />
              <div
                className="danger_html"
                dangerouslySetInnerHTML={createMarkup()}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  }
  render() {
    return <div id="book-details">{this.displayBookDetails()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    dataState: state.data,
  };
};

const WithGraphql = graphql(getProductQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.match.params.id,
      },
    };
  },
})(ProductDetails);
export default connect(mapStateToProps)(WithGraphql);
