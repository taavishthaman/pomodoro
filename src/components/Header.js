import { useSelector } from "react-redux";
import styled from "styled-components";
import { fontFamiliy, fontWeights } from "../utils/fonts";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4.8rem;
  color: var(--color-text-primary);
  font-size: 3.2rem;
  font-style: normal;
  line-height: normal;
  font-family: ${(props) => fontFamiliy[props.font]};
  font-weight: ${(props) => fontWeights[props.font]};
  @media screen and (max-width: 50em) {
    padding-top: 8rem;
  }
  @media screen and (max-width: 31em) {
    padding-top: 3.2rem;
  }
`;

function Header() {
  const { font } = useSelector((state) => state.app);

  return <StyledHeader font={font}>pomodoro</StyledHeader>;
}

export default Header;
