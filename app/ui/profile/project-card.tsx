import Image from "next/image";
import { Github, Figma, Web } from "./external-chip";

interface ProjectCardProps {
  imageSrc: string;
  title: string;
  description: string;
  gitHubhref?: string;
  figmaHref?: string;
  websiteHref?: string;
}

export default function ProjectCard({ imageSrc, title, description, gitHubhref, figmaHref, websiteHref}: ProjectCardProps) {
  return (
    <div className="flex flex-row items-center rounded-lg overflow-hidden shadow-lg hover:bg-gray-900">
      {/* Image container */}
      <div className="ml-1 relative w-40 aspect-square shrink-0 flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
          <div className="flex gap-2 mt-2">
            {gitHubhref && (
              <Github
                text=""
                href={gitHubhref}
              />
            )}
            {figmaHref && (
              <Figma
                text="figma"
                href={figmaHref}
              />
            )}
            {websiteHref && (
              <Web
                text="website"
                href={websiteHref}
              />
            )}
          </div>
      </div>
    </div>
  );
}
