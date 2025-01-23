import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider } from './styles/theme';
import ContextProviders from './components/ContextProviders';
import theme from './styles/theme';

const App = () => {
return(
  <Router>
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <ContextProviders />
      </ThemeProvider>
    </DndProvider>
  </Router>
)
};

export default App;
