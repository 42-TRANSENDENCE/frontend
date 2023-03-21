import { Box, MiddleBox, SmallBox } from "./styles";

export const BigButton = ({img_url, onClick} : any) : JSX.Element => {
  return (
    <Box onClick={onClick}>
      <img src={img_url} />
    </Box>
  );
}

export const MiddleButton = ({img_url, onClick} : any) : JSX.Element => {
  return (
    <MiddleBox onClick={onClick}>
      <img src={img_url} />
    </MiddleBox>
  );
}

export const SmallButton = ({img_url, onClick} : any) : JSX.Element => {
  return (
    <SmallBox onClick={onClick} >
      <img src={img_url} />
    </SmallBox>
  );
}
