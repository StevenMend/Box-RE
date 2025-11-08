"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function RealEstateHero() {
  const { t } = useTranslation()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    "/images/imagenhero.jpg",
    "/images/imagenhero2.jpg",
    "/images/imagenhero3.jpg",
  ]

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(interval)
  }, [images.length])

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

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      {/* Background Image Slideshow with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ 
              opacity: { duration: 1.5 },
              scale: { duration: 8, ease: "linear" }
            }}
          >
            <Image
              src={images[currentImageIndex]}
              alt={`Luxury real estate ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay más oscuro para mejor contraste con texto */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 text-left max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-micro text-white leading-tight drop-shadow-lg hero-title"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="overflow-hidden py-1">
            <motion.span className="inline-block" variants={titleVariants}>
              {t("reHero.title1")}
            </motion.span>
          </div>
          <div className="overflow-hidden py-1">
            <motion.span className="inline-block text-gray-300" variants={titleVariants}>
              {t("reHero.title2")}
            </motion.span>
          </div>
        </motion.h1>

        {/* Subtítulo opcional - minimalista */}
        <motion.p
          className="text-gray-300 text-lg md:text-xl mt-6 max-w-2xl font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          {t("reHero.subtitle")}
        </motion.p>

        {/* CTA Buttons - VIOLENTOS */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          {/* CTA principal - Ver Mapa */}
          <motion.a
            href="#terrain-map"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-micro uppercase text-sm tracking-wider overflow-hidden rounded transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              {t("reHero.exploreCTA")}
            </span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 group-hover:text-white" />
          </motion.a>

          {/* CTA secundario - Ver Propiedades */}
          <motion.a
            href="#propiedades"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/40 text-white font-micro uppercase text-sm tracking-wider backdrop-blur-sm overflow-hidden rounded transition-all duration-300"
            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.8)" }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glassmorphism hover effect */}
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">
              {t("reHero.propertiesCTA")}
            </span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>

      {/* Slide Indicators - Minimalistas */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.8 }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentImageIndex
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </motion.div>
    </section>
  )
}