import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask, ToDo } from '../../types/types'

//TODO remove
import data from '../../data';
//TODO remove

type CommonActionPayload = {
    taskId: number
}

type ToggleCompletedPayload = CommonActionPayload & {
    todoId: number,
    todoStatus: boolean
}

type AddTodoPayload = CommonActionPayload & { todo: ToDo }
type DelTodoPayload = CommonActionPayload & { todoId: number }


interface ITaskState {
    tasks: Array<ITask>
}

const initialState: ITaskState = {
    tasks: data,
};

function getEditedTask(tasks: ITask[], taskId: number): ITask | null {
    const currentTask = tasks.find((task) => task.id === taskId);

    return currentTask ? currentTask : null;
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<ITask>) {
            state.tasks.push(action.payload);
        },

        addTodo(state, action: PayloadAction<AddTodoPayload>) {
            //TODO add todo logic
            console.log('%cadd todo', 'padding: 5px; background: FloralWhite; color: red;');
        },

        deleteTodo(state, action: PayloadAction<DelTodoPayload>) {
            const { taskId, todoId } = action.payload;

            const editedTask = getEditedTask(state.tasks, taskId);
            console.log('%cedited task', 'padding: 5px; background: FloralWhite; color: red;', editedTask);
            if (editedTask) {
                editedTask.todos = editedTask.todos.filter(todo => todo.id !== todoId);
            }

        },

        toggleCompleted(state, action: PayloadAction<ToggleCompletedPayload>) {
            const { taskId, todoId, todoStatus } = action.payload;

            const editedTodo = state.tasks
                .find((task) => task.id === taskId)
                ?.todos.find(todo => todo.id === todoId);

            if (editedTodo) {
                editedTodo.completed = todoStatus;
            }
        },

        clearAllCompletedTodosInTask(state, action: PayloadAction<number>) {
            const editedTodo = getEditedTask(state.tasks, action.payload)

            if (editedTodo) {
                editedTodo.todos = editedTodo.todos.filter(todo => todo.completed === false);
            }
        }

    },

});

export const { addTask, addTodo, deleteTodo, toggleCompleted, clearAllCompletedTodosInTask } = tasksSlice.actions

export default tasksSlice.reducer;