import React from "react";
import PageNavigationBar from "../components/PageNavigationBar";
import styled from "styled-components";
import PageHeader from "./../components/PageHeader";
import axios from "axios";
import PageContainer from "./../components/PageContainer";
import CardLayout from "./../components/CardLayout";

function searchResultFormat(result) {
  let formated = [];
  let { footers, headers, imgs, mains } = result;
  if (footers && headers && imgs && mains) {
    for (let i = 0; i < footers.length; i++) {
      formated.push({
        path: footers[i],
        name: headers[i].name,
        last: headers[i].text,
        img: imgs[i],
        persons: mains[i],
      });
    }
  }
  return formated;
}

function MoviePage() {
  const [searchString, setSearchString] = React.useState("");
  const [queryDetail, setQueryDetail] = React.useState(null);
  const [iframeSrc, setIframeSrc] = React.useState(
    "https://jx.dlbilibili.com/m3u8.php?url=LT-6e58e6fc4ec0e0560556d1922982b9a1"
  );
  const [searchResult, setSearchResult] = React.useState(null);
  const [movieName, setMovieName] = React.useState("你的名字");
  const [movieIndex, setMovieIndex] = React.useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    axios
      .get(`https://linkway.site:5557/movie/search?name=${searchString}&page=1`)
      .then((res) => {
        if (res.data.result) {
          let formated = searchResultFormat(res.data.result);
          setSearchResult(formated);
          setQueryDetail(null);
          setSearchString("");
        }
      })
      .catch((e) => {
        console.log(e);
      });
    setSearchString("努力搜索中");
  };
  const detailHandler = (path, name, index) => {
    if (name) setMovieName(name);
    if (index) setMovieIndex(index);
    axios
      .get(`https://linkway.site:5557/movie/detail?path=${path}`)
      .then((res) => {
        console.log(res.data);
        setSearchResult([]);
        setIframeSrc(res.data.result.url);
        setQueryDetail(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <React.Fragment>
      <PageNavigationBar
        title="Cours Movie"
        backTitle="更多"
        backPath="/other"
      />
      <PageContainer style={{ minHeight: "auto" }}>
        <PageHeader
          title={"正在播放: " + movieName + " " + movieIndex}
          color={"var(--color-primary)"}
          size={1}
        />
        <GridContainer>
          <VideoIframe
            title="Cours Movie"
            width="100%"
            src={iframeSrc}
            frameBorder="0"
            border="0"
            marginWidth="0"
            marginHeight="0"
            scrolling="no"
            allowFullScreen="allowfullscreen"
            mozallowfullscreen="mozallowfullscreen"
            msallowfullscreen="msallowfullscreen"
            oallowfullscreen="oallowfullscreen"
            webkitallowfullscreen="webkitallowfullscreen"
          ></VideoIframe>
          <Board>
            <PageHeader title="资源搜索" size={1} />
            <Form>
              <input
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                placeholder={"请输入影视名称关键词"}
              />
              <button onClick={searchHandler}>搜索</button>
            </Form>
            <PageHeader title="资源详情" size={1} />
            <CardLayout>
              {queryDetail &&
                queryDetail.details.map((detailItem, i) => {
                  return (
                    <SourceDetailItem>
                      <p>频道 {i + 1}</p>
                      <div>
                        {detailItem.map((videoItem, j) => {
                          return (
                            <button
                              onClick={(e) =>
                                detailHandler(
                                  videoItem.path,
                                  null,
                                  videoItem.name
                                )
                              }
                            >
                              {videoItem.name}
                            </button>
                          );
                        })}
                      </div>
                    </SourceDetailItem>
                  );
                })}
            </CardLayout>
            <PageHeader title="搜索结果 暂不支持翻页" size={1} />
            <CardLayout>
              {searchResult &&
                searchResult.map((item) => (
                  <VideoItem key={item.name}>
                    <img
                      style={{
                        width: "auto",
                        maxHeight: "20vh",
                        borderRadius: "0.5rem",
                      }}
                      src={item.img}
                      alt={item.name}
                    />
                    <p style={{ color: "var(--color-primary)" }}>
                      资源名称: {item.name}
                    </p>
                    <p>最新状态: {item.last}</p>
                    <p>导演: {item.persons[0]}</p>
                    <p>演员: {item.persons[1]}</p>
                    <p>简介: {item.persons[2]}</p>
                    <button
                      onClick={(e) => detailHandler(item.path, item.name)}
                    >
                      加载资源详情
                    </button>
                  </VideoItem>
                ))}
            </CardLayout>
          </Board>
        </GridContainer>
      </PageContainer>
    </React.Fragment>
  );
}

const Board = styled.div`
  width: 100%;
  height: calc(60vh - 8rem);
  /* background-color: var(--color-background-front); */
  border-radius: 0.5rem;
  box-sizing: border-box;
  /* padding: 1rem; */
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    height: 0px;
    width: 0px;
  }
  scrollbar-width: none;
  @media screen and (min-width: 1000px) {
    height: calc(100vh - 17rem);
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0;
  input {
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    border-radius: 1.25rem;
    border: 0px;
    padding: 0.5rem;
    background-color: var(--color-background);
    color: var(--color-color);
  }
  button {
    margin-top: 1rem;
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    border-radius: 1.25rem;
    cursor: pointer;
    font-size: 1rem;
    border: 0px;
    background-color: var(--color-background);
    &:hover {
      background-color: var(--color-primary);
      color: #fafafa;
    }
  }
  background-color: var(--color-background-front);
  padding: 2rem 1rem;
  box-sizing: border-box;
  border-radius: 0.8rem;
  box-shadow: var(--box-shadow);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 50fr 50fr;
  row-gap: 1rem;
  column-gap: 1rem;
  @media screen and (max-width: 1000px) {
    grid-template-rows: auto auto;
    grid-template-columns: 100%;
  }
  @media screen and (min-width: 1000px) {
    grid-template-columns: 60fr 40fr;
  }
  justify-items: center;
  align-items: center;
`;

const VideoIframe = styled.iframe`
  height: calc(100vh - 15rem);
  @media screen and (max-width: 1000px) {
    height: 35vh;
  }
`;

const VideoItem = styled.div`
  p {
    line-height: 1.4rem;
  }
  button {
    height: 2rem;
    border: none;
    cursor: pointer;
    border-radius: 1rem;
    margin-top: 1rem;
    &:hover {
      background-color: var(--color-primary);
      color: #fafafa;
    }
  }
  position: relative;
  padding: 1rem 0;
  &::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    width: auto;
    border: 1px dashed var(--color-background);
  }
`;

const SourceDetailItem = styled.div`
  p {
    line-height: 1.4rem;
    color: var(--color-primary);
  }
  button {
    cursor: pointer;
    height: 1.6rem;
    width: 8rem;
    border: none;
    margin: 1rem;
    &:hover {
      background-color: var(--color-primary);
      color: #fafafa;
    }
  }
  position: relative;
  padding: 1rem 0;
  &::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    width: auto;
    border: 1px dashed var(--color-background);
  }
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

export default MoviePage;
