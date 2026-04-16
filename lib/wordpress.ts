/**
 * WordPress API Service
 * 
 * This service handles fetching posts, categories, and media from a WordPress backend.
 * It is currently set to use Mock Data until a NEXT_PUBLIC_WORDPRESS_URL is provided in .env.
 */

export interface WPPost {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
}

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

/**
 * Mock Data for initial build and fallback
 */
const MOCK_POSTS: WPPost[] = [
  {
    title: "Is Wellness the Next Big Career Sector?",
    excerpt: "The wellness economy has moved beyond the fringes of luxury and entered the core of human survival. In a world defined by stress and burnout, discover why wellness is the ultimate frontier for purpose-driven careers.",
    content: `
      <h2>The Wellness Evolution: From Reactive to Proactive</h2>
      <p>For decades, global healthcare systems were built on a "reactive" model—treating illness after it appeared. Today, a seismic shift toward <strong>preventive longevity</strong> is occurring. People are no longer interested in just surviving; they want to thrive. This push is fueling a $5.6 trillion global wellness economy that shows no signs of slowing down.</p>
      
      <div style="background: rgba(var(--primary-rgb), 0.05); padding: 1.5rem; border-radius: 1rem; border-left: 4px solid var(--primary); margin: 2rem 0;">
        <h4 style="margin-top: 0;">Care Insights: Expert Tip</h4>
        <p style="margin-bottom: 0; font-style: italic;">"The most successful wellness professionals are those who combine technical expertise with deep empathy. In this sector, the human connection is your strongest competitive advantage." — Sarah Jenkins, Global Wellness Lead</p>
      </div>

      <img src="/images/resources/career-physical.png" alt="Physical Wellness" style="width: 85%; max-width: 750px; display: block; margin: 2rem auto; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);" />

      <h2>1. Physical Wellness: Movement as a Lifestyle</h2>
      <p>The fitness industry has matured far beyond basic gym memberships. We are seeing a move toward <strong>science-backed, functional training</strong>. The goal has shifted from aesthetic perfection to "movement longevity"—ensuring the body remains capable and pain-free well into old age.</p>
      <p>This expansion has created a massive demand for certified specialists who can work with diverse age groups and varying physical capabilities. Instructors are no longer just leading classes; they are performing postural assessments, designing remedial programs, and acting as long-term health partners for their clients.</p>

      <img src="/images/resources/career-mental.png" alt="Mental Wellness" style="width: 85%; max-width: 750px; display: block; margin: 2rem auto; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);" />

      <h2>2. Mental & Emotional Health: The New Corporate ROI</h2>
      <p>Stress and digital burnout have made mental wellness a critical priority. Companies now realize that an employee's mental health directly impacts the balance sheet. This has opened a massive market for <strong>Mindfulness Trainers, Behavioral Health Coaches, and Stress Management Specialists</strong>.</p>
      <p>The integration of mental health into the workplace is becoming standardized. Future careers in this space will involve designing "psychological safety" protocols and implementing meditation-driven stress reduction programs that are backed by measurable productivity data.</p>

      <img src="/images/resources/career-realestate.png" alt="Wellness Real Estate" style="width: 85%; max-width: 750px; display: block; margin: 2rem auto; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);" />

      <h2>3. The Future: Corporate Wellness & Real Estate</h2>
      <p>We are starting to design our physical environment around health. "Wellness Real Estate"—homes and offices with advanced air filtration, biophilic design, and circadian lighting—is the next frontier for architects and developers.</p>
      <p>Imagine a living space that actively lowers your heart rate and optimizes your sleep cycle through automated environmental adjustments. Professionals who can manage these complex intersections of technology, architecture, and biology will be at the forefront of the next decade's wealth creation.</p>

      <hr />

      <h2>Professional Resources Hub</h2>
      <p>Ready to build your career in wellness? Here are the most authoritative resources to get you started:</p>
      
      <ul>
        <li><strong><a href="https://globalwellnessinstitute.org/" target="_blank">Global Wellness Institute (GWI)</a>:</strong> The gold standard for industry data, market research, and global trends.</li>
        <li><strong><a href="https://www.yogaalliance.org/" target="_blank">Yoga Alliance</a>:</strong> The premier global body for setting standards and credentials for yoga professionals.</li>
        <li><strong><a href="https://www.nasm.org/" target="_blank">NASM (National Academy of Sports Medicine)</a>:</strong> Worldwide leader in evidence-based certifications for fitness and nutrition.</li>
      </ul>
    `,
    category: "Career Insight",
    image: "/images/resources/career-thumb.png",
    slug: "wellness-career-sector",
    readTime: "6 min read",
    date: "April 15, 2026",
    author: { 
      name: "Mrutyunjay Rout", 
      role: "Industry Export & WJ Strategist",
      avatar: "/images/home/upskilling/professionals.jpg"
    }
  },
  {
    title: "Mastering the Technical Side of Yoga Instruction",
    excerpt: "Modern yoga teaching requires more than just knowing the asanas. Explore the anatomy, technology, and sequencing skills needed to thrive.",
    content: `
      <h2>The Foundation of Modern Yoga Teaching</h2>
      <p>In today’s fast-growing wellness industry, yoga instruction is no longer limited to guiding poses and breathing exercises. To truly stand out, instructors must master the technical aspects that enhance both the effectiveness and professionalism of their teaching.</p>
      
      <div style="background: #fdf2f2; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #ef4444; margin: 2rem 0;">
        <h4 style="margin-top: 0; color: #991b1b;">Instructor Safety Check</h4>
        <p style="margin-bottom: 0;">Always assess a student's spinal alignment before encouraging deeper extension. Technical mastery means knowing when to hold back just as much as when to push forward.</p>
      </div>

      <img src="/images/resources/yoga-internal-hero.png" alt="Yoga Instruction" style="width: 85%; max-width: 750px; display: block; margin: 2rem auto; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);" />
      <p style="text-align: center; font-style: italic; color: #666;">Modern yogis must bridge the gap between traditional wisdom and clinical precision.</p>

      <img src="/images/resources/yoga-anatomy.png" alt="Yoga Anatomy" style="width: 85%; max-width: 750px; display: block; margin: 2rem auto; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);" />

      <h3>1. Anatomy and Biomechanics</h3>
      <p>At the foundation lies a strong understanding of anatomy and biomechanics. Knowing how muscles, joints, and posture interact enables instructors to design sequences that are safe, adaptive, and result-oriented. This technical knowledge not only minimizes injury risks but also builds long-term trust with students.</p>
      <p>Teachers who can explain the <em>why</em> behind a movement—referencing specific muscle groups like the psoas or the transverse abdominis—provide a higher level of service that justifies premium pricing and fosters deep student loyalty.</p>
      
      <img src="/images/resources/yoga-tech.png" alt="Yoga Technology" style="width: 85%; max-width: 750px; display: block; margin: 2rem auto; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);" />

      <h3>2. Embodying Technology</h3>
      <p>Equally important is the use of modern technology. Platforms like Zoom allow instructors to conduct virtual sessions, while apps such as MyFitnessPal help track progress and maintain client engagement. Recording sessions, analyzing alignment, and offering personalized corrections have become key differentiators in a competitive market.</p>
      <p>By leveraging wearable data and AI-driven alignment tools, instructors can offer personalized feedback that goes far beyond what is possible in a crowded studio setting. This "high-tech, high-touch" approach is the future of sustainable wellness careers.</p>
      
      <h3>3. Class Sequencing & Mastery</h3>
      <p>A well-structured class is another hallmark of technical mastery. From warm-up and flow sequencing to peak poses and cooldown, each segment should have a clear purpose. Effective cueing, voice modulation, and timing ensure that instructions are easy to follow and impactful.</p>
      <p>Mastery also involves the subtle art of "holding space"—managing the energy of the room through precisely timed silence and verbal encouragement, ensuring that every student leaves feeling both challenged and restored.</p>

      <hr />
      <p>Ultimately, mastering the technical side of yoga instruction bridges traditional wisdom with modern precision. It transforms instructors into wellness professionals who can deliver measurable outcomes, scale their reach, and build sustainable careers in the evolving wellness ecosystem.</p>
    `,
    category: "Professional Growth",
    image: "/images/resources/yoga-thumb.png",
    slug: "mastering-yoga-instruction",
    readTime: "4 min read",
    date: "April 16, 2026",
    author: { 
      name: "Sarah Jenkins", 
      role: "Global Wellness Lead",
      avatar: "/images/home/upskilling/wellness-student.jpg"
    }
  },
  {
    title: "Urban Longevity: Designing Health into the Hustle",
    excerpt: "Fast-paced city life doesn't have to mean poor health. A look at how urban planning and lifestyle choices are merging to create metropolitan wellness.",
    content: `
      <h2>Cities for the Soul: The Longevity Revolution</h2>
      <p>Urbanization is often blamed for stress, but a new wave of 'Wellness Cities' is proving that density can coexist with vitality. The secret lies in intentional design and personal ritual.</p>

      <p>Longevity in the city isn't just about avoiding pollution; it’s about creating an ecosystem of health. This includes everything from the biophilic design of our offices to the "micro-wellness" habits we build into our commutes.</p>

      <img src="/images/resources/longevity-internal-hero.png" alt="Urban Lifestyle" style="width: 85%; max-width: 750px; display: block; margin: 2rem auto; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);" />
      <p style="text-align: center; font-style: italic; color: #666;">Balance is possible even in the busiest metropolitan environments.</p>

      <img src="/images/resources/longevity-biophilic.png" alt="Biophilic Design" style="width: 85%; max-width: 750px; display: block; margin: 2rem auto; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);" />

      <h3>1. Biophilic Design: Bringing the Outside In</h3>
      <p>Humans have an innate connection to nature. Urban longevity specialists are now integrating plants, natural light, and organic textures into high-rise living to reduce cortisol levels and improve cognitive function.</p>
      <p>This isn't just aesthetic; it's biological. Studies show that even a 10-minute exposure to lush greenery or flowing water sounds can reset the nervous system, making biophilic architecture a critical tool for metropolitan survival.</p>

      <img src="/images/resources/longevity-city.png" alt="Sustainable City" style="width: 85%; max-width: 750px; display: block; margin: 2rem auto; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);" />

      <h3>2. The 15-Minute City Concept</h3>
      <p>One of the greatest enemies of urban health is the commute. Forward-thinking urban planners are designing neighborhoods where work, exercise, and healthy food are all within a 15-minute walk or bike ride, encouraging incidental movement and community connection.</p>
      <p>By shortening the distance between our daily needs, we reclaim hours of our lives that were previously lost to traffic, allowing for more restorative habits like home cooking, social interaction, and early-morning movement.</p>

      <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #22c55e; margin: 2rem 0;">
        <h4 style="margin-top: 0; color: #166534;">Wellness Tip for Commuters</h4>
        <p style="margin-bottom: 0;">Try "active commuting"—get off one stop early and walk. That extra 10 minutes of movement significantly lowers cardiovascular risk over time.</p>
      </div>

      <h3>3. Managing Digital Overload</h3>
      <p>In the city, we are always 'on.' Real longevity requires scheduled 'analog' time. Creating phone-free zones in your home and practicing 'forest bathing' (even in a small city park) are clinical strategies for neural recovery.</p>

      <hr />
      <p>Building a healthy life in the city is possible when we stop fighting the hustle and start designing around it. Urban longevity is the future of metropolitan life.</p>
    `,
    category: "Market Trends",
    image: "/images/resources/longevity-thumb.png",
    slug: "urban-longevity",
    readTime: "6 min read",
    date: "April 16, 2026",
    author: { 
      name: "David Chen", 
      role: "Urban Health Researcher",
      avatar: "/images/home/upskilling/professionals.jpg"
    }
  },
  {
    title: "The Financial Wellness of Health Practitioners",
    excerpt: "How to price your services, manage burnout, and build a sustainable business model in the competitive wellness space.",
    content: `
      <h2>Sustainable Service Models for the Wellness Pro</h2>
      <p>Many wellness professionals struggle with the 'passion vs. profit' paradox. To truly serve others, you must first ensure your own financial health. Sustainable business models are the backbone of a successful career.</p>

      <img src="/images/resources/financial-internal-hero.png" alt="Wellness Consultation" style="width: 85%; max-width: 750px; display: block; margin: 2rem auto; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);" />
      <p style="text-align: center; font-style: italic; color: #666;">Valuing your time is the first step toward a scalable wellness practice.</p>

      <h3>1. Value-Based Pricing</h3>
      <p>Stop trading time for money. Shift toward value-based pricing where you charge for the <strong>outcome</strong> rather than the hour. This allows for higher margins and prevents the 'burnout trap' of over-scheduling.</p>
      <p>When you price based on transformation, your clients are more invested in the process, leading to better results and a more professional relationship that avoids the pitfalls of transactional "gym-style" hourly rates.</p>

      <img src="/images/resources/financial-membership.png" alt="Membership Management" style="width: 85%; max-width: 750px; display: block; margin: 2rem auto; border-radius: 1rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);" />

      <h3>2. Membership & Recurring Revenue</h3>
      <p>Stability comes from predictable income. Creating tiered membership models for your clients provides them with consistent support and provides you with the financial buffer needed to invest in further education.</p>
      <p>Recurring revenue models allow you to focus on the quality of your care rather than the constant stress of client acquisition, ensuring that you can maintain a high-performance practice without exhausting your physical energy.</p>

      <div style="background: #fffbeb; padding: 1.5rem; border-radius: 1rem; border-left: 4px solid #f59e0b; margin: 2rem 0;">
        <h4 style="margin-top: 0; color: #92400e;">Critical Business Lesson</h4>
        <p style="margin-bottom: 0;">"The most expensive client is the one you have to find. The most valuable client is the one you already have. Focus on retention through exceptional service." — Elena Rodriguez, Career Coach</p>
      </div>

      <h3>3. Scaling Without Burnout</h3>
      <p>Harness the power of digital products. From e-books to recorded masterclasses, creating passive income streams allows you to scale your impact without exhausting your physical energy.</p>

      <hr />
      <p>Ensuring your own financial wellness is not selfish; it is the fuel that allows you to provide long-term care to your clients. By mastering the business side of your practice, you ensure that you can continue to help others for decades to come.</p>
    `,
    category: "Lifestyle",
    image: "/images/resources/financial-thumb.png",
    slug: "financial-wellness-practitioners",
    readTime: "3 min read",
    date: "April 16, 2026",
    author: { 
      name: "Elena Rodriguez", 
      role: "Career Coach",
      avatar: "/images/home/upskilling/wellness-student.jpg"
    }
  }
];

