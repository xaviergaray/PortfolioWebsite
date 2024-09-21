import React from "react";

type SchoolProps = {
    children?: React.ReactNode,
    issuingOrganization: string,
    organizationLink: string,
    title: string,
    startDate: Date,
    graduationDate: Date,
    mobile?: boolean,
}

const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function School({ children, issuingOrganization, organizationLink, title, startDate, graduationDate, mobile=false }: Readonly<SchoolProps>) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-0 mt-4">
                {title}
            </h2>
            <div className={"flex flex-row justify-between"}>
                <h3>
                    <a href={organizationLink} target="_blank" rel="noopener noreferrer"
                       className={"hover:text-blue-300"}>{issuingOrganization}</a>
                </h3>
                <hr style={{border: 'none', borderBottom: '1px dotted', flexGrow: 1, height: '1.1rem', marginLeft: '10px', marginRight: '10px'}}/>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {mobile ?
                        <h3>{startDate.getMonth() + 1}/{startDate.getFullYear()} - {graduationDate.getMonth() + 1}/{graduationDate.getFullYear()}</h3>
                        :
                        <h3>{months[startDate.getMonth()]} {startDate.getFullYear()} - {months[graduationDate.getMonth()]} {graduationDate.getFullYear()}</h3>
                    }

                </div>
            </div>
            <ul className={"list-disc list-inside pl-5 mb-5 ml-3"}>
                {React.Children.map(children, (child,) => (
                    <li className={"mb-1.5"}>{child}</li>
                ))}
            </ul>
        </div>
    )
}


type CertProps = {
    children?: React.ReactNode,
    issuingOrganization: string,
    organizationLink: string,
    certLink: string,
    title: string,
    mobile?: boolean,
}

export function Certification({ title, children, certLink, issuingOrganization, organizationLink, mobile=false }: Readonly<CertProps>) {
    return (
        <div>
            {mobile ?
                <>
                    <h2 className="text-lg font-bold mb-0 mt-4">
                        <a href={certLink} target="_blank" rel="noopener noreferrer"
                           className={"hover:text-blue-300"}>{title}</a>
                    </h2>
                    <div className={"flex flex-row justify-between"}>
                        <h3>
                            <a href={organizationLink} target="_blank" rel="noopener noreferrer"
                               className={"hover:text-blue-300"}>{issuingOrganization}</a>
                        </h3>
                    </div>
                    <ul className={"list-disc list-inside pl-5 mb-5 ml-3"}>
                        {React.Children.map(children, (child,) => (
                            <li className={"mb-1.5"}>{child}</li>
                        ))}
                    </ul>
                </>
                :
                <>
                    <h2 className="text-xl font-bold mb-0 mt-4">
                        <a href={certLink} target="_blank" rel="noopener noreferrer"
                           className={"hover:text-blue-300"}>{title}</a>
                    </h2>
                    <div className={"flex flex-row justify-between"}>
                        <h3>
                            <a href={organizationLink} target="_blank" rel="noopener noreferrer"
                               className={"hover:text-blue-300"}>{issuingOrganization}</a>
                        </h3>
                    </div>
                    <ul className={"list-disc list-inside pl-5 mb-5 ml-3"}>
                    {React.Children.map(children, (child,) => (
                            <li className={"mb-1.5"}>{child}</li>
                        ))}
                    </ul>
                </>
            }

        </div>
    )
}

export default function Education({children, mobile = false}: { children: React.ReactNode, mobile?: boolean }) {
    const childArray = React.Children.toArray(children) as React.ReactElement[];
    const education = childArray.filter(child => child.type === School);
    const certification = childArray.filter(child => child.type === Certification);

    return (
        <div className="flex flex-col w-full items-center gap-6">
            {mobile ?
                <>
                    <div className={"rounded-xl w-full border-indigo-700 border-2"}
                         style={{background: "linear-gradient(to bottom right, #707FB1 0%, #404081 100%)"}}>
                    <div className={"m-4"}>
                            <h2 className={"text-2xl text-center font-bold italic"}>Education</h2>
                            {education}
                        </div>
                    </div>


                    <div className={"rounded-xl w-full border-indigo-700 border-2"}
                         style={{background: "linear-gradient(to bottom right, #707FB1 0%, #404081 100%)"}}>
                        <div className={"m-4"}>
                            <h2 className={"text-2xl text-center font-bold italic"}>Certifications</h2>
                            {certification}
                        </div>
                    </div>
                </>
                :
                <>
                    <div className={"rounded-xl w-11/12 border-indigo-700 border-2"}
                         style={{background: "linear-gradient(to bottom right, #707FB1 0%, #404081 100%)"}}>
                        <div className={"m-4"}>
                            <h2 className={"text-5xl"}>Education</h2>
                            {education}
                        </div>
                    </div>


                    <div className={"rounded-xl w-11/12 border-indigo-700 border-2"}
                         style={{background: "linear-gradient(to bottom right, #707FB1 0%, #404081 100%)"}}>
                        <div className={"m-4"}>
                            <h2 className={"text-5xl"}>Certifications</h2>
                            {certification}
                        </div>
                    </div>
                </>}

        </div>
    )
}

