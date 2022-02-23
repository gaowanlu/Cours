import styled from "styled-components";
import logo from "../assets/png/logo.png";
import Link from "next/link";
import PageContainer from "./PageContainer";
function Footer() {
  console.log(logo);
  return (
    <PageContainer>
      <Container>
        <p>
          Copyright © 2022&nbsp;
          <span className="footer_cours">
            <Link href="https://cours.vercel.app">Cours&nbsp;Dev.</Link>
            <img src={logo.src} className="footer_cours_img" />
          </span>
          <br />
          All rights reserved.
        </p>
      </Container>
    </PageContainer>
  );
}

const Container = styled.footer`
  min-height: 15rem;
  padding: 1rem;
  box-shadow: var(--box-shadow);
  background-color: var(--color-background);
  .footer_cours {
    position: relative;
    cursor: pointer;
    color: var(--color-primary);
  }
  .footer_cours img {
    display: none !important;
  }
  .footer_cours:hover img {
    display: inline-block !important;
    position: absolute;
    width: 10rem;
    height: 10rem;
    background-color: #fafafa;
    top: -10rem;
    left: 0;
    cursor: pointer;
    border-radius: 0.5rem;
  }
`;

export default Footer;
