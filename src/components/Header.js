import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4.8rem;
  color: var(--color-text-primary);
  font-size: 3.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

function Header() {
  return <StyledHeader>pomodoro</StyledHeader>;
}

export default Header;
