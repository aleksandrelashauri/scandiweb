import React, { Component } from "react";
import { getCurrencies } from "../../queries/queries";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { setCurrency } from "../../store/action/data";
import "./styles.css";

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ currency: e.target.value });
    this.props.setCurrency(this.state.currency);
  }

  categoriesRender() {
    const { currencies } = this.props.data;
    if (currencies) {
      return currencies.map((el) => {
        return (
          <button
            className="dropdown-btn"
            key={el.symbol}
            value={el.symbol}
            onClick={(e) => this.handleChange(e)}
          >
            <span> {el.symbol}</span> {el.label}
          </button>
        );
      });
    } else {
      return <div>Loading content... </div>;
    }
  }
  render() {
    return (
      <div className="dropdown">
        <span>{this.props.dataState.currency}</span>
        <div className="dropdown-content">
          <div className="dropdown_flex">{this.categoriesRender()}</div>
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

const WithGraphql = graphql(getCurrencies)(CurrencySwitcher);
export default connect(mapStateToProps, {
  setCurrency,
})(WithGraphql);
