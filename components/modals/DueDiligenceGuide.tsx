"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Shield, MapPin, Eye, DollarSign, Leaf, CheckCircle } from "lucide-react"
import { terrainTranslations } from '@/lib/terrain-translations'
import { useTranslation } from "@/lib/i18n"
import ContactForm from "../due-diligence/ContactForm"
import TerrainProposal from "../due-diligence/TerrainProposal"
import SectionList from "../due-diligence/SectionList"

interface DueDiligenceGuideProps {
  isOpen: boolean
  onClose: () => void
  selectedTerrain?: any
}

export default function DueDiligenceGuide({ 
  isOpen, 
  onClose, 
  selectedTerrain 
}: DueDiligenceGuideProps) {
  const { language } = useTranslation()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '+',
    terrain: selectedTerrain?.title || '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const getTerrainTranslation = (key: string) => {
    const lang = language as 'es' | 'en'
    const keys = key.split('.')
    let value = terrainTranslations[lang]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleEasyChat = async () => {
    const whatsappNumber = "+50661681784"
    const terrainInfo = selectedTerrain ? `${selectedTerrain.title} (${selectedTerrain.location})` : getTerrainTranslation('dueDiligenceGuide.contactForm.terrainPlaceholder')
    const message = `${getTerrainTranslation('dueDiligenceGuide.whatsappMessage')} ${terrainInfo}${formData.fullName ? `. ${getTerrainTranslation('dueDiligenceGuide.myName')} ${formData.fullName}` : ''}${formData.email ? ` ${getTerrainTranslation('dueDiligenceGuide.myEmail')} ${formData.email}` : ''}.`
    
    try {
      const notificationPayload = {
        type: 'easy_chat_used',
        terrain: terrainInfo,
        user_name: formData.fullName || 'No proporcionado',
        user_email: formData.email || 'No proporcionado',
        user_whatsapp: formData.whatsapp || 'No proporcionado',
        timestamp: new Date().toISOString(),
        _subject: `🟢 Easy Chat usado - ${terrainInfo}`,
        _replyto: 'noreply@boxarchitects.com'
      }

      fetch('https://formspree.io/f/mrbqbqbj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPayload)
      }).catch(() => {})
    } catch (error) {}
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!formData.fullName || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: getTerrainTranslation('dueDiligenceGuide.contactForm.errorMessage')
      })
      return
    }
    
    setIsLoading(true)
    setStatus({ type: '', message: '' })
    
    const formPayload = {
      name: formData.fullName,
      email: formData.email,
      whatsapp: formData.whatsapp,
      terrain: formData.terrain,
      message: formData.message,
      _subject: `Nueva consulta de Due Diligence - ${formData.fullName}`,
      _replyto: formData.email
    }
    
    try {
      const [response1, response2] = await Promise.all([
        fetch('https://formspree.io/f/mjkrpapq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formPayload)
        }),
        fetch('https://formspree.io/f/mrbqbqbj', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formPayload)
        })
      ])
      
      if (response1.ok || response2.ok) {
        setStatus({
          type: 'success',
          message: getTerrainTranslation('dueDiligenceGuide.contactForm.successMessage')
        })
        
        setFormData({
          fullName: '',
          email: '',
          whatsapp: '+',
          terrain: '',
          message: ''
        })
      } else {
        throw new Error('Error en ambos envíos')
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: getTerrainTranslation('dueDiligenceGuide.contactForm.errorMessage')
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ type: "", message: "" })
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [status.message])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isOpen])

  const sections = [
    {
      icon: Shield,
      title: getTerrainTranslation('dueDiligenceGuide.sections.legalVerification.title'),
      content: getTerrainTranslation('dueDiligenceGuide.sections.legalVerification.content'),
      color: 'text-green-400'
    },
    {
      icon: MapPin,
      title: getTerrainTranslation('dueDiligenceGuide.sections.municipalPermits.title'),
      content: getTerrainTranslation('dueDiligenceGuide.sections.municipalPermits.content'),
      color: 'text-blue-400'
    },
    {
      icon: Eye,
      title: getTerrainTranslation('dueDiligenceGuide.sections.physicalInspection.title'),
      content: getTerrainTranslation('dueDiligenceGuide.sections.physicalInspection.content'),
      color: 'text-purple-400'
    },
    {
      icon: DollarSign,
      title: getTerrainTranslation('dueDiligenceGuide.sections.financialAnalysis.title'),
      content: getTerrainTranslation('dueDiligenceGuide.sections.financialAnalysis.content'),
      color: 'text-yellow-400'
    },
    {
      icon: Leaf,
      title: getTerrainTranslation('dueDiligenceGuide.sections.environmentalChecks.title'),
      content: getTerrainTranslation('dueDiligenceGuide.sections.environmentalChecks.content'),
      color: 'text-emerald-400'
    }
  ]

  const getTerrainProposal = () => {
    if (!selectedTerrain) return null

    const calculateDeposit = (price: string) => {
      if (!price || price.toLowerCase().includes('consultar') || price.toLowerCase().includes('request')) {
        return getTerrainTranslation('terrainModal.depositConsult')
      }
      
      const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''))
      
      if (isNaN(numericPrice) || numericPrice === 0) {
        return getTerrainTranslation('terrainModal.depositConsult')
      }
      
      const deposit = numericPrice * 0.10
      return `$${deposit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    }

    return {
      propertyNumber: selectedTerrain.registryData?.fincaNumber || "En proceso",
      province: selectedTerrain.registryData?.province || "Guanacaste",
      owner: selectedTerrain.registryData?.owner || "Disponible",
      area: selectedTerrain.area,
      legalStatus: selectedTerrain.registryData?.status || "Título limpio",
      zoning: selectedTerrain.investmentData?.zoning || "Residencial / Comercial",
      access: selectedTerrain.investmentData?.access || "Acceso directo",
      potential: selectedTerrain.investmentData?.potential || "Alto potencial",
      basePrice: selectedTerrain.price || "Consultar",
      deposit: calculateDeposit(selectedTerrain.price || "Consultar")
    }
  }

  const proposalData = getTerrainProposal()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="h-full overflow-y-auto">
            <motion.div
              className="min-h-screen flex items-start justify-center p-2 md:p-4 md:items-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-6xl bg-black rounded-2xl shadow-2xl border border-white/20 overflow-hidden mt-4 md:mt-0">
                
                {/* Toast */}
                <AnimatePresence>
                  {status.message && (
                    <div className="fixed top-4 left-4 right-4 z-[60] flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: -30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.9 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className={`px-4 py-3 rounded-xl text-sm font-medium text-center backdrop-blur-md border shadow-2xl max-w-sm ${
                          status.type === 'success' 
                            ? 'bg-emerald-500/90 text-white border-emerald-500/50' 
                            : 'bg-red-500/90 text-white border-red-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {status.type === 'success' && <CheckCircle className="w-4 h-4" />}
                          <span className="break-words">{status.message}</span>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/20 bg-black/50">
                  <div>
                    <h1 className="text-lg md:text-2xl font-semibold text-white">
                      {getTerrainTranslation('dueDiligenceGuide.title')}
                    </h1>
                    <p className="text-gray-300 text-sm mt-1">
                      {getTerrainTranslation('dueDiligenceGuide.subtitle')}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-white transition-colors rounded-xl hover:bg-white/10 flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Layout */}
                <div className="block md:hidden">
                  <div className="p-4 space-y-3 bg-black border-b border-white/20">
                    <SectionList sections={sections} />
                  </div>

                  <div className="p-4 bg-black/30">
                    <ContactForm
                      formData={formData}
                      onInputChange={handleInputChange}
                      onSubmit={handleSubmit}
                      onEasyChat={handleEasyChat}
                      isLoading={isLoading}
                      selectedTerrain={selectedTerrain}
                      getTerrainTranslation={getTerrainTranslation}
                    />
                    {proposalData && (
                      <TerrainProposal
                        proposalData={proposalData}
                        terrainTitle={selectedTerrain?.title}
                        getTerrainTranslation={getTerrainTranslation}
                      />
                    )}
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex">
                  <div className="flex-1 overflow-y-auto p-6 max-h-[80vh]">
                    <SectionList sections={sections} />
                  </div>

                  <div className="w-80 border-l border-white/20 overflow-y-auto max-h-[80vh] bg-black/20 p-6">
                    <ContactForm
                      formData={formData}
                      onInputChange={handleInputChange}
                      onSubmit={handleSubmit}
                      onEasyChat={handleEasyChat}
                      isLoading={isLoading}
                      selectedTerrain={selectedTerrain}
                      getTerrainTranslation={getTerrainTranslation}
                    />
                    {proposalData && (
                      <TerrainProposal
                        proposalData={proposalData}
                        terrainTitle={selectedTerrain?.title}
                        getTerrainTranslation={getTerrainTranslation}
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}