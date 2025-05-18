
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';

interface Article {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  slug: string;
  author: string;
  date: string;
}

interface CategoryPreviewProps {
  category: string;
  articles: Article[];
}

const CategoryPreview = ({ category, articles }: CategoryPreviewProps) => {
  return (
    <section className="py-12">
      <div className="container-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-serif">
            {category}
          </h2>
          <Link 
            to={`/category/${category.toLowerCase()}`}
            className="text-sm font-medium hover:text-muted-foreground transition-colors flex items-center"
          >
            View All
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              excerpt={article.excerpt}
              image={article.image}
              category={article.category}
              slug={article.slug}
              author={article.author}
              date={article.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPreview;
