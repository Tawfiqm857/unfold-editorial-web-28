
import React from 'react';
import Layout from '@/components/Layout';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';
import CategoryPreview from '@/components/CategoryPreview';
import { getFeaturedArticles, getRecentArticles, getArticlesByCategory } from '@/utils/mockData';
import { Button } from "@/components/ui/button";

const Index = () => {
  const featuredArticles = getFeaturedArticles();
  const recentArticles = getRecentArticles(6);
  
  // Get articles for each category preview
  const businessArticles = getArticlesByCategory('business').slice(0, 3);
  const cultureArticles = getArticlesByCategory('culture').slice(0, 3);
  const lifestyleArticles = getArticlesByCategory('lifestyle').slice(0, 3);
  
  return (
    <Layout>
      {/* Hero / Featured Article */}
      {featuredArticles[0] && (
        <FeaturedArticle
          title={featuredArticles[0].title}
          excerpt={featuredArticles[0].excerpt}
          image={featuredArticles[0].image}
          category={featuredArticles[0].category}
          slug={featuredArticles[0].slug}
          author={featuredArticles[0].author}
          date={featuredArticles[0].date}
        />
      )}
      
      {/* Recent Articles */}
      <section className="container-xl py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-serif">Recent Stories</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              image={article.image}
              category={article.category}
              slug={article.slug}
              author={article.author}
              date={article.date}
              featured={index === 0}
              className={index === 0 ? 'md:col-span-2' : ''}
            />
          ))}
        </div>
      </section>
      
      {/* Newsletter CTA */}
      <section className="bg-muted/30">
        <div className="container-xl py-16 md:py-24">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-serif mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Get the latest articles, insights, and stories delivered to your inbox weekly.
            </p>
            
            <div className="flex w-full max-w-md flex-col sm:flex-row gap-2 mb-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:flex-grow"
              />
              <Button>Subscribe</Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </section>
      
      {/* Category Previews */}
      <CategoryPreview category="Business" articles={businessArticles} />
      <CategoryPreview category="Culture" articles={cultureArticles} />
      <CategoryPreview category="Lifestyle" articles={lifestyleArticles} />
      
      {/* Topics Grid */}
      <section className="container-xl py-16">
        <h2 className="text-2xl md:text-3xl font-serif mb-10 text-center">Explore Topics</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <a href="/category/culture" className="aspect-square flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-900/30 rounded-lg hover:opacity-90 transition-opacity">
            <span className="font-medium">Culture</span>
          </a>
          <a href="/category/business" className="aspect-square flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-950/30 dark:to-sky-900/30 rounded-lg hover:opacity-90 transition-opacity">
            <span className="font-medium">Business</span>
          </a>
          <a href="/category/lifestyle" className="aspect-square flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-900/30 rounded-lg hover:opacity-90 transition-opacity">
            <span className="font-medium">Lifestyle</span>
          </a>
          <a href="/category/creators" className="aspect-square flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/30 dark:to-violet-900/30 rounded-lg hover:opacity-90 transition-opacity">
            <span className="font-medium">Creators</span>
          </a>
          <a href="/category/insights" className="aspect-square flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-950/30 dark:to-pink-900/30 rounded-lg hover:opacity-90 transition-opacity">
            <span className="font-medium">Insights</span>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
