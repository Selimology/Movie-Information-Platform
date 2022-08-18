import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  actorImage: {
    borderRadius: '50px',
    boxShadow: '0.5em 0.8em 1em rgb(0, 0, 0, 0.5)',
    width: '80%',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      height: '350px',
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '100%',
      height: '350px',
      marginBottom: '30px',
    },
  },
}));
