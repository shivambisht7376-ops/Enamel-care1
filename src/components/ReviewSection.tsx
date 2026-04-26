import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Star, MessageSquare, Send, User } from 'lucide-react';
import DOMPurify from 'dompurify';
import { cn } from '../lib/utils';

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  createdAt: any;
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'featured' | 'all'>('featured');

  useEffect(() => {
    // Hidden system: Fetch featured reviews (rating >= 4) or all reviews
    const reviewsRef = collection(db, 'reviews');
    const q = activeTab === 'featured' 
      ? query(reviewsRef, where('rating', '>=', 4), orderBy('rating', 'desc'), orderBy('createdAt', 'desc'))
      : query(reviewsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(fetchedReviews);
    });

    return () => unsubscribe();
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    setIsSubmitting(true);
    try {
      // Basic Security: Sanitize inputs
      const sanitizedName = DOMPurify.sanitize(newReview.name);
      const sanitizedText = DOMPurify.sanitize(newReview.text);

      await addDoc(collection(db, 'reviews'), {
        name: sanitizedName,
        text: sanitizedText,
        rating: newReview.rating,
        createdAt: serverTimestamp(),
      });

      setNewReview({ name: '', text: '', rating: 5 });
      alert('Thank you for your review!');
    } catch (error) {
      console.error('Error adding review: ', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Review Form */}
        <div className="md:w-1/3 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary transition-all"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className={cn(
                      "transition-colors",
                      newReview.rating >= star ? "text-[#F59E0B]" : "text-gray-300"
                    )}
                  >
                    <Star className={cn("w-6 h-6", newReview.rating >= star && "fill-current")} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Experience</label>
              <textarea
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary transition-all resize-none h-32"
                placeholder="Share your thoughts..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : <><Send className="w-4 h-4" /> Submit Review</>}
            </button>
          </form>
        </div>

        {/* Review List */}
        <div className="md:w-2/3">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">What People Say</h3>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('featured')}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                  activeTab === 'featured' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                Featured
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                  activeTab === 'all' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                Recent
              </button>
            </div>
          </div>

          <div className="grid gap-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center text-primary">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{review.name}</p>
                        <div className="flex gap-0.5 text-[#F59E0B]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("w-3.5 h-3.5", i < review.rating ? "fill-current" : "text-gray-200")} />
                          ))}
                        </div>
                      </div>
                    </div>
                    {review.createdAt && (
                      <span className="text-xs text-gray-400">
                        {new Date(review.createdAt.toDate()).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed italic">"{review.text}"</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No reviews found yet. Be the first to leave one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
