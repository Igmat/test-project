import { ListItem, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { ChangeEventHandler, Component, FormEventHandler } from 'react';
import TodoState from './state';

export interface ITodoFormProps {

}
export interface ITodoFormState {
    name: string;
}
@observer
export default class TodoForm extends Component<ITodoFormProps, ITodoFormState> {
    state = {
        name: ''
    }
    private onChange: ChangeEventHandler<HTMLInputElement> = ev => {
        this.setState({ name: ev.target.value })
    }
    private onSubmit: FormEventHandler = ev => {
        ev.preventDefault();
        TodoState.add(this.state.name);
        this.setState({ name: '' })
    }
    render() {
        return (
            <ListItem role={undefined} dense >
                <form onSubmit={this.onSubmit}>
                    <TextField name="name" value={this.state.name} label="New TODO" onChange={this.onChange} />
                </form>
            </ListItem>
        )
    }
}
