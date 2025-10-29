import type { PetPost } from '../types/PetPost';

const API_BASE_URL = 'http://localhost:8080/api';

export const petPostService = {
  async getAllPosts(): Promise<PetPost[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/pet-posts`);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar posts: ${response.statusText}`);
      }
      
      const data: PetPost[] = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar posts de pets:', error);
      throw error;
    }
  }
};
