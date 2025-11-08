export const terrainTranslations = {
  es: {
    // Terrain Map Section  
    terrainMap: {
      title: "Explora Terrenos Premium",
      subtitle: "Cada propiedad verificada legalmente con datos del Registro Nacional y análisis completo de inversión.",
      stats: {
        verifiedTitles: "Títulos Verificados",
        provinces: "Provincias",
        premiumLocations: "Ubicaciones Premium"
      },
      legend: {
        cleanTitle: "Título Limpio",
        inProcess: "En Proceso",
        requiresReview: "Requiere Revisión"
      },
      loading: "Cargando mapa...",
      error: "Error cargando el mapa",
      viewModes: {
        satellite: "Satélite",
        terrain: "Relieve",
        streets: "Calles"
      },
      controls: {
        resetView: "Reset Vista"
      }
    },

    // Terrains Data
    terrains: {
      nahua: {
        title: "Lote Privado – Nahua",
        price: "Consultar precio",
        location: "Nosara, Guanacaste", 
        area: "2,500 m²",
        status: "En proceso de titulación",
        investmentData: {
          potential: "Alto potencial turístico",
          zoning: "Zona residencial turística",
          access: "Acceso por camino público"
        },
        amenities: {
          security: "Zona segura y vigilada",
          beachAccess: "Acceso directo a playa",
          utilities: "Servicios básicos disponibles",
          infrastructure: "Infraestructura en desarrollo"
        }
      },
      yadira: {
        title: "FINCA YADIRA - Reserva Box",
        price: "$95,000",
        location: "Santa Cruz, Guanacaste", 
        area: "20,885 m²",
        status: "Título limpio registrado",
        investmentData: {
          potential: "Excelente para desarrollo",
          zoning: "Uso residencial y comercial",
          access: "Acceso pavimentado directo"
        },
        amenities: {
          security: "Zona exclusiva y segura",
          beachAccess: "15 min a playas principales",
          utilities: "Agua y electricidad disponible",
          infrastructure: "Infraestructura completa"
        }
      },
      sanMarco: {
        title: "Lote Agropecuaria San Marco",
        price: "$45,000",
        location: "Santa Cruz, Guanacaste",
        area: "363 m²",
        status: "Título limpio registrado",
        investmentData: {
          potential: "Alto potencial comercial",
          zoning: "Uso agropecuario y comercial", 
          access: "Acceso directo por carretera"
        },
        amenities: {
          security: "Zona tranquila y segura",
          beachAccess: "15 min a playas principales",
          utilities: "Agua y electricidad disponible",
          infrastructure: "Infraestructura desarrollada"
        }
      },
      carlos: {
        title: "FINCA CARLOS - Desarrollo Premium",
        price: "$1,054,900",
        location: "Santa Cruz, Veintisiete de Abril",
        area: "154.6 hectáreas",
        status: "Título limpio registrado",
        investmentData: {
          potential: "Alto potencial agrícola y desarrollo turístico",
          zoning: "Agrícola / Desarrollo turístico",
          access: "Acceso por carretera principal"
        },
        amenities: {
          security: "Zona rural tranquila y segura",
          beachAccess: "A 15 min de playas de Santa Cruz",
          utilities: "Electricidad disponible, agua de pozo",
          infrastructure: "Red vial consolidada"
        }
      },
      aquatur: {
        title: "LOTE AQUATUR - Oportunidad Comercial",
        price: "$880,000",
        location: "Santa Cruz, Veintisiete de Abril",
        area: "2,030 m²",
        status: "Título limpio registrado",
        investmentData: {
          potential: "Ideal para desarrollo residencial o comercial",
          zoning: "Residencial / Comercial",
          access: "Acceso directo desde carretera"
        },
        amenities: {
          security: "Zona segura y consolidada",
          beachAccess: "Cerca de la costa de Guanacaste",
          utilities: "Todos los servicios públicos disponibles",
          infrastructure: "Infraestructura urbana completa"
        }
      }
    },

    // Modal Content
    terrainModal: {
      areaM2: "Área en m²",
      areaFt2: "Área en pies²",
      price: "Precio",
      status: "Estado",
      readyToBuild: "Listo para construir",
      premiumAmenities: "Amenidades Premium",
      registryInfo: "Información Registral",
      fincaNumber: "Número de Finca", 
      province: "Provincia",
      currentOwner: "Propietario Actual",
      inscriptionDate: "Fecha Inscripción",
      legalStatus: "Estado Legal",
      investmentAnalysis: "Análisis de Inversión",
      potential: "Potencial",
      zoning: "Zonificación",
      access: "Acceso",
      boxGuarantee: "Garantía Box Architects",
      guarantee1: "Estudio legal completo",
      guarantee2: "Firma digital desde tu país",
      guarantee3: "Seguimiento de obra en plataforma online",
      guarantee4: "Concierge personal (desde tu llegada al aeropuerto)",
      basicGuide: "Guía Básica Due Diligence",
      whatsappAgent: "Agente WhatsApp",
      videoIntro: "Video Introductorio",
      deposit: "Depósito (10%)",
      depositConsult: "Consultar precio",
      reserveSmartContract: "Reservar con Smart Contract",
      connectWalletFirst: "Conectar Wallet",  
      wrongNetwork: "Red Incorrecta",
      switchToFuji: "Cambiar a Fuji Testnet",
    },

    // Due Diligence Guide Content
    dueDiligenceGuide: {
      title: "Guía Básica de Due Diligence",
      subtitle: "Todo lo que necesitas saber antes de comprar un terreno en Costa Rica",
      whatsappMessage: "Hola! Me interesa una asesoría de Due Diligence para:",
      myName: "Mi nombre es",
      myEmail: "y mi email es",
      proposal: "Propuesta",
      finca: "Finca",
      area: "Área",
      legalStatus: "Estado Legal",
      financialProjection: "Proyección Financiera",
      price: "Precio",
      deposit: "Depósito",
      
      sections: {
        legalVerification: {
          title: "1. Verificación Legal",
          content: [
            "Verificar que el título de propiedad esté inscrito en el Registro Nacional",
            "Confirmar que no existan gravámenes, hipotecas o embargos",
            "Revisar que los linderos coincidan con la realidad física",
            "Verificar que el propietario tenga capacidad legal para vender"
          ]
        },
        municipalPermits: {
          title: "2. Permisos Municipales",
          content: [
            "Uso de suelo permitido según el plan regulador municipal",
            "Permisos de construcción y densidades permitidas",
            "Impuestos municipales al día",
            "Restricciones ambientales o patrimoniales"
          ]
        },
        physicalInspection: {
          title: "3. Inspección Física",
          content: [
            "Visita al terreno para verificar accesos y servicios",
            "Confirmar disponibilidad de agua, electricidad y telefonía",
            "Revisar condiciones del suelo y topografía",
            "Verificar que no existan construcciones no autorizadas"
          ]
        },
        financialAnalysis: {
          title: "4. Análisis Financiero",
          content: [
            "Avalúo profesional del terreno",
            "Comparación con precios de mercado en la zona",
            "Cálculo de costos adicionales (notario, registro, impuestos)",
            "Proyección de plusvalía a mediano y largo plazo"
          ]
        },
        environmentalChecks: {
          title: "5. Verificaciones Ambientales",
          content: [
            "Revisar si el terreno está en zona de protección ambiental",
            "Verificar restricciones por cercanía a ríos, manglares o playas",
            "Confirmar que no existan estudios de impacto ambiental pendientes",
            "Revisar historial de uso del suelo"
          ]
        }
      },
      blockchainReservation: {
  title: "Reserva con Smart Contract",
  subtitle: "Reserva segura mediante contrato inteligente en Avalanche",
  propertyDetails: "Detalles de la Propiedad",
  depositAmount: "Monto del Depósito (10%)",
  yourWallet: "Tu Wallet",
  network: "Red",
  fujiTestnet: "Avalanche Fuji Testnet",
  wrongNetwork: "Red incorrecta",
  pleaseSwitch: "Por favor cambia a Avalanche Fuji Testnet",
  switchNetwork: "Cambiar Red",
  confirmReservation: "Confirmar Reserva",
  processing: "Procesando...",
  success: "¡Reserva Exitosa!",
  successMessage: "Tu propiedad ha sido reservada exitosamente",
  transactionHash: "Hash de Transacción",
  error: "Error en la Reserva",
  close: "Cerrar"
},

      contactForm: {
        title: "¿Necesitas ayuda con tu Due Diligence?",
        subtitle: "Nuestros expertos pueden guiarte en todo el proceso",
        nameLabel: "Nombre completo",
        namePlaceholder: "Tu nombre completo",
        emailLabel: "Email", 
        emailPlaceholder: "tu@correo.com",
        phoneLabel: "WhatsApp",
        phonePlaceholder: "+506 8888 8888",
        terrainLabel: "Propiedad seleccionada",
        messageLabel: "Mensaje",
        messagePlaceholder: "Cuéntanos sobre tu proyecto o dudas específicas...",
        submitButton: "Solicitar Asesoría",
        sending: "Enviando...",
        successMessage: "Mensaje enviado exitosamente. Te contactaremos pronto.",
        errorMessage: "Error al enviar el mensaje. Por favor, intenta nuevamente.",
        easyChat: "Easy Chat - WhatsApp",
        generalConsult: "Consulta general",
        multipleLocations: "Múltiples ubicaciones disponibles",
        variousOptions: "Varias opciones"
      },

      whyChooseUs: {
        title: "¿Por qué elegir Box Architects?",
        points: [
          "15+ años de experiencia en el mercado inmobiliario costarricense",
          "Red de abogados especializados en bienes raíces",
          "Acompañamiento completo desde la compra hasta la construcción",
          "Firma digital desde cualquier país del mundo",
          "Concierge personal para clientes internacionales"
        ]
      }
    }
  },

  en: {
    // Terrain Map Section
    terrainMap: {
      title: "Explore Premium Terrains",
      subtitle: "Each property legally verified with National Registry data and complete investment analysis.",
      stats: {
        verifiedTitles: "Verified Titles",
        provinces: "Provinces",
        premiumLocations: "Premium Locations"
      },
      legend: {
        cleanTitle: "Clean Title",
        inProcess: "In Process", 
        requiresReview: "Requires Review"
      },
      loading: "Loading map...",
      error: "Error loading map",
      viewModes: {
        satellite: "Satellite",
        terrain: "Terrain",
        streets: "Streets"
      },
      controls: {
        resetView: "Reset View"
      }
    },

    // Terrains Data
    terrains: {
      nahua: {
        title: "Private Lot – Nahua",
        price: "Price on request",
        location: "Nosara, Guanacaste",
        area: "2,500 m²",
        status: "Title in process",
        investmentData: {
          potential: "High tourism potential",
          zoning: "Tourist residential zone",
          access: "Public road access"
        },
        amenities: {
          security: "Safe and monitored area",
          beachAccess: "Direct beach access",
          utilities: "Basic services available",
          infrastructure: "Infrastructure in development"
        }
      },
      yadira: {
        title: "FINCA YADIRA - Box Reserve",
        price: "$95,000",
        location: "Santa Cruz, Guanacaste",
        area: "20,885 m²", 
        status: "Clean registered title",
        investmentData: {
          potential: "Excellent for development",
          zoning: "Residential and commercial use",
          access: "Direct paved access"
        },
        amenities: {
          security: "Exclusive and safe area",
          beachAccess: "15 min to main beaches",
          utilities: "Water and electricity available",
          infrastructure: "Complete infrastructure"
        }
      },
      sanMarco: {
        title: "San Marco Agricultural Lot",
        price: "$45,000",
        location: "Santa Cruz, Guanacaste",
        area: "363 m²",
        status: "Clean registered title",
        investmentData: {
          potential: "High commercial potential",
          zoning: "Agricultural and commercial use",
          access: "Direct highway access"
        },
        amenities: {
          security: "Quiet and safe area",
          beachAccess: "15 min to main beaches",
          utilities: "Water and electricity available",
          infrastructure: "Developed infrastructure"
        }
      },
      carlos: {
        title: "FINCA CARLOS - Premium Development",
        price: "$1,054,900",
        location: "Santa Cruz, Veintisiete de Abril",
        area: "154.6 hectares",
        status: "Clean registered title",
        investmentData: {
          potential: "High agricultural and tourism development potential",
          zoning: "Agricultural / Tourism development",
          access: "Main road access"
        },
        amenities: {
          security: "Quiet and secure rural area",
          beachAccess: "15 min to Santa Cruz beaches",
          utilities: "Electricity available, well water",
          infrastructure: "Consolidated road network"
        }
      },
      aquatur: {
        title: "AQUATUR LOT - Commercial Opportunity",
        price: "$880,000",
        location: "Santa Cruz, Veintisiete de Abril",
        area: "2,030 m²",
        status: "Clean registered title",
        investmentData: {
          potential: "Ideal for residential or commercial development",
          zoning: "Residential / Commercial",
          access: "Direct road access"
        },
        amenities: {
          security: "Safe and consolidated area",
          beachAccess: "Near Guanacaste coast",
          utilities: "All public services available",
          infrastructure: "Complete urban infrastructure"
        }
      }
    },

    // Modal Content
    terrainModal: {
      areaM2: "Area in m²",
      areaFt2: "Area in ft²",
      price: "Price",
      status: "Status",
      readyToBuild: "Ready to build",
      premiumAmenities: "Premium Amenities",
      registryInfo: "Registry Information",
      fincaNumber: "Finca Number",
      province: "Province",
      currentOwner: "Current Owner",
      inscriptionDate: "Inscription Date",
      legalStatus: "Legal Status",
      investmentAnalysis: "Investment Analysis",
      potential: "Potential",
      zoning: "Zoning",
      access: "Access",
      boxGuarantee: "Box Architects Guarantee",
      guarantee1: "Complete legal study",
      guarantee2: "Digital signature from your country",
      guarantee3: "Online platform project tracking",
      guarantee4: "Personal concierge (from airport arrival)",
      basicGuide: "Basic Due Diligence Guide",
      whatsappAgent: "WhatsApp Agent",
      videoIntro: "Introductory Video",
      deposit: "Deposit (10%)",
      depositConsult: "Contact for price",
      reserveSmartContract: "Reserve with Smart Contract",
      connectWalletFirst: "Connect Wallet",
      wrongNetwork: "Wrong Network",
      switchToFuji: "Switch to Fuji Testnet",
    },

    // Due Diligence Guide Content
    dueDiligenceGuide: {
      title: "Basic Due Diligence Guide",
      subtitle: "Everything you need to know before buying land in Costa Rica",
      whatsappMessage: "Hi! I'm interested in Due Diligence consulting for:",
      myName: "My name is",
      myEmail: "and my email is",
      proposal: "Proposal",
      finca: "Property",
      area: "Area",
      legalStatus: "Legal Status",
      financialProjection: "Financial Projection",
      price: "Price",
      deposit: "Deposit",
      
      sections: {
        legalVerification: {
          title: "1. Legal Verification",
          content: [
            "Verify that property title is registered in the National Registry",
            "Confirm there are no liens, mortgages or seizures",
            "Review that boundaries match physical reality",
            "Verify that owner has legal capacity to sell"
          ]
        },
        municipalPermits: {
          title: "2. Municipal Permits",
          content: [
            "Land use allowed according to municipal regulatory plan",
            "Construction permits and allowed densities",
            "Municipal taxes up to date",
            "Environmental or heritage restrictions"
          ]
        },
        physicalInspection: {
          title: "3. Physical Inspection",
          content: [
            "Site visit to verify access and services",
            "Confirm availability of water, electricity and telephone",
            "Review soil conditions and topography",
            "Verify no unauthorized constructions exist"
          ]
        },
        financialAnalysis: {
          title: "4. Financial Analysis",
          content: [
            "Professional land appraisal",
            "Comparison with market prices in the area",
            "Calculation of additional costs (notary, registry, taxes)",
            "Medium and long-term capital gains projection"
          ]
        },
        environmentalChecks: {
          title: "5. Environmental Verifications",
          content: [
            "Check if land is in environmental protection zone",
            "Verify restrictions due to proximity to rivers, mangroves or beaches",
            "Confirm no pending environmental impact studies",
            "Review land use history"
          ]
        }
      },

      contactForm: {
        title: "Need help with your Due Diligence?",
        subtitle: "Our experts can guide you through the entire process",
        nameLabel: "Full name",
        namePlaceholder: "Your full name",
        emailLabel: "Email",
        emailPlaceholder: "your@email.com",
        phoneLabel: "WhatsApp",
        phonePlaceholder: "+1 234-567-8900",
        terrainLabel: "Selected property",
        messageLabel: "Message",
        messagePlaceholder: "Tell us about your project or specific questions...",
        submitButton: "Request inquiry",
        sending: "Sending...",
        successMessage: "Message sent successfully. We will contact you soon.",
        errorMessage: "Error sending message. Please try again.",
        easyChat: "Easy Chat - WhatsApp",
        generalConsult: "General consultation",
        multipleLocations: "Multiple locations available",
        variousOptions: "Various options",
      },

      blockchainReservation: {
        title: "Reserve with Smart Contract",
        ubtitle: "Secure reservation via smart contract on Avalanche",
        propertyDetails: "Property Details",
        depositAmount: "Deposit Amount (10%)",
        yourWallet: "Your Wallet",
        network: "Network",
        fujiTestnet: "Avalanche Fuji Testnet",
        wrongNetwork: "Wrong network",
        pleaseSwitch: "Please switch to Avalanche Fuji Testnet",
        switchNetwork: "Switch Network",
        confirmReservation: "Confirm Reservation",
        processing: "Processing...",
        success: "Reservation Successful!",
        successMessage: "Your property has been successfully reserved",
        transactionHash: "Transaction Hash",
        error: "Reservation Error",
        close: "Close",
      },

      whyChooseUs: {
        title: "Why choose Box Architects?",
        points: [
          "Local experience in the Costa Rican real estate market",
          "Network of lawyers specialized in real estate",
          "Complete support from purchase to construction",
          "Digital signature from any country in the world",
          "Personal concierge for international clients"
        ]
      }
    }
  }
}