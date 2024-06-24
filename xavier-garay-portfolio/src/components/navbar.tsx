import React, {useState} from 'react';
import Modal from "react-modal";

type NavbarProps = {
    onNavigate: (index: number) => void;
    buttons: string[];
    className?: string;
};

export default function Navbar({ onNavigate, buttons, className }: NavbarProps) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    enum FlexDirection {
        Row = "row",
        RowReverse = "row-reverse",
        Column = "column",
        ColumnReverse = "column-reverse"
    }

    const modalStyle = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0,0.6)",
        },

        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: '50%',
            transform: "translate(-50%, -50%)",
            backgroundColor: "black",
            width: "auto",
            height: "45vh",
            display: "flex",
            flexDirection: FlexDirection.Column, // Workaround for typescript no overloaded error
            gap: "10%",
            borderRadius: "15px",
        }
    }

    return (
        <nav className={className}>
            {buttons.map((button, index) => (
                <button key={index} onClick={() => onNavigate(index)}>
                    {button}
                </button>
            ))}

            <button onClick={() => setModalIsOpen(true)}>
                Contact Me
            </button>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={modalStyle}>
                <h1 className="text-2xl font-bold text-center text-sky-400">Contact Me</h1>
                <div className="w-96">Test</div>
                <button className="p-2 rounded bg-cyan-700 text-white" onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
        </nav>
    );
}
