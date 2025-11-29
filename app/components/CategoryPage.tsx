import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Footer from './Footer';
import { CategoryWithProducts } from '../lib/categories';

interface Product {
  verdict: {
    summary: string;
  };
  winner: {
    imageUrl: string;
    name: string;
  };
}

interface ProductDisplay {
  slug: string;
  title: string;
  imageUrl: string;
  productName: string;
  verdict: {
    summary: string;
  };
}

interface CategoryPageProps {
  category: CategoryWithProducts;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  // Load full product data for each product
  const productsDir = path.join(process.cwd(), 'app', category.slug, 'products');
  
  const products: ProductDisplay[] = category.products.map(product => {
    const filePath = path.join(productsDir, `${product.slug}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Product;

    return {
      slug: product.slug,
      title: product.name,
      imageUrl: data.winner.imageUrl,
      productName: data.winner.name,
      verdict: data.verdict
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 border-b-4 border-amber-500">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <Link href="/">
            <span className="text-2xl font-bold text-white">I Said Top Top</span>
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-emerald-600 hover:text-emerald-700">Home</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-emerald-700 mb-4">{category.name}</h1>
          <p className="text-xl text-slate-600">
            We've analyzed {products.length} types of {category.name.toLowerCase()} to find the top product in each category.
            Our AI-empowered research cuts through marketing claims to reveal what actually works.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <Link
              key={product.slug}
              href={`/${product.slug}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
            >
              {/* Image */}
              <div className="aspect-square bg-white flex items-center justify-center p-8">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Content */}
              <div className="p-6 bg-slate-50">
                <h2 className="text-xl font-bold text-emerald-700 mb-2">{product.title}</h2>
                <p className="text-sm font-medium text-slate-900 mb-3">Winner: {product.productName}</p>
                <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                  {product.verdict.summary}
                </p>
                <span className="text-emerald-600 font-medium text-sm group-hover:text-emerald-700">
                  View full analysis →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}