"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ethers } from "ethers"
import { WalletState, AVALANCHE_FUJI_TESTNET } from "./types/web3"

interface WalletContextType extends WalletState {
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchToAvalanche: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null,
    balance: null,
    isConnecting: false,
    error: null
  })

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const checkIfWalletIsConnected = async () => {
    try {
      if (typeof window === 'undefined' || !window.ethereum) return

      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.listAccounts()

      if (accounts.length > 0) {
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const network = await provider.getNetwork()
        const balance = await provider.getBalance(address)

        setWalletState({
          address,
          isConnected: true,
          chainId: Number(network.chainId),
          balance: ethers.formatEther(balance),
          isConnecting: false,
          error: null
        })
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error)
    }
  }

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      setWalletState(prev => ({
        ...prev,
        error: "MetaMask is not installed. Please install MetaMask to continue."
      }))
      return
    }

    try {
      setWalletState(prev => ({ ...prev, isConnecting: true, error: null }))

      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      const network = await provider.getNetwork()
      const balance = await provider.getBalance(address)

      setWalletState({
        address,
        isConnected: true,
        chainId: Number(network.chainId),
        balance: ethers.formatEther(balance),
        isConnecting: false,
        error: null
      })

      if (Number(network.chainId) !== AVALANCHE_FUJI_TESTNET.chainId) {
        await switchToAvalanche()
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error)
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || "Failed to connect wallet"
      }))
    }
  }

  const switchToAvalanche = async () => {
    if (typeof window === 'undefined' || !window.ethereum) return

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${AVALANCHE_FUJI_TESTNET.chainId.toString(16)}` }],
      })
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${AVALANCHE_FUJI_TESTNET.chainId.toString(16)}`,
                chainName: AVALANCHE_FUJI_TESTNET.chainName,
                nativeCurrency: AVALANCHE_FUJI_TESTNET.nativeCurrency,
                rpcUrls: AVALANCHE_FUJI_TESTNET.rpcUrls,
                blockExplorerUrls: AVALANCHE_FUJI_TESTNET.blockExplorerUrls
              },
            ],
          })
        } catch (addError) {
          console.error("Error adding Avalanche network:", addError)
        }
      }
    }
  }

  const disconnectWallet = () => {
    setWalletState({
      address: null,
      isConnected: false,
      chainId: null,
      balance: null,
      isConnecting: false,
      error: null
    })
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet()
      } else {
        checkIfWalletIsConnected()
      }
    }

    const handleChainChanged = () => {
      window.location.reload()
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum?.removeListener('chainChanged', handleChainChanged)
    }
  }, [])

  return (
    <WalletContext.Provider 
      value={{ 
        ...walletState, 
        connectWallet, 
        disconnectWallet,
        switchToAvalanche
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

declare global {
  interface Window {
    ethereum?: any
  }
}