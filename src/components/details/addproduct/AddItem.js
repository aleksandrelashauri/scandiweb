import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../../../store/action/data";
import "./styles.css";
class AddItem extends Component {
  constructor(props) {
    super(props);
    this.saveTodo = this.saveTodo.bind(this);
  }

  saveTodo = () => {
    this.props.addItem({
      id: this.props.params.data.id,
      data: this.props.params,
    });
  };

  render() {
    return (
      <div>
        <button className="btn" onClick={() => this.saveTodo()}>
          add to cart
        </button>
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
})(AddItem);
