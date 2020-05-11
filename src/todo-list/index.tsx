import { Button, Card, CardActions, CardContent, List, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import TodoState from './state';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

export const TodoList = observer(() =>
    <Card>
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">TODO List</Typography>
            <List>
                {TodoState.entities.map((todo, index) => <TodoItem key={todo.id} index={index} todo={todo} />)}
                <TodoForm />
            </List>
        </CardContent>
        <CardActions>
            <Button size="small" color="primary" onClick={() => TodoState.entities = []}>Clear</Button>
            <Typography align="right">Comppleted: {TodoState.completedAmount}/{TodoState.totalAmount}</Typography>
            <Typography align="right">TODO: {TodoState.uncompletedAmount}/{TodoState.totalAmount}</Typography>
        </CardActions>
    </Card>);

export default TodoList;