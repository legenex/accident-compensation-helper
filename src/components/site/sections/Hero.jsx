import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Clock, ArrowRight, Users, Star } from "lucide-react";
import HeroClaimCard from "@/components/site/HeroClaimCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16">
      {/* animated mesh-gradient base */}
      <div
        className="absolute inset-0 bg-navy"
        style={{
          background:
            "linear-gradient(125deg, #151d28 0%, #1a2a3a 25%, #1e3a52 50%, #1a2a3a 75%, #151d28 100%)",
          backgroundSize: "300% 300%",
          animation: "gradient-pan 14s ease-in-out infinite",
        }}
      />

      {/* visible floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-20 -top-10 h-[420px] w-[420px] rounded-full bg-primary/40 blur-[60px]"
          animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-16 top-1/4 h-[360px] w-[360px] rounded-full bg-sky-500/30 blur-[55px]"
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-indigo-500/25 blur-[50px]"
          animate={{ x: [0, -60, 0], y: [0, 20, 0], scale: [1, 1.25, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 h-[200px] w-[200px] rounded-full bg-teal-400/20 blur-[40px]"
          animate={{ x: [0, 30, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* drifting dot grid */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "36px 36px"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* glow behind card */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/4 rounded-full bg-primary/20 blur-[80px]" />

      {/* floating accent particles */}
      <div className="pointer-events-none absolute inset-0">
        {[
          { left: "8%", top: "20%", delay: 0, dur: 7 },
          { left: "15%", top: "70%", delay: 1.5, dur: 9 },
          { left: "40%", top: "15%", delay: 3, dur: 8 },
          { left: "45%", top: "85%", delay: 0.8, dur: 10 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary/60"
            style={{ left: p.left, top: p.top }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
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
            className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur"
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
            className="mt-4 font-heading text-xl font-semibold sm:text-2xl"
          >
            Find out if you may qualify for{" "}
            <span className="bg-gradient-to-r from-primary via-sky-300 to-teal-300 bg-clip-text text-transparent">
              compensation
            </span>
            .
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/70"
          >
            Answer a few questions about what happened. We will help you understand whether your situation may be worth
            discussing with a participating personal injury attorney — free, and in about two minutes.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-white/60"
          >
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Takes about 2 minutes</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Free to use</span>
            <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> Handled securely</span>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="flex -space-x-2.5">
                {["bg-primary", "bg-sky-500", "bg-teal-400", "bg-indigo-400"].map((c, i) => (
                  <span key={i} className={`h-8 w-8 rounded-full border-2 border-navy ${c}`} />
                ))}
              </span>
              <div className="text-sm">
                <div className="flex items-center gap-1">
                  {[0,1,2,3,4].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-white/60">
                  <span className="font-semibold text-white/90">12,000+</span> claims checked
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <Link
              to="/claim"
              className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-transform hover:scale-[1.03] lg:hidden"
            >
              Start the claim check <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: interactive card */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center px-6 pb-16 lg:py-24 lg:pl-6"
        >
          <div className="w-full max-w-md">
            <HeroClaimCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}