import React from "react";

type PositionProps = {
    title: string,
    children: React.ReactNode,
    startDate: Date,
    endDate?: Date,
}

export function Position({ title, children, startDate, endDate }: Readonly<PositionProps>) {
    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return (
        <div className={"flex flex-col justify-center align-middle text-gray-200"}>
            <div className="flex flex-row w-11/12 justify-between ml-3">
                <h3 className="mb-3">{title}</h3>
                {endDate ?
                    <p>{months[startDate.getMonth()]} {startDate.getFullYear()} - {months[endDate.getMonth()]} {endDate.getFullYear()}</p>
                    :
                    <p>{months[startDate.getMonth()]} {startDate.getFullYear()} - Present</p>
                }

            </div>

            <ul className={"list-disc list-inside pl-5 w-11/12 mb-5 ml-3"}>
                {React.Children.map(children, (child,) => (
                    <li className={"mb-1.5"}>{child}</li>
                ))}
            </ul>
        </div>
    )
}


type ExperienceProps = {
    children: React.ReactElement<PositionProps> | React.ReactElement<PositionProps>[],
    company: string,
    link: string,
}

export default function Experience({  children, company, link }: Readonly<ExperienceProps>) {
    return (
        <div className="flex-none w-11/12 bg-emerald-600 border-2 rounded-3xl mb-5">
            <h2 className="text-2xl font-bold mb-0 ml-4 mt-4">
                <a href={link} target="_blank" rel="noopener noreferrer" className={"hover:text-blue-300"}>{company}</a>
            </h2>
            {children}
        </div>
    )
}
