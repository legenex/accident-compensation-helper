import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Clock, ArrowRight, Users } from "lucide-react";
import HeroClaimCard from "@/components/site/HeroClaimCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-16">
      {/* animated background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -right-32 -top-20 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[100px]"
          animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-20 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[90px]"
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[80px]"
          animate={{ x: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] lg:grid-cols-2 lg:gap-12">
        {/* Left: content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center px-6 py-16 text-white lg:py-24 lg:pr-6"
        >
          <motion.span
            variants={item}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Free and confidential claim check
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]"
          >
            Injured in an accident?
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 font-heading text-xl font-semibold text-white/90 sm:text-2xl"
          >
            Find out if you may qualify for{" "}
            <span className="bg-gradient-to-r from-primary to-sky-300 bg-clip-text text-transparent">
              compensation
            </span>
            .
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/65"
          >
            Answer a few questions about what happened. We will help you understand whether your situation may be worth
            discussing with a participating personal injury attorney. The claim check is free and takes about two minutes.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-white/55"
          >
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Takes about 2 minutes</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Free to use</span>
            <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> Handled securely</span>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-3 text-sm text-white/50">
            <span className="flex -space-x-2">
              {["bg-primary", "bg-sky-500", "bg-teal-400", "bg-indigo-400"].map((c, i) => (
                <span key={i} className={`h-7 w-7 rounded-full border-2 border-navy ${c}`} />
              ))}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-semibold text-white/80">12,000+</span> people have checked their claim
            </span>
          </motion.div>

          <motion.div variants={item}>
            <Link
              to="/claim"
              className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02] lg:hidden"
            >
              Start the claim check <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: interactive card */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center px-6 pb-16 lg:py-24 lg:pl-6"
        >
          <div className="w-full max-w-md">
            <HeroClaimCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}