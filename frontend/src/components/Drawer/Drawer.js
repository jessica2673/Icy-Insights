import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { CenterFocusStrong, ExpandLess, ExpandMore } from '@mui/icons-material';
import { CssBaseline, IconButton, Button, Box, SwipeableDrawer, Card, Typography } from '@mui/material';
import Search from '../Search/Search'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from '../../Theme.jsx';
import OutlinedCard from './Card';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor: theme.palette.primary.main
        //theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default
    //backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

function SwipeableEdgeDrawer(props) {
    const { window } = props;
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        if (newOpen) {
            setOpen(newOpen);
        } else {
            setOpen(!open)
        }
    };

    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={theme}>
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        width: '100%',
                    }}
                >
                    <IconButton
                        sx={{
                            position: 'absolute',
                            pointerEvents: 'auto',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'secondary.main'
                        }}
                        onClick={toggleDrawer()}
                    >
                        {open ? <ExpandMore /> : <ExpandLess />}
                    </IconButton>
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>‎ </Typography>
                </StyledBox>

                <StyledBox
                        sx={{
                            px: 2,
                            pb: 2,
                            height: '100%',
                            overflow: 'auto',
                            width: '100%'
                        }}
                    >
                        {/* Center the Search component horizontally */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center', // Centers horizontally
                                width: '100%', // Ensure it takes the full width
                            }}
                        >
                            <Search sx={{ pointerEvents: 'auto', width: '80%' }} />
                        </Box>
                        <Typography sx={{ p: 2, color: 'text.primary', fontWeight: 'bold', textAlign: 'center', fontSize: '1.5em'}}> Favourites </Typography>
                        <OutlinedCard />
                        <Typography sx={{ p: 2, color: 'text.primary', fontWeight: 'bold', textAlign: 'center', fontSize: '1.5em'}}> History </Typography>
                        <OutlinedCard />
                    </StyledBox>
                </SwipeableDrawer>
            </Root>
        </ThemeProvider>
    );
}

export default SwipeableEdgeDrawer;