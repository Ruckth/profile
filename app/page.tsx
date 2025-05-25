import { Github, Linkedin, Email,Resume } from "./ui/profile/external-chip";
import { FadeText, TypingText } from "./ui/fade-text";
import ExperienceCard, { UXUIFreelance } from "./ui/profile/experience-card";
import ProjectCard from "./ui/profile/project-card";

export default async function Home() {
  return (
    <main className="
      px-4 mt-4
      sm:mt-6 sm:px-6 
      md:mt-8 md:px-8 
      lg:mt-24 lg:px-24
      flex flex-col 
      lg:grid lg:grid-cols-2 
      gap-[12px] items-start
      scroll-smooth"
    >
      <div className="flex flex-col overflow-hidden lg:sticky lg:top-24 lg:h-[calc(100vh-12rem)]">
        <h1 className="text-2xl font-bold">
          <FadeText>
            Kritsakorn Rittidetch
          </FadeText>
        </h1>
        <p className="text-lg text-gray-200">
          <TypingText text="UX/UI Designer & Front-end Dev" speed={50} />
        </p>

        {/* Navigation */}
        <nav className="mt-6 hidden lg:block">
          <ul className="space-y-2">
            <li>
              <a href="#experience" className="text-gray-300 hover:text-white transition-colors">
               View Experience
              </a>
            </li>
            <li>
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
               View Projects
              </a>
            </li>
          </ul>
        </nav>


        {/* spacer */}
        <div className="flex-1" />
        <div className="mt-auto flex gap-4">
          <Github text="" href="https://github.com/Ruckth" />
          <Linkedin text="" href="https://www.linkedin.com/in/kritsakorn-rittidetch-40b871201/" />
          <Email text="Mail me" href="mailto:rugbykritsakorn@gmail.com" />
        </div>
      </div>

      {/* Scroll section */}
      <div className="flex flex-col mt-8 lg:mt-0">
        <p>I&apos;m just and software engineering loving to build and solve software problem. Mostly experience in UX/UI design</p>
        <h2 id="experience" className="mt-4 text-2xl font-bold pt-8 scroll-mt-8">Experience</h2>
        <ExperienceCard
          jobTitle="Developer Internship"
          company="Teibto Co., Ltd."
          companyLink="https://teibto.com/"
          jobPeriod="Jane - April 2025"
          jobDescription="Assisted in developing and customizing ERP solutions with a focus on document and PDF formatting using Oracle development tools. Implemented front-end interfaces using JavaScript, HTML, and CSS. Supported debugging, documentation, and user communication to ensure accurate and visually consistent output."
          skill={["Oracle ERP", "Oracle dev tools", "JS.", "HTML&CSS", "Comunication"]}
        />
        <div className="flex-1 border-b-1" />
        <UXUIFreelance />
        <div className="flex-1 border-b-1" />
        <ExperienceCard
          jobTitle="Bar waitress"
          company="Brasserie Phuket"
          companyLink="https://maps.app.goo.gl/K7CJj99siCnXCAmA8"
          jobPeriod="May - July 2021"
          jobDescription="Provided exceptional customer service in a high-paced restaurant environment. Managed orders, resolved customer concerns, and maintained a welcoming atmosphere. Developed strong communication and emotional intelligence through daily interactions with diverse clientele."
          skill={["Emotional intelligence", "Comunication"]}
        />

        <div className="flex mt-2" >
        <Resume text="View my resume" href="https://6ef1uc7a62.ufs.sh/f/YuAp8ZPhEJz264BmcRjvPDd7URpZnEMGKTyfs9NWSYz8teLQ" />
        </div>
      
        <div className="flex flex-col">
          <h2 id="projects" className="mt-4 text-2xl font-bold pt-8 scroll-mt-8">Projects</h2>
          <ProjectCard
            imageSrc="https://6ef1uc7a62.ufs.sh/f/YuAp8ZPhEJz2EbI9q1ykPtRVZb7jpWoJSLr6xuHmz5MN82c3"
            title="POS Demo"
            description="A personal project built to learn Next.js. This front-end web application simulates a POS (Point of Sale) system — it's fully functional and ready to try out."
            websiteHref="https://pos-sytem-nine.vercel.app/"
            gitHubhref="https://github.com/Ruckth/POS-sytem/tree/main/pos-app"
          />
          <ProjectCard
            imageSrc="https://6ef1uc7a62.ufs.sh/f/YuAp8ZPhEJz2kb6gF74SPZhpurSoMd3RBam7bVIgX4iyUj6D"
            gitHubhref="https://github.com/Ruckth/nextjs-dashboard"
            websiteHref="https://nextjs-dashboard-sigma-bice-89.vercel.app/dashboard"
            title="Next Dashboard"
            description="A full stack personal project built to learn Next.js. This web application allows users to manage invoices, including creation, tracking, and status updates."
          />
          <ProjectCard
            imageSrc="https://6ef1uc7a62.ufs.sh/f/YuAp8ZPhEJz2ye5tzTkJmF2aSUtLi5xRrwyv0ozTQ34CuMY7"
            title="MFU HLLC system"
            description="Designed a web platform for Mae Fah Luang University to welcome new students, track activities, and vote in a fresher contest. Collaborated with media and graphic teams to create engaging, user-friendly interfaces in Figma."
            figmaHref="https://www.figma.com/design/FzbBj77YorUpXq0LBAt9uF/HLLC2023?node-id=536-2353&t=c3bEgU07ncIstziF-1"
          />
          <ProjectCard
            imageSrc="https://6ef1uc7a62.ufs.sh/f/YuAp8ZPhEJz2VOpID6mZkpFwa3bYTzHXWAOG4eRstig1ncIS"
            title="BCNC University Medical Platform"
            description="Designed a medical platform for BCNC University featuring a disease risk assessment form, learning content tracking, and a map-based dashboard for admins to monitor disease density and manage content."
            figmaHref="https://www.figma.com/design/FzbBj77YorUpXq0LBAt9uF/HLLC2023?node-id=536-2353&t=c3bEgU07ncIstziF-1"
          />
          <ProjectCard
            imageSrc="https://6ef1uc7a62.ufs.sh/f/YuAp8ZPhEJz2oyu3lCzQbntCPcxGhvL38DJ5sAMYpS4mFfRj"
            title="Uni Personal Project"
            description="Designed prototype of AI generated design mobile web application."
            figmaHref="https://www.figma.com/proto/GJ2S7JMmPOsqiwUbqupIrv/Company-stimulation?node-id=12-294&p=f&t=hipmc7WjiJMKrwX8-0&scaling=scale-down&content-scaling=fixed&page-id=0:1&starting-point-node-id=12:294"
          />
          



        </div>
      </div>
    </main>
  );
}
