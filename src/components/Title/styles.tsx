import styled, { css } from "styled-components";

export const TitleContainer = styled.div`
  --font-height: 60px;
  width: 100%;
  height: 100%;
  min-height: var(--font-height);
  background: white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  border: 0.3rem solid black;
  img {
    width: 3rem;
  }
  div.Home {
    position: absolute;
    left: 1rem;
  }
  div.Search {
    position: absolute;
    right: 1rem;
  }

  div.Title {
    margin-top: 0.3rem;
    text-align: center;
  }
  div.Title > span {
    font-size: 1.8765rem;
    border-top: 0.2rem solid black;
  }

  @media screen and (max-width: 600px) {
    div.Title {
      display: none;
    }
  }
  @media screen and (max-height: 777px) {
    img {
      width: 2rem;
    }
  }
`;

/** */

const backgroundColor = "#2A2E37";
const searchBgColor = "transparent";
const iconColor = "rgb(52, 54, 62)";
const transition = "all .5s ease";

export const SearchWrapper = styled.div<{ isOpen: boolean }>`
  width: 3rem;
  height: 3rem;
  /* margin: 2.5rem auto 0; */
  background-color: ${searchBgColor};
  position: relative;
  /* overflow: hidden; */
  transition: ${transition};

  &:before {
    content: "";
    display: block;
    width: 0.1875rem;
    height: 100%;
    position: relative;
    background-color: gray;
    transition: ${transition};
  }

  ${(props) =>
    props.isOpen &&
    css`
      width: 26.25rem;

      &:before {
        height: 100%;
        position: absolute;
      }
    `}

  /* @media screen and (min-width: 250px) and (max-width: 600px) {
    & {
      width: 3.25rem;
    }
  } */
  @media screen and (min-width: 250px) and (max-width: 600px) {
    & {
      width: ${(props) => (props.isOpen ? "13.25rem" : "3.25rem")};
    }
  }

  @media screen and (max-width: 250px) {
    & {
      display: none;
    }
  }
`;

export const SearchBox = styled.input`
  width: 100%;
  height: 100%;
  box-shadow: none;
  border: none;
  background: none;
  border-radius: 2.5rem;

  color: gray;
  padding-left : 2rem;
  padding-right: 4.6rem;
  font-size: 2rem;

  @media screen and (min-width: 327px) and (max-width: 600px) {
    & {
      width: 10rem;
      position: absolute;
      right: 0.4rem;
      padding: 0 3.1rem 0 0;
      border-radius: 0;
    }
  }
`;

export const SearchButton = styled.span<{ isOpen: boolean }>`
  width: 3rem;
  height: 3rem;
  display: block;
  position: absolute;
  /* background: rgb(255, 0, 0); */
  right: 0.7rem;
  top: -1rem;
  padding: 1rem;
  cursor: pointer;

  ${(props) =>
    props.isOpen &&
    css`
      right: 1rem;
      top: -1rem;
    `}
`;

export const SearchIcon = styled.span<{ isOpen: boolean }>`
  width: 2.1rem;
  height: 2.2rem;
  border-radius: 2.5rem;
  border: 0.3rem solid ${iconColor};
  /* background: rgb(0, 0, 255); */
  display: block;
  position: relative;
  /* margin-left: 0.3125rem; */
  transition: ${transition};

  &:before {
    content: "";
    width: 0.3rem;
    height: 0.4rem;
    position: absolute;
    left: 1.48rem;
    top: 1.5rem;
    display: block;
    background-color: ${iconColor};
    transform: rotate(-45deg);
    transition: ${transition};
  }

  &:after {
    content: "";
    width: 0.3rem;
    height: 0.4rem;
    position: absolute;
    top: 1.752567rem;
    left: 1.74rem;
    display: block;
    background-color: ${iconColor};
    transform: rotate(-45deg);
    transition: ${transition};
  }

  ${(props) =>
    props.isOpen &&
    css`
      margin: 0;
      width: 3rem;
      height: 3rem;
      border-radius: 3.75;

      &:before {
        transform: rotate(47deg);
        top: 0.99rem;
        left: 1.3rem;
        height: 1.125rem;
      }

      &:after {
        transform: rotate(-230deg);
        top: 0.465rem;
        left: 1.3rem;
        height: 1.125rem;
      }
    `}
`;
