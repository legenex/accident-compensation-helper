import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Clock, ArrowRight, Star } from "lucide-react";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/lib/siteContent";
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
      {/* photographic background */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="A person receiving guidance after an accident"
          fittingType="fill"
          className="h-full w-full"
        />
      </div>

      {/* navy gradient overlay — darker on left for text, subtle on right for card */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(21,29,40,0.94) 0%, rgba(21,29,40,0.88) 35%, rgba(21,29,40,0.72) 60%, rgba(21,29,40,0.55) 100%)",
        }}
      />

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
            className="mt-5 max-w-xl text-base leading-relaxed text-white/75"
          >
            Answer a few questions about what happened. We will help you understand whether your situation may be worth
            discussing with a participating personal injury attorney — free, and in about two minutes.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-white/65"
          >
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Takes about 2 minutes</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Free to use</span>
            <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> Handled securely</span>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-4">
            <span className="flex -space-x-2.5">
              {["bg-primary", "bg-sky-500", "bg-teal-400", "bg-indigo-400"].map((c, i) => (
                <span key={i} className={`h-8 w-8 rounded-full border-2 border-navy ${c}`} />
              ))}
            </span>
            <div className="text-sm">
              <div className="flex items-center gap-1">
                {[0,1,2,3,4].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-white/65">
                <span className="font-semibold text-white/90">12,000+</span> claims checked
              </p>
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