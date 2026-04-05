import { FC, ChangeEvent, useState, useRef, useEffect } from "react";

import Dialog from '@mui/material/Dialog';
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { selectModalData } from "../../store/selectors";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import List from '@mui/material/List';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { closeModal } from "../../store/modalSlice/modalSlice";
import useTaskManager from "./useTaskManager";
import { Close } from "@mui/icons-material";
import TodoTextModal from "./TodoTextModal";
import uuid from "react-uuid";
import { ITask, ToDo } from "../../types/types";
import { addTask } from "../../store/taskToDoSlice/taskToDoSlice";

export const EDIT_TASK_MODAL = "addEditTaskModal";

export const enum OperationMode {
    ADD_NEW = 'addNew',
    EDIT_TASK = 'editTask'
};

export const AddEditTaskModal: FC = () => {

    const [addNewVisible, setAddNewVisible] = useState(false);
    const [newTitle, setNewTitle] = useState<string>('');
    const newTodoRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (addNewVisible && newTodoRef.current) {
            newTodoRef.current.focus();
        }
    }, [addNewVisible])

    const modalData = useAppSelector(selectModalData);
    const dispatch = useAppDispatch();

    const addEditTask = modalData[EDIT_TASK_MODAL];
    const { isOpen } = addEditTask;

    const {
        taskName,
        todos,
        setTaskName,
        updateTodo,
        addTodo,
        clearStore
    } = useTaskManager();

    const handleCloseModal = () => {
        dispatch(closeModal({ modalId: EDIT_TASK_MODAL }));
        clearStore();
    }

    const handleSave = () => {

        const task: ITask = {
            id: uuid(),
            taskName,
            todos
        }

        dispatch(addTask(task));
        dispatch(closeModal({ modalId: EDIT_TASK_MODAL }));
        clearStore();
    }

    const handleSetTaskName = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value)
    }

    const handleUpdateTodo = (event: ChangeEvent<HTMLInputElement>) => {
        // updateTodo()
    }

    const handleAddNewTodo = () => {
        setAddNewVisible(true);
    }

    const handleSaveNewTodo = () => {

        const newTodo: ToDo = {
            title: newTitle,
            completed: false,
            id: uuid()
        }

        addTodo(newTodo);
        setAddNewVisible(false);
        setNewTitle("");
    }

    const cbUpdateModalTodo = (todoId: string, title: string) => {
        const updatedTodo: ToDo = {
            id: todoId,
            title,
            completed: false
        }

        updateTodo(updatedTodo);
    }

    const handleNewTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    }

    const renderAddNew = () => {
        if (!addNewVisible) {
            return;
        }

        return (
            <Stack direction="row" justifyContent="space-between">
                <TextField
                    value={newTitle}
                    onChange={handleNewTitleChange}
                    variant="standard"
                    label="Todo title"
                    inputRef={newTodoRef}
                />
                <IconButton
                    aria-label="save"
                    size="small"
                    onClick={handleSaveNewTodo}>
                    <SaveIcon />
                </IconButton>
            </Stack>
        )
    }

    const renderTodos = () => {
        if (todos.length === 0) {
            return (
                <div className="no-todos">There's no todos. To add some todo please click button below</div>);
        }

        const listItems = todos.map((todo, i) => {
            return (
                <ListItem disablePadding key={todo.id}>
                    <ListItemIcon>
                        <CheckCircleOutlineIcon />
                    </ListItemIcon>
                    <TodoTextModal
                        id={todo.id}
                        text={todo.title}
                        onSave={cbUpdateModalTodo}
                    />
                </ListItem>
            )
        })

        return (
            <List>
                {listItems}
            </List>
        )
    }

    return (

        <Dialog
            open={isOpen}
            onClose={handleCloseModal}
            maxWidth="md"
        >
            <DialogTitle>
                <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Typography gutterBottom variant="h6" component="h5">
                        Add task
                    </Typography>
                    <IconButton onClick={handleCloseModal} >
                        <Close />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    label="Task name"
                    defaultValue=""
                    helperText="Enter general name for task group"
                    variant="standard"
                    onChange={handleSetTaskName}
                    value={taskName}
                />
                {renderTodos()}
                {renderAddNew()}
                <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={handleAddNewTodo}>
                    Add
                </Button>

            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={taskName === ''}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}
export default AddEditTaskModal;