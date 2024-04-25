import styled from "styled-components";

export const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  padding: 1.2rem;
  margin-bottom: 1.2rem;
  border-radius: 8px;
`;

export const PostListCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
`;

export const Description = styled.p`
  color: #666;
  margin-left: 1.5rem;
`;

export const BaseDescription = styled.p`
  color: #666;
`;

export const TextExampleDescription = styled(BaseDescription)`
  font-size: 1.2rem;
  margin-left: 1.5rem;
`;

export const TopicHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem;
`;

export const DateText = styled.span`
  font-size: 1.2rem;
  color: var(--linked-blue);
`;

export const TopicTitle = styled.h2`
  margin: 0;
`;
