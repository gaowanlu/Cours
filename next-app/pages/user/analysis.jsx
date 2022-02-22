import PageContainer from "../../components/PageContainer";
import Header from "../../components/Header";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import stringHashRGB from "./../../utils/stringHashRGB";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

const Data = (data) => {
  return {
    labels: data.labels,
    datasets: [
      {
        label: "# of Votes",
        data: data.data,
        backgroundColor: data.labels.map((o) => {
          let rgb = stringHashRGB((o + Math.random()).toString());
          return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
        }),
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

function Analysis() {
  const [collegeData, setCollegeData] = React.useState({
    labels: [],
    data: [],
  });
  const [gradeData, setGradeData] = React.useState({
    labels: [],
    data: [],
  });
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let p1 = fetch("https://linkway.site:5557/user/analysis");
    p1.then((res) => res.json()).then(({ count, distribution }) => {
      const { colleges, grades } = distribution;
      console.log(count);
      console.log({ colleges, grades });
      let labels1 = [];
      let data1 = [];
      let labels2 = [];
      let data2 = [];
      for (let i = 0; i < colleges.length; i++) {
        labels1.push(colleges[i][0]);
        data1.push(colleges[i][1]);
      }
      for (let item of grades) {
        labels2.push(item[0]);
        data2.push(item[1]);
      }
      setCollegeData({
        labels: labels1,
        data: data1,
      });
      setGradeData({
        labels: labels2,
        data: data2,
      });
      setCount(count);
    });
  }, []);
  return (
    <>
      <Header />
      <PageContainer>
        <h1>Cours用户分布</h1>
        <h2>用户总量 {count}</h2>
        <Flex>
          <FlexItem>
            <h2>学院分布</h2>
            <ChartContainer>
              <Pie data={Data(collegeData)} />
            </ChartContainer>
          </FlexItem>
          <FlexItem>
            <h2>年级分布</h2>
            <ChartContainer>
              <Pie data={Data(gradeData)} />
            </ChartContainer>
          </FlexItem>
        </Flex>
      </PageContainer>
    </>
  );
}

const ChartContainer = styled.div`
  @media screen and (max-width: 500px) {
    width: 100%;
  }
  @media screen and (min-width: 500px) and( max-width: 850px) {
    width: 50%;
  }
  @media screen and (min-width: 850px) {
    width: 40%;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FlexItem = styled.div`
  min-width: 100%;
`;

export default Analysis;
