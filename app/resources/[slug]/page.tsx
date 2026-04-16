"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, Share2, Mail, Globe, CheckCircle2 } from "lucide-react";

import { SectionFull } from "@/components/home/SectionFull";
import { PageHeaderOffset } from "@/components/layout/PageHeaderOffset";

import { getPostBySlug, getPosts, WPPost } from "@/lib/wordpress";
import { useState, useEffect } from "react";

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<WPPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [joining, setJoining] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) return;
      setLoading(true);
      const data = await getPostBySlug(slug as string);
      setArticle(data);
      
      if (data) {
        // Fetch related posts from same category
        const related = await getPosts({ category: data.category, limit: 4 });
        setRelatedPosts(related.filter((p: WPPost) => p.slug !== slug));
      }
      
      setLoading(false);
    }
    fetchArticle();
  }, [slug]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setFormError("Please enter a valid email address.");
      return; 
    }
    
    setJoining(true);
    setFormError(null);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setJoining(false);
        setIsJoined(true);
        
        // Auto-reset back to original form after 4 seconds
        setTimeout(() => {
          setIsJoined(false);
          setEmail("");
        }, 4000);
      } else {
        setFormError(data.error || 'Subscription failed');
        setJoining(false);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setFormError('Something went wrong. Please try again.');
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <main className="flex-1 kinetic-mesh min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-bold text-muted-foreground">Loading Article...</p>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="flex-1 kinetic-mesh min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black">Article Not Found</h1>
          <Link href="/resources" className="inline-block px-8 py-3 bg-primary text-white rounded-xl font-bold">
            Back to Resources
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-white min-h-screen">
      <PageHeaderOffset>
        
        {/* Breadcrumbs - Care.com Style */}
        <nav className="max-w-6xl mx-auto px-5 pt-8 md:pt-12">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <Link href="/resources" className="hover:text-primary">Resources</Link>
            <span className="text-slate-300">/</span>
            <Link href={`/resources?category=${article.category}`} className="hover:text-primary">{article.category}</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400 truncate max-w-[200px]">{article.title}</span>
          </div>
        </nav>

        {/* Article Header */}
        <section className="relative w-full pt-12 pb-20">
          <div className="max-w-6xl mx-auto px-5">
            <div className="max-w-4xl space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-display text-foreground leading-[1.1]">
                {article.title}
              </h1>
              
              {/* Author & Meta */}
              <div className="flex items-center gap-6 pt-8 border-t border-slate-100">
                 <div className="flex items-center gap-4">
                    <div className="size-14 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      {article.author?.avatar ? (
                        <Image src={article.author.avatar} alt={article.author.name} width={56} height={56} className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-black text-xl">
                          {article.author?.name ? article.author.name[0] : "W"}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-foreground">{article.author?.name || "WellnessJobs India"}</span>
                      <span className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">{article.author?.role || "WJ Professional"}</span>
                    </div>
                 </div>
                 
                 <div className="hidden sm:flex items-center gap-6 text-xs font-black text-muted-foreground uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                       <Calendar className="size-4 text-primary" />
                       Updated {article.date}
                    </div>
                    <div className="flex items-center gap-2">
                       <Clock className="size-4 text-primary" />
                       {article.readTime}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Article Section with Sidebar */}
        <section className="pb-32">
          <div className="max-w-6xl mx-auto px-5 flex flex-col lg:flex-row gap-20">
            
            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              {/* Hero Image */}
              <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl mb-16 bg-slate-100">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Lede / Intro */}
              <div className="text-xl md:text-2xl font-medium text-slate-600 leading-relaxed mb-12 border-l-4 border-primary pl-8 py-2">
                {article.excerpt}
              </div>

              <div 
                className="prose prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:font-display prose-headings:text-slate-900 prose-p:leading-relaxed prose-strong:text-slate-900 prose-li:text-slate-700"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Social Share */}
              <div className="mt-20 pt-10 border-t border-slate-100 flex items-center gap-6">
                 <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">Share Article</span>
                 <div className="flex gap-4">
                    <button className="size-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                      <Share2 className="size-4" />
                    </button>
                    <button className="size-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                      <Mail className="size-4" />
                    </button>
                 </div>
              </div>
            </div>

            {/* Article Sidebar */}
            <aside className="lg:w-80 shrink-0 space-y-12">
               {relatedPosts.length > 0 && (
                 <div className="space-y-8">
                   <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">More in {article.category}</h3>
                   <div className="flex flex-col gap-10">
                      {relatedPosts.map((post) => (
                        <Link key={post.slug} href={`/resources/${post.slug}`} className="group block space-y-3">
                           <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-100 bg-slate-50">
                             <Image src={post.image} alt={post.title} fill className="object-cover transition-transform group-hover:scale-110" />
                           </div>
                           <h4 className="text-md font-black font-display leading-tight group-hover:text-primary transition-colors">
                             {post.title}
                           </h4>
                        </Link>
                      ))}
                   </div>
                 </div>
               )}

               <div className="bg-slate-50 rounded-[2.5rem] p-10 sticky top-32 overflow-hidden">
                  <h4 className="text-lg font-black font-display mb-4">The Wellness Hub</h4>
                  
                  {!isJoined ? (
                    <form onSubmit={handleJoin} className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        Get weekly insights, job alerts, and upskilling guides delivered to your inbox.
                      </p>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (formError) setFormError(null);
                        }}
                        placeholder="Email Address" 
                        className={`w-full bg-white border ${formError ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-primary/20'} rounded-xl py-4 px-4 text-sm font-bold focus:outline-none focus:ring-2`} 
                      />
                      {formError && (
                        <p className="text-[11px] font-bold text-red-500 mt-1 pl-1">
                          {formError}
                        </p>
                      )}
                      <button 
                        disabled={joining}
                        className="w-full bg-slate-900 text-white rounded-xl py-4 font-black uppercase tracking-widest text-xs hover:bg-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {joining ? "Joining..." : "Join Today"}
                      </button>
                    </form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-4 space-y-4"
                    >
                      <div className="size-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle2 className="size-8" />
                      </div>
                      <h5 className="font-black text-foreground">You're in!</h5>
                      <p className="text-sm text-muted-foreground">
                        Thank you for joining. Check your inbox for your first wellness guide.
                      </p>
                    </motion.div>
                  )}
               </div>
            </aside>
          </div>
        </section>

        {/* CTA Section */}
        <SectionFull className="bg-slate-900 !py-24">
          <div className="flex flex-col items-center text-center space-y-8 text-white">
             <h2 className="text-4xl md:text-6xl font-black font-display">Ready to grow your career?</h2>
             <p className="text-xl text-white/60 max-w-xl">
               Browse high-paying roles in Yoga, Fitness, Beauty, and Therapy across India.
             </p>
             <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <Link href="/jobs" className="px-12 py-6 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-primary/40">
                  Search All Jobs
                </Link>
                <Link href="/resume" className="px-12 py-6 bg-white/10 border border-white/20 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                  Upload Resume
                </Link>
             </div>
          </div>
        </SectionFull>
        
      </PageHeaderOffset>
    </main>
  );
}
