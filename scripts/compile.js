const solc = require('solc')
const fs = require('fs')
const path = require('path')

const contractPath = path.join(__dirname, '../contracts/RealEstateEscrow.sol')
const source = fs.readFileSync(contractPath, 'utf8')

const input = {
  language: 'Solidity',
  sources: {
    'RealEstateEscrow.sol': { content: source }
  },
  settings: {
    outputSelection: {
      '*': { '*': ['abi', 'evm.bytecode'] }
    }
  }
}

const output = JSON.parse(solc.compile(JSON.stringify(input)))
const contract = output.contracts['RealEstateEscrow.sol']['RealEstateEscrow']

fs.writeFileSync(
  path.join(__dirname, '../contracts/RealEstateEscrow.json'),
  JSON.stringify({
    abi: contract.abi,
    bytecode: contract.evm.bytecode.object
  }, null, 2)
)

console.log('✅ Contract compiled!')
