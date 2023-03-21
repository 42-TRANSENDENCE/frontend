import styled from 'styled-components';

export const Label = styled.label`
  & > span {
    display: block;
    text-align: center;
    font-size: 1.8765rem;
    font-weight: 500;
    cursor: pointer;
    line-height: 1.46666667;
  }
`

export const Input = styled.input`
  display: flex;
  // 세로로 줄이면 삼각형 뜨는 현상 발생
  margin: 1vh auto 10vh;
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  width: 60%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  font-size: 1.2rem;
  line-height: 1;
  transition: 0.4s;
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
    width: 80%;
  }
`

export const Conflict = styled.div`
  color: #e01e5a;
  font-weight: bold;
  text-align: center;
`
