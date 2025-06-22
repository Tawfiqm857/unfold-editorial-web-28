
import { magazineArticles } from '@/data/articles';

export const getLatestMagazineArticle = () => {
  return magazineArticles[0];
};

export const getRecentMagazineArticles = (count = 3) => {
  return magazineArticles.slice(0, count);
};

export const getMagazineArticleBySlug = (slug: string) => {
  return magazineArticles.find(article => article.slug === slug);
};

export const getMagazineArticlesByCategory = (category: string) => {
  return magazineArticles.filter(article => 
    article.category.toLowerCase() === category.toLowerCase()
  );
};

export const getAllMagazineCategories = () => {
  const categories = magazineArticles.map(article => article.category);
  const uniqueCategories = Array.from(new Set(categories));
  
  return uniqueCategories.map(name => ({
    name,
    count: magazineArticles.filter(article => article.category === name).length
  }));
};
