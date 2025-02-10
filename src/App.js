import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ContextProviders from './context/ContextProviders';
import theme from './styles/theme';

const App = () => {

    return(
        <Router>
            <DndProvider backend={HTML5Backend}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <ContextProviders />
                </ThemeProvider>
            </DndProvider>
        </Router>
    )
};

export default App;