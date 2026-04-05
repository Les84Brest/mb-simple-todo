import { FC, Suspense } from 'react';
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Container } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Loader from '../components/Loader';
import BottomNavigator from '../components/BottomNavigator/BottomNavigator';
import AddEditTaskModal from '../components/AddEditTaskModal/AddEditTaskModal';

export const MainLayout: FC = () => {
    return (
        <>
            <Header />
            <Container>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </Container>
            <BottomNavigator />
            <AddEditTaskModal />
           
        </>
    );
}

export default MainLayout
