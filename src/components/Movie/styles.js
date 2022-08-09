import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movie: {
    padding: '10px',
  },
  movieTitle: {
    color: theme.palette.text.primary,
    // add ... if title is long
    textOverflow: 'ellipsis',
    width: '240px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginBottom: '10px',
    marginTop: '10px',
    textAlign: 'center',
  },
}));
