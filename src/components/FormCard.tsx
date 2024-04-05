import { Card, CardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormCard = styled(Card)<CardProps>(({ theme }) => ({
  margin: '32px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  height: 'fit-content',
  gap: '24px',
  borderRadius: '20px'
}));

export default FormCard;
