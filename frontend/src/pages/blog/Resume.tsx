// Resume.tsx with content added
import React from 'react';

// Reusable Section Component
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="text-white rounded-lg p-6 mb-8 w-full max-w-4xl">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const Resume: React.FC = () => {
  return (
    <div className="flex flex-col items-center my-8">
      <div className="bg-gray-800 w-full max-w-4xl rounded-lg">
        <Header />
        <ProfessionalExperience />
        <ProjectExperience />
        <TechnicalSkills />
        <Education />
      </div>
    </div>
  );
};

const Header: React.FC = () => (
  <header className="text-white rounded-lg p-6 w-full max-w-4xl text-center">
    <h1 className="text-3xl font-bold">Cameron Smart</h1>
    <p className="text-xl">Seattle, WA | 360.712.7049 | smartcameron@gmail.com</p>
    <p>
      LinkedIn: <a href="https://linkedin.com/in/cameron-smart52" className="text-blue-400">cameron-smart52</a> |
      GitHub: <a href="https://github.com/n0remac" className="text-blue-400">n0remac</a>
    </p>
  </header>
);

const ProfessionalExperience: React.FC = () => (
  <Section title="Professional Experience">
    <div>
      <h3 className="text-xl font-bold mb-2">Raft | Full-stack developer | Remote | 2022 - Present</h3>
      <ul className="list-disc ml-5 mt-2">
        <li>Led full-stack development for the TANF government project using Python, React, NGINX, and CircleCI.</li>
        <li>Introduced and integrated modern tools like Redux Toolkit in a Java, Spring Boot, React, Redux, and Postgres environment, enhancing team efficiency.</li>
        <li>Designed and implemented a CICD pipeline for an integration test suite, allowing the project to inform snapshot releases.</li>
        <li>Helped rearchitect our project as a monorepo, making it easier to understand and maintain.</li>
      </ul>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">Rebellion Defense | Product security engineer | Remote | 2021 - 2022</h3>
      <ul className="list-disc ml-5 mt-2">
        <li>Built CICD pipelines in GitLab using Yaml, Python, Docker, and Terraform that detected vulnerabilities.</li>
        <li>Created a centralized CICD pipeline that combined the Gitlab Compliance framework with parent-child pipelines, distributed it to multiple teams.</li>
        <li>Created tools in Javascript using Google Apps Script, GitLab APIs, and Slack API to create automated tools.</li>
        <li>Participated in a week-long hackathon where we built a full-stack React and Flask demo with Grafana as an analytics board.</li>
      </ul>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">F9 | Senior software engineer | Remote | Mar 2021 - Jul 2021</h3>
      <ul className="list-disc ml-5 mt-2">
        <li>Full-stack development on an Air Force contract using Java, Spring Boot, React, Redux, Postgres, and Mongo.</li>
        <li>Wrote support to deploy apps to new types of deployments.</li>
        <li>Helped create data parity workflow for event sourcing to prepare the application to be hosted on SIPRnet.</li>
        <li>Helped rewrite API and convert JavaScript Code to TypeScript and wrote many backend and frontend tests to increase coverage.</li>
      </ul>
    </div>
  </Section>
);

const ProjectExperience: React.FC = () => (
  <Section title="Project Experience">
    <div>
      <h3 className="text-xl font-bold mb-2">Fabled Fusion | Developer</h3>
      <ul className="list-disc ml-5 mt-2">
        <li>Initiated a practice project to explore and push boundaries using ChatGPT for application development.</li>
        <li>Utilized Django, NextJs, NGINX, and Docker for the technical foundation.</li>
        <li>Integrated ChatGPT and Dalle APIs to uniquely generate each game asset.</li>
        <li>Currently rewriting the project in Go, gRPC, and React in order to learn new technologies.</li>
      </ul>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">Dynamic Zoom Overlay | Developer</h3>
      <ul className="list-disc ml-5 mt-2">
        <li>Sought to enhance the standard Zoom setup for a more personalized experience.</li>
        <li>Created a program to overlay images on my camera feed using FFMpeg and OpenCV.</li>
        <li>Enabled hand gesture controls to adjust the position of the overlaid images.</li>
      </ul>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">Web Robot | Engineer</h3>
      <ul className="list-disc ml-5 mt-2">
        <li>Built and programmed a robot that is controlled over the internet.</li>
      </ul>
    </div>
  </Section>
);

const TechnicalSkills: React.FC = () => (
  <Section title="Technical Skills">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <div>
        <h3 className="text-xl font-bold mb-2">Languages</h3>
        <p>Java, Node, Python, Golang</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Frameworks</h3>
        <p>Spring Boot, React, Next.js, Redux, Django, gRPC</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Tools</h3>
        <p>Linux, Bash, Systemd, Docker, AWS, Grafana, CircleCI, GitHub Actions, Gitlab CICD, OpenCV</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Exposure</h3>
        <p>Kubernetes, Terraform, Ruby, C#, Lua</p>
      </div>
      <div className="col-span-full">
        <h3 className="text-xl font-bold mb-2">Certifications</h3>
        <p>Top secret security clearance, CompTIA Security+, Karate blackbelt</p>
      </div>
    </div>
  </Section>
);

const Education: React.FC = () => (
  <Section title="Education">
    <div>
      <h3 className="text-xl font-bold">Eastern Washington University</h3>
      <p>Algorithms, Data Structures, Design Patterns, Linear Algebra, Discrete Mathematics</p>
    </div>
  </Section>
);

export default Resume;
