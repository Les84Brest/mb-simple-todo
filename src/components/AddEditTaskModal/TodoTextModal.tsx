import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { FC, ChangeEvent, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';

type TodoTextModalProps = {
    text: string;
    onSave: (todoId: string, title: string) => void;
    id: string;
}



export const TodoTextModal: FC<TodoTextModalProps> = ({ text, onSave, id }) => {


    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(text);


    const toggleEditMode = () => {
        setIsEditMode(prev => !prev);
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    }

    const handleSave = () => {
        setIsEditMode(false);
        onSave(id, newTitle);
        
    }

    return (
        <div className="todo-wrap" onClick={toggleEditMode}>
            {isEditMode
                ? <div>
                    <TextField value={newTitle} onChange={handleNameChange}  variant="standard"/>
                    <Box className="todo-actions">
                        <IconButton aria-label="save" size="small" onClick={handleSave}>
                            <SaveIcon />
                        </IconButton>
                    </Box>
                    
                </div>

                : <Typography variant="subtitle1">{text}</Typography>}


        </div>
    )
}
export default TodoTextModal;