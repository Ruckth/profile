import Link from "next/link";
import { HiExternalLink } from "react-icons/hi";
import { LiaFigma } from "react-icons/lia";

interface ExperienceCardProps {
    jobTitle: string;
    company: string;
    companyLink?: string; // Optional link to the company website or inf
    jobDescription: string;
    jobPeriod: string;
    skill?: string[];
}

export function SkillChip({ text }: { text: string }) {
    return (
        <span className="text-sm py-2 px-4 text-white rounded-3xl bg-emerald-900 transition-colors flex items-center gap-2">
            {text}
        </span>
    )
}

export default function ExperienceCard({ jobTitle, jobDescription, jobPeriod, company, companyLink, skill }: ExperienceCardProps) {
    return (
        <div className="flex flex-col px-4 py-4">
            <div className="flex justify-between">
                <span className="text-l font-bold">
                    {jobTitle}<br />
                    <Link
                        href={companyLink || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                    >
                        <span>
                            {company}
                        </span>
                        <HiExternalLink className="text-lg group-hover:scale-110 transition-transform" />
                    </Link>
                </span>
                <span className="text-gray-400">
                    {jobPeriod}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <p>{jobDescription}</p>
            </div>
            {/* Add skill chips */}
            {skill && skill.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {skill.map((skillText, index) => (
                        <SkillChip key={index} text={skillText} />
                    ))}
                </div>
            )}
        </div>
    )
}

export function UXUIFreelance() {
    return (
        <div className="flex flex-col px-4 py-4">
            <div className="flex justify-between">
                {/* header */}
                <span className="text-l font-bold">
                    UX/UI designer<br />
                    Freelance
                </span>
                {/* Job period */}
                <span className="text-gray-400">
                    June 2022 - March 2024
                </span>
            </div>
            {/* Job description */}
            <div className="flex flex-col gap-2">
                <p>UX/UI design for web-application, mobile application for</p>
                <ul className="list-none space-y-2">
                    <li>
                        <Link
                            href="https://www.figma.com/design/hH1FOyOzVlPtDBRRNUHnH1/bcnc-medical-platform.?node-id=0-1&p=f&t=9amrGE2cDanvRZ58-0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 text-gray-400 hover:text-white transition-colors font-bold"
                        >
                            <LiaFigma className="text-lg group-hover:scale-110 transition-transform" />
                            BCNC University Medical platform
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://www.figma.com/design/FzbBj77YorUpXq0LBAt9uF/HLLC2023?node-id=536-2353&p=f&t=8xhLhOb2MjYgMf6Q-0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 text-gray-400 hover:text-white transition-colors font-bold"
                        >
                            <LiaFigma className="text-lg group-hover:scale-110 transition-transform" />
                            MFU University (MFU fresher system)
                        </Link>
                    </li>
                    <p>and etc.</p>
                </ul>
            </div>
            {/* Skill chip */}
            <div className="flex flex-wrap gap-2 mt-2">
                <SkillChip text="Figma" />
                <SkillChip text="UX/UI" />
                <SkillChip text="Test case" />
            </div>
        </div>
    )
}