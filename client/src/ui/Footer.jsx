import styled from "styled-components";

// Styled component für den Footer
const StyledFooter = styled.footer`
  text-align: center;
  padding: 20px 0;
  color: #6c757d;
  font-size: 0.875rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;

  @media (max-width: 768px) {
    footer {
      padding: 10px 15px;
      font-size: 14px;
    }
  }
`;

function Footer() {
  return <StyledFooter>&copy; 2024 LinkedGen.</StyledFooter>;
}

export default Footer;
