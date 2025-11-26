"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  X,
  FileText,
  MessageCircle,
  PlayCircle,
  Wallet
} from "lucide-react"
import { useWdk } from "@/lib/contexts/WdkContext"

interface TerrainModalProps {
  selectedTerrain: any
  onClose: () => void
  onDueDiligenceClick: () => void
  onWhatsAppClick: () => void
  onVideoClick: () => void
  onSmartContractClick: () => void 
  getTerrainTranslation: (key: string) => string
}

export default function TerrainModal({
  selectedTerrain,
  onDueDiligenceClick,
  onWhatsAppClick,
  onVideoClick,
  onSmartContractClick,
  getTerrainTranslation,
  onClose
}: TerrainModalProps) {
  if (!selectedTerrain) return null
  
  const { isLocked, clientAddress, unlockWallet, isLoading } = useWdk()
  const isConnected = !isLocked && !!clientAddress

  console.log('🔍 TerrainModal Debug:', { isLocked, clientAddress, isConnected })

  const handleWalletAction = async () => {
    if (isConnected) {
      onSmartContractClick()
    } else {
      await unlockWallet()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">{selectedTerrain.title}</h3>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-300 mt-2">{selectedTerrain.location}</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800/50 p-4 rounded-xl">
                <div className="text-gray-400 text-sm mb-1">{getTerrainTranslation('terrainModal.areaM2')}</div>
                <div className="text-white font-semibold text-lg">{selectedTerrain.area}</div>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-xl">
                <div className="text-gray-400 text-sm mb-1">{getTerrainTranslation('terrainModal.price')}</div>
                <div className="text-white font-semibold text-lg">{selectedTerrain.price}</div>
              </div>
            </div>

            {selectedTerrain.amenities && (
              <div className="bg-zinc-800/30 p-6 rounded-xl">
                <h4 className="text-white font-semibold mb-4">{getTerrainTranslation('terrainModal.premiumAmenities')}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {Object.entries(selectedTerrain.amenities).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button 
                onClick={handleWalletAction}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-4 px-6 rounded-xl font-medium hover:from-purple-700 hover:to-indigo-800 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <Wallet className="w-5 h-5" />
                {isLoading ? 'Connecting...' : isConnected ? getTerrainTranslation('terrainModal.reserveSmartContract') : 'Connect Wallet'}
              </button>

              <button 
                onClick={onDueDiligenceClick}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-colors flex items-center justify-center gap-3"
              >
                <FileText className="w-5 h-5" />
                {getTerrainTranslation('terrainModal.basicGuide')}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={onWhatsAppClick}
                  className="bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
                <button 
                  onClick={onVideoClick}
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 rounded-xl font-medium hover:from-orange-700 hover:to-red-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <PlayCircle className="w-4 h-4" />
                  Video
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
