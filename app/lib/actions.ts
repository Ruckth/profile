import { fruits, Fruit } from './placeholder-data';

export async function getFruits(): Promise<Fruit[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return fruits;
}

export async function getFruitsSlow(): Promise<Fruit[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return fruits;
}

export async function getFruitById(id: number): Promise<Fruit | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return fruits.find((fruit) => fruit.id === id) || null;
}

export async function getFruitsByCategory(category: string): Promise<Fruit[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return fruits.filter((fruit) => fruit.category === category);
}

export async function searchFruits(query: string): Promise<Fruit[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));
  const lowercaseQuery = query.toLowerCase();
  return fruits.filter((fruit) => 
    fruit.name.toLowerCase().includes(lowercaseQuery) || 
    fruit.category.toLowerCase().includes(lowercaseQuery)
  );
}