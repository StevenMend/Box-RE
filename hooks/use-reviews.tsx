"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/i18n"

export interface Review {
  id: string
  name: string
  project: string
  location: string
  rating: number
  text: string
  createdAt: string
  isUserGenerated?: boolean
}

export function useReviews() {
  const { t } = useTranslation()
  const [userReviews, setUserReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // ---- Reseñas base según idioma activo ----
  const defaultReviews: Review[] = [
    {
      id: "default-1",
      name: t("reviews.testimonial1.name"),
      project: t("reviews.testimonial1.project"),
      location: t("reviews.testimonial1.location"),
      rating: 5,
      text: t("reviews.testimonial1.text"),
      createdAt: "2025-02-19",
      isUserGenerated: false,
    },
    {
      id: "default-2",
      name: t("reviews.testimonial2.name"),
      project: t("reviews.testimonial2.project"),
      location: t("reviews.testimonial2.location"),
      rating: 5,
      text: t("reviews.testimonial2.text"),
      createdAt: "2025-01-14",
      isUserGenerated: false,
    },
  ]
  // -------------------------------------------

  // Cargar reseñas del localStorage (opcional)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("box-architects-reviews")
      if (stored) {
        const parsed = JSON.parse(stored)
        setUserReviews(parsed)
      }
    } catch (error) {
      console.error("Error loading reviews from localStorage:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Guardar reseñas en localStorage
  const saveToStorage = (reviews: Review[]) => {
    try {
      localStorage.setItem("box-architects-reviews", JSON.stringify(reviews))
    } catch (error) {
      console.error("Error saving reviews to localStorage:", error)
    }
  }

  // Agregar nueva reseña
  const addReview = (reviewData: {
    name: string
    project: string
    location: string
    rating: number
    text: string
  }) => {
    const newReview: Review = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...reviewData,
      createdAt: new Date().toISOString(),
      isUserGenerated: true,
    }

    const updatedReviews = [...userReviews, newReview]
    setUserReviews(updatedReviews)
    saveToStorage(updatedReviews)

    return newReview
  }

  // Eliminar reseña (solo generadas por usuarios)
  const deleteReview = (reviewId: string) => {
    const updatedReviews = userReviews.filter((r) => r.id !== reviewId)
    setUserReviews(updatedReviews)
    saveToStorage(updatedReviews)
  }

  // Combinar reseñas traducidas + de usuario
  const allReviews = [...defaultReviews, ...userReviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return {
    reviews: allReviews,
    userReviews,
    isLoading,
    addReview,
    deleteReview,
  }
}