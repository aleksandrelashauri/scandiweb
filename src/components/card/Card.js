import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem, removeItem } from "../../store/action/data";
import { NavLink } from "react-router-dom";

import Slider from "../carousel/Carousel";
import uuid from "react-uuid";

import "./styles.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: "",
      count: 0,
      attributes: {
        Capacity: "",
        Color: "",
        Size: "",
      },
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem = (id) => {
    this.props.dataState.list.find((item) =>
      item.id ? this.props.addItem({ id, data: item.data }) : null
    );
  };

  removeItem = (id) => {
    this.props.removeItem({ id });
  };

  render() {
    const { list } = this.props.dataState;
    const cur = this.props.dataState.currency.map((data) => data);
    const result = Object.values(
      list.reduce((r, e) => {
        let k = `${e.id}|${e.y}`;
        if (!r[k]) r[k] = { ...e, count: 1 };
        else r[k].count += 1;
        return r;
      }, {})
    );
    const prices = result.map(({ data, count }) =>
      data.data.prices
        .filter(({ currency }) => currency.symbol == cur)
        .map((currency) => currency.amount * count)
    );
    const total = prices.flat().reduce((a, b) => a + b, 0);
    const slash = total * 0.21;
    return (
      <div className="container">
        <div className="cart_header border">CART</div>
        <div>
          {result.map(({ id, data, count }) => {
            return (
              <div className="dFlex border" key={uuid()}>
                <div>
                  <div className="mini_brand">{data.data.brand}</div>
                  <div className="cart_name">{data.data.name}</div>
                  <div className="cart_price">
                    {data.data.prices
                      .filter((el) => el.currency.symbol == cur)
                      .map((data) => {
                        return (
                          <div key={uuid()}>
                            {data.currency.symbol} {data.amount}
                          </div>
                        );
                      })}
                  </div>
                  <div>
                    {data.data.attributes.map(({ name, items }) => (
                      <div key={uuid()}>
                        <div className="cart_atr">{name}:</div>
                        <div>
                          {items.map(({ value }) => (
                            <button
                              key={uuid()}
                              value={value}
                              id={name}
                              style={{
                                background: value,
                                color: value,
                                cursor: "pointer",
                                maxWidth: "54px",
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
                  </div>
                </div>
                <div className="dFlex">
                  <div className="btn_container">
                    <button
                      className="btn_action card_btn_sz"
                      onClick={() => this.addItem(id)}
                    >
                      +
                    </button>
                    <div>{count}</div>
                    <button
                      className="btn_action card_btn_sz"
                      onClick={() => this.removeItem(id)}
                    >
                      -
                    </button>
                  </div>
                  <div>
                    <Slider slides={data.data.gallery} />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="cart_tax">Tax 21%: <span>{slash}</span></div>
          <div className="cart_quan">Quantity: <span>{list.length}</span></div>
          <div className="cart_total">Total: <span>{total}</span></div>
        </div>
        <div className="nav_link two">
            <NavLink to="/"> ORDER</NavLink>
          </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataState: state.data,
  };
};
export default connect(mapStateToProps, {
  addItem,
  removeItem,
})(Card);
