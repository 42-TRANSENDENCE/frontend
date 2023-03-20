import { Box } from './styles';

const Button = ({img_url, onClick} : any) : JSX.Element => {
  return (
    <Box onClick={onClick}>
      <img src={img_url} />
    </Box>
  );
}

export default Button;
