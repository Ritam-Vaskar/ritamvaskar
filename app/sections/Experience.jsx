"use client";
import React from "react";
import ExperienceCard from "../components/ExperienceCard";

const Experience = () => {
  const experiences = [
    {
      company: "FED KIIT",
      title: "Technical Director",
      logo: "/assets/fed_logo.png",
      companyBanner: "https://cdn.prod.website-files.com/67aa2520eb413205a7dac909/67ae48e9f9239af1b55c496e_WhatsApp%20Image%202024-11-10%20at%2013.26.42_8e6d68b9.jpg",
      symbol: "🚀",
      location: "Bhubaneswar, India",
      duration: "2024 - Present",
      companyUrl: "https://www.fedkiit.com/",
      positions: [
        { title: "Technichal Director", duration: "Aug 2025 - Present" },
        { title: "Senior Technichal Executive", duration: "Dec 2024 - Aug 2025" },
        { title: "Technichal Executive", duration: "Feb 2024 - Dec 2024" },
      ],
      description: "Led development of FED KIIT website. Mentored junior developers and contributed to technical decision-making.",
      achievements: [
        "Took a vital role to revamp the website of FEDKIIT and increased the user engagement a lot.",
        "Gain a lot of experience in the field of web development and software engineering.",
        "Worked as a Organizing committee member in the FEDKIIT's Events.",
      ],
      testimonial: {
        text: "You are one of the most hardworking and talented tech guys I know. Your problem-solving skills and dedication to getting things done always stand out.",
        name: "Anurag Prasoon",
        role: "President of FED KIIT",
        avatar: "https://res.cloudinary.com/dm6jd6bhk/image/upload/v1738263837/MemberImages/rw7vxvlbu9d5kg215y3k.jpg",
      },
      credential: "https://www.linkedin.com/posts/fedkiit_introducing-the-all-new-fed-website-all-activity-7233050965287845888-EDqz?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQG05YB92YP5rPxTB6tKNufHojM5Ig5mfE",
    },
    {
      company: "Sri Ramakrishna Siksha Niketan",
      title: "Full Stack Developer",
      logo: "/assets/srsn.png",
      companyBanner: "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd34be2521c91c45aefb_301128514_562327412349985_3679940258914638492_n.jpg",
      symbol: "💡",
      location: "Remote",
      duration: "Aug 2024 - Dec 2024",
      companyUrl: "https://sriramkrishnasikshaniketan.me/",
      positions: [{ title: "Full Stack Developer", duration: "Aug 2024 - Dec 2024" }],
      description: "Developed and maintained full-stack applications using React, Node.js, MongoDB and Express.",
      achievements: [
        "Built and launched the projects with 90% satisfaction rate",
        "Managed over 600 Admissions applications of the school",
        "We're making Alumni Network for the school by this website.",
      ],
      testimonial: {
        text: "Your Work has significantly enhanced our digital presence and communication with the community.",
        name: "S.N. Roy",
        role: "Headmaster of SRSN",
        avatar: "http://res.cloudinary.com/dodpgohuc/image/upload/v1730649954/icflzgjjujzmrqumftry.jpg",
      },
      credential: "https://drive.google.com/file/d/1ACSl8_TUfjyJIW94bTJArOydj8vL86np/view?usp=sharing",
    },
    {
      company: "SSIB Security",
      title: "FreeLance Web Developer",
      logo: "/assets/ssib.png",
      companyBanner: "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6834404e821734e4ccd6a3bc_481659659_597651189916030_2603637933769140281_n.jpg",
      symbol: "💡",
      location: "Raghunathganj, India (Remote)",
      duration: "May 2025 - June 2025",
      companyUrl: "https://ssibservices.in/",
      positions: [{ title: "FreeLance Web Developer", duration: "May 2025 - June 2025" }],
      description: "Developed and maintained full-stack applications using React, Node.js, MongoDB and Express.",
      achievements: [
        "Built and launched the projects with 90% satisfaction rate",
        "Managed Security Recruitment and Client Apllications",
        "Digitalized the whole process of Security-Client interaction",
      ],
      testimonial: {
        text: "Your Work digitalized the whole process of Security-Client interaction and made it more efficient.",
        name: "SSIB Security",
        role: "Security Service Provider",
        avatar: "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6832f233c430f8f88d751a46_WhatsApp_Image_2025-05-24_at_16.34.24_0df7a67d-removebg-preview.png",
      },
      credential: "https://ssib.vercel.app/",
    },
  ];

  return (
    <section className="w-full py-10 px-4 sm:px-6 flex flex-col items-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="text-slate-300">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">A journey through my professional growth and achievements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {experiences.map((experience) => (
            <div key={experience.company} className="h-full">
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
