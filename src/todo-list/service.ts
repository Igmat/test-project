const storageKey = 'TODO-DATA';
export interface ITodo {
    id: number;
    isCompleted: boolean;
    name: string;
}
export class TodoService {
    lastId = Promise.resolve(0);
    todos = Promise.resolve<ITodo[]>([]);

    constructor() {
        this.restoreFromStorage();
    }

    private restoreFromStorage() {
        const { lastId, todos } = this.getStorageData();
        this.lastId = lastId;
        this.todos = todos;
    }

    private getStorageData() {
        const stringifiedData = localStorage.getItem(storageKey);
        const data = stringifiedData
            ? JSON.parse(stringifiedData)
            : { lastId: 0, todos: [] };
        return {
            lastId: Promise.resolve<number>(data.lastId),
            todos: Promise.resolve<ITodo[]>(data.todos),
        };
    }
    private saveStorageData(lastId: number, todos: ITodo[]) {
        localStorage.setItem(storageKey, JSON.stringify({
            lastId,
            todos
        }));
    }

    async addTodo(todo: ITodo) {
        let lastId = await this.lastId;
        const todos = await this.todos;
        todos.push({
            ...todo,
            id: lastId
        });
        lastId++;

        this.saveStorageData(lastId, todos);
        this.restoreFromStorage();

        return lastId;
    }

    async updateTodo(todo: ITodo) {
        const lastId = await this.lastId;
        const todos = await this.todos;
        const existing = todos.find(t => t.id === todo.id);
        if (!existing) throw new Error(`TODO isn't found`);
        existing.isCompleted = todo.isCompleted;
        existing.name = todo.name;

        this.saveStorageData(lastId, todos);
        this.restoreFromStorage();
    }
}

export default new TodoService();