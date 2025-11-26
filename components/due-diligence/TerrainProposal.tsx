"use client"

import { FileText } from "lucide-react"

interface TerrainProposalProps {
  proposalData: {
    propertyNumber: string
    province: string
    owner: string
    area: string
    legalStatus: string
    zoning: string
    access: string
    potential: string
    basePrice: string
    deposit: string
  }
  terrainTitle: string
  getTerrainTranslation: (key: string) => string
}

export default function TerrainProposal({ 
  proposalData, 
  terrainTitle,
  getTerrainTranslation 
}: TerrainProposalProps) {
  return (
    <div className="bg-black/50 border border-white/20 rounded-lg p-3 mt-4">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="w-4 h-4 text-gray-400" />
        <h4 className="font-medium text-white text-sm">
          {terrainTitle} - {getTerrainTranslation('dueDiligenceGuide.proposal')}
        </h4>
      </div>

      <div className="space-y-2 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-gray-400">{getTerrainTranslation('dueDiligenceGuide.finca')}:</span>
            <div className="text-gray-200 font-medium">{proposalData.propertyNumber}</div>
          </div>
          <div>
            <span className="text-gray-400">{getTerrainTranslation('dueDiligenceGuide.area')}:</span>
            <div className="text-gray-200 font-medium">{proposalData.area}</div>
          </div>
        </div>

        <div>
          <span className="text-gray-400">{getTerrainTranslation('dueDiligenceGuide.legalStatus')}:</span>
          <div className="text-green-400 font-medium">{proposalData.legalStatus}</div>
        </div>

        <div className="border-t border-white/20 pt-2">
          <h5 className="text-gray-200 font-medium mb-1 text-xs">
            {getTerrainTranslation('dueDiligenceGuide.financialProjection')}
          </h5>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">{getTerrainTranslation('dueDiligenceGuide.price')}:</span>
              <span className="text-gray-200 font-medium">{proposalData.basePrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{getTerrainTranslation('dueDiligenceGuide.deposit')}:</span>
              <span className="text-blue-400 font-medium">{proposalData.deposit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
