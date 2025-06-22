
// Re-export everything for backwards compatibility
export { magazineArticles } from '@/data/articles';
export { editorialTeam } from '@/data/editorialTeam';
export {
  getLatestMagazineArticle,
  getRecentMagazineArticles,
  getMagazineArticleBySlug,
  getMagazineArticlesByCategory,
  getAllMagazineCategories
} from './magazineUtils';
