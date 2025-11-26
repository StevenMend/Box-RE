"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useWdk } from "@/lib/contexts/WdkContext"
import { DEPLOYED_CONTRACTS } from "@/lib/deployedContracts"

interface Props {
  terrain: any
  onClose: () => void
}

export default function BlockchainReservationModal({ terrain, onClose }: Props) {
  const { account, clientAddress, isLocked, unlockWallet, isLoading: walletLoading } = useWdk()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [txHash, setTxHash] = useState('')
  const [error, setError] = useState('')

  // MONTOS DE PRUEBA - MUY REDUCIDOS
  const DEMO_TOTAL_AVAX = 0.01  // Total: 0.01 AVAX (~$0.40)
  const DEMO_DEPOSIT_AVAX = 0.001 // Depósito 10%: 0.001 AVAX (~$0.04)

  const priceInUSD = parseFloat(terrain.price.replace(/[^0-9.]/g, ''))

  const isWalletConnected = !isLocked && !!clientAddress

  console.log('🔍 Modal Debug:', { isLocked, clientAddress, isWalletConnected, account })

  const handleReserve = async () => {
    if (!account) {
      setError('Wallet not connected')
      return
    }

    try {
      setStatus('loading')
      
      const response = await fetch('http://localhost:3002/wdk/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: terrain.title,
          totalPrice: DEMO_TOTAL_AVAX.toFixed(4),
          depositAmount: DEMO_DEPOSIT_AVAX.toFixed(4),
          contractAddress: DEPLOYED_CONTRACTS.RealEstateEscrow.address,
          contractABI: DEPLOYED_CONTRACTS.RealEstateEscrow.abi
        })
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Transaction failed')
      }

      setTxHash(result.txHash)
      setStatus('success')
    } catch (err: any) {
      console.error('Reservation error:', err)
      setError(err.message || 'Failed to create reservation')
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90" onClick={onClose}>
        <motion.div className="bg-gradient-to-br from-purple-900 to-indigo-900 border border-purple-500/30 rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">WDK Blockchain Reservation</h2>
            <button onClick={onClose}><X className="w-6 h-6 text-gray-400 hover:text-white" /></button>
          </div>

          {!isWalletConnected ? (
            <div className="text-center py-8">
              <div className="text-white mb-4">Connect your WDK wallet to continue</div>
              <button onClick={unlockWallet} disabled={walletLoading} className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-gray-100 disabled:opacity-50">
                {walletLoading ? 'Connecting...' : 'Connect WDK Wallet'}
              </button>
            </div>
          ) : status === 'idle' ? (
            <>
              <div className="space-y-4 mb-6">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-gray-400 text-xs">WDK Client Address</div>
                  <div className="text-white text-sm font-mono">{clientAddress}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Property</div>
                  <div className="text-white font-semibold">{terrain.title}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-400 text-sm">Real Price</div>
                    <div className="text-white">{terrain.price}</div>
                    <div className="text-yellow-400 text-xs mt-1">Demo: {DEMO_TOTAL_AVAX} AVAX</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">10% Deposit</div>
                    <div className="text-green-400">{DEMO_DEPOSIT_AVAX} AVAX</div>
                    <div className="text-gray-400 text-xs">(Demo amount)</div>
                  </div>
                </div>
              </div>
              <button onClick={handleReserve} className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-gray-100">
                Pay {DEMO_DEPOSIT_AVAX} AVAX via WDK (Demo)
              </button>
            </>
          ) : status === 'loading' ? (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-purple-400" />
              <div className="text-white">Processing WDK transaction...</div>
            </div>
          ) : status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
              <div className="text-white font-bold mb-2">Reservation Successful! 🎉</div>
              <div className="text-gray-300 text-sm mb-4">
                Your property has been reserved using WDK
              </div>
              {txHash && (
                <div className="bg-white/10 rounded-lg p-3 mb-4">
                  <div className="text-gray-400 text-xs mb-1">Transaction Hash</div>
                  <div className="text-white text-xs font-mono break-all">{txHash}</div>
                </div>
              )}
              <button onClick={onClose} className="w-full bg-white text-black py-3 rounded-xl">Close</button>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
              <div className="text-white mb-2">Transaction Failed</div>
              <div className="text-gray-400 text-sm mb-4 max-h-32 overflow-y-auto">{error}</div>
              <button onClick={() => setStatus('idle')} className="w-full bg-white text-black py-3 rounded-xl">Try Again</button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
