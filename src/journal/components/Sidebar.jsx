import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"

export const Sidebar = ({sidebarWidth = 240}) => {
    return (
        <Box
            component="nav"
            sx={{width: {sm: sidebarWidth}, flexShrink: {sm: 0}}}
        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: {xs: 'block'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: sidebarWidth}
                }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Ariel Ortega
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        ['Enero','Febrero','Marzo','Abril'].map(text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>

                                    <Grid container>
                                        <ListItemText primary={text} />
                                        <ListItemText secondary={'Eu ea minim eu aliqua.'} />
                                    </Grid>
                                </ListItemButton>
                                
                            </ListItem>
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}