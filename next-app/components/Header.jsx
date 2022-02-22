import styled from "styled-components";
function Header() {
  return (
    <>
      <Container>
        <Logo>Cours 分析平台</Logo>
      </Container>
      <Blank />
    </>
  );
}
const Container = styled.div`
  width: 100%;
  height: 3rem;
  background-color: #1d1d1f;
  position: fixed;
`;
const Blank = styled.div`
  width: 100%;
  height: 3rem;
`;

const Logo = styled.span`
  display: inline-block;
  color: #fafafa;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 2.7rem;
  padding-left: 1rem;
`;

export default Header;
