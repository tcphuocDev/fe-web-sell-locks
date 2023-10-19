import React from "react";
import Slider from "react-slick";
import bannerII from "../../../assets/img/baner2.jpg";
import bannerIII from "../../../assets/img/baner3.jpg";
import "./style.scss";
function BannerSlide() {
  const bannerList = [
    {
      name: "anh 1",
      url: "https://thegioidongho.vip/thumb/crop/12140/1240/400/",
    },

    {
      name: "anh 3",
      url: "https://thegioidongho.vip/thumb/crop/15785/1240/400/",
    },
    {
      name: "anh 4",
      url: "https://thegioidongho.vip/thumb/crop/15782/1240/400/",
    },
    {
      name: "anh 2",
      url: "https://xwatch.vn/images/slideshow/2021/05/10/original/bao-hiem-dong-ho_1620641319.jpg",
    },
    {
      name: "anh 5",
      url: " https://xwatch.vn/images/slideshow/2020/04/11/original/banner-bao-hanh-trang-chu_1586597010.jpg",
    },
    {
      name: "anh 7",
      url: bannerIII,
    },
  ];
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
      <Slider className="slider" {...settings}>
        {bannerList.map((item) => (
          <div key={item?.name} className="slider__item">
            <img src={item?.url} alt="hihi" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BannerSlide;
