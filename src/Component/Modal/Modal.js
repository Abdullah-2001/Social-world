import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './Modal.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const PostModal = ({ modal, setModal, close, style, children }) => {
    return (
        <div>
            <Modal open={modal} onClose={close} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}