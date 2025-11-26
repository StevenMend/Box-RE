import { ethers } from 'ethers'
import fs from 'fs'
import path from 'path'

async function main() {
  // Leer contrato compilado
  const contractJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../contracts/RealEstateEscrow.json'), 'utf8')
  )
  
  // Conectar a Avalanche local
  const provider = new ethers.JsonRpcProvider('http://127.0.0.1:9650/ext/bc/C/rpc')
  
  // Obtener la cuenta pre-funded de Avalanche local
  // En Avalanche local, esta es una de las cuentas con fondos
  const privateKey = '0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027'
  const wallet = new ethers.Wallet(privateKey, provider)
  
  console.log('🚀 Deploying from:', wallet.address)
  
  // Deploy
  const factory = new ethers.ContractFactory(contractJson.abi, contractJson.bytecode, wallet)
  const contract = await factory.deploy()
  
  console.log('⏳ Waiting for deployment...')
  await contract.waitForDeployment()
  
  const address = await contract.getAddress()
  console.log('✅ Contract deployed to:', address)
  
  // Guardar address
  const deployedContracts = {
    RealEstateEscrow: {
      address,
      abi: contractJson.abi
    }
  }
  
  fs.writeFileSync(
    path.join(__dirname, '../lib/deployedContracts.ts'),
    `export const DEPLOYED_CONTRACTS = ${JSON.stringify(deployedContracts, null, 2)}`
  )
  
  console.log('📝 Contract info saved to lib/deployedContracts.ts')
}

main().catch(console.error)
