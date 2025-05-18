
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ArticleCard from '@/components/ArticleCard';
import { getArticlesByCategory, getAllCategories } from '@/utils/mockData';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeCategory, setActiveCategory] = useState<string>(slug || 'culture');
  const categories = getAllCategories();
  
  const articles = getArticlesByCategory(activeCategory);
  
  useEffect(() => {
    if (slug) {
      setActiveCategory(slug);
      window.scrollTo(0, 0);
    }
  }, [slug]);
  
  if (!slug) return null;
  
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <Layout>
      <div className="container-xl py-12 md:py-16">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">{formatCategory(activeCategory)}</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Link key={category.name.toLowerCase()} to={`/category/${category.name.toLowerCase()}`}>
                <Button 
                  variant={category.name.toLowerCase() === activeCategory ? "default" : "outline"}
                  className={`rounded-full text-sm`}
                >
                  {category.name}
                  <span className="ml-1 text-xs">({category.count})</span>
                </Button>
              </Link>
            ))}
          </div>
          
          <div className="h-px bg-border"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
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
        
        {articles.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">No articles found</h2>
            <p className="text-muted-foreground">
              There are currently no articles in this category.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
