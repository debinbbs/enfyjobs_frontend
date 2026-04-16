"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock, Tag } from "lucide-react";
import { getPosts, WPPost } from "@/lib/wordpress";
import { useState, useEffect } from "react";
import { SectionFull } from "./SectionFull";

export function Resources() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const data = await getPosts({ limit: 3 });
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <SectionFull id="resources" className="bg-white">
      <div className="flex flex-col gap-16 md:gap-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm">
              <BookOpen className="size-4" />
              <span>Wellness Career Hub</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-foreground leading-[1.1]">
              Insights for the <br />
              <span className="text-primary italic">Next Generation</span> of Pros.
            </h2>
          </div>
          <Link 
            href="/resources" 
            className="group flex items-center gap-2 text-lg font-bold text-foreground hover:text-primary transition-colors pb-2 border-b-2 border-transparent hover:border-primary"
          >
            Explore all resources
            <ArrowUpRight className="size-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse bg-slate-50 rounded-[2.5rem] aspect-[4/3]" />
            ))
          ) : posts.map((resource, i) => (
            <motion.div
              key={resource.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col h-full bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
              {/* Image Container */}
              <Link href={`/resources/${resource.slug}`} className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-primary uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <Tag className="size-3" />
                    {resource.category}
                  </span>
                </div>
              </Link>

              {/* Content Container */}
              <div className="flex-1 p-8 flex flex-col gap-6">
                <div className="flex items-center gap-4 text-muted-foreground text-sm font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-4" />
                    {resource.readTime}
                  </div>
                  <div className="size-1 rounded-full bg-slate-300" />
                  <span>WellnessJobs India</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-black font-display text-foreground leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/resources/${resource.slug}`}>
                      {resource.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed line-clamp-2">
                    {resource.excerpt}
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <Link 
                    href={`/resources/${resource.slug}`}
                    className="inline-flex items-center gap-2 font-bold text-foreground group/link uppercase tracking-wider text-xs"
                  >
                    Read Article
                    <div className="size-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover/link:bg-primary group-hover/link:border-primary group-hover/link:text-white transition-all">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionFull>
  );
}
