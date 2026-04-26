import React, { useState, useEffect, useMemo } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where, doc, deleteDoc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Star, MessageSquare, Send, User, Trash2, ShieldCheck, Edit3 } from 'lucide-react';
import DOMPurify from 'dompurify';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

interface Review {
  id: string;
  userId: string;
  name: string;
  text: string;
  rating: number;
  createdAt: any;
  featured?: boolean;
}

export default function ReviewSection() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'featured' | 'all'>('featured');
  const [isEditing, setIsEditing] = useState(false);

  const isAdmin = user?.email === 'shivamzi953@gmail.com';

  useEffect(() => {
    // Fetch all reviews for real-time updates
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      
      setReviews(fetchedReviews);

      // Check if current user has a review
      if (user) {
        const found = fetchedReviews.find(r => r.userId === user.uid);
        if (found) {
          setUserReview(found);
          setNewReview({ name: found.name, text: found.text, rating: found.rating });
        } else {
          setUserReview(null);
          setNewReview({ name: user.displayName || '', text: '', rating: 5 });
        }
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Derived filtered reviews
  const displayReviews = useMemo(() => {
    if (activeTab === 'featured') {
      return reviews
        .filter(r => r.featured || r.rating >= 4)
        .sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
    }
    return reviews;
  }, [reviews, activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to leave a review.');
      return;
    }
    if (!newReview.name || !newReview.text) return;

    setIsSubmitting(true);
    try {
      const sanitizedName = DOMPurify.sanitize(newReview.name);
      const sanitizedText = DOMPurify.sanitize(newReview.text);

      const reviewData = {
        userId: user.uid,
        name: sanitizedName,
        text: sanitizedText,
        rating: newReview.rating,
        createdAt: serverTimestamp(),
        // Keep featured status if editing
        ...(userReview?.featured !== undefined ? { featured: userReview.featured } : {})
      };

      if (userReview) {
        await updateDoc(doc(db, 'reviews', userReview.id), reviewData);
        setIsEditing(false);
        alert('Review updated successfully!');
      } else {
        await addDoc(collection(db, 'reviews'), reviewData);
        alert('Thank you for your review!');
      }
    } catch (error) {
      
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteDoc(doc(db, 'reviews', id));
    } catch (error) {
      
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'reviews', id), { featured: !currentStatus });
    } catch (error) {
      
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Review Form / User Review Info */}
        <div className="md:w-1/3 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit sticky top-24">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {userReview && !isEditing ? 'Your Review' : (userReview ? 'Edit Your Review' : 'Leave a Review')}
          </h3>
          
          {userReview && !isEditing ? (
            <div className="space-y-6">
              <div className="bg-primary-light/30 p-6 rounded-2xl border border-primary/10">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-0.5 text-[#F59E0B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4", i < userReview.rating ? "fill-current" : "text-gray-200")} />
                    ))}
                  </div>
                  <button onClick={() => setIsEditing(true)} className="text-primary hover:text-primary-dark transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-700 italic">"{userReview.text}"</p>
              </div>
              <p className="text-sm text-gray-500 text-center">You have already submitted a review. You can edit it if your experience has changed.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {!user && (
                <div className="bg-amber-50 text-amber-700 p-4 rounded-xl text-sm mb-4 border border-amber-100">
                  Please sign in to share your experience with us.
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary transition-all disabled:opacity-50"
                  placeholder="John Doe"
                  required
                  disabled={!user || isSubmitting}
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
                      disabled={!user || isSubmitting}
                      className={cn(
                        "transition-colors disabled:cursor-not-allowed",
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
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary transition-all resize-none h-32 disabled:opacity-50"
                  placeholder="Share your thoughts..."
                  required
                  disabled={!user || isSubmitting}
                />
              </div>
              <div className="flex gap-3">
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setNewReview({ name: userReview!.name, text: userReview!.text, rating: userReview!.rating });
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !user}
                  className="flex-[2] bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : <><Send className="w-4 h-4" /> {userReview ? 'Update Review' : 'Submit Review'}</>}
                </button>
              </div>
            </form>
          )}
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
            {displayReviews.length > 0 ? (
              displayReviews.map((review) => (
                <div key={review.id} className={cn(
                  "bg-white p-6 rounded-[2rem] border transition-all relative group",
                  review.featured ? "border-primary/20 shadow-md ring-1 ring-primary/5" : "border-gray-50 shadow-sm hover:shadow-md"
                )}>
                  {review.featured && (
                    <div className="absolute -top-3 left-8 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> FEATURED
                    </div>
                  )}
                  
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
                    
                    <div className="flex items-center gap-4">
                      {isAdmin && (
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => toggleFeatured(review.id, !!review.featured)}
                            className={cn(
                              "p-1.5 rounded-lg transition-colors",
                              review.featured ? "bg-primary-light text-primary" : "bg-gray-100 text-gray-400 hover:text-primary"
                            )}
                            title={review.featured ? "Unfeature Review" : "Feature Review"}
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(review.id)}
                            className="p-1.5 bg-red-50 text-red-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Delete Review"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      {review.createdAt && (
                        <span className="text-xs text-gray-400">
                          {new Date(review.createdAt.toDate()).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic">"{review.text}"</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No {activeTab === 'featured' ? 'featured' : ''} reviews found yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
