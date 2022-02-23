import styled from "styled-components";

function PageContainer(props) {
  return (
    <Container>
      <Content>{props.children}</Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  padding: 1rem;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
  @media screen and (min-width: 500px) and( max-width: 850px) {
    width: 90%;
  }
  @media screen and (min-width: 850px) {
    width: 80%;
  }
`;

export default PageContainer;
