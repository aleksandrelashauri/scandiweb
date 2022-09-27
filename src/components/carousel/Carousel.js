import React, { Component } from "react";
// import { SlideImage, StyledSlider } from "./SlideImage";
// import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import carousel_arraw from '../../assets/carousel_arraw.svg'
import carousel_arraw_r from '../../assets/carousel_arraw_r.svg'
import "./style.css";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  length = this.props.slides.length;
  nextSlide = () => {
    this.setState({
      current:
        this.state.current === this.length - 1 ? 0 : this.state.current + 1,
    });
  };

  prevSlide = () => {
    this.setState({
      current:
        this.state.current === 0 ? this.length - 1 : this.state.current - 1,
    });
  };
  render() {
    return (
      <div className="StyledSlider">
        <button className="leftArrow" onClick={() => this.prevSlide()} ><img src={carousel_arraw}></img></button>
        <button className="rightArrow" onClick={() => this.nextSlide()} ><img src={carousel_arraw_r}></img></button>
        {this.props.slides.map((slide, index) => {
          return (
            <div key={index}>
              {index === this.state.current && (
                <img className="SlideImage" src={slide} alt="" />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Slider;
