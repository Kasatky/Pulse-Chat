import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import { resetSearch, searchUsersThunk } from './SearchSlice';
import { foundUsersSelector } from './selectors';
import FoundUserView from './FoundUserView';

export default function UserSearch(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');

  const handleOpen = (): void => setOpen(true);

  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    setOpen(false);
    dispatch(resetSearch());
  };

  const results = useSelector(foundUsersSelector);

  const handleSearch = (event: React.FormEvent): void => {
    event.preventDefault();
    dispatch(searchUsersThunk(text));
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" sx={{ mt: 3, mb: 2 }}>
        Search
      </Button>
      <Dialog
        PaperProps={{
          style: { borderRadius: 20 },
        }}
        open={open}
        fullWidth
        maxWidth="xl"
        onClose={handleClose}
      >
        <DialogContent
          sx={{
            height: '70vh',
            display: 'flex',
            borderRadius: '10',
            alignContent: 'center',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <DialogContentText sx={{ width: 1 }}>
            <form onSubmit={handleSearch}>
              <Grid
                container
                spacing={2}
                sx={{ mt: 1, ml: 'auto', mr: 'auto' }}
                xs={12}
              >
                <TextField
                  autoComplete="false"
                  sx={{
                    margin: 1,
                    width: 1,
                    '& .Mui-focused .MuiIconButton-root': {
                      color: 'primary.main',
                    },
                  }}
                  fullWidth
                  size="small"
                  value={text}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setText(event.target.value);
                  }}
                  name="text"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <IconButton
                        sx={{
                          ml: -1.5,
                          '&:hover': {
                            backgroundColor: '#FFF',
                          },
                        }}
                        type="button"
                        onClick={handleSearch}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                    ),
                    endAdornment: (
                      <IconButton
                        sx={{ visibility: text ? 'visible' : 'hidden' }}
                        onClick={() => setText('')}
                      >
                        <ClearIcon />
                      </IconButton>
                    ),
                  }}
                />

                <Grid
                  container
                  spacing={2}
                  sx={{
                    mt: 1,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  xs={12}
                >
                  {results &&
                    results.map((user) => (
                      <FoundUserView key={user.id} user={user} />
                    ))}
                </Grid>
              </Grid>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
