"use client";

import { ArrowLeft, Mail, Phone, MapPin, Send, Truck, Shield, Heart, Users } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import Image from "next/image";

const features = [
  {
    id: 0,
    icon: Truck,
    title: "Shipping",
    desc: "Offers delivery if the customer wants",
  },
  {
    id: 1,
    icon: Shield,
    title: "Secure Payments",
    desc: "100% secure transactions",
  },
  {
    id: 2,
    icon: Heart,
    title: "Quality Guaranteed",
    desc: "30-day money back guarantee",
  },
  {
    id: 3,
    icon: Users,
    title: "24/7 Support",
    desc: "Always here to help you",
  },
];

export default function AboutContactPage() {
  const router = useRouter();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />

      {/* --- NAVIGATION --- */}
      <div className="border-b border-gray-100 sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          
          {/* --- SECTION 1: ABOUT / OUR STORY --- */}
          <section className="mb-24">
            <h1 className="text-5xl font-bold mb-6 tracking-tight">About ShopNow</h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
              Your trusted destination for premium products and fashion since 2020.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-video bg-muted rounded-2xl overflow-hidden relative border border-gray-200 shadow-lg">
                <Image
                  src="/about.jpg"
                  alt="Our Store"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Founded in 2020, ShopNow began with a simple mission: to make premium
                  products accessible to everyone. We believe quality shouldn't be a luxury.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  With over 10,000 satisfied customers worldwide, we continue to grow
                  and improve our service every day.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-gray-100 mb-24" />

          {/* --- SECTION 2: CONTACT FORM & INFO --- */}
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground text-lg">
                Have a question? We'd love to hear from you.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Contact Method Cards */}
              <div className="border border-gray-500 rounded-xl p-6 hover:shadow-md transition-all">
                <Mail className="h-6 w-6 text-primary mb-4" />
                <h3 className="font-bold mb-1">Email Us</h3>
                <a href="mailto:support@shopnow.com" className="text-primary hover:underline block">support@shopnow.com</a>
              </div>
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                <Phone className="h-6 w-6 text-primary mb-4" />
                <h3 className="font-bold mb-1">Call Us</h3>
                <a href="tel:+15551234567" className="text-primary hover:underline block">+1 (555) 123-4567</a>
              </div>
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                <MapPin className="h-6 w-6 text-primary mb-4" />
                <h3 className="font-bold mb-1">Visit Us</h3>
                <p className="text-sm text-muted-foreground">New York, NY 10001</p>
              </div>
            </div>

            {/* Form Box */}
            <div className="bg-card border border-gray-700 rounded-2xl p-8 md:p-12 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-3 border border-gray-500 rounded-lg resize-none focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-14 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            </div>
          </section>

          {/* --- SECTION 3: FEATURES / TRUST BAR --- */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isActive = activeCard === feature.id;
              return (
                <div
                  key={feature.id}
                  onClick={() => setActiveCard(feature.id)}
                  className={`border rounded-xl p-8 text-center cursor-pointer transition-all duration-300
                    ${isActive 
                      ? "border-primary bg-primary/5 scale-105 shadow-md" 
                      : "border-gray-200 hover:border-primary/40"
                    }
                  `}
                >
                  <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mission Box */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-xl italic">
              "To provide exceptional products, outstanding service, and an unmatched shopping experience for every customer."
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}