import { useEffect, useState } from "react";
import styled from "styled-components";

// Styled Components Definition
const DecodeContainer = styled.div`
  width: 100%;
  margin-top: 8rem;
  font-size: 5rem;
  text-align: center;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
`;

const TextAnimation = styled.div`
  display: inline-block;
  position: relative;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? "translateY(0)" : "translateY(20px)"};
  transition: opacity 0.5s ease, transform 0.5s ease;
  color: ${({ visible }) =>
    visible ? "var(--linked-dark-blue)" : "transparent"};
`;

const Space = styled.div`
  width: 10px;
`;

const DecodeText = () => {
  const text = "Professionelle Posts für Ihr LinkedIn Profil.";
  const initialLetters = text.split("");
  const [letters, setLetters] = useState(
    initialLetters.map((letter) => ({ char: letter, visible: false }))
  );

  useEffect(() => {
    letters.forEach((letter, index) => {
      setTimeout(() => {
        setLetters((prevLetters) =>
          prevLetters.map((l, i) => (i === index ? { ...l, visible: true } : l))
        );
      }, index * 100 + 300);
    });
  }, []);

  return (
    <DecodeContainer>
      {letters.map((letter, index) => (
        <TextAnimation key={index} visible={letter.visible}>
          {letter.char === " " ? <Space /> : letter.char}
        </TextAnimation>
      ))}
    </DecodeContainer>
  );
};

export default DecodeText;
