import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// CRUD Functions para propiedades
export const propertyService = {
  async getAllProperties() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getFeaturedProperties() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(3)
    
    if (error) throw error
    return data
  },

  async createProperty(property) {
    const { data, error } = await supabase
      .from('properties')
      .insert([property])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateProperty(id, updates) {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteProperty(id) {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  async uploadImage(file, filename) {
    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(filename, file)
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('property-images')
      .getPublicUrl(filename)
    
    return publicUrl
  }
}