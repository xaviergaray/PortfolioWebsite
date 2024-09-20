import React from "react";
import Image from 'next/image';

type ProjectProps = {
    title: string,
    children: React.ReactNode,
    link?: string,
    isReversed?: boolean,
    photo?: string,
    alt?: string,
}
export function Project({title, photo, alt, children, link, isReversed}: Readonly<ProjectProps>) {
    return (
        <div className={`w-11/12 flex ${isReversed ? 'flex-row-reverse' : ''} justify-evenly gap-10`}>

            {photo && alt ?
                <>
                    <div className={"flex items-center"}>
                        <Image
                            src={photo}
                            width={500}
                            height={500}
                            alt={alt}
                            className={"rounded-2xl border-2 border-amber-50"}
                        />
                    </div>
                    <div className={"w-3/5 rounded-2xl bg-indigo-500 border-2 border-indigo-800"}
                         style={{minHeight: "20vh"}}>
                        <h2 className={"text-xl text-center mt-3"}>
                            {link ?
                                <a href={link} target="_blank" rel="noopener noreferrer"
                                   className={"hover:text-blue-300"}>{title}</a>
                                :
                                <>{title}</>
                            }
                        </h2>

                        <div className={"m-5"}>
                            {children}
                        </div>
                    </div>
                </>
                :
                <>
                    <div className={"w-full rounded-2xl bg-indigo-500 border-2 border-indigo-800"}
                         style={{minHeight: "20vh"}}>
                        <h2 className={"text-xl text-center mt-3"}>
                            {link ?
                                <a href={link} target="_blank" rel="noopener noreferrer"
                                   className={"hover:text-blue-300"}>{title}</a>
                                :
                                <>{title}</>
                            }
                        </h2>

                        <div className={"m-5"}>
                            {children}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default function Projects({children}: { children: React.ReactNode }) {
    const childArray = React.Children.toArray(children) as React.ReactElement[];

    return (
        <div className={"flex flex-col items-center mb-20 mt-10"}>
            <h1 className={"mb-10 text-indigo-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"}>Projects</h1>
            <div className={"flex flex-col items-center w-11/12 gap-20"}>
                {childArray.map((child, index) =>
                    React.cloneElement(child, { isReversed: index % 2 !== 0 })
                )}
            </div>
        </div>
    )
}
