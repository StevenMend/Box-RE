import { NextResponse } from 'next/server'
import WalletManagerEvm from '@tetherto/wdk-wallet-evm'

const AVALANCHE_FUJI_RPC = 'https://api.avax-test.network/ext/bc/C/rpc'

const CLIENT_SEED = process.env.WDK_CLIENT_SEED || 'client test seed phrase for hackathon demo only not production use'
const BOX_SEED = process.env.WDK_BOX_SEED || 'box owner test seed phrase for hackathon demo only not production'

let clientWallet: any = null
let boxWallet: any = null

export async function POST() {
  try {
    if (!clientWallet) {
      clientWallet = new WalletManagerEvm(CLIENT_SEED, {
        provider: AVALANCHE_FUJI_RPC,
        transferMaxFee: '100000000000000'
      })
    }

    if (!boxWallet) {
      boxWallet = new WalletManagerEvm(BOX_SEED, {
        provider: AVALANCHE_FUJI_RPC,
        transferMaxFee: '100000000000000'
      })
    }

    const clientAccount = await clientWallet.getAccount(0)
    const boxAccount = await boxWallet.getAccount(0)

    const clientAddress = await clientAccount.getAddress()
    const boxAddress = await boxAccount.getAddress()
    
    const clientBalance = await clientAccount.getBalance()
    const boxBalance = await boxAccount.getBalance()

    return NextResponse.json({
      success: true,
      client: {
        address: clientAddress,
        balance: clientBalance.toString()
      },
      box: {
        address: boxAddress,
        balance: boxBalance.toString()
      },
      network: 'avalanche-fuji'
    })
  } catch (error: any) {
    console.error('WDK Init Error:', error)
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 })
  }
}
