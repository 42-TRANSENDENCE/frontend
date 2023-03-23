import styled, { css } from "styled-components";

export const TitleContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: var(--title-width);
  height: var(--title-height);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  border: 0.3rem solid black;
  overflow: hidden;


  
  .Home {
    --button-size: calc(var(--title-height) * 0.6); 
    height: var(--button-size);
    aspect-ratio: 1;
    position: absolute;
    left: calc(var(--title-height) * 0.125);
    
    img{
      width: 100%;
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: var(--color-yellow);
    }
  }
  
  .Search {
    --button-size: calc(var(--title-height) * 0.5); 
    position: absolute;
    width: fit-content;
    height: var(--button-size);
    right: calc(var(--title-height) * 0.125);
  }
  
  .Title {
    background: white;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    span{
      background-color: none;
      font-weight: 600;
      line-height: calc(var(--title-height) * 0.5);
      font-size: calc(var(--title-height) * 0.5);
      border-top: 0.2rem solid black;
    }
  }


  /* @media screen and (max-width: 600px) {
    div.Title {
      display: none;
    }
  }
  @media screen and (max-height: 777px) {
    img {
      width: 2rem;
    }
  } */
`;

/** */

const backgroundColor = "#2A2E37";
const searchBgColor = "transparent";
const iconColor = "rgb(52, 54, 62)";
const transition = "all .5s ease";

export const SearchWrapper = styled.div<{ isOpen: boolean }>`

  background-color: ${searchBgColor};
  width: 0;
  height: var(--button-size);
  
  position: absolute;
  right: 0;
  transition: ${transition};
  border-radius: calc(var(--button-size) * 0.5);
  
  ${(props) =>
    props.isOpen &&
    css`
      width: max(15vw, 100px);
  `}

  /* @media screen and (min-width: 250px) and (max-width: 600px) {
    & {
      width: 3.25rem;
    }
  }
  @media screen and (min-width: 250px) and (max-width: 600px) {
    & {
      width: ${(props) => (props.isOpen ? "13.25rem" : "3.25rem")};
    }
  }

  @media screen and (max-width: 250px) {
    & {
      display: none;
    }
  } */
`;

export const SearchBox = styled.input`
  width: calc(100% - var(--button-size) * 1.5 - 5px);
  height: 90%;
  background-color: transparent;
  
  color: black;
  font-size: 2rem;

  position: absolute;
  right: calc(var(--button-size) + 5px);
  top: 5%;

  border-radius: 10px;
  border: 2px solid gray;
  background: lightgray;

  /* @media screen and (min-width: 327px) and (max-width: 600px) {
    & {
      width: 10rem;
      position: absolute;
      right: 0.4rem;
      padding: 0 3.1rem 0 0;
      border-radius: 0;
    }
  } */
`;

export const SearchButton = styled.span<{ isOpen: boolean }>`
  width: var(--button-size);
  height: var(--button-size);
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;

 
`;

export const SearchIcon = styled.span<{ isOpen: boolean }>`
  --circle-diameter : calc(var(--button-size) * 0.7);
  --line-width : calc(var(--button-size) * 0.09);
  box-sizing: border-box;
  width: var(--circle-diameter);
  aspect-ratio: 1;
  border-radius:  calc(var(--circle-diameter) / 2);
  border: var(--line-width) solid ${iconColor};
  display: block;
  position: relative;
  transition: ${transition};
  
  &:before {
    content: "";
    position: absolute;
    display: block;
    background-color: ${iconColor};

    width: var(--line-width);
    height: calc(var(--button-size) * 0.5);
    
    left: calc(var(--button-size) * 0.6);
    top: calc(var(--button-size) * 0.4);
    transform: rotate(-45deg);
    transition: ${transition};
  }

  &:after {
    content: "";
    height: calc(var(--button-size) * 0.5);
    width: var(--line-width);
    position: absolute;
    left: calc(var(--button-size) * 0.6);
    top: calc(var(--button-size) * 0.4);
    display: block;
    background-color: ${iconColor};
    transform: rotate(-45deg);
    transition: ${transition};
  }

  ${(props) =>
    props.isOpen &&
    css`
      --circle-diameter : calc(var(--button-size)* 0.9);
      top : calc(var(--button-size)* 0.05);
      left : calc(var(--button-size)* 0.05);
      margin: 0;
      width: var(--circle-diameter);
      border-radius: calc(var(--circle-diameter) / 2);

      &:before {
        width: var(--line-width);
        height: calc(var(--button-size) * 0.3);

        transform: rotate(45deg);
        top: calc(var(--button-size) * 0.32);
        left: calc(var(--button-size) * 0.38);
      }

      &:after {
        width: var(--line-width);
        height: calc(var(--button-size) * 0.3);

        transform: rotate(-45deg);
        top: calc(var(--button-size) * 0.13);
        left: calc(var(--button-size) * 0.38);
      }
    `}
`;
