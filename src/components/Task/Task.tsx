import { FC, useCallback, useState, MouseEvent } from "react";
import { ITask } from "../../types/types";
import TaskFilter from './TaskFilter';
import { styled } from '@mui/material/styles';

import Button, { ButtonProps } from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import ListItemIcon from '@mui/material/ListItemIcon';

import ToDoItem from "../Todo/TodoItem";
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useTask from "./useTask";
import useAddEditModaleTask from "../AddEditTaskModal/useAddEditModal";
import { MenuItem } from "@mui/material";

const TaskButton = styled(Button)<ButtonProps>(({ theme }) => ({
    margin: 0,
    color: theme.palette.grey[900],
    fontSize: 10,
}))


const Task: FC<ITask> = ({ id, taskName, todos }) => {

    const { completeToDo, deleteTodo, clearCompleted } = useTask(id);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isTaskMenuOpen = Boolean(anchorEl);

    const { openEditTaskModal } = useAddEditModaleTask();

    const cbDeleteTodo = useCallback<(id: string) => void>((id) => {
        deleteTodo(id);
    }, [deleteTodo]);

    const cbCompleteTodo = useCallback<(id: string, todoStatus: boolean) => void>((id, todoStatus) => {
        completeToDo(id, todoStatus);
    }, [completeToDo]);

    const getUncompletedTodosCount = (): number => {
        if (!todos.length) {
            return 0;
        }

        return todos.filter(todo => todo.completed ? false : true).length;
    }

    const getCompletedTodosCount = (): number => {
        if (!todos.length) {
            return 0;
        }

        return todos.filter(todo => todo.completed ? true : false).length;
    }

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>,
        value: string) => {

    }

    const handleEditTask = () => {
        handleMenuClose();
        openEditTaskModal();
    }

    const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    return (
        <Grid item xs={12} md={4}>
            <Paper elevation={3}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Box component="div">
                            <Typography sx={{
                                fontSize: 16,
                                fontStyle: 'italic',
                                fontWeight: 100
                            }} color="text.secondary" gutterBottom>
                                {taskName}
                            </Typography>

                            <IconButton
                                aria-label="more"
                                id="task-menu"
                                aria-controls={isTaskMenuOpen ? 'long-menu' : undefined}
                                aria-expanded={isTaskMenuOpen ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleMenuClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={isTaskMenuOpen}
                                onClose={handleMenuClose}
                            // PaperProps={{
                            //     style: {
                            //         maxHeight: ITEM_HEIGHT * 4.5,
                            //         width: '20ch',
                            //     },
                            // }}
                            >
                                <MenuItem onClick={handleEditTask}>
                                    <ListItemIcon>
                                        <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    Edit task
                                </MenuItem>
                                {/* {options.map((option) => (
                                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                        {option}
                                    </MenuItem>
                                ))} */}
                            </Menu>
                        </Box>
                        <Divider />
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {todos.map(todo => <ToDoItem
                                todo={todo}
                                onClickComplete={cbCompleteTodo}
                                onClickDelete={cbDeleteTodo}
                                key={todo.id} />)}
                        </List>
                    </CardContent>
                    <CardActions>
                        <Box component="div"
                            sx={{
                                width: '100%',
                                padding: '5px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignContent: 'center',
                            }}
                        >
                            <Typography
                                sx={{ fontSize: 10, alignSelf: 'center' }}
                                color="text.secondary"

                            >
                                {getUncompletedTodosCount()} items left
                            </Typography>
                            <TaskFilter onChange={handleFilterChange} />
                            <TaskButton onClick={clearCompleted} size='small' disabled={!(getCompletedTodosCount() > 0)}>Clear completed</TaskButton>
                        </Box>
                    </CardActions>
                </Card>
            </Paper>
        </Grid>
    );
}
export default Task;