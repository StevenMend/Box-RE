"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, Send, MessageSquare, MapPin } from "lucide-react"

interface ContactFormProps {
  formData: {
    fullName: string
    email: string
    whatsapp: string
    terrain: string
    message: string
  }
  onInputChange: (field: string, value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onEasyChat: () => void
  isLoading: boolean
  selectedTerrain?: any
  getTerrainTranslation: (key: string) => string
}

export default function ContactForm({
  formData,
  onInputChange,
  onSubmit,
  onEasyChat,
  isLoading,
  selectedTerrain,
  getTerrainTranslation
}: ContactFormProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let value = e.target.value
    if (!value.startsWith('+')) {
      value = '+' + value.replace(/^\+/, '')
    }
    if (value === '') {
      value = '+'
    }
    onInputChange('whatsapp', value)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="mb-4">
        <h3 className="text-base font-medium text-white mb-1">
          {getTerrainTranslation('dueDiligenceGuide.contactForm.title')}
        </h3>
        <p className="text-gray-300 text-xs mb-3">
          {getTerrainTranslation('dueDiligenceGuide.contactForm.subtitle')}
        </p>
      </div>

      <div className="space-y-3">
        {/* Name */}
        <div>
          <Label htmlFor="fullName" className="text-white font-medium flex items-center text-sm mb-2">
            <User className="w-4 h-4 mr-2 text-gray-400" />
            {getTerrainTranslation('dueDiligenceGuide.contactForm.nameLabel')} *
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => onInputChange('fullName', e.target.value)}
            onFocus={() => setFocusedField('fullName')}
            onBlur={() => setFocusedField(null)}
            placeholder={getTerrainTranslation('dueDiligenceGuide.contactForm.namePlaceholder')}
            className={`bg-black border-white/20 focus:border-white transition-all duration-300 pl-4 h-11 text-sm ${
              focusedField === 'fullName' ? 'ring-2 ring-white/20' : ''
            }`}
            required
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-white font-medium flex items-center text-sm mb-2">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            {getTerrainTranslation('dueDiligenceGuide.contactForm.emailLabel')} *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            placeholder={getTerrainTranslation('dueDiligenceGuide.contactForm.emailPlaceholder')}
            className={`bg-black border-white/20 focus:border-white transition-all duration-300 pl-4 h-11 text-sm ${
              focusedField === 'email' ? 'ring-2 ring-white/20' : ''
            }`}
            required
          />
        </div>

        {/* WhatsApp */}
        <div>
          <Label htmlFor="whatsapp" className="text-white font-medium flex items-center text-sm mb-2">
            <Phone className="w-4 h-4 mr-2 text-gray-400" />
            {getTerrainTranslation('dueDiligenceGuide.contactForm.phoneLabel')}
          </Label>
          <Input
            id="whatsapp"
            type="tel"
            value={formData.whatsapp}
            onChange={handleWhatsAppChange}
            onFocus={() => setFocusedField('whatsapp')}
            onBlur={() => setFocusedField(null)}
            placeholder={getTerrainTranslation('dueDiligenceGuide.contactForm.phonePlaceholder')}
            className={`bg-black border-white/20 focus:border-white transition-all duration-300 pl-4 h-11 text-sm ${
              focusedField === 'whatsapp' ? 'ring-2 ring-white/20' : ''
            }`}
          />
        </div>

        {/* Terrain Selection */}
        <div>
          <Label className="text-white font-medium flex items-center text-sm mb-2">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            {getTerrainTranslation('dueDiligenceGuide.contactForm.terrainLabel')}
          </Label>
          <div className="bg-black border border-white/20 rounded-lg p-3 text-sm">
            <div className="text-white font-medium">
              {selectedTerrain?.title || getTerrainTranslation('dueDiligenceGuide.contactForm.generalConsult')}
            </div>
            <div className="text-gray-400 text-xs mt-1">
              {selectedTerrain?.location || getTerrainTranslation('dueDiligenceGuide.contactForm.multipleLocations')} • {selectedTerrain?.area || getTerrainTranslation('dueDiligenceGuide.contactForm.variousOptions')}
            </div>
            {selectedTerrain?.price && (
              <div className="text-blue-400 text-xs mt-1 font-medium">{selectedTerrain.price}</div>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="text-white font-medium flex items-center text-sm mb-2">
            <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
            {getTerrainTranslation('dueDiligenceGuide.contactForm.messageLabel')} *
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => onInputChange('message', e.target.value)}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            placeholder={getTerrainTranslation('dueDiligenceGuide.contactForm.messagePlaceholder')}
            rows={3}
            className={`bg-black border-white/20 focus:border-white resize-none transition-all duration-300 text-sm ${
              focusedField === 'message' ? 'ring-2 ring-white/20' : ''
            }`}
            required
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-2 space-y-3">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full angular-button disabled:opacity-50 disabled:cursor-not-allowed h-11 !flex !items-center !justify-center text-sm"
        >
          <Send className="mr-2 w-4 h-4" />
          {isLoading ? getTerrainTranslation('dueDiligenceGuide.contactForm.sending') : getTerrainTranslation('dueDiligenceGuide.contactForm.submitButton')}
          <div className="angular-button-overlay" />
        </Button>
        
        <button
          type="button"
          onClick={onEasyChat}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm border border-green-500/30 hover:border-green-500/50"
        >
          <MessageSquare className="w-4 h-4" />
          {getTerrainTranslation('dueDiligenceGuide.contactForm.easyChat')}
        </button>
      </div>
    </form>
  )
}
