import styled from 'styled-components';

export const Container = styled.div`
  width: var(--page-width);
  height: var(--page-height);
  padding: var(--html-padding-vertical) var(--html-padding-horizontal);
  display: flex;
  flex-direction: column;
  gap: var(--html-padding-vertical);
  justify-content: top;
  align-items: center;

  .Title {
    width: var(--title-width);
    height: var(--title-height);
    display: flex;
    flex-direction: column;
    justify-content: top;
  }
  .BodyOuter {
    width: var(--body-width);
    height: var(--body-height);
    display: flex;
    align-items: top;
    justify-content: top;
    overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; // 크롬, 사파리, 오페라, 엣지
  }
  }
  .Body {
    width: var(--body-width);
    height: var(--body-height);


    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;

    .BigButtons{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: var(--html-padding-vertical);
      Button {
        --w: calc(var(--body-width) * 0.3);
        width : var(--w);
        border: var(--border-width) solid black;
      }
    }
  }
`;

export const Label = styled.label`
  --label-height: calc(var(--body-width) / 40);
  display:flex;
  flex-direction: column;
  align-items: center;
  > p {
    width: var(--body-width);
    height: var(--label-height);
    text-align: center;
    display: block;
    font-weight: 600;
    cursor: pointer;
    font-size: var(--label-height);
    line-height: var(--label-height);
    margin-bottom: calc(var(--label-height) / 2);
  }
`

export const TwoFactorInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap : calc(var(--body-width) * 0.4 / 24);
`
export const TwoFactorSingleInput = styled.input`
  border-radius: calc(var(--body-width) * 0.4 / 27); 
  background: var(--color-gray);
  border: var(--border-width) solid black;
  width: calc(var(--body-width) * 0.4 / 9);
  height:calc(var(--body-width) * 0.4 / 9);
  font-size: calc(var(--body-width) * 0.4 / 18);
  text-align: center;
`

export const LongInput = styled.input`
  --input-width: calc(var(--body-width) / 5);
  --input-height: calc(var(--input-width) / 5);
  display: flex;
  width: var(--input-width);
  height: var(--input-height);
  border-radius: calc(var(--input-height) / 4);
  
  border: var(--border-width) solid black;
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  color: black;
  background: var(--color-gray);
  font-size: calc(var(--input-height) * 0.6);
  line-height: var(--input-height);
  transition: 0.3s;
  margin-bottom: var(--html-padding-vertical);
  &:focus {
    width: calc(var(--body-width) * 0.4);
  }
`

export const Conflict = styled.div`
  color: #e01e5a;
  font-weight: bold;
  text-align: center;
`
export const Form = styled.form`
  width: var(--body-width);
  height: var(--body-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`