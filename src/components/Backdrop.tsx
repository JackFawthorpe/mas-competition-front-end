import { Box, BoxProps } from "@mui/material";
import { styled } from '@mui/material/styles';

const Backdrop = styled(Box)<BoxProps>(({ theme }) => ({
    background: 'radial-gradient(circle at 10% 20%, rgb(252, 251, 121) 0%, #ffb74d 90%)',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
}));

export default Backdrop;
