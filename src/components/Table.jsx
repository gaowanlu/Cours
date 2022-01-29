import styled from "styled-components";
import Fade from "react-reveal/Fade";
/**
 *
 * @param {head:[string,string],rows:[[string,string]}]} props
 * @returns
 */

export default function MyTable(props) {
  const { head, rows } = props;
  return (
    <Container theme={props.theme}>
      <ul>
        <li>
          <TableRow>
            {head.map((v, i) => {
              return <span key={i}>{v}</span>; //key warning
            })}
          </TableRow>
        </li>
        {rows.map((v, i) => {
          return (
            <li key={i}>
              <Fade bottom>
                <TableRow>
                  {v.map((b, j) => {
                    return <span key={j}>{b}</span>;
                  })}
                </TableRow>
              </Fade>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  min-height: 10rem;
  color: ${(props) => props.theme.color.color};
  li {
    list-style: none;
  }
  padding-bottom: 3rem;
`;

const TableRow = styled.div`
  width: 100%;
  display: flex;
  span {
    display: inline-block;
    min-height: 3rem;
    flex: 1;
    font-size: 0.9rem;
    font-weight: lighter;
    line-height: 3rem;
    text-align: center;
  }
  position: relative;
  &::after {
    position: absolute;
    content: "";
    height: 1px;
    background-color: #53535332;
    display: block;
    width: auto;
    left: 4%;
    right: 1%;
    bottom: 0;
  }
  /* border-bottom: 1px  solid; */
`;
