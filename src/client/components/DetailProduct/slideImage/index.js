import React from "react";
import Slider from "react-slick";
import { ROOT_URL } from "../../../constants/config";
import "./style.scss";
function ImageSlide(props) {
  const { imageList } = props;
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider className="image_slider" {...settings}>
        {imageList?.map((item) => (
          <div key={item?.name} className="slider__item_image">
            <img src={`${ROOT_URL}/${item?.url}`} alt="hihi" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlide;
