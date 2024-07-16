'use client'
import styles from "./ui/page.module.css";
import React, { FormEvent, useState } from 'react'
import EmblaCarousel from '@/components/carousel'
import dynamic from "next/dynamic"
import { FaPython, FaJava, FaAws, FaGitSquare, FaDocker, FaLinux, FaBug, FaCloud } from 'react-icons/fa';
import { DiDotnet } from 'react-icons/di';
import { PiFileCpp } from "react-icons/pi";
import { RiNextjsLine, RiDeviceRecoverLine } from "react-icons/ri";
import { FiDatabase } from "react-icons/fi";
import { VscTerminalPowershell } from "react-icons/vsc";
import { MdOutlineSecurity } from "react-icons/md";
import { SiUnrealengine } from "react-icons/si";
import Skill from "@/components/skill";
import Experience, { Position } from "@/components/experience";
import Education, { School, Certification } from "@/components/education";
import Projects, { Project } from "@/components/project";
import Modal from "react-modal";
import ReactMarkdown from 'react-markdown';
import PlantUML from 'react-plantuml';
import { push } from '@socialgouv/matomo-next';


const MediaQuery = dynamic(() => import("react-responsive"), {
    ssr: false
})

export default function Home() {
    if (typeof window !== 'undefined') {
        push(['trackEvent', 'home', 'page load']);
    }

    const navbarButtons = ["About Me", "Skills", "Experience", "Projects", "Education and Certifications"];

    const apiEndpoints = ["framework", "cpp"]
    const apiEndpointDisplayName = ["Framework", "C++"]
    const apiEndpointExample = ["Inventory Management System.", "How do I create a class?"]
    const apiModels = ["gpt-3.5-turbo-0125", "RAG-mistral"]
    const apiModelsDisplayName = ["OpenAI GPT 3.5", "Local Ollama Mistral"]

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('blank_user');
    const [response, setResponse] = useState('');
    const [uml, setUml] = useState('');
    const [endpoint, setEndpoint] = useState(0);
    const [model, setModel] = useState(0);

    const handleClickAPIEndpoint = () => {
        setEndpoint((endpoint + 1) % apiEndpoints.length);
    }

    const handleClickAPIModel = () => {
        setModel((model + 1) % apiModels.length);
    }

    const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setUml('')
        setResponse('Retrieving API Response...')

        if (typeof window !== 'undefined') {
            push(['trackEvent', 'api call', apiEndpointDisplayName[endpoint]]);
        }

        const res = await fetch('http://localhost/api', {
            method: 'POST',
            body: JSON.stringify({
                user: user,
                message: message,
                apiEndpoint: apiEndpoints[endpoint],
                apiModel: apiModels[model],
            })
        });

        const data = await res.json();

        console.log(data);

        setResponse(data.textualResponse);
        setUml(data.umlResponse);
    };

    enum FlexDirection {
        Column = "column",
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
            width: "50vw",
            height: "60vh",
            display: "flex",
            flexDirection: FlexDirection.Column, // Workaround for typescript no overloaded error
            gap: "10%",
            borderRadius: "15px",
        }
    }

    return (
        <main className={styles.main}>
            <MediaQuery minWidth={1120}>
                <EmblaCarousel navbarButtons={navbarButtons}>
                    <div className={styles.sections} style={{
                        backgroundImage: "url('/homeBackground.webp')",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}>
                        <div style={{margin: "5% 0 0 5%"}}>
                            <h1 style={{fontWeight: "normal"}}>Hi, my name is Xavier.</h1>
                            <br/>
                            <p>I&apos;m a full-stack software engineer and Cyber Warfare Officer from Raritan, New
                                Jersey.</p>
                        </div>
                    </div>

                    <div className={styles.sections}
                         style={{background: "linear-gradient(90deg, #010101 20%, #379bc8 100%)", height: "100%"}}>
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
                                            <li>Pandas, Matplotlib, NumPy, Django, Flask, OpenCV, sqlite3, and more!</li>
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

                    <div className={`${styles.sections} pb-20`}
                         style={{background: "linear-gradient(90deg, #379bc8 20%, #A3E3FF 100%)"}}>
                        <div className={"flex flex-col justify-center items-center"}>
                            <h1 className={"mt-10 mb-6"}>Experience</h1>
                            <Experience company="L3Harris" link="https://www.l3harris.com">
                                <Position title="Software Engineer, Space and Airborne Systems"
                                          startDate={new Date("2023-06-01")}>
                                    <>Oversaw and implemented bug fixes and new features for diagnostic tools analyzing
                                        messages within electronic warfare systems of F/A-18 series fighter jets
                                    </>
                                    <>Spearheaded and managed a project from its initial conceptualization, through the
                                        various stages of development, and finally to its successful release and
                                        delivery to the customer
                                    </>
                                    <>Managed the project’s database and implemented new features</>
                                </Position>
                            </Experience>

                            <Experience company="New Jersey Army National Guard"
                                        link="https://nationalguard.com/new-jersey">
                                <Position title="Cyber Warfare Officer, 17A" startDate={new Date("2023-05-15")}>
                                    <>Directed cybersecurity operations in alignment with a structured strategy to
                                        target adversary activities and capabilities
                                    </>
                                    <>Hardened servers and networks coincident with penetration testing</>
                                </Position>
                                <Position title="Chemical Specialist, 74D" startDate={new Date("2019-04-08")}
                                          endDate={new Date("2023-05-14")}>
                                    <>Engaged in rigorous training sessions and practical exercises to learn and master
                                        safety procedures and
                                        decontamination methods
                                    </>
                                    <>Participated in team-based tasks and projects, which provided the opportunity to
                                        lead diverse teams
                                    </>
                                </Position>
                            </Experience>

                            <Experience company="MIT Lincoln Laboratory" link="https://www.ll.mit.edu">
                                <Position title="Mechanical Engineering Intern" startDate={new Date("2022-07-15")}
                                          endDate={new Date("2022-08-15")}>
                                    <>Tested material properties of silica waveguides as part of the structural and
                                        thermal fluids group
                                    </>
                                    <>Developed various software solutions to streamline data analysis processes and
                                        solve simulation problems
                                    </>
                                </Position>
                            </Experience>
                        </div>
                    </div>

                    <div className={styles.sections}
                         style={{background: "linear-gradient(90deg, #A3E3FF 20%, #D0D199 100%)"}}>
                        <div>
                            <Projects>
                                <Project
                                    title="AI Development Engineer Navigator"
                                    photo="/projectsAIPhoto.webp"
                                    alt="Photo of Artificial Intelligence brain."
                                >
                                    <div className={"flex flex-col items-center gap-8"}>
                                        <div>
                                            <p>Programmed an AI chatbot API to serve as a consultant for any engineer
                                                designing
                                                a
                                                system.</p>
                                            <p>AIDEN is designed to help engineers stay ahead of the curve by providing
                                                recommendations for how the system should be structured, allowing the
                                                engineer
                                                to perform targeted research instead of shooting in the dark</p>
                                        </div>
                                        <button onClick={() => setModalIsOpen(true)}
                                                className={"bg-cyan-900 w-2/5 rounded-2xl hover:bg-cyan-950"}>Try it now!*
                                        </button>
                                        <p className={"w-11/12 text-center text-xs italic"}>*This version of AIDEN uses
                                            OpenAI ChatGPT 3.5 or models run on a local machine and should NOT be considered reliable. Contact me to apply this
                                            to your project with updated OpenAI GPT or local models.</p>
                                    </div>
                                    <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                                           style={modalStyle}>
                                        <h1 className="text-2xl font-bold text-center text-sky-400">AIDEN</h1>
                                        <form onSubmit={sendMessage} className={"flex flex-col gap-10"}>
                                            <div className={"flex flex-col items-center"}>
                                                <p>Click the buttons below to change desired service and querying
                                                    model!</p>
                                                <div className={"flex flex-row w-3/4 justify-around"}>
                                                    <button type="button" onClick={handleClickAPIEndpoint}
                                                            className={"w-1/4 p-2 rounded bg-cyan-700 text-white"}>{apiEndpointDisplayName[endpoint]}</button>
                                                    <button type="button" onClick={handleClickAPIModel}
                                                            className={"w-1/4 p-2 rounded bg-cyan-700 text-white"}>{apiModelsDisplayName[model]}</button>
                                                </div>
                                            </div>
                                            <div className={"w-full bg-amber-50 h-0.5"}></div>
                                            <p>Hello! My name is AIDEN. As a systems and software consultant, my task is
                                                to recommend a technology stack to satisfy your requirements. What would
                                                you like to build?</p>
                                            <p>You can say things like <q>{apiEndpointExample[endpoint]}</q> If you are
                                                unhappy with the response, try asking again!</p>
                                            <div className={"w-full bg-amber-50 h-0.5"}></div>
                                            <div className={"flex flex-row gap-4"}>
                                                <p className={"w-1/6"}>Input:</p>
                                                <input
                                                    className={"w-3/6 bg-gray-900 border-2 rounded-xl p-2"}
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                />
                                                <button className={"w-1/6 p-2 rounded bg-cyan-700 text-white"}
                                                        type="submit">Send Message
                                                </button>
                                            </div>

                                            {response &&
                                                <div className={"flex flex-row gap-4"}>
                                                    <p className={"w-1/6"}>Response:</p>
                                                    <div className={"w-5/6 bg-gray-900 border-2 rounded-xl p-2"}>
                                                        <ReactMarkdown>{response}</ReactMarkdown></div>
                                                </div>
                                            }

                                            {uml &&
                                                <div className={"flex flex-row gap-4"}>
                                                    <p className={"w-1/6"}>UML Diagram:</p>
                                                    <div className="w-5/6"><PlantUML src={uml}
                                                                                     alt="UML of suggested framework"/>
                                                    </div>
                                                </div>
                                            }

                                        </form>
                                        <button className="p-2 rounded bg-cyan-700 text-white"
                                                onClick={() => setModalIsOpen(false)}>Close
                                        </button>
                                    </Modal>
                                </Project>

                                <Project
                                    title="Home Lab"
                                    photo="/projectsLabPhoto.webp"
                                    alt="Photo of conceptual network."
                                >
                                    <p>Leveraging the power of Raspberry Pis in conjunction with managed switches and
                                        routers, I’ve transformed my home into a tech-savvy hub. This includes the
                                        implementation of a local DNS server, a Network Attached Storage (NAS) system,
                                        and the deployment of private web applications for my family’s use.</p>
                                    <p>To ensure secure and convenient access, all these features are equipped with
                                        remote connectivity via SSH and run smoothly with PowerShell scripting.</p>
                                </Project>

                                <Project
                                    title="Multiplayer RPG Survival Indie Game"
                                    photo="/projectsGamePhoto.webp"
                                    alt="Photo of calm river through the woods."
                                >
                                    <p>Currently developing a multiplayer RPG/survival game using Unreal Engine.</p>
                                    <p>The game will include several systems present in most, modern RPG games including
                                        inventory, crafting, skills, and various quest lines that affect the
                                        player&apos;s world</p>
                                </Project>

                                <Project
                                    title="Autonomous Water Collection Drone"
                                    photo="/projectsDronePhoto.webp"
                                    alt="Photo of drone flying above beach"
                                >
                                    <p>Senior project for my Mechanical Engineering undergraduate degree. I was
                                        responsible for part of the software responsible for the autonomous takeoff and
                                        landing at a specified ground station.</p>
                                    <p>The project ended up winning the Best Mechanical Engineering Project award at
                                        Rutgers University that year (2023).</p>
                                </Project>
                            </Projects>
                        </div>
                    </div>

                    <div className={styles.sections}
                         style={{background: "linear-gradient(90deg, #D0D199 20%, #425F40 100%)"}}>
                        <div className={"flex justify-center align-middle m-10 mb-20"}>
                            <Education>
                                <School
                                    issuingOrganization="New Jersey Institute of Technology"
                                    organizationLink="https://www.njit.edu"
                                    title="M.S. Computer Science"
                                    startDate={new Date("2023-09-13")}
                                    graduationDate={new Date("2024-12-28")}>
                                </School>

                                <School
                                    issuingOrganization="Rutgers University- New Brunswick"
                                    organizationLink="https://www.rutgers.edu"
                                    title="B.S. Mechanical Engineering"
                                    startDate={new Date("2020-01-21")}
                                    graduationDate={new Date("2023-05-15")}>
                                    <>Summa Cum Laude</>
                                    <>Awarded Best Mechanical Engineering Project</>
                                </School>

                                <Certification
                                    issuingOrganization={"Global Information Assurance Certification (GIAC)"}
                                    organizationLink={"https://www.giac.org"}
                                    title={"GIAC Certified Windows Security Administrator (GCWN)"}
                                    certLink={"https://www.giac.org/certifications/certified-windows-security-administrator-gcwn/"}>
                                    <>Developed advanced skills in securing Microsoft Windows environments through
                                        strategic PKI management, Group Policy, and PowerShell security
                                    </>
                                </Certification>

                                <Certification
                                    issuingOrganization={"Global Information Assurance Certification (GIAC)"}
                                    organizationLink={"https://www.giac.org"}
                                    title={"GIAC Reverse Engineering Malware (GREM)"}
                                    certLink={"https://www.giac.org/certifications/reverse-engineering-malware-grem/"}>
                                    <>Expertise in malware analysis and reverse engineering to safeguard IT
                                        infrastructure against sophisticated cyber threats
                                    </>
                                </Certification>

                                <Certification
                                    issuingOrganization={"CompTIA"}
                                    organizationLink={"https://www.comptia.org"}
                                    title={"CompTIA Security+"}
                                    certLink={"https://www.comptia.org/certifications/security"}>
                                    <>Skilled in assessing and fortifying enterprise security postures, and adept at
                                        managing hybrid environments including cloud, mobile, and IoT
                                    </>
                                </Certification>

                                <Certification
                                    issuingOrganization={"CompTIA"}
                                    organizationLink={"https://www.comptia.org"}
                                    title={"CompTIA Network+"}
                                    certLink={"https://www.comptia.org/certifications/network"}>
                                    <>Adept at deploying, managing, and troubleshooting networks across various
                                        platforms, ensuring robust
                                        connectivity and cybersecurity
                                    </>
                                </Certification>
                            </Education>
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
                    <div style={{margin: "5% 0 0 5%"}}>
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
