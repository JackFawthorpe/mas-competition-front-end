import { Box, BoxProps } from "@mui/material";
import { styled } from '@mui/material/styles';

export default styled(Box)<BoxProps>(() => ({
    display: 'flex',
    justifyContent: 'end',
}));