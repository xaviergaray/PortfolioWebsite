'use client'
import styles from "./ui/page.module.css";
import React from 'react'
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
import Experience, {Position} from "@/components/experience";


const MediaQuery = dynamic(() => import("react-responsive"), {
    ssr: false
})



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

                    <div className={`${styles.sections} pb-20`}
                         style={{background: "linear-gradient(90deg, #379bc8 20%, #A3E3FF 100%)"}}>
                        <div className={"flex flex-col justify-center items-center"}>
                            <h1 className="mt-10 mb-6">Experience</h1>
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
                        <div className={styles.projectsContent}>
                        </div>
                    </div>

                    <div className={styles.sections}
                         style={{background: "linear-gradient(90deg, #D0D199 20%, #425F40 100%)"}}>
                        <div className={styles.educationAndCertsContent}>
                        </div>
                    </div>

                    <div className={styles.sections}
                         style={{background: "linear-gradient(90deg, #425F40 20%, #000000 100%)"}}>
                        <div className={styles.contactMeContent}>
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
