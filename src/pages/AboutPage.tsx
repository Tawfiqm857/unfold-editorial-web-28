
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container-lg py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-8">FROM THE EDITOR</h1>
            
            <p className="text-lg mb-6">
              Welcome to the first-ever edition of Unfold Magazine - a bold new space where stories rise, 
              style speaks, and every page drips with purpose and pulse.
            </p>
            
            <p className="text-lg mb-6">
              We're launching this debut with something close to the heart and hot on the streets: 
              The Nigerian Youth Entrepreneurship Revolution. Young Nigerians aren't waiting to be "given" seats at the table—they're building 
              new tables, breaking old rules, and proving every single day that creativity + hustle is the real currency of the future.
            </p>
            
            <p className="text-lg mb-6">
              From tech whiz-kids and fashion founders to foodpreneurs, media disruptors, and silent 
              innovators this generation is changing the game, and this issue is their spotlight.
            </p>
            
            <p className="text-lg mb-6">
              But wait we didn't stop there.
            </p>
            
            <p className="text-lg mb-6">
              We take you deeper with S.H.E.E.P, a streetwear movement that's more than threads—it's a call to 
              unlock potential with every fit. In Faces of the Future, meet the young Nigerians blazing global 
              trails. Cruise Control sweeps you through dreamy homegrown destinations you must explore, while 
              Afrobeats to the World celebrates how our sound has become the planet's favorite rhythm. And if you 
              want heat? The Unfold Playlist is 20 tracks of pure 2025 magic.
            </p>
            
            <p className="text-lg mb-6">
              This is more than a magazine. It's a movement. It's the energy of a new generation loud, proud, 
              and unstoppable.
            </p>
            
            <p className="text-lg mb-6">
              We're so glad you're here. Now let's Unfold greatness, together.
            </p>
            
            <p className="text-xl font-serif italic mt-12">Bashir Suleiman</p>
            <p>EDITOR-IN-CHIEF</p>
          </div>
          
          <div className="space-y-16">
            <div>
              <h2 className="text-2xl font-serif mb-6">CORRESPONDENCE</h2>
              
              <div className="space-y-8">
                <div>
                  <p className="text-lg mb-4">
                    I'm thrilled to be part of Unfold as we kick off this exciting journey. Each page is packed with 
                    passion, creativity, and stories that reflect the energy of our generation. I'm looking forward to 
                    bringing you fresh perspectives and inspiring content in every issue.
                  </p>
                  
                  <p className="text-lg mb-2">Let's unfold greatness together!</p>
                  
                  <p className="text-xl font-serif">MERIT IKECHIKWU</p>
                </div>
                
                <div>
                  <p className="text-lg mb-4">
                    What's good, people?! It's your guy Shahid and I'm hyped to be part of the Unfold crew! 
                    This magazine? It's not just pages—it's pure vibes. I'm here to bring you gist, energy, laughs, 
                    and the kind of stories that keep your screen lit.
                  </p>
                  
                  <p className="text-lg mb-2">
                    Stay locked in. We're just getting started and trust me, it's going to be a wild, fun ride!
                  </p>
                  
                  <p className="text-xl font-serif">SHAHID ABDULLAHI</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-serif mb-4">CREDITS</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground">EDITOR-IN-CHIEF</p>
                    <p className="font-medium">BASHIR SULEIMAN</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">MANAGING EDITOR</p>
                    <p className="font-medium">MERIT IKECHIKWU</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">CONTENT DIRECTOR</p>
                    <p className="font-medium">SHAHID ABDULLAHI</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground">ART DIRECTION</p>
                    <p className="font-medium">PROMISE JONATHAN</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">CONTRIBUTING WRITERS</p>
                    <p className="font-medium">AARON AHMADU</p>
                    <p className="font-medium">ROSA AGUADO</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">COVER PICTURE</p>
                    <p className="font-medium">ZULAIFAH SANI (ZULS)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
