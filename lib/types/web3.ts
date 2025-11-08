export interface WalletState {
  address: string | null
  isConnected: boolean
  chainId: number | null
  balance: string | null
  isConnecting: boolean
  error: string | null
}

export interface TerrainReservation {
  terrainId: number
  terrainTitle: string
  price: string
  depositAmount: string
  buyerAddress: string
  contractAddress: string
  transactionHash: string | null
  status: 'pending' | 'confirmed' | 'failed'
  createdAt: Date
}

export interface SmartContractConfig {
  address: string
  abi: any[]
}

export const AVALANCHE_FUJI_TESTNET = {
  chainId: 43113,
  chainName: 'Avalanche Fuji C-Chain',
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://testnet.snowtrace.io/']
}
