const express = require('express')
const cors = require('cors')
const WalletManagerEvm = require('@tetherto/wdk-wallet-evm').default
const { ethers } = require('ethers')

const app = express()
app.use(cors())
app.use(express.json())

const AVALANCHE_FUJI_RPC = 'https://api.avax-test.network/ext/bc/C/rpc'

const CLIENT_SEED = 'test walk armed seed phrase example client demo only never use production wallet'
const BOX_SEED = 'test walk armed seed phrase example owner demo only never use production company'

let clientWallet = null
let boxWallet = null

app.post('/wdk/init', async (req, res) => {
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

    res.json({
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
  } catch (error) {
    console.error('WDK Init Error:', error)
    res.status(500).json({ 
      success: false,
      error: error.message 
    })
  }
})

app.post('/wdk/reserve', async (req, res) => {
  try {
    const { propertyId, totalPrice, depositAmount, contractAddress, contractABI } = req.body

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

    res.json({
      success: true,
      txHash: tx.hash,
      message: 'Reservation created'
    })
  } catch (error) {
    console.error('WDK Reserve Error:', error)
    res.status(500).json({ 
      success: false,
      error: error.message 
    })
  }
})

const PORT = 3002
app.listen(PORT, () => {
  console.log('🚀 WDK Server running on http://localhost:3002')
})
