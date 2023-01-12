import {
  Grid,
  InputBase,
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
import { styled, alpha } from '@mui/material/styles';
import { useAppDispatch } from '../../../store';
import { searchUsersThunk } from './SearchSlice';
import { foundUsersSelector } from './selectors';
import FoundUserView from './FoundUserView';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
export default function UserSearch(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');

  const handleOpen = (): void => setOpen(true);

  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    setOpen(false);
    // dispatch(resetSearch());
  };

  const results = useSelector(foundUsersSelector);

  const handleSearch = (event: React.FormEvent): void => {
    event.preventDefault();
    setOpen(true);
    dispatch(searchUsersThunk(text));
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <Search sx={{ mb: 1 }} onSubmit={handleOpen}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={text}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setText(event.target.value);
            }}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </form>
      <Dialog
        PaperProps={{
          style: { borderRadius: 20, width: 600 },
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
            // borderRadius: '30',
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
                  item
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
    </>
  );
}
