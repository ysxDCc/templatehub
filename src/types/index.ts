export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  previewImage: string;
  logo?: string;
  livePreviewUrl: string;
  tier: SubscriptionTier;
  tags: string[];
  features: string[];
  createdAt: string;
  downloads: number;
  rating: number;
}

export type TemplateCategory = 
  | 'landing-page'
  | 'portfolio'
  | 'e-commerce'
  | 'blog'
  | 'dashboard'
  | 'saas'
  | 'fitness'
  | 'restaurant'
  | 'real-estate'
  | 'agency'
  | 'ai'
  | 'beauty';

export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise';

export interface PricingPlan {
  id: SubscriptionTier;
  name: string;
  price: number;
  interval: 'month';
  description: string;
  features: string[];
  highlighted?: boolean;
  dodoProductId?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscription: SubscriptionTier;
  avatar?: string;
}
