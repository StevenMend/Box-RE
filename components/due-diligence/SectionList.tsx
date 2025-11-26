"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, ChevronDown, ChevronUp, LucideIcon } from "lucide-react"

interface Section {
  icon: LucideIcon
  title: string
  content: string | string[]
  color: string
}

interface SectionListProps {
  sections: Section[]
}

export default function SectionList({ sections }: SectionListProps) {
  const [expandedSection, setExpandedSection] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {sections.map((section, index) => {
        const IconComponent = section.icon
        const isExpanded = expandedSection === index
        
        return (
          <motion.div
            key={index}
            className="bg-black/40 border border-white/20 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <button
              onClick={() => setExpandedSection(isExpanded ? null : index)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg bg-black/50 ${section.color}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-white text-sm">
                  {section.title}
                </h3>
              </div>
              {isExpanded ? 
                <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : 
                <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
              }
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 pt-0 space-y-2 border-t border-white/10">
                    {Array.isArray(section.content) ? 
                      section.content.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-gray-300 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      )) :
                      <p className="text-gray-300 text-xs">{section.content}</p>
                    }
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
