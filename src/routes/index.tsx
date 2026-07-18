import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  Phone,
  Link2 as LinkedinIcon,
  Download,
  Workflow,
  Headset,
  Cog,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Spotlight } from "@/components/Spotlight";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

// ---------- animation helpers ----------
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

function Section({
  id,
  eyebrow,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl px-6 py-32 sm:py-40 ${className}`}>
      {eyebrow && (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary"
        >
          <span className="h-px w-8 bg-primary/60" />
          {eyebrow}
        </motion.div>
      )}
      {children}
    </section>
  );
}

// ---------- Nav ----------
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Work", "#work"],
    ["Impact", "#impact"],
    ["Journey", "#journey"],
    ["Systems", "#systems"],
    ["Contact", "#contact"],
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <div
          className={`flex items-center justify-between gap-8 rounded-full px-5 py-2.5 transition-all duration-300 ${
            scrolled ? "glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]" : ""
          } w-full`}
        >
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_#6EE7F9]" />
            Mohammed Rakib
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {links.map(([l, h]) => (
              <a key={h} href={h} className="transition-colors hover:text-foreground">
                {l}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Get in touch
          </a>
        </div>
      </div>
    </motion.header>
  );
}

// ---------- Hero ----------
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div id="top" ref={ref} className="relative min-h-screen">
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="absolute inset-x-0 top-0 -z-0 h-[70vh] bg-[radial-gradient(ellipse_at_top,rgba(110,231,249,0.15),transparent_60%)]" />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-32"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-hairline glass px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Available for new operations roles
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          custom={1}
          variants={fadeUp}
          className="text-gradient text-[clamp(3rem,10vw,8.5rem)] font-black leading-[0.9] tracking-[-0.04em]"
        >
          Operations
          <br />
          <span className="text-accent-gradient">without chaos.</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          I design workflows, improve operations, and build systems that help teams move faster —
          from 200-ticket support queues to full CRM rollouts.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeUp}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            See what I do
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-hairline glass px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
          >
            Let's talk
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute inset-x-0 bottom-10 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ---------- What I Do ----------
const services = [
  {
    icon: Workflow,
    title: "Operations Management",
    body: "Coordinating remote teams, monitoring live queues, distributing leads, and keeping day-to-day service running without friction.",
    points: ["Team coordination", "Queue monitoring", "Lead distribution"],
  },
  {
    icon: Headset,
    title: "Customer Support Excellence",
    body: "Ticket-based and multichannel support at scale — 130+ emails a day, 100% QA scores, and international clients across three continents.",
    points: ["Multichannel support", "SLA & KPI adherence", "Escalation handling"],
  },
  {
    icon: Cog,
    title: "Workflow & System Improvement",
    body: "Turning messy manual processes into repeatable systems — from custom internal tools to full CRM and accounting rollouts.",
    points: ["SOP design", "Internal tooling", "CRM implementation"],
  },
];

function ServicesSection() {
  return (
    <Section id="work" eyebrow="What I actually do">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-4xl text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-gradient"
      >
        Three things I do relentlessly well.
      </motion.h2>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={i}
            className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-glow)]"
          >
            <div className="absolute inset-x-0 -top-32 h-32 bg-[radial-gradient(ellipse_at_top,rgba(110,231,249,0.25),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <s.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <h3 className="mt-8 text-2xl font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
            <ul className="mt-8 space-y-2 border-t border-hairline pt-6">
              {s.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ---------- Impact / Stats ----------
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 130, suffix: "+", label: "Emails handled daily" },
  { value: 200, suffix: "+", label: "Support tickets daily" },
  { value: 20, suffix: "+", label: "Team members coordinated" },
  { value: 100, suffix: "%", label: "QA score maintained" },
  { value: 5, suffix: "×", label: "Employee of the Month" },
  { value: 60, suffix: "K+", label: "Community grown from scratch" },
];

function ImpactSection() {
  return (
    <Section id="impact" eyebrow="Impact in numbers">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-4xl text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-gradient"
      >
        Four years. Measurable outcomes.
      </motion.h2>

      <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group relative bg-background p-8 transition-colors hover:bg-surface"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              0{i + 1}
            </div>
            <div className="mt-6 text-5xl font-bold tracking-tight text-accent-gradient">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ---------- Journey / Timeline ----------
const timeline = [
  {
    company: "Cottage Home Care",
    role: "Intake Coordinator",
    period: "Jun 2026 — Present",
    location: "Maryland Medicaid (Remote)",
    achievements: [
      "Owns the complete intake process for new home care referrals within the Maryland Medicaid program.",
      "Guides members through Medicaid documentation requirements and collects onboarding documents.",
      "Coordinates assessments with Maryland Aging & Disability (A&D) offices.",
      "Collaborates with Case Managers, Support Planners, and internal care teams to ensure timely service initiation.",
      "Monitors referral progress and proactively follows up with clients and external stakeholders to prevent delays.",
      "Provides professional phone and email support throughout the onboarding process.",
    ],
  },
  {
    company: "Ace Corporation",
    role: "Lead Administrator & Team Support Coordinator",
    period: "Dec 2025 — May 2026",
    location: "Dhaka",
    achievements: [
      "Coordinated daily operations for remote sales and support agents in a fast-paced moving services environment.",
      "Monitored live call activity through RingCentral to ensure responsiveness, attendance, and service coverage.",
      "Designed and implemented an internal web-based break management system for 20+ agents.",
      "Assigned and distributed incoming leads based on priority, move dates, and operational demand.",
      "Managed customer communications across SmartMoving, CallRail, RingCentral, and sales email channels.",
      "Handled e-transfer verification, file management, and booking support end-to-end.",
      "Monitored missed-call alerts and lead recovery workflows to minimize lost sales opportunities.",
    ],
  },
  {
    company: "Riseup Labs",
    role: "Digital Support Specialist",
    period: "Dec 2024 — Aug 2025",
    location: "Dhaka, Bangladesh",
    achievements: [
      "Handled 130+ emails/day for TTI USA brands — Ryobi, Ridgid, and Hart.",
      "Maintained a consistent 100% quality assurance score; ranked as a top performer.",
      "Managed Ryobi Rapid Repair and Ridgid Direct Service programs end-to-end.",
      "Designed a custom serial-number verification tool for Ryobi 40V Push Mower and Hedge Trimmer recalls.",
      "Collaborated with cross-functional teams across USA, Canada, and South Africa — including FedEx logistics.",
      "Operated Genesys and SAP C4C for ticket management and team collaboration via Microsoft Teams.",
    ],
  },
  {
    company: "Freelance",
    role: "Document Digitization Specialist (Remote)",
    period: "May 2024 — Dec 2024",
    location: "Dhaka, Bangladesh",
    achievements: [
      "Transcribed and digitized handwritten 1921 Canadian census records with full data integrity.",
      "Interpreted complex cursive handwriting to maintain high-quality data entry in internal databases.",
      "Conducted verification and cross-checks to eliminate errors and maintain data consistency.",
      "Collaborated with remote team members to resolve discrepancies and improve workflow efficiency.",
    ],
  },
  {
    company: "Genex Infosys Limited",
    role: "Junior Executive — Digital Service Management",
    period: "Apr 2022 — Oct 2023",
    location: "Dhaka, Bangladesh",
    achievements: [
      "Managed 200+ tickets/day across email, chat, and social media for Apex Footwear Ltd.",
      "Led drafting of standardized responses approved by internal and client QA.",
      "Developed Standard Operating Procedures (SOPs) to improve service quality and streamline workflows.",
      "Collaborated with logistics and campaign teams to resolve escalated issues efficiently.",
      "Recognized 5× as Employee of the Month for outstanding performance.",
    ],
  },
  {
    company: "Symbol Fashion House",
    role: "Business Partner",
    period: "Jul 2019 — Jan 2021",
    location: "Dhaka, Bangladesh",
    achievements: [
      "Grew and managed a Facebook page with 60,000+ followers through consistent product content.",
      "Ran targeted Facebook ad campaigns, tracking performance and optimizing for engagement and sales.",
      "Sourced products from local markets, negotiated with suppliers, and managed inventory and pricing.",
      "Handled order fulfillment, customer inquiries, and after-sales support end-to-end.",
      "Analyzed social insights and sales data to inform marketing and product strategy.",
      "Ran creative campaigns and promotions that grew brand visibility and revenue.",
    ],
  },
];

function Journey() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="journey" eyebrow="The journey">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-4xl text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-gradient"
      >
        Every role built the next one.
      </motion.h2>

      <div className="relative mt-20 pl-8 sm:pl-14">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-hairline to-transparent sm:left-4" />
        {timeline.map((t, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={t.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative mb-6"
            >
              <div className="absolute -left-[26px] top-6 h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_#6EE7F9] sm:-left-[38px]" />
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="group w-full rounded-2xl border border-hairline bg-surface p-6 text-left transition-all hover:border-primary/30 sm:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{t.company}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t.role} · {t.location}
                    </p>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
                    {t.period}
                  </span>
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="mt-6 space-y-3 border-t border-hairline pt-6">
                    {t.achievements.map((a) => (
                      <li key={a} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ---------- Systems / Projects ----------
const projects = [
  {
    tag: "Internal Tool",
    title: "Break Management System",
    description:
      "Web-based break scheduler and tracker built from scratch for a 20-agent remote support floor. Replaced a spreadsheet-and-messaging workflow.",
    outcome: "Cleaner coverage, fewer coordination misses, real-time visibility.",
    tech: ["Web app", "Team coordination", "RingCentral"],
  },
  {
    tag: "Systems Rollout",
    title: "Zoho Books Implementation",
    description:
      "Full accounting stack rollout for Mayer Doya Motors — configured Zoho Books Premium, digitized six months of past transactions, and trained an internal operator.",
    outcome: "Self-sufficient in-house accounting, zero external dependency.",
    tech: ["Zoho Books", "Process design", "Training"],
  },
  {
    tag: "Custom Tool",
    title: "Ryobi Recall Verification",
    description:
      "Custom serial-number verification tool for the Ryobi 40V Push Mower and Hedge Trimmer recall program at TTI USA.",
    outcome: "Reduced manual errors, sped up recall processing across regions.",
    tech: ["Genesys", "SAP C4C", "Cross-region ops"],
  },
];

function Systems() {
  return (
    <Section id="systems" eyebrow="Systems I've built">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-4xl text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-gradient"
      >
        Not just tickets — shipped systems.
      </motion.h2>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={i}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:bg-primary/20" />
            <span className="w-fit rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
              {p.tag}
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{p.description}</p>
            <div className="mt-6 rounded-xl border border-hairline bg-background/40 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                Outcome
              </div>
              <div className="mt-2 text-sm text-foreground">{p.outcome}</div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-6">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

// ---------- Toolbox ----------
const tools = [
  "Genesys Cloud",
  "SAP C4C",
  "RingCentral",
  "SmartMoving",
  "CallRail",
  "Zoho Books",
  "Microsoft Dynamics",
  "HappyFox",
  "Google Workspace",
  "Microsoft 365",
];

function ToolBadge({ label, i }: { label: string; i: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      className="group cursor-default rounded-2xl border border-hairline glass px-5 py-4 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
    >
      {label}
    </motion.div>
  );
}

function Toolbox() {
  return (
    <Section eyebrow="Toolbox">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-4xl text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-gradient"
      >
        The stack I run on.
      </motion.h2>

      <div className="mt-16 flex flex-wrap gap-3">
        {tools.map((t, i) => (
          <ToolBadge key={t} label={t} i={i} />
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mt-16 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
      >
        <Award className="h-4 w-4 text-primary" />
        Recognized 5× as Employee of the Month · 100% QA at Riseup Labs
      </motion.div>
    </Section>
  );
}

// ---------- Contact ----------
function Contact() {
  return (
    <Section id="contact" eyebrow="Contact">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-[clamp(2.5rem,9vw,7.5rem)] font-black leading-[0.95] tracking-[-0.04em] text-gradient"
      >
        Let's build
        <br />
        <span className="text-accent-gradient">something better.</span>
      </motion.h2>

      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={1}
        className="mt-10 max-w-2xl text-lg text-muted-foreground"
      >
        If you're scaling a support team, rolling out a CRM, or just tired of ops chaos — I'd love to
        hear about it.
      </motion.p>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {[
          { icon: Mail, label: "Email", value: "rakibul.islam057@outlook.com", href: "mailto:rakibul.islam057@outlook.com" },
          { icon: Phone, label: "Phone", value: "+880 1839 939535", href: "tel:+8801839939535" },
          { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/mohammed-rakib", href: "#" },
          { icon: Download, label: "Resume", value: "Download PDF", href: "/Mohammed_Rakib_Resume.pdf" },
        ].map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            {...(c.label === "Resume" ? { download: true } : {})}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group flex items-center justify-between rounded-2xl border border-hairline bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {c.label}
                </div>
                <div className="mt-1 text-sm font-medium">{c.value}</div>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </motion.a>
        ))}
      </div>

      <div className="mt-24 flex flex-col justify-between gap-4 border-t border-hairline pt-8 text-xs text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} Mohammed Rakib. Built with care.</div>
        <div className="font-mono">Notun Bazar, Dhaka · Bangladesh</div>
      </div>
    </Section>
  );
}

// ---------- Page ----------
function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <Spotlight />
      <Nav />
      <div className="relative z-10">
        <Hero />
        <ServicesSection />
        <ImpactSection />
        <Journey />
        <Systems />
        <Toolbox />
        <Contact />
      </div>
    </main>
  );
}
