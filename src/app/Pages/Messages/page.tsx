import React from "react";
import Image from "next/image";
import { Star, ThumbsUp, MessageSquare, TrendingUp } from "lucide-react";

const reviews = [
  {
    id: 1,
    item: "Canon EOS R5 Camera",
    itemImage: "/next.svg",
    reviewer: "Sarah Johnson",
    reviewerAvatar: "SJ",
    rating: 5,
    comment: "Amazing camera! Worked perfectly for my wedding shoot. The owner was very responsive and the equipment was in pristine condition. Highly recommend!",
    date: "Apr 3, 2026",
    helpful: 12,
  },
  {
    id: 2,
    item: "DJI Mavic 3 Drone",
    itemImage: "/next.svg",
    reviewer: "Michael Chen",
    reviewerAvatar: "MC",
    rating: 5,
    comment: "Great drone and smooth rental process. Got some incredible aerial footage for my real estate project. Will definitely rent again!",
    date: "Apr 1, 2026",
    helpful: 8,
  },
  {
    id: 3,
    item: "MacBook Pro 16\"",
    itemImage: "/next.svg",
    reviewer: "Emily Davis",
    reviewerAvatar: "ED",
    rating: 4,
    comment: "Laptop performed well for my video editing needs. Only minor issue was battery life, but overall a good rental experience.",
    date: "Mar 28, 2026",
    helpful: 5,
  },
  {
    id: 4,
    item: "Professional Power Drill Set",
    itemImage: "/next.svg",
    reviewer: "David Park",
    reviewerAvatar: "DP",
    rating: 5,
    comment: "Perfect for my home renovation project. All tools were well-maintained and powerful. The owner was helpful with usage tips too!",
    date: "Mar 25, 2026",
    helpful: 15,
  },
  {
    id: 5,
    item: "Canon EOS R5 Camera",
    itemImage: "/next.svg",
    reviewer: "Lisa Wong",
    reviewerAvatar: "LW",
    rating: 5,
    comment: "Excellent camera and professional service. Made my photography project a success!",
    date: "Mar 20, 2026",
    helpful: 7,
  },
];

export default function Reviews() {
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const totalReviews = reviews.length;
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reviews & Ratings</h1>
        <p className="text-gray-600 mt-2">See what renters are saying about your items</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="text-5xl font-extrabold text-gray-900 mb-2">{averageRating}</div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={`avg-star-${i}`}
                className={`w-5 h-5 ${
                  i < Math.round(parseFloat(averageRating))
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 font-medium">{totalReviews} reviews</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="p-3 bg-yellow-50 rounded-lg w-fit mb-4">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <p className="text-sm text-gray-600">5 Star Reviews</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{fiveStarCount}</p>
          <p className="text-sm text-gray-500 mt-2">
            {Math.round((fiveStarCount / totalReviews) * 100)}% of total
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="p-3 bg-green-50 rounded-lg w-fit mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Recent Growth</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
          <p className="text-sm text-emerald-600 mt-2 font-medium">+3 this month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="p-3 bg-blue-50 rounded-lg w-fit mb-4">
            <ThumbsUp className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600">Response Rate</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">98%</p>
          <p className="text-sm text-gray-500 mt-2">Avg time: 2h</p>
        </div>
      </div>

      {/* Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Rating Distribution</h2>
        <div className="space-y-4">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = reviews.filter((r) => r.rating === stars).length;
            const percentage = (count / totalReviews) * 100;
            return (
              <div key={`dist-${stars}`} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-bold text-gray-700">{stars}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8 text-right font-medium">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                <Image
                  src={review.itemImage}
                  alt={review.item}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{review.item}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {review.reviewerAvatar}
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{review.reviewer}</span>
                      <span className="text-sm text-gray-400">• {review.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={`review-${review.id}-star-${i}`} 
                        className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} 
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">{review.comment}</p>

                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful})
                  </button>
                  <button className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}