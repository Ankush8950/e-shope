import React, { useState ,useEffect} from "react";
import "./slider.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import { sliderData } from "./Slider_data";

const Slider = () => {
  const [currentslide, setCUrrentSlide] = useState(0);
  const slideLenght = sliderData.length;

  const autoScroll = true;
  let slideInterval ;
  let intervalTime = 5000;


  const nextSlide = () =>{
    setCUrrentSlide(currentslide === slideLenght-1 ? 0 : currentslide + 1)

  }

  const prevSlide = () =>{
setCUrrentSlide(currentslide === 0 ? slideLenght - 1 : currentslide -1)
  }



  useEffect(() => {
    if(autoScroll){
        const auto = () => {
          slideInterval = setInterval(nextSlide, intervalTime)
        }
        auto()
    }
    return ()=>clearInterval(slideInterval)
   }, [currentslide,slideInterval,autoScroll])
  

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentslide ? "slide current" : "slide"}
          >
            {index === currentslide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product" className="btn">Shop Now</a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
