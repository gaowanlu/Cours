import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function ViewPager(props) {
  const { setNowPageIndex, setSwiper, children } = props;
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={(swiper) => {
        setNowPageIndex(swiper.activeIndex);
      }}
      onSwiper={(swiper) => setSwiper(swiper)}
    >
      {children.map((O, i, a) => {
        return <SwiperSlide key={i}>{O}</SwiperSlide>;
      })}
    </Swiper>
  );
}

export default ViewPager;
