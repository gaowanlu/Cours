import React from "react";
import { useState } from "react";
import ViewPager from "../components/ViewPager";
import DayView from "../view/DayView";
import WeekView from "../view/WeekView";
import Footer from "../components/Footer";

function IndexPage() {
  const [nowPageIndex, setNowPageIndex] = useState(0); //viewpager现在的下标
  const [swiper, setSwiper] = useState(null); //swiper
  const viewPagerClickHandle = (index) => {
    setNowPageIndex(index);
    swiper.slideTo(index);
  };
  return (
    <React.Fragment>
      <ViewPager setNowPageIndex={setNowPageIndex} setSwiper={setSwiper}>
        <DayView />
        <WeekView />
      </ViewPager>
      <Footer fillIndex={nowPageIndex} click={viewPagerClickHandle} />
    </React.Fragment>
  );
}

export default IndexPage;
