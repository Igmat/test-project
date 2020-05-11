import { Checkbox, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { Todo } from './state';

export interface ITodoItemProps {
    index: number;
    todo: Todo;
}
export const TodoItem = observer(({ index, todo }: ITodoItemProps) =>
    <ListItem key={index} role={undefined} dense button onClick={todo.toggle}>
        <ListItemIcon>
            <Checkbox edge="start" checked={todo.isCompleted} tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': `checkbox-list-label-${index}` }} />
        </ListItemIcon>
        <ListItemText id={`checkbox-list-label-${index}`} primary={todo.name} />
    </ListItem>);

export default TodoItem;