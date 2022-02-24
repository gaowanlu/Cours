import styled from "styled-components";
import ThemeButton from "./ThemeButton";
function Header() {
  return (
    <>
      <Container>
        <Logo>Cours Analysis</Logo>
        <ThemeButton />
      </Container>
      <Blank />
    </>
  );
}
const Container = styled.header`
  width: 100%;
  height: 3rem;
  background-color: var(--color-background-front);
  position: fixed;
  box-shadow: var(--box-shadow);
`;
const Blank = styled.div`
  width: 100%;
  height: 3rem;
`;

const Logo = styled.span`
  display: inline-block;
  color: var(--color-primary);
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 2.7rem;
  padding-left: 1rem;
  cursor: pointer;
`;

export default Header;
