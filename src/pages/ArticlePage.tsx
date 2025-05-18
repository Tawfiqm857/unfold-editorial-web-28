
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import ShareButtons from '@/components/ShareButtons';
import ArticleCard from '@/components/ArticleCard';
import { getArticleBySlug, getArticlesByCategory, getRecentArticles } from '@/utils/mockData';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || '');
  
  useEffect(() => {
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <Layout>
        <div className="container-lg py-16 text-center">
          <h1 className="text-3xl font-serif mb-6">Article Not Found</h1>
          <p className="mb-8 text-muted-foreground">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Get related articles from the same category
  const relatedArticles = getArticlesByCategory(article.category)
    .filter(a => a.id !== article.id)
    .slice(0, 3);
  
  // If we don't have enough related articles, add some recent ones
  const fillerArticles = relatedArticles.length < 3 
    ? getRecentArticles(6)
        .filter(a => a.id !== article.id && !relatedArticles.some(rel => rel.id === a.id))
        .slice(0, 3 - relatedArticles.length) 
    : [];
  
  const suggestedArticles = [...relatedArticles, ...fillerArticles];

  return (
    <Layout>
      <article className="pb-16">
        {/* Hero */}
        <div className="w-full aspect-video md:aspect-[21/9] relative mb-8 md:mb-12">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-lg">
          {/* Article Header */}
          <header className="max-w-3xl mx-auto mb-10">
            <Link 
              to={`/category/${article.category.toLowerCase()}`}
              className="inline-block mb-4 text-sm font-medium uppercase tracking-wider border-b-2 border-primary pb-1 hover:border-muted-foreground/60 transition-colors"
            >
              {article.category}
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium leading-tight mb-8">
              {article.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={article.authorImage}
                    alt={article.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{article.author}</p>
                  <p className="text-sm text-muted-foreground">{article.date} • {article.readTime}</p>
                </div>
              </div>
              
              <ShareButtons 
                url={window.location.href} 
                title={article.title}
              />
            </div>
          </header>
          
          {/* Article Content */}
          <div className="max-w-3xl mx-auto article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
          
          {/* Author Bio & Share */}
          <div className="max-w-3xl mx-auto mt-12 pt-12 border-t">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden shrink-0">
                <img 
                  src={article.authorImage}
                  alt={article.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-lg mb-2">{article.author}</p>
                <p className="text-muted-foreground mb-4">
                  Writer at Unfold Magazine covering topics related to {article.category.toLowerCase()} and modern culture.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                  <Button variant="outline" size="sm">
                    More Articles
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      {/* More Articles */}
      <section className="bg-muted/30 py-16">
        <div className="container-xl">
          <h2 className="text-2xl md:text-3xl font-serif mb-10 text-center">More Articles to Explore</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestedArticles.map((article) => (
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
        </div>
      </section>
    </Layout>
  );
};

export default ArticlePage;
