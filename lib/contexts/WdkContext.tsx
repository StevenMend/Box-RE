"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { NetworkId } from "@/config/networks"

export interface WdkAccount {
  getAddress(): Promise<string>
  getBalance(): Promise<bigint>
  sendTransaction(tx: { to: string; value: bigint; data: string }): Promise<{ hash: string }>
}

interface WdkContextType {
  isInitialized: boolean
  isLocked: boolean
  clientAddress: string | null
  boxAddress: string | null
  clientBalance: bigint | null
  boxBalance: bigint | null
  account: WdkAccount | null
  unlockWallet: () => Promise<void>
  refreshBalance: () => Promise<void>
  isLoading: boolean
  networkId: NetworkId
}

const WdkContext = createContext<WdkContextType | undefined>(undefined)

export const WdkProvider = ({ children }: { children: ReactNode }) => {
  const [isLocked, setIsLocked] = useState(true)
  const [clientAddress, setClientAddress] = useState<string | null>(null)
  const [boxAddress, setBoxAddress] = useState<string | null>(null)
  const [clientBalance, setClientBalance] = useState<bigint | null>(null)
  const [boxBalance, setBoxBalance] = useState<bigint | null>(null)
  const [account, setAccount] = useState<WdkAccount | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [networkId] = useState<NetworkId>("fuji")

  const unlockWallet = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:3002/wdk/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to initialize WDK')
      }

      setClientAddress(data.client.address)
      setBoxAddress(data.box.address)
      setClientBalance(BigInt(data.client.balance))
      setBoxBalance(BigInt(data.box.balance))
      setIsLocked(false)

      const wdkAccount: WdkAccount = {
        getAddress: async () => data.client.address,
        getBalance: async () => BigInt(data.client.balance),
        sendTransaction: async (tx) => {
          const reserveResponse = await fetch('http://localhost:3002/wdk/reserve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contractAddress: tx.to,
              data: tx.data,
              value: tx.value.toString()
            })
          })
          
          const result = await reserveResponse.json()
          
          if (!result.success) {
            throw new Error(result.error || 'Transaction failed')
          }
          
          return { hash: result.txHash }
        }
      }

      setAccount(wdkAccount)
    } catch (error: any) {
      console.error('Error unlocking WDK wallet:', error)
      alert(error.message || 'Failed to unlock wallet')
    } finally {
      setIsLoading(false)
    }
  }

  const refreshBalance = async () => {
    if (!clientAddress) return
    try {
      const response = await fetch('http://localhost:3002/wdk/init', {
        method: 'POST'
      })
      const data = await response.json()
      if (data.success) {
        setClientBalance(BigInt(data.client.balance))
        setBoxBalance(BigInt(data.box.balance))
      }
    } catch (error) {
      console.error('Error refreshing balance:', error)
    }
  }

  return (
    <WdkContext.Provider value={{ 
      isInitialized: true, 
      isLocked, 
      clientAddress,
      boxAddress,
      clientBalance,
      boxBalance,
      account,
      unlockWallet,
      refreshBalance,
      isLoading,
      networkId
    }}>
      {children}
    </WdkContext.Provider>
  )
}

export const useWdk = () => {
  const context = useContext(WdkContext)
  if (!context) throw new Error("useWdk must be used within WdkProvider")
  return context
}
