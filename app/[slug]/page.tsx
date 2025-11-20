import fs from 'fs';
import path from 'path';
import ProductPage from './ProductPage';

// Helper function to find product JSON across all category folders
function findProductJSON(slug: string) {
  const categories = [
    'coffee-makers',
    'air-fryers',
    'headphones',
    'monitors',
    'external-hard-drives',
    'blenders'
  ];

  for (const category of categories) {
    const productPath = path.join(process.cwd(), 'app', category, 'products', `${slug}.json`);
    
    if (fs.existsSync(productPath)) {
      const data = JSON.parse(fs.readFileSync(productPath, 'utf-8'));
      return data;
    }
  }

  return null;
}

export default function Page({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    
    // Don't handle category pages - let those route to their own page.tsx
    const categoryNames = [
      'coffee-makers',
      'air-fryers',
      'headphones',
      'monitors',
      'external-hard-drives',
      'blenders'
    ];
    
    if (categoryNames.includes(slug)) {
      // This is a category route, not a product route
      // Next.js will handle it with the category's own page.tsx
      return null;
    }
    
    let productData;
    try {
      productData = findProductJSON(slug);
      
      if (!productData) {
        throw new Error('Product not found');
      }
    } catch (error) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-4">No data found for: {slug}</p>
            <a href="/" className="text-emerald-600 hover:text-emerald-700">← Back to Home</a>
          </div>
        </div>
      )
    }
  
    // Pass the loaded data to the client component
    return <ProductPage productData={productData} slug={slug} />;
  }