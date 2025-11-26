import { NextResponse } from 'next/server'
import WalletManagerEvm from '@tetherto/wdk-wallet-evm'
import { ethers } from 'ethers'

const AVALANCHE_FUJI_RPC = 'https://api.avax-test.network/ext/bc/C/rpc'
const CLIENT_SEED = process.env.WDK_CLIENT_SEED || 'client test seed phrase for hackathon demo only not production use'

let clientWallet: any = null

export async function POST(request: Request) {
  try {
    const { propertyId, totalPrice, depositAmount, contractAddress, contractABI } = await request.json()

    if (!clientWallet) {
      clientWallet = new WalletManagerEvm(CLIENT_SEED, {
        provider: AVALANCHE_FUJI_RPC,
        transferMaxFee: '100000000000000'
      })
    }

    const account = await clientWallet.getAccount(0)
    
    const iface = new ethers.Interface(contractABI)
    
    const data = iface.encodeFunctionData('createReservation', [
      propertyId,
      ethers.parseEther(totalPrice)
    ])

    const tx = await account.sendTransaction({
      to: contractAddress,
      value: BigInt(ethers.parseEther(depositAmount).toString()),
      data: data
    })

    return NextResponse.json({
      success: true,
      txHash: tx.hash,
      message: 'Reservation created successfully'
    })
  } catch (error: any) {
    console.error('WDK Reserve Error:', error)
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 })
  }
}
