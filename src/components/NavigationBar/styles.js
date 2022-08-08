import { makeStyles } from '@mui/styles';

// return an object with the styles
export default makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    height: '80px',
    justifyContent: 'space-between',
    marginLeft: '240px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      flexWrap: 'wrap',
    },
  },

  menuButton: {
    marginRight: theme.spacing(2), // 8*2 = 16px
    // hide the button if it bigger than sm (mobile)
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));
