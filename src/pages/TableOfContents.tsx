
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const TableOfContents = () => {
  return (
    <Layout>
      <div className="container-lg py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif mb-16 tracking-tighter">
            TABLE OF CONTENTS
          </h1>
          
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="border-t pt-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-3xl font-serif">05</span>
                  <h2 className="text-xl md:text-2xl font-serif">
                    <Link to="/article/special-issue-nigeria-youth-entrepreneurship-revolution" className="hover:text-muted-foreground transition-colors">
                      Special Issue: Nigeria's Youth Entrepreneurship Revolution
                    </Link>
                  </h2>
                </div>
              </div>
              
              <div className="border-t pt-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-3xl font-serif">18</span>
                  <h2 className="text-xl md:text-2xl font-serif">
                    <Link to="/article/unfold-afrobeat-playlist" className="hover:text-muted-foreground transition-colors">
                      Unfold Afrobeat Playlist
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="border-t pt-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-3xl font-serif">11</span>
                  <h2 className="text-xl md:text-2xl font-serif">
                    <Link to="/article/sheep-superior-human-elevating-everyone-potential" className="hover:text-muted-foreground transition-colors">
                      S.H.E.E.P: Superior human elevating everyone's potential
                    </Link>
                  </h2>
                </div>
              </div>
              
              <div className="border-t pt-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-3xl font-serif">18</span>
                  <h2 className="text-xl md:text-2xl font-serif">
                    <Link to="/article/cruise-control-dream-destinations" className="hover:text-muted-foreground transition-colors">
                      Cruise Control: Dream Destinations You Can't Miss
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="border-t pt-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-3xl font-serif">14</span>
                  <h2 className="text-xl md:text-2xl font-serif">
                    <Link to="/article/afrobeats-to-the-world" className="hover:text-muted-foreground transition-colors">
                      Afrobeats to the World: The Evolution of Nigerian Music
                    </Link>
                  </h2>
                </div>
              </div>
              
              <div className="border-t pt-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-3xl font-serif">22</span>
                  <h2 className="text-xl md:text-2xl font-serif">
                    <Link to="/article/faces-of-the-future-young-nigerians" className="hover:text-muted-foreground transition-colors">
                      Faces of the Future: Young Nigerians Leading the Wave
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TableOfContents;
