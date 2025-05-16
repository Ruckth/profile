import Image from "next/image";

interface ProjectCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function ProjectCard({ imageSrc, title, description }: ProjectCardProps) {
  return (
    <div className="flex flex-row items-start bg-white/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/10 hover:border-white/20">
      {/* Image container */}
      <div className="relative w-40 aspect-square shrink-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
}
