import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
const pages = ['Screens', 'Content', 'Register'];
const settings = ['Logout'];

function ResponsiveAppBar({ }) {
    const navigate = useNavigate();
    const { user } = useUser();
    const { setUser } = useUser()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    // const [username, setUsername] = React.useState("Takunda")
    console.log(user.user.show)
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (page) => {

    };
    const handleNavItems = (page, event) => {

        if (page === "Screens") {
            navigate("/screens")
        }
        else if (page === "Register") {
            navigate("/register")
        }
        else if (page === "Content") {
            navigate(`/screens/${user.other.screenId}`)
        }
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        setUser({ user: { username: null, show: false }, other: { role: null, screenId: "" } });

        // Navigate to the root ("/") after logout
        navigate("/");
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"

                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Digi Sign
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            // onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            // onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handleNavItems(page)}>
                                    {(user.user.username && user.other.role === "admin" && page !== "Content") || (user.user.username && (page !== "Register" && page !== "Content")) || (user.user.username && page === "Content" && user.user.show) ? (<Typography textAlign="center">{page}</Typography>) : null}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"

                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Digi Sign
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            (user.user.username && user.other.role === "admin" && page !== "Content") || (user.user.username && (page !== "Register" && page !== "Content")) || (user.user.username && page === "Content" && user.user.show) ? (
                                <Button
                                    key={page}
                                    onClick={() => handleNavItems(page)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ) : null
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user.user.username} src={null}>
                                    {user.user.username ? user.user.username.charAt(0) : null} {/* Display the first character of the user's name */}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleLogout}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default ResponsiveAppBar;
