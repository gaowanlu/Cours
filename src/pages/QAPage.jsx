import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageNavigationBar from "../components/PageNavigationBar";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import CardLayout from "../components/CardLayout";
import ViewPager from "../components/ViewPager";
import ViewPagerNav from "../components/ViewPagerNav";

function QAPage() {
  const [formContent, setFormContent] = React.useState("");
  const [searchParams] = useSearchParams();
  const [nowPageIndex, setNowPageIndex] = useState(0); //viewpager现在的下标
  const [swiper, setSwiper] = useState(null); //swiper
  React.useEffect(() => {
    setFormContent(searchParams.get("content"));
  }, [searchParams]);
  const viewPagerClickHandle = (index) => {
    setNowPageIndex(index);
    swiper.slideTo(index);
  };
  return (
    <React.Fragment>
      <PageNavigationBar title="意见反馈" backTitle="更多" backPath="/more" />
      <PageContainer className="animate__animated animate__fadeInRight animate__faster">
        <PageHeader title="意见反馈" />
        <ViewPagerNav
          textList={["提问", "回答"]}
          nowPageIndex={nowPageIndex}
          indexChangeCallback={viewPagerClickHandle}
        />
        <ViewPager setNowPageIndex={setNowPageIndex} setSwiper={setSwiper}>
          <CardLayout>
            <p>提问</p>
            <p>{formContent}</p>
          </CardLayout>
          <CardLayout>
            <p>回答</p>
          </CardLayout>
        </ViewPager>
      </PageContainer>
    </React.Fragment>
  );
}

export default QAPage;
