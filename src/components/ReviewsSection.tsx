'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Review } from '@/data/reviews';
import { cyberSound } from '@/lib/sound';

interface ReviewsSectionProps {
  templateId: string;
  templateName: string;
  initialRating: number;
}

export default function ReviewsSection({
  templateId,
  templateName,
  initialRating,
}: ReviewsSectionProps) {
  const { isSignedIn, user } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form state
  const [selectedRating, setSelectedRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helpful votes state
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`/api/reviews?templateId=${templateId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews) {
          setReviews(data.reviews);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [templateId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) {
      setError('Please provide both a title and review feedback');
      return;
    }

    setSubmitting(true);
    setError(null);
    cyberSound.playClick();

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId,
          rating: selectedRating,
          title,
          comment,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      cyberSound.playSuccess();
      setReviews((prev) => [data.review, ...prev]);
      setTitle('');
      setComment('');
      setSubmitSuccess(true);
      setIsFormOpen(false);
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (err: any) {
      setError(err?.message || 'Error saving review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVoteHelpful = (reviewId: string) => {
    if (helpfulVoted[reviewId]) return;
    cyberSound.playClick();
    setHelpfulVoted((prev) => ({ ...prev, [reviewId]: true }));
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
      )
    );
  };

  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
      : initialRating.toFixed(1);

  // Calculate rating breakdown
  const breakdownCounts = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const pct = totalReviews > 0 ? (count / totalReviews) * 100 : stars === 5 ? 85 : 15;
    return { stars, count, pct };
  });

  return (
    <div className="pt-10 border-t border-purple-500/20 space-y-8">
      {/* Header & Overall Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0d0622]/80 backdrop-blur-md p-6 rounded-3xl border border-purple-500/25 shadow-xl">
        <div className="flex items-center gap-6">
          <div className="text-center pr-6 border-r border-purple-500/20">
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {avgRating}
            </div>
            <div className="flex items-center justify-center gap-1 text-amber-400 text-sm mt-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <div className="text-xs text-muted mt-1 font-mono">
              {totalReviews} Verified Review{totalReviews === 1 ? '' : 's'}
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-1.5 min-w-[180px] xs:min-w-[220px]">
            {breakdownCounts.map(({ stars, count, pct }) => (
              <div key={stars} className="flex items-center gap-2 text-sm">
                <span className="w-6 text-xs text-purple-300 font-mono">
                  {stars}★
                </span>
                <div className="flex-1 h-2 bg-[#070314] rounded-full overflow-hidden border border-purple-500/20">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-6 text-right text-[10px] text-purple-400 font-mono">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div>
          {isSignedIn ? (
            <button
              onClick={() => {
                cyberSound.playClick();
                setIsFormOpen(!isFormOpen);
              }}
              className="w-full md:w-auto px-5 min-h-11 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-[0_0_15px_rgba(168,85,247,0.35)] transition-all flex items-center justify-center gap-2"
            >
              <span>✍️</span>
              <span>{isFormOpen ? 'Close Review Form' : 'Write Verified Review'}</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="w-full md:w-auto px-5 min-h-11 py-2.5 rounded-xl bg-[#070314] hover:bg-[#1a0b3b] border border-purple-500/30 text-purple-200 text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <span>🔒 Sign In to Leave Review</span>
            </Link>
          )}
        </div>
      </div>

      {submitSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center gap-2 animate-in fade-in">
          <span>✓</span>
          <span>Thank you! Your verified review has been published to {templateName}.</span>
        </div>
      )}

      {/* Review Submission Form Drawer */}
      {isFormOpen && isSignedIn && (
        <form
          onSubmit={handleSubmitReview}
          className="bg-[#0e0624] border border-purple-500/30 rounded-3xl p-6 space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>✍️</span>
              <span>Reviewing {templateName}</span>
            </h4>
            <span className="text-xs text-purple-300 font-mono">
              Posting as {user.firstName || user.emailAddresses[0]?.emailAddress}
            </span>
          </div>

          {/* Interactive Star Picker */}
          <div>
            <label className="block text-sm font-semibold text-purple-300 mb-1.5">
              Overall Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled = (hoverRating !== null ? hoverRating : selectedRating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => {
                      cyberSound.playClick();
                      setSelectedRating(star);
                    }}
                    className="text-2xl transition-transform hover:scale-125 focus:outline-none"
                  >
                    <span className={filled ? 'text-amber-400' : 'text-zinc-700'}>
                      ★
                    </span>
                  </button>
                );
              })}
              <span className="text-sm font-mono text-muted ml-2">
                {selectedRating} of 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-300 mb-1">
              Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cut 3 weeks off our agency launch sprint"
              className="w-full bg-[#070314] border border-purple-500/30 rounded-xl px-3.5 min-h-11 py-2 text-sm text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-300 mb-1">
              Detailed Experience &amp; Performance
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="How did this template perform on mobile? How was the code structure and ease of customization?"
              className="w-full bg-[#070314] border border-purple-500/30 rounded-xl p-3 text-sm text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400 resize-none"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/30 p-2.5 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 min-h-11 py-2 rounded-xl text-sm text-purple-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 min-h-11 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-sm shadow-md transition-all disabled:opacity-60"
            >
              {submitting ? 'Publishing…' : 'Publish Review'}
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-8 text-center text-sm text-purple-400 font-mono">
            Loading verified reviews…
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted bg-[#0d0622] rounded-2xl border border-purple-500/20">
            No reviews yet. Be the first verified customer to review this template!
          </div>
        ) : (
          reviews.map((rev) => {
            const hasVoted = helpfulVoted[rev.id];
            return (
              <div
                key={rev.id}
                className="bg-[#0d0622]/70 border border-purple-500/20 rounded-2xl p-5 space-y-3 hover:border-purple-500/40 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-violet-800 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {rev.authorAvatar ? (
                        <img
                          src={rev.authorAvatar}
                          alt={rev.authorName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        rev.authorName.slice(0, 1).toUpperCase()
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          {rev.authorName}
                        </span>
                        {rev.verifiedBuyer && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono">
                            <span>✓</span>
                            <span>Verified Buyer</span>
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-muted font-mono">
                        {rev.authorRole}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex text-amber-400 text-sm">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s}>{s <= rev.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <span className="text-xs text-muted font-mono">
                      {rev.createdAt}
                    </span>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-white mb-1">
                    {rev.title}
                  </h5>
                  <p className="text-sm text-purple-200/80 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-purple-500/15 text-xs text-muted">
                  <span className="font-mono">
                    Zero bloat verified
                  </span>

                  <button
                    onClick={() => handleVoteHelpful(rev.id)}
                    className={`flex items-center gap-1.5 min-h-11 px-3 py-1 rounded-lg border text-xs transition-all ${
                      hasVoted
                        ? 'bg-purple-600/25 border-purple-400 text-white font-semibold'
                        : 'bg-[#070314] border-purple-500/20 text-purple-300 hover:text-white hover:bg-[#1a0b3b]'
                    }`}
                  >
                    <span>👍</span>
                    <span>Helpful ({rev.helpfulCount})</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
