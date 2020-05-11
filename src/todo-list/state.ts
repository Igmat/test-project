import { action, computed, observable } from 'mobx';
import TodoService, { ITodo } from './service';

let lastId = 0;
export class Todo implements ITodo {
    id: number;
    @observable isCompleted: boolean;
    @observable name: string;
    constructor(name: string, id?: number, isCompleted?: boolean) {
        this.name = name;
        if (id === undefined) {
            this.id = lastId;
            lastId++;
        } else {
            this.id = id;
        }
        this.isCompleted = !!isCompleted;
    }

    @action complete = async () => {
        this.isCompleted = true;
        return await TodoService.updateTodo(this)
    }
    @action toggle = async () => {
        this.isCompleted = !this.isCompleted;
        return await TodoService.updateTodo(this)
    }
}
export class TodoState {
    @observable lastId: number = 0;
    @observable entities: Todo[] = [];
    @computed get completedAmount() {
        return this.entities.filter(todo => todo.isCompleted).length;
    }
    @computed get uncompletedAmount() {
        return this.entities.filter(todo => !todo.isCompleted).length;
    }
    @computed get totalAmount() {
        return this.entities.length;
    }

    @action add = async (name: string) => {
        const lastId = await TodoService.addTodo({ name, id: this.lastId, isCompleted: false });
        this.entities.push(new Todo(name, lastId));
        this.lastId = lastId;
    }

    constructor() {
        TodoService.todos
            .then(todos =>
                this.entities.push(...todos.map(todo =>
                    new Todo(todo.name, todo.id, todo.isCompleted))));
        TodoService.lastId.then(lastId => this.lastId = lastId);
    }
}

export default new TodoState();