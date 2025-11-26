"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n"
import { useWdk } from "@/lib/contexts/WdkContext"
import { Wallet, Building2, CheckCircle } from "lucide-react"

export default function BlockchainHero() {
  const { t } = useTranslation()
  const { isInitialized, isLocked, clientAddress, unlockWallet, isLoading } = useWdk()

  const titleVariants = {
    initial: { y: "110%" },
    animate: {
      y: "0%",
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
  }

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  }

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 1.8, duration: 0.8 }
    },
  }

  const handleConnect = async () => {
    try {
      if (isLocked) {
        await unlockWallet()
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  const isConnected = isInitialized && !isLocked && clientAddress

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/main-hero-background.jpeg"
          alt="Architectural corridor with jungle view"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <div className="relative z-10 px-4 text-left max-w-5xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-micro text-white leading-tight drop-shadow-lg hero-title"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="overflow-hidden py-1">
            <motion.span className="inline-block" variants={titleVariants}>
              {t("blockchainHero.title1")}
            </motion.span>
          </div>
          <div className="overflow-hidden py-1">
            <motion.span className="inline-block text-gray-300" variants={titleVariants}>
              {t("blockchainHero.title2")}
            </motion.span>
          </div>
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg md:text-xl mt-6 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          {t("blockchainHero.subtitle")}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
        >
          {!isConnected ? (
            <button
              onClick={handleConnect}
              disabled={isLoading}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-white text-sm uppercase tracking-wider font-micro overflow-hidden border-2 border-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wallet className="mr-2 w-5 h-5" />
              <span className="relative z-10">
                {isLoading ? "Connecting..." : t("blockchainHero.connectWallet")}
              </span>
            </button>
          ) : (
            <div className="group relative inline-flex items-center justify-center px-8 py-4 text-white text-sm uppercase tracking-wider font-micro overflow-hidden border-2 border-green-500 bg-green-500/20">
              <CheckCircle className="mr-2 w-5 h-5 text-green-400" />
              <span className="relative z-10">
                {clientAddress?.slice(0, 6)}...{clientAddress?.slice(-4)}
              </span>
            </div>
          )}

          <a href="#terrain-map" className="group relative inline-flex items-center justify-center px-8 py-4 text-white text-sm uppercase tracking-wider font-micro overflow-hidden border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all duration-300">
            <Building2 className="mr-2 w-5 h-5" />
            <span className="relative z-10">{t("blockchainHero.viewProperties")}</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
