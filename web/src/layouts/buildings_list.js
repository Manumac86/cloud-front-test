import * as React from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { st } from './style';
import { TokenIsValid } from '../api/auth'
import { GetBuildings } from '../api/buildings'
import { GetBookmarks, SaveBookmarks, DeleteBookmarks } from '../api/bookmarks';

export default function BuildingList() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [favs, setFavs] = useState([]);

    React.useEffect(() => {
        if (!TokenIsValid(localStorage.getItem('test-token'))) {
            navigate("/login");
        }
        GetBuildings().then(data => {
            GetBookmarks().then(buildings => {
                const tmpCache = []
                buildings.forEach(building => {
                    tmpCache[building.BuildingId] = building
                })
                setFavs(tmpCache)
                setRows(data)
            })
        })
    }, [navigate]);

    // TODO: Use Auth context. Avoid repeating code.
    const logoutUser = () => {
        localStorage.removeItem('test-token')
        localStorage.removeItem('email')
        navigate("/login");
    }

    const goToBookrmarks = () => {
        navigate(`/bookmarks`);
    }
    const goToBuildings = () => {
        navigate(`/buildings`);
    }
    const goToBuildingMetrics = (id) => {
        navigate(`/buildings/${id}`);
    }

    const saveBookmarks = (id) => {
        SaveBookmarks(id).then(() => {
            // TODO: Move logic to a hook to avoid repeating code.
            GetBookmarks().then(buildings => {
                const tmpCache = {}
                buildings.forEach(building => {
                    tmpCache[building.BuildingId] = building
                })
                setFavs(tmpCache)
            })
        })
    }

    const deleteBookmarks = (id) => {
        DeleteBookmarks(id).then(() => {
            // TODO: Move logic to a hook to avoid repeating code.
            GetBookmarks().then(buildings => {
                const tmpCache = {}
                buildings.forEach(building => {
                    tmpCache[building.BuildingId] = building
                })
                setFavs(tmpCache)
            })
        })
    }

    return (
        <div style={{ width: '100vw', height: '100vh', backgroundColor: st.bgColor }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar style={{ backgroundColor: st.appBarColor }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            My Buildings
                        </Typography>
                        <Box justifyContent="flex-start" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                onClick={goToBuildings}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                All
                            </Button>
                            <Button
                                onClick={goToBookrmarks}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Bookmarks
                            </Button>
                        </Box>
                        {
                            localStorage.getItem('email') && <div>
                                {localStorage.getItem('email')}
                            </div>
                        }
                        <Button color="inherit" onClick={logoutUser}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid container spacing={0} style={{ width: '100%', height: 'calc(100% - 65px)' }} >

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Info</TableCell>
                                <TableCell align="right">Favourites</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                            <AssessmentIcon onClick={() => goToBuildingMetrics(row.id)} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        {favs[row.id] === undefined &&
                                            <IconButton onClick={() => saveBookmarks(row.id)} color="primary" aria-label="upload picture" component="label">
                                                <FavoriteBorderIcon />
                                            </IconButton>
                                        }
                                        {favs[row.id] !== undefined &&
                                            <IconButton onClick={() => deleteBookmarks(favs[row.id].ID)} color="primary" aria-label="upload picture" component="label">
                                                <FavoriteIcon />
                                            </IconButton>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>
        </div>
    );
}