
import React from 'react';
import Layout from '@/components/Layout';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';
import CategoryPreview from '@/components/CategoryPreview';
import { Button } from "@/components/ui/button";
import { getLatestMagazineArticle, getRecentMagazineArticles, getMagazineArticlesByCategory, editorialTeam } from '@/utils/magazineContent';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredArticle = getLatestMagazineArticle();
  const recentArticles = getRecentMagazineArticles(6);
  
  // Get articles for category previews
  const fashionArticles = getMagazineArticlesByCategory('Fashion').slice(0, 3);
  const musicArticles = getMagazineArticlesByCategory('Music').slice(0, 3);
  const travelArticles = getMagazineArticlesByCategory('Travel').slice(0, 3);
  const peopleArticles = getMagazineArticlesByCategory('People').slice(0, 3);
  
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-black text-white py-24 md:py-32 animate-fade-in">
        <div className="container-xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 animate-slide-in-left">UNFOLD</h1>
            <p className="text-xl md:text-2xl mb-6 animate-slide-in-right animation-delay-200">
              A bold new space where stories rise, style speaks, and every page drips with purpose and pulse.
            </p>
            <div className="flex gap-4 animate-fade-in animation-delay-400">
              <Link to="/table-of-contents">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
                  Explore
                </Button>
              </Link>
              <Link to="/about">
                <Button className="bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105">About Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <div className="animate-fade-in animation-delay-600">
          <FeaturedArticle
            title={featuredArticle.title}
            excerpt={featuredArticle.excerpt}
            image={featuredArticle.image}
            category={featuredArticle.category}
            slug={featuredArticle.slug}
            author={featuredArticle.author}
            date={featuredArticle.date}
          />
        </div>
      )}
      
      {/* Editorial Team Highlight */}
      <section className="bg-muted/30 py-16 animate-fade-in">
        <div className="container-xl">
          <h2 className="text-2xl md:text-3xl font-serif mb-10 text-center">Meet the Editorial Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src={editorialTeam.editorInChief.image}
                  alt={editorialTeam.editorInChief.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium">{editorialTeam.editorInChief.name}</h3>
              <p className="text-sm text-muted-foreground">{editorialTeam.editorInChief.role}</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src={editorialTeam.managingEditor.image}
                  alt={editorialTeam.managingEditor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium">{editorialTeam.managingEditor.name}</h3>
              <p className="text-sm text-muted-foreground">{editorialTeam.managingEditor.role}</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src={editorialTeam.contentDirector.image}
                  alt={editorialTeam.contentDirector.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium">{editorialTeam.contentDirector.name}</h3>
              <p className="text-sm text-muted-foreground">{editorialTeam.contentDirector.role}</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src={editorialTeam.artDirector.image}
                  alt={editorialTeam.artDirector.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium">{editorialTeam.artDirector.name}</h3>
              <p className="text-sm text-muted-foreground">{editorialTeam.artDirector.role}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Articles */}
      <section className="container-xl py-16 animate-fade-in">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-serif">Recent Stories</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentArticles.map((article, index) => (
            <div key={article.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <ArticleCard
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
            </div>
          ))}
        </div>
      </section>
      
      {/* Newsletter CTA */}
      <section className="bg-muted/30 animate-fade-in">
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
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:flex-grow transition-all duration-300 focus:scale-105"
              />
              <Button className="hover:scale-105 transition-transform duration-300">Subscribe</Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </section>
      
      {/* Category Previews */}
      {fashionArticles.length > 0 && (
        <div className="animate-fade-in">
          <CategoryPreview category="Fashion" articles={fashionArticles} />
        </div>
      )}
      
      {/* Featured Quote */}
      <section className="bg-black text-white py-16 md:py-24 animate-fade-in">
        <div className="container-lg">
          <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif text-center max-w-4xl mx-auto leading-tight animate-pulse-slow">
            "Born in the hustle, raised by resistance. We're the sunrise after every storm."
          </blockquote>
        </div>
      </section>
      
      {/* More Categories */}
      {musicArticles.length > 0 && (
        <div className="animate-fade-in">
          <CategoryPreview category="Music" articles={musicArticles} />
        </div>
      )}
      
      {travelArticles.length > 0 && (
        <div className="animate-fade-in">
          <CategoryPreview category="Travel" articles={travelArticles} />
        </div>
      )}
      
      {/* Special Issue Banner */}
      <section className="container-xl py-16 animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-serif mb-10 text-center">SPECIAL ISSUE</h2>
        
        <div className="border-t border-b py-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-5xl font-serif mb-6 animate-bounce-slow">NIGERIA'S YOUTH ENTREPRENEURSHIP REVOLUTION</h3>
            <p className="text-lg text-muted-foreground mb-8">
              In this special issue, we dive into the stories, challenges, and triumphs of the next generation of Nigerian business leaders, 
              exploring how they are shaping the future of the country's economy and culture.
            </p>
            <Link to="/article/nigeria-youth-entrepreneurship-revolution">
              <Button size="lg" className="rounded-full px-8 hover:scale-105 transition-transform duration-300">
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Playlist Section */}
      <section className="bg-muted/30 py-16 animate-fade-in">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-6">UNFOLD AFROBEAT PLAYLIST</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Dive into the rhythm and energy of the best Afrobeats tracks that are defining the sound of a generation.
              </p>
              <Link to="/article/unfold-afrobeat-playlist">
                <Button variant="outline" className="rounded-full px-8 hover:scale-105 transition-transform duration-300">
                  Explore Playlist
                </Button>
              </Link>
            </div>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl p-8 flex flex-col justify-center hover:scale-105 transition-transform duration-300">
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
