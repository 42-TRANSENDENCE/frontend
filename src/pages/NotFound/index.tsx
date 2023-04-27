import { useNavigate } from "react-router-dom";

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <BadPage>
      <p
        onClick={() => {
          navigate("/home");
        }}
      ></p>
    </BadPage>
  );
};

export default NotFound;

import styled from "styled-components";

//21배
const BadPage = styled.div`
  background-color: rgba(255, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  --font-size: min(calc(var(--page-width) / 12), var(--page-height));
  width: var(--page-width);
  height: var(--page-height);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size);
  font-weight: 1000;
  p {
    width: 100%;
    text-align: center;
    cursor: pointer;
    &:after {
      content: "PAGE NOT FOUND";
      color: rgb(180, 0, 0);
    }
    &:hover {
      &:after {
        content: "GO TO MAIN";
        color: rgb(0, 0, 0);
      }
    }
  }
`;
