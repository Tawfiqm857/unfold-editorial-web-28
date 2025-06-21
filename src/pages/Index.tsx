
import React from 'react';
import Layout from '@/components/Layout';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';
import CategoryPreview from '@/components/CategoryPreview';
import { Button } from "@/components/ui/button";
import { getLatestMagazineArticle, getRecentMagazineArticles, getMagazineArticlesByCategory } from '@/utils/magazineContent';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

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
      <section className="bg-black text-white relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-magazine-navy/80 to-black/60 mix-blend-overlay z-0"></div>
        <div className="absolute inset-0 bg-grain opacity-30 z-0"></div>
        <div className="container-xl z-10 relative">
          <div className="max-w-3xl">
            <div className="overflow-hidden mb-6">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium animate-slide-in">UNFOLD</h1>
            </div>
            <div className="overflow-hidden mb-4">
              <p className="text-xl md:text-2xl lg:text-3xl animate-slide-in" style={{animationDelay: "0.1s"}}>MAY 2025 • ISSUE NO. 1</p>
            </div>
            <div className="overflow-hidden mb-8">
              <p className="text-xl md:text-2xl animate-slide-in" style={{animationDelay: "0.2s"}}>
                A bold new space where stories rise, style speaks, and every page drips with purpose and pulse.
              </p>
            </div>
            <div className="overflow-hidden">
              <div className="animate-slide-in" style={{animationDelay: "0.3s"}}>
                <div className="flex gap-4 flex-wrap">
                  <Link to="/table-of-contents">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      Explore
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button className="bg-magazine-coral hover:bg-magazine-coral/90 text-white">About Us</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
            <button onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})} className="animate-bounce text-white/80 hover:text-white transition-colors">
              <ArrowDown className="h-8 w-8" />
              <span className="sr-only">Scroll down</span>
            </button>
          </div>
        </div>
      </section>

      {/* Manifesto Banner */}
      <section className="bg-magazine-teal text-white py-16">
        <div className="container-xl">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-serif italic">
              "Unfold the vibe. Live the moment. Own your story. This is just the beginning."
            </p>
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
      
      {/* Lume Diaries - Faces of the Future */}
      <section className="bg-gradient-to-r from-magazine-navy to-black text-white py-16 md:py-24">
        <div className="container-xl">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-serif mb-6">LUME DIARIES:</h2>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-8">FACES OF THE FUTURE: YOUNG NIGERIANS LEADING THE WAVE</h3>
            <p className="text-lg mb-8">
              In a world that moves fast, these are the faces setting the pace.
              Young Nigerians who are defining today and shaping tomorrow – they are the
              innovators, the creators, and the visionaries leading us into a new era.
            </p>
            <Link to="/article/faces-of-the-future-young-nigerians-leading-the-wave">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-magazine-sand to-white dark:from-black dark:to-magazine-navy/50">
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
              <Button className="bg-magazine-coral hover:bg-magazine-coral/90 text-white">Subscribe</Button>
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
      
      {/* Dream Destinations */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-6">CRUISE CONTROL: DREAM DESTINATIONS YOU CAN'T MISS IN NIGERIA</h2>
              <p className="text-lg mb-8">
                Let's be real, you don't need a visa to escape. Sometimes the adventure you're craving is right within
                reach. Nigeria isn't just home to vibes and hustle, it's full of gems that feel like they were plucked from
                another world.
              </p>
              <Link to="/article/dream-destinations-nigeria">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Explore Destinations
                </Button>
              </Link>
            </div>
            <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
                alt="Zuma Rock in Niger State" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* More Categories */}
      {lifestyleArticles.length > 0 && (
        <CategoryPreview category="Lifestyle" articles={lifestyleArticles} />
      )}
      
      {/* Special Issue */}
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
              <Button size="lg" className="rounded-full px-8 bg-magazine-teal hover:bg-magazine-teal/90 text-white">
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Playlist Section */}
      <section className="bg-gradient-to-r from-magazine-coral/10 to-magazine-orange/10 py-16">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-6">UNFOLD AFROBEAT PLAYLIST</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Dive into the rhythm and energy of the best Afrobeats tracks that are defining the sound of a generation.
              </p>
              <Link to="/article/unfold-afrobeat-playlist">
                <Button variant="outline" className="rounded-full px-8 border-magazine-coral text-magazine-coral hover:bg-magazine-coral hover:text-white">
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

      {/* Subscription CTA */}
      <section className="bg-black text-white py-16">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                alt="Magazine subscription" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-6">GET YOUR SUBSCRIPTION TODAY</h2>
              <p className="text-lg mb-6">NEVER MISS AN ISSUE!</p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-magazine-coral rounded-full"></span>
                  <span>Enjoy huge savings</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-magazine-coral rounded-full"></span>
                  <span>Free home delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-magazine-coral rounded-full"></span>
                  <span>Get your copy before everyone else</span>
                </li>
              </ul>
              <Link to="/subscribe">
                <Button className="bg-magazine-coral hover:bg-magazine-coral/90 text-white">
                  Subscribe Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Quote */}
      <section className="bg-magazine-sand/30 dark:bg-magazine-navy/30 py-16 md:py-24">
        <div className="container-lg">
          <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif text-center max-w-4xl mx-auto leading-tight">
            "We've only scratched the surface. From bold voices to fresh perspectives, Unfold Magazine 
            is here to celebrate culture, creativity, and the unstoppable spirit of a new generation."
          </blockquote>
          <p className="text-center mt-8 text-lg font-medium">Stay curious. Stay inspired. Stay unfolded.</p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
