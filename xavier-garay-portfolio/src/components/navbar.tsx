import React from 'react';

type NavbarProps = {
    onNavigate: (index: number) => void;
    buttons: string[];
    className?: string;
};

export default function Navbar({ onNavigate, buttons, className }: NavbarProps) {
    return (
        <nav className={className}>
            {buttons.map((button, index) => (
                <button key={index} onClick={() => onNavigate(index)}>
                    {button}
                </button>
            ))}
        </nav>
    );
}
