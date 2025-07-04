import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useSelector,useDispatch} from "react-redux";
import { setOpen } from '../redux/movieSlice';
import VideoBackground from './VideoBackground';
import { useDialogTrailerById } from '../hooks/useMovieById';

export default function MovieDialog() { 
  const {open,id} = useSelector(store=>store.movie);
  const dialogTrailer = useSelector(store=>store.movie.dialogTrailer);
  const dispatch = useDispatch();

  useDialogTrailerById(id);

  const handleClose = () =>{
    dispatch(setOpen(false));
  }
 
  return (
    <React.Fragment>
      
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: 16,
            background: '#181818',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            padding: 0,
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" 
      >
       <DialogContent style={{ padding: 0, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '80vw', maxWidth: 900, aspectRatio: '16/9', background: 'black', borderRadius: 12, overflow: 'hidden' }}>
            {dialogTrailer?.key && (
              <VideoBackground movieId={id} />
            )}
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', paddingBottom: 24 }}>
          <Button onClick={handleClose} variant="contained" style={{ background: '#e50914', color: '#fff', borderRadius: 20, fontWeight: 'bold', padding: '8px 32px' }}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}