
import React from 'react';
import Layout from '@/components/Layout';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';
import CategoryPreview from '@/components/CategoryPreview';
import { Button } from "@/components/ui/button";
import { getLatestMagazineArticle, getRecentMagazineArticles, getMagazineArticlesByCategory } from '@/utils/magazineContent';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredArticle = getLatestMagazineArticle();
  const recentArticles = getRecentMagazineArticles(6);
  
  // Get articles for category previews
  const businessArticles = getMagazineArticlesByCategory('Business').slice(0, 3);
  const cultureArticles = getMagazineArticlesByCategory('Culture').slice(0, 3);
  const lifestyleArticles = getMagazineArticlesByCategory('Lifestyle').slice(0, 3);
  
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-black text-white py-24 md:py-32">
        <div className="container-xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6">UNFOLD</h1>
            <p className="text-xl md:text-2xl mb-6">
              A bold new space where stories rise, style speaks, and every page drips with purpose and pulse.
            </p>
            <div className="flex gap-4">
              <Link to="/table-of-contents">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Explore
                </Button>
              </Link>
              <Link to="/about">
                <Button className="bg-white text-black hover:bg-white/90">About Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <FeaturedArticle
          title={featuredArticle.title}
          excerpt={featuredArticle.excerpt}
          image={featuredArticle.image}
          category={featuredArticle.category}
          slug={featuredArticle.slug}
          author={featuredArticle.author}
          date={featuredArticle.date}
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
      {cultureArticles.length > 0 && (
        <CategoryPreview category="Culture" articles={cultureArticles} />
      )}
      
      {/* Featured Quote */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container-lg">
          <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif text-center max-w-4xl mx-auto leading-tight">
            "Born in the hustle, raised by resistance. We're the sunrise after every storm."
          </blockquote>
        </div>
      </section>
      
      {/* More Categories */}
      {lifestyleArticles.length > 0 && (
        <CategoryPreview category="Lifestyle" articles={lifestyleArticles} />
      )}
      
      {/* Topics Grid */}
      <section className="container-xl py-16">
        <h2 className="text-2xl md:text-3xl font-serif mb-10 text-center">SPECIAL ISSUE</h2>
        
        <div className="border-t border-b py-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-5xl font-serif mb-6">NIGERIA'S YOUTH ENTREPRENEURSHIP REVOLUTION</h3>
            <p className="text-lg text-muted-foreground mb-8">
              In this special issue, we dive into the stories, challenges, and triumphs of the next generation of Nigerian business leaders, 
              exploring how they are shaping the future of the country's economy and culture.
            </p>
            <Link to="/article/special-issue-nigeria-youth-entrepreneurship-revolution">
              <Button size="lg" className="rounded-full px-8">
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Playlist Section */}
      <section className="bg-muted/30 py-16">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-6">UNFOLD AFROBEAT PLAYLIST</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Dive into the rhythm and energy of the best Afrobeats tracks that are defining the sound of a generation.
              </p>
              <Link to="/article/unfold-afrobeat-playlist">
                <Button variant="outline" className="rounded-full px-8">
                  Explore Playlist
                </Button>
              </Link>
            </div>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl p-8 flex flex-col justify-center">
              <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base">
                <li>Wizkid – "Kese"</li>
                <li>Rema – "Baby (Is It a Crime)"</li>
                <li>Davido – "With You" ft. Omah Lay</li>
                <li>Asake – "Why Love"</li>
                <li>Zlatan – "Better" ft. Fola</li>
                <li className="text-muted-foreground">+ 15 more tracks</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
