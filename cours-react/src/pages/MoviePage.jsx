import React from "react";
import PageNavigationBar from "../components/PageNavigationBar";
import styled from "styled-components";
import PageHeader from "./../components/PageHeader";
import PageContainer from "./../components/PageContainer";
import CardLayout from "./../components/CardLayout";
import movieAPI from "../api/movieAPI";

function MoviePage() {
  const [searchString, setSearchString] = React.useState("");
  const [queryDetail, setQueryDetail] = React.useState(null);
  const [iframeSrc, setIframeSrc] = React.useState(
    "https://dm.dqsj.cc/m3u8.php?url=LT-6e58e6fc4ec0e0560556d1922982b9a1"
  );
  const [searchResult, setSearchResult] = React.useState(null);
  const [movieName, setMovieName] = React.useState("你的名字");
  const [movieIndex, setMovieIndex] = React.useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    movieAPI.search((res) => {
      if (res.data.result) {
        let formated = movieAPI.searchResultFormat(res.data.result);
        setSearchResult(formated);
        setQueryDetail(null);
        setSearchString("");
      }
    }, searchString);
    setSearchString("努力搜索中");
  };
  const detailHandler = (path, name, index) => {
    if (name) setMovieName(name);
    if (index) setMovieIndex(index);
    movieAPI.detail((res) => {
      console.log(res.data);
      setSearchResult([]);
      setIframeSrc(res.data.result.url);
      setQueryDetail(res.data);
    }, path);
  };
  return (
    <React.Fragment>
      <PageNavigationBar title="Movie" backTitle="OS" backPath="/other" />
      <PageContainer
        style={{ minHeight: "auto", paddingTop: "0", paddingBottom: "0" }}
      >
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
            <PageHeader
              title={"正在播放: " + movieName + " " + movieIndex}
              color={"var(--color-primary)"}
              size={1}
            />
            <PageHeader title="资源搜索" size={2} />
            <Form>
              <input
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                placeholder={"请输入影视名称关键词"}
              />
              <button onClick={searchHandler}>搜索</button>
            </Form>
            <PageHeader title="资源详情" size={2} />
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
            <PageHeader title="搜索结果" size={2} />
            <CardLayout>
              {searchResult &&
                searchResult.map((item) => (
                  <VideoItem key={item.name}>
                    <VideoImg
                      src={item.img}
                      alt={item.name}
                    />
                    <p style={{ color: "var(--color-primary)" }}>
                      {item.name}
                    </p>
                    <p>最新状态: {item.last}</p>
                    <p>{item.persons[0]}</p>
                    <p>演员: {item.persons[1]}</p>
                    <p>简介: {item.persons[2]}</p>
                    <DetailButton
                      onClick={(e) => detailHandler(item.path, item.name)}
                    >
                      详情
                    </DetailButton>
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
  height: calc(65vh - 5rem);
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
    text-align:center;
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
    background-color: var(--color-primary);
    color: #fafafa;
    &:hover{
      background-color:#cc0066;
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
  grid-template-rows: calc(100vh - 4rem);
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
      background-color: #cc0066;
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


const VideoImg = styled.img`
  width:10rem;
  height:14rem;
  object-fit:cover;
  border-radius:0.5rem;
  margin-bottom:1rem;
`;

const DetailButton = styled.button`
    height: 2rem;
    border: none;
    cursor: pointer;
    border-radius: 0.5rem;
    margin-top: 1rem;
    background-color: var(--color-primary);
    color: #fafafa;
    padding: 0.5rem 1rem;
    &:hover{
      background-color: #cc0066;
    }
`;


export default MoviePage;
