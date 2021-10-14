import { Components } from "@mui/material";

export const componentOptions: Components = {
      MuiListItemButton: {
            styleOverrides: {
                root: {
                    // color: '#eeeeee',
                    fontSize: '2rem',
                    color: "#68518F",
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    '&.Mui-focusVisible': {
                        backgroundColor: "#baa8da"
                    },
                    '&.Mui-selected': {
                        color: "#68518F",
                        backgroundColor: "#baa8da",
                        borderLeft: `5px solid #baa8da`,
                        '&:hover': {
                            backgroundColor: "#baa8da"
                        },
                        '&.MuiListItemIcon-root': {
                            color: "#68518F"
                        }
                    },
                    '&:hover': {
                        backgroundColor: "#baa8da",
                        color: "#68518F",
                        '&.MuiListItemIcon-root': {
                            color: "#68518F"
                        }
                    }
                }
            }
        },
}