/**
 * Fetch posts from WordPress or return Mock Data
 */
export async function getPosts(params?: { category?: string; limit?: number }) {
  if (!WP_URL) {
    let filtered = [...MOCK_POSTS];
    if (params?.category && params.category !== "All") {
      filtered = filtered.filter(p => p.category.toLowerCase() === params.category?.toLowerCase());
    }
    if (params?.limit) {
      filtered = filtered.slice(0, params.limit);
    }
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return filtered;
  }

  try {
    const url = new URL(`${WP_URL}/wp-json/wp/v2/posts`);
    url.searchParams.set("_embed", "true");
    if (params?.limit) url.searchParams.set("per_page", params.limit.toString());
    
    // If category is provided, we would ideally fetch category ID first, 
    // but for the 'partial' build, we'll keep it simple.
    
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    const data = await res.json();
    
    return data.map((post: any) => mapWPPost(post));
  } catch (error) {
    console.error("WordPress Fetch Error:", error);
    return MOCK_POSTS;
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!WP_URL) {
    return MOCK_POSTS.find(p => p.slug === slug) || null;
  }

  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`, { next: { revalidate: 3600 } });
    const posts = await res.json();
    
    if (!posts || posts.length === 0) return null;
    return mapWPPost(posts[0]);
  } catch (error) {
    console.error("WordPress Fetch Single Error:", error);
    return MOCK_POSTS.find(p => p.slug === slug) || null;
  }
}

/**
 * Mapper function to transform WordPress REST API response to our clean interface
 */
function mapWPPost(post: any): WPPost {
  return {
    title: post.title.rendered,
    excerpt: post.excerpt.rendered.replace(/<[^>]*>?/gm, ""), // Strip HTML
    content: post.content.rendered,
    image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/all/spa-wellness.jpg",
    slug: post.slug,
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Uncategorized",
    date: new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    readTime: `${Math.ceil(post.content.rendered.split(" ").length / 200)} min read`,
    author: {
      name: post._embedded?.["author"]?.[0]?.name || "WellnessJobs India",
      role: "WJ Professional",
      avatar: post._embedded?.["author"]?.[0]?.avatar_urls?.["96"]
    }
  };
}
