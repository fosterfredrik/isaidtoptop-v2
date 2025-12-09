import { notFound } from 'next/navigation';
import {
  getAllCategories,
  getCategoryBySlug,
  getProductData,
  findProductCategory,
  getAllCategorySlugs,
  getAllProductSlugs,
  getRelatedProducts
} from '../lib/categories';
import CategoryPage from '../components/CategoryPage';
import ProductPage from './ProductPage';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  const productData = getProductData(slug);
  const category = getCategoryBySlug(slug);
  
  if (category) {
    const title = category.name.length > 25
      ? `Best ${category.name} 2025 | I Said Top Top`
      : `Best ${category.name} 2025 - Tested & Verified | I Said Top Top`;
    const description = `${category.description} Expert analysis with verified specs and real data.`;
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://isaidtoptop.com/${slug}`,
        siteName: 'I Said Top Top',
        type: 'website',
      },
    };
  }
  
  if (productData) {
    const intent = productData.searchIntent || 'Products';
    const title = intent.length > 25
      ? `Best ${intent} 2025 | I Said Top Top`
      : `Best ${intent} 2025 - Tested & Verified | I Said Top Top`;
    
    const count = productData.completeAnalysis?.length || 0;
    const winner = productData.winner?.name || 'top pick';
    let description = `After testing ${count} ${intent.toLowerCase()}, the ${winner} is our #1 pick.`;
    
    if (description.length < 120) {
      description += ' Evidence-based analysis with verified specs and real customer data.';
    }
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://isaidtoptop.com/${slug}`,
        siteName: 'I Said Top Top',
        type: 'article',
        images: productData.winner?.imageUrl ? [{ url: productData.winner.imageUrl }] : [],
      },
    };
  }
  
  return {
    title: 'I Said Top Top',
    description: 'Transparent product research with verified specs and no BS',
  };
}

// Generate static params for both categories and products
export async function generateStaticParams() {
  const categorySlugs = getAllCategorySlugs();
  const productSlugs = getAllProductSlugs();

  const allSlugs = [...categorySlugs, ...productSlugs];

  return allSlugs.map(slug => ({
    slug: slug
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // First, check if this is a category
  const category = getCategoryBySlug(slug);

  if (category) {
    // It's a category page
    return <CategoryPage category={category} />;
  }

  // Otherwise, check if it's a product
  const productData = getProductData(slug);
  const productCategory = findProductCategory(slug);

  if (productData && productCategory) {
    // It's a product page - pass the category slug
    const relatedProducts = getRelatedProducts(slug, 4);
    return <ProductPage productData={productData} slug={slug} categorySlug={productCategory.slug} relatedProducts={relatedProducts} />;
  }

  // Neither category nor product found
  notFound();
}