import React from "react";
import PageContainer from "./../components/PageContainer";
import PageNavigationBar from "../components/PageNavigationBar";
import styled from "styled-components";
import PageHeader from "./../components/PageHeader";
import axios from "axios";

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
  const searchHandler = (e) => {
    e.preventDefault();
    axios
      .get(`https://linkway.site:5557/movie/search?name=${searchString}&page=1`)
      .then((res) => {
        if (res.data.result) {
          let formated = searchResultFormat(res.data.result);
          setSearchResult(formated);
          console.log(formated);
          setQueryDetail(null);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    setSearchString("");
  };
  const detailHandler = (path) => {
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
    <PageContainer>
      <PageNavigationBar
        title="Cours Movie"
        backTitle="更多"
        backPath="/other"
      />
      <iframe
        title="Cours Movie"
        style={{ height: "40vh" }}
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
      ></iframe>
      <Board>
        <PageHeader title="影视搜索" size={1} />
        <Form>
          <input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <button onClick={searchHandler}>搜索</button>
        </Form>
        <PageHeader title="搜索结果1/1" size={1} />
        {searchResult &&
          searchResult.map((item) => (
            <div key={item.name}>
              <img
                style={{ width: "auto", maxHeight: "20vh" }}
                src={item.img}
                alt={item.name}
              />
              <p style={{ color: "var(--color-primary)" }}>名称: {item.name}</p>
              <p>状态: {item.last}</p>
              <p>导演: {item.persons[0]}</p>
              <p>演员: {item.persons[1]}</p>
              <p>简介: {item.persons[2]}</p>
              <button onClick={(e) => detailHandler(item.path)}>观看</button>
            </div>
          ))}
        <PageHeader title="影视详情" size={1} />
        {queryDetail &&
          queryDetail.details.map((detailItem, i) => {
            return (
              <div>
                <p>频道 {i + 1}</p>
                <div>
                  {detailItem.map((videoItem, j) => {
                    return (
                      <button onClick={(e) => detailHandler(videoItem.path)}>
                        {videoItem.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </Board>
    </PageContainer>
  );
}

const Board = styled.div`
  width: 100%;
  margin-top: 1rem;
  height: calc(60vh - 7rem);
  background-color: var(--color-background-front);
  border-radius: 0.5rem;
  box-sizing: border-box;
  padding: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    height: 0px;
  }
  scrollbar-width: none;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0;
  input {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
  }
  button {
    margin-top: 1rem;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
  }
`;

export default MoviePage;
