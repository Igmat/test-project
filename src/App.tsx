import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import TodoList from './todo-list';

export const App = () =>
  <Container>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">Simple Test Project</Typography>
      </Toolbar>
    </AppBar>
    <TodoList />
  </Container>

export default App;