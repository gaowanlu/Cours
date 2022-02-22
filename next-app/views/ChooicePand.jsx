import styled from "styled-components";
import Link from "next/link";

function ChooicePand() {
  return (
    <Container>
      <Link href="/user/analysis" replace>
        <button>Cours用户数据分析</button>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f79f58;
  padding: 1rem;
  border-radius: 1rem;
`;

export default ChooicePand;
