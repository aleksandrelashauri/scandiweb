import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { addItem, removeItem } from "../../store/action/data";
import { v4 as uuidv4 } from 'uuid'
import "./styles.css";

class miniCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: "",
      count: 0,
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

  saveTodo = () => {
    this.props.addItem({ id: 4, title: this.state.todoData });
    this.setState({ todoData: "" });
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
    return (
      <div className="container">
        <div className="mini_header">
          my bag, <span>{list.length} items</span>
        </div>
        <div className="mini_cont">
          {result.map(({ id, data, count }) => {
            return (
              <div className="dFlex mini_cart" key={id}>
                <div>
                  <div className="mini_name">{data.data.name}</div>
                  <div>
                    {data.data.prices
                      .filter((el) => el.currency.symbol == cur)
                      .map((data) => {
                        return (
                          <div
                            key={data.currency.symbol}
                            className="mini_price"
                          >
                            {data.currency.symbol} {data.amount}
                          </div>
                        );
                      })}
                  </div>
                  <div>
                    {data.data.attributes.map(({ name, items, id }) => (
                      <div key={uuidv4()}>
                        <div className="mini_size">{name}</div>
                        <div style={{ display: "flex" }}>
                          {items.map(({ value }) => (
                            <button
                              value={value}
                              id={name}
                              key={uuidv4()}
                              style={{
                                background: value,
                                color: value,
                                cursor: "pointer",
                                maxWidth: "39px",
                                maxHeight: "39px",
                                overflow: "hidden",
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                marginRight: "8px",
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
                      className="btn_action"
                      onClick={() => this.addItem(id)}
                    >
                      +
                    </button>
                    <div>{count}</div>
                    <button
                      className="btn_action"
                      onClick={() => this.removeItem(id)}
                    >
                      -
                    </button>
                  </div>
                  <div>
                    <img
                      className="img_cont"
                      src={data.data.gallery[0]}
                      alt="product"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="dFlex mini_total">
            Total:{" "}
            <span>
              {cur}
              {total}
            </span>
          </div>
        </div>
        <div className="mini_buttons">
          <div className="nav_link">
            <NavLink to="/Card"> View Bag</NavLink>
          </div>
          <div className="nav_link two">
            <NavLink to="/"> checkout</NavLink>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    dataState: state.data,
  };
}
export default connect(mapStateToProps, {
  addItem,
  removeItem,
})(miniCard);
