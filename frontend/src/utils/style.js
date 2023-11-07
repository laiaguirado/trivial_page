import { createTheme } from '@mui/material/styles';

export const themeIOS = ({ theme }) => ({
    width: 50, //amplada del fons
    height: 32, //altura del fons
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 3,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(18px)',
            color: '#fff', //color del switch del boton
            '& + .MuiSwitch-track': {
                backgroundColor: '#c7a1ed', //color del boton checked
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 26, //amplada del switch del boton
        height: 26, //altura del switch del boton
    },
    '& .MuiSwitch-track': {
        borderRadius: 34 / 2,
        backgroundColor: '#bdbdbd', //color del boton unchecked
        opacity: 1,
        border: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
});

export const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
        },
        secondary: {
            main: '#E0C2FF',
            light: '#F5EBFF',
            contrastText: '#47008F',
        },
    },
});

