"use client";

import { motion, useScroll, useTransform, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

// Animation variants with proper typing
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Smart description renderer (supports sub-headings)
function ProjectDescription({ text }: { text: string }) {
  const lines = text.split("\n").filter((l) => l.trim() !== "");

  return (
    <div className="mb-4 text-slate-600 leading-relaxed space-y-2">
      {lines.map((line, i) => {
        const isHeading = line.trim().endsWith(":");

        if (isHeading) {
          return (
            <h5 key={i} className="font-semibold text-slate-900 mt-3">
              {line}
            </h5>
          );
        }

        return <p key={i} dangerouslySetInnerHTML={{ __html: line }} />;
      })}
    </div>
  );
}

// Animated section wrapper with proper typing
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Project card with hover effect
function ProjectCard({
  project,
  index,
}: {
  project: {
    title: string;
    type: string;
    desc: string;
    stackArray?: string[];
    demo: string;
    repo: string;
  };
  index: number;
}) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group text-slate-700 border-1 rounded-2xl border-purple-100 bg-gradient-to-r from-purple-400 to-purple-300 p-6 shadow-sm hover:shadow-xl transition-shadow"
    >
      <div className="mb-3 flex items-center justify-between ">
        <h4 className="text-xl text-cyan-300 font-bold group-hover:text-cyan-800 transition-colors">
          {project.title}
        </h4>
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className={`rounded-full px-3 py-1 text-xs font-medium ${project.type === "Web3"
            ? "bg-cyan-100 text-cyan-300"
            : "bg-cyan-100 text-cyan-500"
            }`}
        >
          {project.type}
        </motion.span>
      </div>
      <ProjectDescription text={project.desc} />

      <div className="flex gap-4">
        <motion.a
          href={project.demo}
          className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-600"
          whileHover={{ x: 4 }}
        >
          X Profile →
        </motion.a>
        <motion.a
          href={project.repo}
          className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-600"
          whileHover={{ x: 4 }}
        >

        </motion.a>
      </div>
    </motion.article>
  );
}

