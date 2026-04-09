"use client";

import { ArrowLeft, Heart, Shield, Truck, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";


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
  



export default function AboutPage() {
  const router = useRouter();
  const[activeCard,setActiveCard]=useState<number | null>(null);
 
   
    


  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2  border-gray-100 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl mb-4">About ShopNow</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Your trusted destination for premium  and fashion
          </p>

          {/* Image + Story */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
              <Image
                src="/about.jpg"
                alt="Our Store"
                fill
                loading="eager"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col  border-gray-100 justify-center">
              <h2 className="text-2xl mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2020, ShopNow began with a simple mission: to make premium
                products accessible to everyone.
              </p>
              <p className="text-muted-foreground">
                With over 10,000 satisfied customers worldwide, we continue to grow
                and improve our service every day.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature) => {
    const Icon = feature.icon;
    const isActive = activeCard === feature.id;

    return (
      <div
        key={feature.id}
        onClick={() => setActiveCard(feature.id)}
        className={`border rounded-lg p-6 text-center cursor-pointer transition-all duration-300
          ${isActive
            ? "border-primary bg-primary/10 scale-105"
            : "border-gray-200 hover:border-primary"
          }
        `}
      >
        <Icon className="h-6 w-6 text-primary mx-auto mb-4" />
        <h3 className="font-bold mb-2">{feature.title}</h3>
        <p className="text-sm text-muted-foreground">
          {feature.desc}
        </p>
      </div>
    );
  })}
</div>

          {/* Mission */}
          <div className="bg-card border  border-gray-100 rounded-lg p-8 text-center">
            <h2 className="text-2xl mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              To provide exceptional products, outstanding service, and an unmatched shopping experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}