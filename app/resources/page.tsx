"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock, Tag, Search, Filter } from "lucide-react";
import { SectionFull } from "@/components/home/SectionFull";
import { PageHeaderOffset } from "@/components/layout/PageHeaderOffset";

import { getPosts, WPPost } from "@/lib/wordpress";
import { useState, useEffect } from "react";

const categories = ["All", "Career Insight", "Professional Growth", "Market Trends", "Lifestyle"];

export default function ResourcesPage() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const data = await getPosts({ category: selectedCategory });
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, [selectedCategory]);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const remainingPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <main className="flex-1 kinetic-mesh min-h-screen">
      <PageHeaderOffset>
        {/* Hero Section - Care.com Style */}
        <SectionFull className="bg-transparent !pb-12 md:!pb-20">
          <div className="flex flex-col items-start text-left max-w-7xl mx-auto px-5 opacity-90">
             <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary font-black tracking-widest uppercase text-xs mb-4"
            >
              Resources & Insights
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black font-display text-foreground leading-[1]"
            >
              Elevate Your <span className="text-primary italic">Career</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mt-6 leading-relaxed"
            >
              Expert-backed guides, industry reports, and upskilling strategies specifically for the Indian wellness workforce.
            </motion.p>
          </div>
        </SectionFull>

        <SectionFull className="!pt-0">
          <div className="max-w-7xl mx-auto px-5 flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar - Desktop Only */}
            <aside className="hidden lg:block w-72 shrink-0 space-y-12">
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 px-2">Topics</h3>
                <nav className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left px-5 py-4 rounded-2xl text-md font-bold transition-all ${
                        selectedCategory === cat 
                        ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                        : "text-muted-foreground hover:bg-slate-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="bg-slate-50 rounded-3xl p-8 space-y-4">
                 <h4 className="font-black text-sm uppercase tracking-wider">Need help hiring?</h4>
                 <p className="text-sm text-muted-foreground leading-relaxed">
                   Looking for skilled wellness professionals for your studio or clinic?
                 </p>
                 <Link href="/jobs" className="inline-flex items-center gap-2 text-primary text-sm font-black uppercase hover:translate-x-1 transition-transform">
                   Post a Job <ArrowUpRight className="size-4" />
                 </Link>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 space-y-12">
              
              {/* Mobile Category Scroller */}
              <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide sticky top-[80px] z-30 -mx-5 px-5 py-3 bg-white/80 backdrop-blur-md">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-black transition-all ${
                      selectedCategory === cat 
                      ? "bg-primary text-white" 
                      : "bg-slate-100 text-muted-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Featured Article Card */}
              {!loading && featuredPost && selectedCategory === "All" && (
                <div className="mb-16">
                  <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 mb-6">Top Guide</h2>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col md:flex-row min-h-[450px]"
                  >
                    <Link href={`/resources/${featuredPost.slug}`} className="relative h-72 md:h-auto md:w-1/2 overflow-hidden bg-slate-100">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        priority
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </Link>
                    <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                          {featuredPost.category}
                        </span>
                        <span className="text-[10px] font-black text-muted-foreground uppercase">{featuredPost.readTime}</span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black font-display text-foreground leading-[1.1] mb-6 group-hover:text-primary transition-colors">
                        <Link href={`/resources/${featuredPost.slug}`}>{featuredPost.title}</Link>
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed line-clamp-3 mb-8">
                        {featuredPost.excerpt}
                      </p>
                      <Link 
                        href={`/resources/${featuredPost.slug}`}
                        className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-900 group/btn"
                      >
                        Start Learning 
                        <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                          <ArrowUpRight className="size-5" />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Grid Section */}
              <div>
                <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 mb-10">
                  {selectedCategory === "All" ? "Latest Articles" : `Stories in ${selectedCategory}`}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {loading ? (
                    Array(4).fill(0).map((_, i) => (
                      <div key={i} className="animate-pulse bg-slate-100 rounded-[2.5rem] aspect-[4/5]" />
                    ))
                  ) : (
                    (selectedCategory === "All" ? remainingPosts : posts).map((post, i) => (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex flex-col"
                      >
                        <Link href={`/resources/${post.slug}`} className="relative aspect-[3/2] rounded-[2.5rem] overflow-hidden mb-6 block border border-slate-100 bg-slate-50">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </Link>
                        <div className="space-y-4 px-2">
                           <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                              <span className="text-primary">{post.category}</span>
                              <div className="size-1 rounded-full bg-slate-300" />
                              <span>{post.readTime}</span>
                           </div>
                           <h3 className="text-2xl font-black font-display text-foreground leading-tight group-hover:text-primary transition-colors">
                              <Link href={`/resources/${post.slug}`}>{post.title}</Link>
                           </h3>
                           <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                              {post.excerpt}
                           </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </SectionFull>

        {/* Curation Footer */}
        <SectionFull className="bg-slate-50">
          <div className="max-w-7xl mx-auto px-5 text-center space-y-12">
            <div className="max-w-xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-5xl font-black font-display">Stay Ahead of the Industry</h2>
              <p className="text-muted-foreground">Subscribe for exclusive wellness job alerts, industry insights, and career growth tips.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <input 
                type="email" 
                placeholder="Work Email"
                className="w-full sm:w-80 bg-white border-2 border-slate-200 rounded-2xl py-5 px-6 font-bold text-slate-900 focus:border-primary transition-colors focus:outline-none"
              />
              <button className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-200">
                Join 5k+ Professionals
              </button>
            </div>
          </div>
        </SectionFull>

      </PageHeaderOffset>
    </main>
  );
}
