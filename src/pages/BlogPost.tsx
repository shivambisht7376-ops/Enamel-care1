import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data';
import { Calendar, User, ArrowLeft, Clock, Share2 } from 'lucide-react';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The article you are looking for does not exist or has been moved.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> BACK TO ARTICLES
            </Link>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-light" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary-light" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-light" />
                6 min read
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
            
            <div className="mt-12 pt-12 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gray-400 font-medium text-sm">SHARE THIS ARTICLE:</span>
                <div className="flex gap-2">
                  <button className="p-2 bg-gray-50 text-gray-400 hover:bg-primary hover:text-white rounded-full transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => navigate('/blog')}
                className="text-primary font-bold hover:underline flex items-center gap-2"
              >
                More Articles <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-64 space-y-8">
             <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                <h4 className="font-bold text-gray-900 mb-4">Book Consultation</h4>
                <p className="text-sm text-gray-600 mb-6">Want to learn more about this treatment? Speak with our experts.</p>
                <Link to="/contact" className="block text-center bg-primary text-white py-3 rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors">
                  Contact Us
                </Link>
             </div>
             
             <div>
                <h4 className="font-bold text-gray-900 mb-4">Related Topics</h4>
                <div className="space-y-4">
                  {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map(p => (
                    <Link key={p.id} to={`/blog/${p.id}`} className="block group">
                      <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-1">{p.title}</p>
                      <p className="text-xs text-gray-400">{p.date}</p>
                    </Link>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
