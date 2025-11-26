"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Loader } from "@googlemaps/js-api-loader"
import { MapPin, Shield, TrendingUp } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { useTerrainData } from "@/hooks/use-terrain-data"
import MapContainer from "./map/MapContainer"
import TerrainModal from "./TerrainModal"
import DueDiligenceGuide from "./DueDiligenceGuide"
import BlockchainReservationModal from "./BlockchainReservationModal"

export default function InteractiveTerrainMap() {
  const { language } = useTranslation()
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [mapLoading, setMapLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)
  const [selectedTerrain, setSelectedTerrain] = useState<any>(null)
  const [showDueDiligence, setShowDueDiligence] = useState(false)
  const [showBlockchainReservation, setShowBlockchainReservation] = useState(false)

  const { terrains, loading: dataLoading, error: dataError, getTerrainTranslation } = useTerrainData(language)

  const layerStyles = {
    legal: {
      clean: { strokeColor: "#10B981", fillColor: "#10B981", fillOpacity: 0.2 },
      pending: { strokeColor: "#F59E0B", fillColor: "#F59E0B", fillOpacity: 0.2 },
      complex: { strokeColor: "#EF4444", fillColor: "#EF4444", fillOpacity: 0.2 }
    }
  }

  const handleDueDiligenceClick = () => {
    setShowDueDiligence(true)
  }

  const handleWhatsAppClick = async () => {
    const whatsappNumber = "+50661681784"
    const message = selectedTerrain 
      ? `Hola! Me interesa el terreno: ${selectedTerrain.title} (${selectedTerrain.location}). ¿Podrías darme más información?`
      : "Hola! Me interesa obtener información sobre los terrenos disponibles."
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const handleVideoClick = async () => {
    const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    window.open(videoUrl, '_blank')
  }

  const handleSmartContractClick = async () => {
    setShowBlockchainReservation(true)
  }

  useEffect(() => {
    let isMounted = true

    const initMap = async () => {
      if (terrains.length === 0) return

      try {
        const loader = new Loader({
          apiKey: "AIzaSyB43q02l5WGOg37weZpzPOdc3a_MEm_fhE",
          version: "weekly",
          libraries: ["places", "geometry", "marker"]
        })

        await loader.load()
        
        if (!isMounted || !mapRef.current) return

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 10.2461, lng: -85.8097 },
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          disableDefaultUI: true,
          gestureHandling: "cooperative",
          mapId: "terrain_map",
        })

        if (!isMounted) return
        setMap(mapInstance)

        terrains.forEach((terrain) => {
          const markerColor = terrain.registryData.legalStatus === 'clean' ? '#10B981' : 
                             terrain.registryData.legalStatus === 'pending' ? '#F59E0B' : '#EF4444'
          
          const marker = new google.maps.Marker({
            position: terrain.coordinates,
            map: mapInstance,
            title: terrain.title,
          })

          marker.addListener("click", () => {
            setSelectedTerrain(terrain)
          })

          if (terrain.polygonCoords && terrain.polygonCoords.length > 0) {
            const style = layerStyles.legal[terrain.registryData.legalStatus as keyof typeof layerStyles.legal]
            
            const terrainPolygon = new google.maps.Polygon({
              paths: terrain.polygonCoords,
              strokeColor: style.strokeColor,
              strokeOpacity: 0.8,
              strokeWeight: 3,
              fillColor: style.fillColor,
              fillOpacity: style.fillOpacity,
              map: mapInstance
            })

            terrainPolygon.addListener("click", () => {
              setSelectedTerrain(terrain)
            })
          }
        })

        if (isMounted) {
          setMapLoading(false)
        }
      } catch (err) {
        console.error("Error loading map:", err)
        if (isMounted) {
          setMapError(getTerrainTranslation('terrainMap.error'))
          setMapLoading(false)
        }
      }
    }

    initMap()

    return () => {
      isMounted = false
    }
  }, [terrains])

  if (dataLoading) {
    return (
      <section id="terrain-map" className="py-16 md:py-24 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-7xl relative">
          <div className="flex items-center justify-center h-96">
            <div className="text-white text-lg">Cargando datos de terrenos...</div>
          </div>
        </div>
      </section>
    )
  }

  if (dataError) {
    return (
      <section id="terrain-map" className="py-16 md:py-24 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-7xl relative">
          <div className="flex items-center justify-center h-96">
            <div className="text-red-400 text-lg">{dataError}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="terrain-map" className="py-16 md:py-24 px-4 bg-zinc-950">
      <div className="container mx-auto max-w-7xl relative">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {getTerrainTranslation('terrainMap.title')}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
            {getTerrainTranslation('terrainMap.subtitle')}
          </p>
        </motion.div>

        <MapContainer map={map} loading={mapLoading} error={mapError}>
          <div ref={mapRef} className="w-full h-[70vh] min-h-[500px] rounded-3xl" />
        </MapContainer>

        {selectedTerrain && (
          <TerrainModal
            selectedTerrain={selectedTerrain}
            onClose={() => setSelectedTerrain(null)}
            onDueDiligenceClick={handleDueDiligenceClick}
            onWhatsAppClick={handleWhatsAppClick}
            onVideoClick={handleVideoClick}
            onSmartContractClick={handleSmartContractClick}
            getTerrainTranslation={getTerrainTranslation}
          />
        )}

        <DueDiligenceGuide 
          isOpen={showDueDiligence}
          onClose={() => setShowDueDiligence(false)}
          selectedTerrain={selectedTerrain}
        />

        {showBlockchainReservation && selectedTerrain && (
          <BlockchainReservationModal
            terrain={selectedTerrain}
            onClose={() => setShowBlockchainReservation(false)}
          />
        )}
      </div>
    </section>
  )
}