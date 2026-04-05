import { FC, useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TasksList from "../components/TasksList";
import Search from "../components/Search";
import { useAppDispatch } from '../hooks/redux';
import { addTask } from '../store/taskToDoSlice/taskToDoSlice';
import { openModal } from '../store/modalSlice/modalSlice';
import { EDIT_TASK_MODAL } from '../components/AddEditTaskModal/AddEditTaskModal';

export function Todos() {

    const dispatch = useAppDispatch();

    const [search, setSearch] = useState<string>('');
    const handleSearch = () => {
    }

    const handleAddNewTask = () => {
        dispatch(openModal({ modalId: EDIT_TASK_MODAL }));
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                my: 1.25
            }}>
                <Typography
                    align="left"
                    variant="h2"
                    sx={{ color: 'text.secondary', mr: '20px' }}
                >
                    todos
                </Typography>
                <Search
                    value={search}
                    onChange={handleSearch}
                />
            </Box>
            <TasksList />
            <PComponent />
            <Fab
                size="medium"
                color="primary"
                aria-label="Add task"
                sx={{ position: "absolute", bottom: '70px', right: "10px" }}
                onClick={handleAddNewTask}
            >
                <AddIcon />
            </Fab>
        </>
    );

}

const PComponent = () => {
    console.log('PComponent render');

    const [count, setCount] = useState(1);
    console.log('%c1', 'padding: 5px; background: crimson; color: white;');

    useEffect(() => {
        console.log('%c2', 'padding: 5px; background: hotpink; color: black;');
        return () => {
            console.log('%c3', 'padding: 5px; background: hotpink; color: black;');
        }
    }, [count]);

    useEffect(() => {
        console.log('%c4', 'padding: 5px; background: DarkGreen; color: MediumSpringGreen;');
        console.log('Count >> ', count);

        setCount((count) => {
            console.log(" in setCount", count);
            return count + 1; 
        });
    }, [])

    return <ChComponent count={count} />
}

type chcomprop = { count: number };

const ChComponent: FC<chcomprop> = ({ count }) => {
    console.log('ChComponent render');

    useEffect(() => {
        console.log('%c5', 'padding: 5px; background: crimson; color: white;');
        return () => {
            console.log('%c6', 'padding: 5px; background: crimson; color: white;');
        }
    }, [count])
    return null;

}
export default Todos