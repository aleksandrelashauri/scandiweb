import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getProductsQuery } from "../../queries/queries";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import CurrencySwitcher from "../currency/CurrencySwitcher";
import MiniCard from "../card/MiniCard";
import Logo from "../../assets/logo.svg";
import smLogo from "../../assets/smLogo.svg";
import backLogo from "../../assets/backLogo.svg";
import arrowLogo from "../../assets/arrowLogo.svg";
import bag from "../../assets/bag.svg";
import bagWheel from "../../assets/bagWheel.svg";
import { withRouter } from "react-router-dom";
import "./styles.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: "",
    };
  }
  categoriesRender() {
    const { match, location } = this.props;
    let isIndex = false;
    let isClothes = false;
    let isTech = false;
    if (location.pathname === `${match.url}`) {
      isIndex = true;
    }
    if (location.pathname === `/clothes`) {
      isClothes = true;
    }
    if (location.pathname === `/tech`) {
      isTech = true;
    }

    const { categories } = this.props.data;
    const { list } = this.props.dataState;
    if (categories) {
      return (
        <ul className="nav_contaner">
          <ul className="nav_cont">
            <li className="nav_item">
              <NavLink
                to="/"
                style={{
                  color: isIndex ? "#5ECE7B" : "",
                  borderBottom: isIndex ? "1px solid #5ECE7B" : "",
                  padding: "28px 32px ",
                  fontWeight: 600,
                }}
              >
                {categories[0].name}
              </NavLink>
            </li>
            <li className="nav_item">
              <NavLink
                to="/clothes"
                style={{
                  color: isClothes ? "#5ECE7B" : "",
                  borderBottom: isClothes ? "1px solid #5ECE7B" : "",
                  padding: "28px 32px ",
                  fontWeight: 600,
                }}
              >
                {categories[1].name}
              </NavLink>
            </li>
            <li className="nav_item">
              <NavLink
                to="/tech"
                style={{
                  color: isTech ? "#5ECE7B" : "",
                  borderBottom: isTech ? "1px solid #5ECE7B" : "",
                  padding: "28px 32px ",
                  fontWeight: 600,
                }}
              >
                {categories[2].name}
              </NavLink>
            </li>
          </ul>
          <ul>
            <div className="rel_logo">
              <img src={backLogo} alt="Logos" />
              <li className="back_logo">
                <img src={smLogo} alt="Logos" />
              </li>
              <li className="ab_logo">
                <img src={Logo} alt="Logo" />
              </li>
              <li className="arrow_logo">
                <img src={arrowLogo} alt="Logo" />
              </li>
            </div>
          </ul>
          <ul className="nav_cont">
            <li className="nav_item">
              <CurrencySwitcher />
            </li>
            <div className="dropdown nav_item">
              <div className="dropdown_content_mini nav_item">
                <MiniCard />
              </div>
              <div className="pos_relative">
                <img className="bag_" src={bag} alt="Logos" />
                <img className="bag_right" src={bagWheel} alt="Logos" />
                <img className="bag_left" src={bagWheel} alt="Logos" />
                <div
                  className="list_length"
                  style={{
                    display: list.length ? "flex" : "none",
                  }}
                >
                  {list.length}
                </div>
              </div>
            </div>
          </ul>
        </ul>
      );
    } else {
      return <div>Loading content... </div>;
    }
  }
  render() {
    return (
      <div className="navCont">
        <ul>{this.categoriesRender()}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataState: state.data,
  };
};
const withRoiting = withRouter(NavBar);
const WithGraphql = graphql(getProductsQuery)(withRoiting);
export default connect(mapStateToProps)(WithGraphql);
