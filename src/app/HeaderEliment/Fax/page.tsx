"use client";

import { ArrowLeft, ChevronDown, Search, HelpCircle, Truck, Shield, CreditCard, RefreshCw } from "lucide-react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  icon: any;
  tags: string[];
}

const FAQS: FAQItem[] = [
  // Rental Process
  {
    category: "Getting Started",
    question: "How do I rent an item?",
    answer: "Browse our catalog, select the item you want to rent, choose your rental dates, and proceed to checkout. You'll need to provide identification and payment information. Once approved, we'll deliver the item to your specified location.",
    icon: HelpCircle,
    tags: ["rental", "process", "beginner"]
  },
  {
    category: "Getting Started",
    question: "What do I need to rent?",
    answer: "You'll need a valid ID, proof of address, and a credit/debit card for security deposit and rental fees. First-time renters may need additional verification. We accept most major credit cards and digital payment methods.",
    icon: HelpCircle,
    tags: ["requirements", "id", "verification"]
  },
  {
    category: "Getting Started",
    question: "How long can I rent items for?",
    answer: "Rental periods vary by item, but typically range from 1 day to 12 months. Daily, weekly, and monthly rates are available. Longer rentals often qualify for discounted rates.",
    icon: HelpCircle,
    tags: ["duration", "period", "rates"]
  },

  // Delivery & Pickup
  {
    category: "Delivery & Pickup",
    question: "How does delivery work?",
    answer: "We offer free delivery within our service area. Items are typically delivered within 24-48 hours of approval. You can choose delivery to your home, office, or we can arrange pickup from one of our locations.",
    icon: Truck,
    tags: ["delivery", "shipping", "logistics"]
  },
  {
    category: "Delivery & Pickup",
    question: "What are your delivery hours?",
    answer: "Delivery is available Monday through Saturday, 9 AM to 6 PM. We can accommodate specific time slots based on availability. For urgent deliveries, contact our support team for expedited options.",
    icon: Truck,
    tags: ["hours", "schedule", "timing"]
  },
  {
    category: "Delivery & Pickup",
    question: "Can I pick up items myself?",
    answer: "Yes! Self-pickup is available at our main warehouse and select partner locations. This option often provides immediate availability and can save on delivery fees. Call ahead to confirm item availability.",
    icon: Truck,
    tags: ["pickup", "self-service", "location"]
  },

  // Payments & Security
  {
    category: "Payments & Security",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through encrypted connections.",
    icon: CreditCard,
    tags: ["payment", "cards", "security"]
  },
  {
    category: "Payments & Security",
    question: "Do you require a security deposit?",
    answer: "Yes, most rentals require a refundable security deposit. The deposit amount varies by item value and typically ranges from 10-50% of the item's retail price. Deposits are fully refunded upon return of the item in good condition.",
    icon: Shield,
    tags: ["deposit", "security", "refund"]
  },
  {
    category: "Payments & Security",
    question: "When am I charged?",
    answer: "You'll be charged the rental fee plus any applicable delivery fees at the time of booking. The security deposit is held separately and refunded after the rental period ends and the item is returned.",
    icon: CreditCard,
    tags: ["billing", "charges", "timing"]
  },

  // Returns & Exchanges
  {
    category: "Returns & Exchanges",
    question: "How do I return rented items?",
    answer: "Items can be returned via our free pickup service or by dropping them off at any of our locations. We recommend scheduling a return pickup when you receive the item to ensure timely collection.",
    icon: RefreshCw,
    tags: ["return", "pickup", "process"]
  },
  {
    category: "Returns & Exchanges",
    question: "What if I need to extend my rental?",
    answer: "You can extend your rental through your account dashboard or by contacting our support team. Extension rates are the same as the original rental rate. Early returns may qualify for partial refunds.",
    icon: RefreshCw,
    tags: ["extension", "extend", "modify"]
  },
  {
    category: "Returns & Exchanges",
    question: "What happens if an item is damaged or lost?",
    answer: "Minor wear and tear is normal, but significant damage or loss may result in repair charges or replacement costs. We recommend inspecting items upon receipt and reporting any pre-existing damage immediately.",
    icon: Shield,
    tags: ["damage", "insurance", "liability"]
  },

  // Account & Support
  {
    category: "Account & Support",
    question: "How do I create an account?",
    answer: "Click 'Sign Up' in the top navigation, provide your basic information, and verify your email. Once verified, you can start browsing and renting items. Accounts help track your rentals and speed up future bookings.",
    icon: HelpCircle,
    tags: ["account", "signup", "registration"]
  },
  {
    category: "Account & Support",
    question: "Can I cancel my rental?",
    answer: "Cancellations made 24+ hours before the rental start date receive a full refund. Same-day cancellations may incur a small fee. Contact our support team immediately if you need to cancel.",
    icon: HelpCircle,
    tags: ["cancel", "refund", "policy"]
  },
  {
    category: "Account & Support",
    question: "What if I have a problem with my rental?",
    answer: "Contact our 24/7 support team immediately. We can arrange replacements, repairs, or refunds as needed. Most issues are resolved within 24 hours of reporting.",
    icon: HelpCircle,
    tags: ["support", "problems", "issues"]
  }
];

export default function FAQPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const categories = ["All", ...new Set(FAQS.map((f) => f.category))];

  const filteredFAQs = useMemo(() => {
    let filtered = selectedCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === selectedCategory);

    if (searchTerm) {
      filtered = filtered.filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about renting with RentEase.
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mb-6">
            <p className="text-gray-600">
              {filteredFAQs.length} {filteredFAQs.length === 1 ? 'result' : 'results'} found
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => {
                const Icon = faq.icon;
                const isOpen = openIndex === index;

                return (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full px-6 py-4 flex justify-between items-center text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">
                            {faq.category}
                          </div>
                          <div className="text-gray-900 font-medium">
                            {faq.question}
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="pt-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                          {faq.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {faq.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or browse our categories above.
                </p>
              </div>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our friendly support team is here to help. Get in touch and we'll
              provide personalized assistance for your rental needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/contact")}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Support
              </button>
              <button
                onClick={() => router.push("/")}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Rentals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}