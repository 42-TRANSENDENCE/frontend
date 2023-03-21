import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

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

export const Inputs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12vh;
`

export const Input = styled.input`
  margin: 3%;
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  width: 100%;
  height: 0;
  padding: 1em 0.3em 1em 0.5em;
  font-size: 1.2rem;
  transition: 0.4s;
  aspect-ratio: 1/1;

  &:focus {
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
    transform: scale(1.2);
    transform-origin: center center;
  }
  
  &:focus::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 2px solid rgba(29, 155, 209, 0.3);
    border-radius: 4px;
    transform: scale(1.2);
    transform-origin: center center;
    z-index: -1;
  }
`


export const Conflict = styled.div`
  color: #e01e5a;
  font-weight: bold;
  text-align: center;
`
