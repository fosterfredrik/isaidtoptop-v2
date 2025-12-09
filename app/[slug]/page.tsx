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