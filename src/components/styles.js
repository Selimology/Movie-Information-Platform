import { makeStyles } from '@mui/styles';

// return an object with the styles
export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  toolbar: {
    height: '70px',
  },
  content: {
    flexGrow: 1,
    padding: '2em',
  },
}));
