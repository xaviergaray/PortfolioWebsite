import styles from "@/app/ui/page.module.css";
import React, { useState } from 'react'
import Modal from 'react-modal'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

type Props = {
    icon: React.ReactNode,
    title: string,
    rating: number,
    children: React.ReactNode,
}

export default function Skill({ icon, title, rating = 0, children, }: Readonly<Props>) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [
        ...Array(fullStars).fill(<FaStar key="full" />),
        ...Array(halfStar).fill(<FaStarHalfAlt key="half" />),
        ...Array(emptyStars).fill(<FaRegStar key="empty" />)
    ];

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
        <>
            <div className={styles.skill} onClick={() => setModalIsOpen(true)}>
                <div style={{fontSize: '2.5rem'}}>{icon}</div>
                <p style={{textAlign: 'center', fontSize: '1rem'}}>{title}</p>
                <div style={{display: 'flex', justifyContent: 'center', fontSize: '0.8rem'}}>{stars}</div>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={modalStyle}>
                <h1 className="text-2xl font-bold text-center text-sky-400">{title}</h1>
                <div className="w-96">{children}</div>
                <button className="p-2 rounded bg-cyan-700 text-white" onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
        </>
    );
}