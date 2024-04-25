import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 15rem;
  width: auto;
`;

function Logo({ src, alt }) {
  return (
    <StyledLogo>
      <Img src={src} alt={alt || "Logo"} />
    </StyledLogo>
  );
}

export default Logo;
