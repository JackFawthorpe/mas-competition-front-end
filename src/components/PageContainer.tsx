import { Container, ContainerProps } from "@mui/material";
import { styled } from '@mui/material/styles';

const PageContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  height: '100% !important',
  width: '100% !important',
  padding: '0px !important',
  margin: '0px !important',
  maxWidth: 'none !important',
  display: 'flex'
}));

export default PageContainer;
