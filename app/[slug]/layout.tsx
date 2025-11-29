import { Metadata } from 'next';
import { 
  getCategoryBySlug, 
  getProductData, 
  findProductCategory 
} from '../lib/categories';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  // Check if it's a category
  const category = getCategoryBySlug(slug);
  
  if (category) {
    return {
      title: `Best ${category.name} - Expert Reviews & Top Picks | ISaidTopTop`,
      description: `${category.description}. Compare top-rated ${category.name.toLowerCase()} with AI-powered analysis of real customer reviews.`,
      openGraph: {
        title: `Best ${category.name} - Expert Reviews & Top Picks`,
        description: `${category.description}. Compare top-rated ${category.name.toLowerCase()} with AI-powered analysis.`,
        type: 'website',
      },
    };
  }
  
  // Check if it's a product
  const productData = getProductData(slug);
  const productCategory = findProductCategory(slug);
  
  if (productData && productCategory) {
    const productName = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return {
      title: `Best ${productName} - Expert Reviews & Top Picks | ISaidTopTop`,
      description: productData.verdict?.summary || `Expert reviews and analysis of the best ${productName.toLowerCase()}. Find the top-rated options based on AI-powered research.`,
      openGraph: {
        title: `Best ${productName} - Expert Reviews & Top Picks`,
        description: productData.verdict?.summary || `Expert reviews and analysis of the best ${productName.toLowerCase()}.`,
        type: 'article',
        images: productData.winner?.imageUrl ? [{ url: productData.winner.imageUrl }] : [],
      },
    };
  }
  
  // Fallback
  return {
    title: 'ISaidTopTop - Expert Product Reviews',
    description: 'AI-powered product reviews and recommendations.',
  };
}

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}