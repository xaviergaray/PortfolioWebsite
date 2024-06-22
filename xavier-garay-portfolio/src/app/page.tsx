'use client'
import styles from "./ui/page.module.css";
import React, { useState } from 'react'
import EmblaCarousel from '@/components/carousel'
import Modal from 'react-modal'
import dynamic from "next/dynamic"
import { FaPython, FaJava, FaAws, FaGitSquare, FaDocker, FaLinux, FaBug, FaCloud, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { DiDotnet } from 'react-icons/di';
import { PiFileCpp } from "react-icons/pi";
import { RiNextjsLine, RiDeviceRecoverLine } from "react-icons/ri";
import { FiDatabase } from "react-icons/fi";
import { VscTerminalPowershell } from "react-icons/vsc";
import { MdOutlineSecurity } from "react-icons/md";
import { SiUnrealengine } from "react-icons/si";


const MediaQuery = dynamic(() => import("react-responsive"), {
    ssr: false
})

const Skill: React.FC<Readonly<{icon?: React.ReactNode; title?: string; rating?: number; children?: React.ReactNode}>> = ({ icon, title, rating = 0 , children}) => {
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
};


export default function Home() {
    const navbarButtons = ["About Me", "Skills", "Experience", "Projects", "Education and Certifications", "Contact Me"];

    return (
        <main className={styles.main}>
            <MediaQuery minWidth={1120}>
                <EmblaCarousel navbarButtons={navbarButtons}>
                    <div className={styles.sections} style={{
                        backgroundImage: "url('/homeBackground.webp')",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}>
                        <div className={styles.homeContent} style={{margin: "5% 0 0 5%"}}>
                            <h1 style={{fontWeight: "normal"}}>Hi, my name is Xavier.</h1>
                            <br/>
                            <p>I&apos;m a full-stack software engineer and Cyber Warfare Officer from Raritan, New
                                Jersey.</p>
                        </div>
                    </div>

                    <div className={styles.sections}
                         style={{background: "linear-gradient(90deg, #010101 20%, #379bc8 100%)"}}>
                        <div className={styles.skillsContent}>
                            <h1>Skills</h1>
                            <div className={styles.skillsTable}>
                                <div className={styles.skillsRow}>
                                    <Skill icon={<PiFileCpp/>} title="C/C++" rating={4}>
                                        <h1 className="text-2xl font-bold text-gray-200">4 years of experience</h1>
                                        <ul className={"list-disc list-inside"}>
                                            <li>Graphical User Interfaces (GUI)</li>
                                            <li>Database management systems</li>
                                            <li>Networking systems</li>
                                            <li>Unreal Engine indie game developer</li>
                                        </ul>
                                    </Skill>
                                    <Skill icon={<DiDotnet/>} title="C#/.NET" rating={4}>
                                        <h1 className="text-2xl font-bold text-gray-200">2 years of experience</h1>
                                        <ul className={"list-disc list-inside"}>
                                            <li>Graphical User Interfaces (GUI)</li>
                                            <li>Database management systems</li>
                                            <li>.NET Scripting for Windows System Administration</li>
                                        </ul>
                                    </Skill>
                                    <Skill icon={<FaPython/>} title="Python" rating={3.5}>
                                        <h1 className="text-2xl font-bold text-gray-200">3 years of experience</h1>
                                        <ul className={"list-disc list-inside"}>
                                            <li>Data mining</li>
                                            <li>Graphical User Interfaces (GUI)</li>
                                            <li>Database management systems</li>
                                            <li>Web Services</li>
                                            <li>Networking systems</li>
                                            <li>Pandas, Matplotlib, NumPy, Django, Flask, OpenCV, sqlite3</li>
                                        </ul>
                                    </Skill>
                                    <Skill icon={<FaJava/>} title="Java" rating={3.5}>
                                        <h1 className="text-2xl font-bold text-gray-200">2 years of experience</h1>
                                        <ul className={"list-disc list-inside"}>
                                            <li>Web Services</li>
                                            <li>Graphical User Interfaces (GUI)</li>
                                            <li>Database management systems</li>
                                            <li>Networking systems</li>
                                        </ul>
                                    </Skill>
                                </div>

                                <div className={styles.skillsRow}>
                                    <Skill icon={<RiNextjsLine/>} title="NextJS" rating={3}>
                                        <h1 className="text-2xl font-bold text-gray-200">2 years of experience</h1>
                                        <ul className={"list-disc list-inside"}>
                                            <li>Full stack development in conjunction with Python libraries and
                                                SQL/NoSQL Servers
                                            </li>
                                        </ul>
                                    </Skill>
                                    <Skill icon={<FiDatabase/>} title="SQL/NoSQL" rating={4}>
                                        <h1 className="text-2xl font-bold text-gray-200">4 years of experience</h1>
                                        <ul className={"list-disc list-inside"}>
                                            <li>Managed production, development, and distribution of databases in
                                                classified environments
                                            </li>
                                        </ul>
                                    </Skill>
                                    <Skill icon={<FaGitSquare/>} title="Git" rating={3.5}>
                                        <h1 className="text-2xl font-bold text-gray-200">4 years of experience</h1>
                                    </Skill>
                                    <Skill icon={<FaAws/>} title="AWS" rating={2.5}>
                                        <h1 className="text-2xl font-bold text-gray-200">1 year of experience</h1>
                                    </Skill>
                                </div>

                                <div className={styles.skillsRow}>
                                    <Skill icon={<FaDocker/>} title="Docker" rating={3.5}>
                                        <h1 className="text-2xl font-bold text-gray-200">1.5 years of experience</h1>
                                    </Skill>
                                    <Skill icon={<VscTerminalPowershell/>} title="Windows PowerShell" rating={4}>
                                        <h1 className="text-2xl font-bold text-gray-200">3 years of experience</h1>
                                        <ul className={"list-disc list-inside"}>
                                            <li>GIAC Certified Windows System Administrator</li>
                                            <li>DevOps</li>
                                            <li>PKI</li>
                                            <li>Bitlocker</li>
                                            <li>Group Policy Management</li>
                                        </ul>
                                    </Skill>
                                    <Skill icon={<FaLinux/>} title="Linux" rating={3.5}>
                                        <h1 className="text-2xl font-bold text-gray-200">5.5 years of experience</h1>
                                        <ul className={"list-disc list-inside"}>
                                            <li>DevOps</li>
                                            <li>PKI</li>
                                            <li>Bash Scripting</li>
                                        </ul>
                                    </Skill>
                                    <Skill icon={<MdOutlineSecurity/>} title="Network Security" rating={4}>
                                        <h1 className="text-2xl font-bold text-gray-200">4 years of experience</h1>
                                        <ul className={"list-disc list-inside"}>
                                            <li>GIAC Certified Windows System Administrator</li>
                                            <li>GIAC Reverse Engineering Malware</li>
                                            <li>CompTIA Network+</li>
                                            <li>CompTIA Security+</li>
                                        </ul>
                                    </Skill>
                                </div>

                                <div className={styles.skillsRow}>
                                    <Skill icon={<SiUnrealengine/>} title="Unreal Engine" rating={4}>
                                        <h1 className="text-2xl font-bold text-gray-200">3.5 years of experience</h1>
                                        <ul className={"list-disc list-inside"}>
                                            <li>Indie multiplayer game development</li>
                                            <li>Graphical User Interfaces (GUI)</li>
                                        </ul>
                                    </Skill>
                                    <Skill icon={<FaBug/>} title="Malware Analysis" rating={4}>
                                        <h1 className="text-2xl font-bold text-gray-200">2 years of experience</h1>
                                        <ul className={"list-disc list-inside"}>
                                            <li>GIAC Certified Windows System Administrator</li>
                                            <li>GIAC Reverse Engineering Malware</li>
                                        </ul>
                                    </Skill>
                                    <Skill icon={<RiDeviceRecoverLine/>} title="Incident Response" rating={4}>
                                        <h1 className="text-2xl font-bold text-gray-200">4 years of experience</h1>
                                        <ul className={"list-disc list-inside"}>
                                            <li>GIAC Certified Windows System Administrator</li>
                                            <li>CompTIA Network+</li>
                                            <li>CompTIA Security+</li>
                                        </ul>
                                    </Skill>
                                    <Skill icon={<FaCloud/>} title="Cloud Integration" rating={3}>
                                        <h1 className="text-2xl font-bold text-gray-200">1 years of experience</h1>
                                        <ul className={"list-disc list-inside"}>
                                            <li>AWS</li>
                                            <li>Azure</li>
                                        </ul>
                                    </Skill>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className={styles.sections}
                         style={{background: "linear-gradient(90deg, #379bc8 20%, #A3E3FF 100%)"}}>
                        <div className={styles.skillsContent}>
                        </div>
                    </div>

                    <div className={styles.sections}
                         style={{background: "linear-gradient(90deg, #A3E3FF 20%, #D0D199 100%)"}}>
                        <div className={styles.skillsContent}>
                        </div>
                    </div>

                    <div className={styles.sections}
                         style={{background: "linear-gradient(90deg, #D0D199 20%, #425F40 100%)"}}>
                        <div className={styles.skillsContent}>
                        </div>
                    </div>

                    <div className={styles.sections}
                         style={{background: "linear-gradient(90deg, #425F40 20%, #000000 100%)"}}>
                        <div className={styles.skillsContent}>
                        </div>
                    </div>
                </EmblaCarousel>
            </MediaQuery>

            <MediaQuery maxWidth={1119} minWidth={1}>
                <div className={styles.sections} style={{
                    backgroundImage: "url('/homeBackground.webp')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}>
                    <div className={styles.homeContent} style={{margin: "5% 0 0 5%"}}>
                        <h1 style={{fontWeight: "normal"}}>Hi, my name is Xavier.</h1>
                        <br/>
                        <p>I&apos;m a full-stack software engineer and Cyber Warfare Officer from Raritan, New
                            Jersey.</p>
                    </div>
                </div>

                <div className={styles.sections}
                     style={{background: "linear-gradient(180deg, #010101 20%, #A3E3FF 100%)"}}>
                    <div className={styles.skillsContent}>
                        <h1>Skills</h1>
                        <div className={styles.skillsTable}>
                            <div className={styles.skillsRow}>
                                <div className={styles.skill}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.sections}
                     style={{background: "linear-gradient(180deg, #A3E3FF 20%, #FFFFFF 100%)"}}>
                    <div className={styles.skillsContent}>
                    </div>
                </div>

                <div className={styles.sections}
                     style={{background: "linear-gradient(180deg, #FFFFFF 20%, #D0D199 100%)"}}>
                    <div className={styles.skillsContent}>
                    </div>
                </div>

                <div className={styles.sections}
                     style={{background: "linear-gradient(180deg, #D0D199 20%, #425F40 100%)"}}>
                    <div className={styles.skillsContent}>
                    </div>
                </div>

                <div className={styles.sections}
                     style={{background: "linear-gradient(180deg, #425F40 20%, #000000 100%)"}}>
                    <div className={styles.skillsContent}>
                    </div>
                </div>
            </MediaQuery>
        </main>
    );
}
