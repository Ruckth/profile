
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

interface ExternalLinkProps {
    text: string;
    href: string;
}

export function Github({ text, href }: ExternalLinkProps) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group py-2 px-4 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
            {/* Show on hover */}
            <FiExternalLink className="text-xl hidden group-hover:block" />
            {/* Show when not hovered */}
            <FaGithub className="text-xl block group-hover:hidden" />
            {text}
        </Link>
    )
}

export function Linkedin({ text, href }: ExternalLinkProps) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group py-2 px-4 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
            {/* Show on hover */}
            <FiExternalLink className="text-xl hidden group-hover:block" />
            {/* Show when not hovered */}
            <FaLinkedin className="text-xl block group-hover:hidden" />
            {text}
        </Link>
    )
}

export function Email({ text, href }: ExternalLinkProps) {
    return (
        <Link
            href={`mailto:rugbykritsakorn@gmail.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="group py-2 px-4 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
            {/* Show on hover */}
            <FiExternalLink className="text-xl hidden group-hover:block" />
            {/* Show when not hovered */}
            <MdEmail className="text-xl block group-hover:hidden" />
            {text}
        </Link>
    )
}