// Skill badge
function SkillBadge({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.1, y: -2 }}
      className="inline-block rounded-lg bg-purple-200 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:shadow-md cursor-default transition-shadow"
    >
      {skill}
    </motion.span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNavClick = (id: string) => {
    setMenuOpen(false);

    // wait for menu animation to close
    setTimeout(() => {
      const el = document.getElementById(id);

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 250);
  };
  const { scrollYProgress } = useScroll();

  const navBg = useTransform(scrollYProgress, [0, 0.1], ["#C4B5FD", "#581C87"]);

  // Aurora palette
  const palettes = {
    aurora: [
      "linear-gradient(to bottom, #581C87 0%, #4C1D95 40%, #22D3EE 100%)",
      "linear-gradient(to bottom, #581C87 0%, #6D28D9 50%, #06B6D4 100%)",
      "linear-gradient(to bottom, #581C87 0%, #5B21B6 45%, #67E8F9 100%)",
    ],
  };

  const activePalette = palettes.aurora;

  const pageBg = useTransform(scrollYProgress, [0, 0.5, 1], activePalette);

  const skills: Record<string, string[]> = {
    "Content creation": ["Threads", "Storytelling", "Educational Post", "Articles", "Video Editing"],
    "Event Hosting": ["IRL Events", "Master of Ceremonies", "Media Strategist"]
  };

  const projects = [
    {
      title: "Wallet Connect",
      type: "WEB3",
      desc: `I created written and video content contents which help break down complex terms and made it easy to onboard users to 
      to wallet connect. I also assisted in hosting a live stream for their watch party.

My Contents: 
<a href="https://x.com/louyemalo/status/2029525127587565904?s=46" target="_blank" class="text-cyan-300 hover:underline">watch (1) →</a> 
<a href="https://x.com/louyemalo/status/2034522932156715218?s=46" target="_blank" class="text-cyan-300 hover:underline">watch (2) →</a> 

`,
      stackArray: [],
      demo: "https://x.com/WalletConnect",
      repo: "",
    },
    {
      title: "MetaMask",
      type: "WEB3",
      desc: `i hosted IRL event for MetaMask which made it easy to onboard users physically to using the metamask wallet while also making amazing content about the event. I made sure the IRL event was impactful while working with a whole dedicated team. 
My Contents: 
<a href="https://x.com/louyemalo/status/2038224638468051237?s=46" target="_blank" class="text-cyan-300 hover:underline">watch (1) →</a> 
<a href="https://x.com/louyemalo/status/2037925296884568339?s=46" target="_blank" class="text-cyan-300 hover:underline">watch (2) →</a> 
<a href="https://x.com/louyemalo/status/2037880641446871467?s=46" target="_blank" class="text-cyan-300 hover:underline">watch (3) →</a> 
<a href="https://x.com/louyemalo/status/2037841906051240355?s=46" target="_blank" class="text-cyan-300 hover:underline">watch (4) →</a> 
<a href="https://x.com/louyemalo/status/2017899239041327561?s=46" target="_blank" class="text-cyan-300 hover:underline">watch (5) →</a> 
<a href="https://x.com/louyemalo/status/2038485150116270290?s=46" target="_blank" class="text-cyan-300 hover:underline">watch (6) →</a> 

`,
      stackArray: [],
      demo: "https://x.com/MetaMask",
      repo: "",
    },
    {
      title: "Qwerti AI",
      type: "WEB3",
      desc: `I created written and video content contents as an ambassador for Qwerti AI which help break down complex terms and made it easy to onboard users to 
      to their pltform

My Contents: 
<a href="https://x.com/louyemalo/status/2040420436681298017?s=46" target="_blank" class="text-cyan-300 hover:underline">watch (1) →</a> 
<a href="https://x.com/louyemalo/status/2037061222516814097?s=46" target="_blank" class="text-cyan-300 hover:underline">watch (2) →</a> 

`,
      stackArray: [],
      demo: "https://x.com/QwertiAI",
      repo: "",
    },
    {
      title: "BitRobot Network",
      type: "WEB3",
      desc: `created Video contents as an ambassador for bitrobot preaching the future of robotics to my audience and people at large through my video edits and this made it easy to bring in users to the project

My Content: 
<a href="https://x.com/louyemalo/status/2038855626046984203?s=46" target="_blank" class="text-cyan-300 hover:underline">watch (1) →</a>  

`,
      stackArray: [],
      demo: "https://x.com/BitRobotNetwork",
      repo: "",
    },
    {
      title: "Roxom",
      type: "WEB3",
      desc: `I created a video content which help break down the idea of Roxom and made it easy for users to understand 
    

My Content: 
<a href="https://x.com/louyemalo/status/2039572059508949014?s=46" target="_blank" class="text-cyan-300 hover:underline">watch (1) →</a> 

`,
      stackArray: [],
      demo: "https://x.com/Roxom",
      repo: "",
    },
    {
      title: "StandX Official",
      type: "WEB3",
      desc: `i created a video content by breaking down what the use case of StandX is all about which helps to educate the audience what they are all about 

My Content: 
<a href="https://x.com/louyemalo/status/2041398756642300267?s=46" target="_blank" class="text-cyan-300 hover:underline">watch (1) →</a> 

`,
      stackArray: [],
      demo: "https://x.com/StandX_Official",
      repo: "",
    },


  ];

  const experience = [
    {
      role: "Web3 Content Creator & Strategist",
      company: "Freelance / Independent",
      period: "2024 - Present",
      points: [
        "Create engaging, story-driven content that simplifies Web3 concepts for beginners",
        "Develop content strategies that help projects communicate their value clearly",
        "Produce short-form videos, threads, and educational content across platforms",
        "Focus on making complex ideas relatable, easy to understand, and actionable"
      ],
    },
    {
      role: "Project Collaborations & Ambassadorships",
      company: "Multiple Web3 Projects",
      period: "2024 - Present",
      points: [
        "Worked with projects including RealtyX DAO, Arbitrum, Sonic, Send, and Qube",
        "Created promotional and educational content to drive awareness and user understanding",
        "Supported community growth through consistent content and engagement",
        "Helped translate technical features into user-friendly messaging"
      ],
    },
    {
      role: "IRL Event Host (Web3 & Community Events)",
      company: "Meet Ups",
      period: "2024 - Present",
      points: [
        "Hosted and facilitated in-person Web3 events and onboarding sessions",
        "Created interactive spaces for learning, networking, and community building",
        "Helped beginners understand Web3 through real-time engagement and discussions",
      ],
    },

  ];

  return (
    <motion.main style={{ background: pageBg }} className="text-slate-900">
      {/* Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-700 origin-left z-[60]"
      />

      {/* Navbar */}
      <motion.header
        style={{ backgroundColor: navBg }}
        className="sticky top-0 z-50 border-b border-purple-200/50 backdrop-blur-md"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent"
          >
            LULU.WEB3
          </motion.a>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden gap-8 text-sm font-medium md:flex"
          >
            {["About", "Skills", "Projects", "Experience", "Contact"].map(
              (item) => (
                <motion.button
                  key={item}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className="text-purple-600 hover:text-purple-500 transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ),
            )}
          </motion.div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-purple-700"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-purple-200/40"
            >
              <div className="flex flex-col items-center gap-6 py-6">
                {["About", "Skills", "Projects", "Experience", "Contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => handleNavClick(item.toLowerCase())}
                      className="text-purple-500 font-medium hover:text-purple-600 transition"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-300" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div variants={scaleIn} className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-purple-700 blur-2xl opacity-30 animate-pulse" />
              <Image
                src="/lulu.jpeg"
                alt="Profile"
                width={280}
                height={280}
                priority
                className="relative h-70 w-70 rounded-full border-4 border-purple-700 object-cover shadow-xl"
              />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl font-extrabold md:text-6xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-purple-700"
            >
              LULU
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-2xl text-xl text-slate-700 leading-relaxed"
            >
              Web3 Content Creator, Storyteller & Content Strategist || IRL Event Host ||
              I simplify Web3 so anyone can understand it and actually use it.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl border-2 border-slate-200 bg-purple-400 px-8 py-4 font-semibold hover:border-purple-800 hover:bg-purple-700 transition-colors"
              >
                View Projects
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-purple-300 rounded-full flex justify-center"
            >
              <div className="w-1.5 h-3 bg-purple-400 rounded-full mt-2" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-purple-200 to-purple-300">
        <div className="mx-auto max-w-5xl px-6">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                 I got into Web3 after attending a Solana event, and honestly, it changed how I saw everything from technology to the kind of opportunities that exist online.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Since then, I’ve just been building in public, creating content that breaks things down in a way people actually understand. No unnecessary complexity, just real, simple explanations.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  As a content creator and strategist, I focus on helping projects tell their story better and making sure their message connects, not just gets seen.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  I also host IRL events, because I believe Web3 shouldn’t just live online people should be able to experience it, ask questions, and connect in real life too.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  At the end of the day, I’m just here to make Web3 feel less confusing and more accessible for anyone trying to get into it.
                </p>

              </div>
              <motion.div
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-purple-100 to-purple-400 rounded-2xl p-6"
              >
                <h4 className="text-lg font-semibold mb-3 text-cyan-500">
                  Quick Facts
                </h4>
                <ul className="space-y-4 text-sm text-slate-700">
                  <li>📍 Based in Lagos, Nigeria</li>
                  <li>💼 2+ Years Experience</li>
                  <li>🔗 Platform: X, Discord and Telgram</li>
                  <li>🔗 Core areas: content irl event host, content strategist</li>
                </ul>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-24 bg-gradient-to-br from-purple-200 to-purple-300"
      >
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2"
          >
            {Object.entries(skills).map(([group, list], idx) => (
              <motion.div
                key={group}
                variants={slideInLeft}
                custom={idx}
                className="bg-purple-400 rounded-2xl p-6 shadow-sm border border-purple-100"
              >
                <h3 className="text-lg text-cyan-400 font-semibold mb-4 capitalize flex items-center gap-2">
                  {group === "Content"}
                  {group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {list.map((skill, i) => (
                    <SkillBadge key={skill} skill={skill} index={i} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gradient-to-br from-purple-200 to-purple-300">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-center text-slate-700 mb-12 max-w-2xl mx-auto">
              A selection of what i do in the space
            </p>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2 ">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-24 bg-gradient-to-br from-purple-200 to-purple-300"
      >
        <div className="mx-auto max-w-5xl px-6">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-12">
              <span className="bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {experience.map((job, idx) => (
              <motion.div
                key={job.role}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative pl-8 border-l-2 border-purple-600"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-gradient-to-r from-purple-600 to-purple-900" />
                <div className="bg-gradient-to-r from-purple-400 to-purple-300 rounded-2xl p-6 shadow-sm border border-purple-100">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-xl text-cyan-300 font-bold">{job.role}</h4>
                    <span className="text-sm text-cyan-300 font-medium bg-indigo-50 px-3 py-1 rounded-full">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-slate-900 mb-4">{job.company}</p>
                  <ul className="space-y-2">
                    {job.points.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex gap-2 text-slate-700"
                      >
                        <span className="text-purple-900 mt-1">▹</span>
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-purple-200 to-purple-300">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
                Let us Connect
              </span>
            </h2>
            <p className="text-slate-700 mb-8 max-w-xl mx-auto">
             I Create content consistently focused on Web3 education and storytelling, Built authority by simplifying topics and sharing insights publicly, Increased audience engagement through relatable and high-value content.
             If you need anything related to this, then i am the best person to work with.
            </p>
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <motion.a
              href="mailto:louyema@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-900 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-shadow"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-cyan-300">louyema@gmail.com</p>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center gap-6"
          >
            {[
              {
                name: "Telegram",
                url: "https://t.me/Louyema",
                icon: "M22 4.01a2 2 0 00-2.49-1.94L2 9.55a2 2 0 00-.11 3.69l4.69 2.2 2.22 5.48a2 2 0 001.3 1.13 2 2 0 001.83-.46l2.26-2.21 4.69 3.52a2 2 0 003.4-1.88l-3.88-18.05A2 2 0 0022 4.01z",
              },
              {
                name: "X (Twitter)",
                url: "https://x.com/louyemalo",
                icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
              },
              {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/louisa-okoh-191551315?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
              },
            ].map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-300 flex items-center justify-center hover:bg-purple-100 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </div>
                <span className="text-sm">{social.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-slate-200 py-8 text-center text-sm text-slate-700 bg-purple-400"
      >
        <p>
          © {new Date().getFullYear()} LULU. || All Rights Reserved
        </p>
      </motion.footer>
    </motion.main>
  );
}