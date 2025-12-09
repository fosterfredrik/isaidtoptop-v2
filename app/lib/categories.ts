import fs from 'fs';
import path from 'path';

export interface CategoryConfig {
  name: string;
  slug: string;
  icon: string;
  group: 'Food' | 'Home' | 'Electronics' | 'Misc';
  description: string;
}

export interface ProductInfo {
  name: string;
  slug: string;
}

export interface CategoryWithProducts extends CategoryConfig {
  products: ProductInfo[];
}

// Format slug to display name (fallback if name not in config)
function formatSlugToName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Scans the app directory for category folders.
 * A valid category folder has a category.json file and a products/ subfolder.
 */
export function getAllCategories(): CategoryWithProducts[] {
  const appDir = path.join(process.cwd(), 'app');
  const categories: CategoryWithProducts[] = [];

  // Folders to exclude (not categories)
  const excludedFolders = [
    'api', 'components', 'fonts', 'lib', 'config',
    '[slug]', 'about', 'affiliate-disclosure', 'privacy', 'terms'
  ];

  try {
    const items = fs.readdirSync(appDir);

    for (const item of items) {
      // Skip excluded folders and hidden files
      if (excludedFolders.includes(item) || item.startsWith('.') || item.startsWith('_')) {
        continue;
      }

      const itemPath = path.join(appDir, item);

      // Must be a directory
      if (!fs.statSync(itemPath).isDirectory()) {
        continue;
      }

      // Must have a products folder
      const productsPath = path.join(itemPath, 'products');
      if (!fs.existsSync(productsPath)) {
        continue;
      }

      // Try to load category.json
      const configPath = path.join(itemPath, 'category.json');
      let config: CategoryConfig;

      if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      } else {
        // Fallback: generate config from folder name
        config = {
          name: formatSlugToName(item),
          slug: item,
          icon: '📦',
          group: 'Misc',
          description: `Verified reviews of ${formatSlugToName(item).toLowerCase()}`
        };
      }

      // Get products from the products folder
      const productFiles = fs.readdirSync(productsPath)
        .filter(file => file.endsWith('.json'));

      const products: ProductInfo[] = productFiles.map(file => {
        const slug = file.replace('.json', '');
        return {
          name: formatSlugToName(slug),
          slug: slug
        };
      });

      categories.push({
        ...config,
        products
      });
    }
  } catch (error) {
    console.error('Error scanning categories:', error);
  }

  return categories;
}

/**
 * Get a single category by slug
 */
export function getCategoryBySlug(slug: string): CategoryWithProducts | null {
  const categories = getAllCategories();
  return categories.find(cat => cat.slug === slug) || null;
}

/**
 * Get all category slugs (for routing)
 */
export function getAllCategorySlugs(): string[] {
  return getAllCategories().map(cat => cat.slug);
}

/**
 * Get all product slugs across all categories
 */
export function getAllProductSlugs(): string[] {
  const categories = getAllCategories();
  const slugs: string[] = [];
  
  for (const category of categories) {
    for (const product of category.products) {
      slugs.push(product.slug);
    }
  }
  
  return slugs;
}

/**
 * Find which category a product belongs to
 */
export function findProductCategory(productSlug: string): CategoryWithProducts | null {
  const categories = getAllCategories();
  
  for (const category of categories) {
    if (category.products.some(p => p.slug === productSlug)) {
      return category;
    }
  }
  
  return null;
}

/**
 * Load product JSON data
 */
export function getProductData(productSlug: string): any | null {
  const category = findProductCategory(productSlug);
  
  if (!category) {
    return null;
  }
  
  const productPath = path.join(
    process.cwd(), 
    'app', 
    category.slug, 
    'products', 
    `${productSlug}.json`
  );
  
  if (fs.existsSync(productPath)) {
    return JSON.parse(fs.readFileSync(productPath, 'utf-8'));
  }
  
  return null;
}

/**
 * Get categories grouped by their group (Food, Home, Electronics, etc.)
 */
export function getCategoriesByGroup(): Record<string, CategoryWithProducts[]> {
  const categories = getAllCategories();
  const grouped: Record<string, CategoryWithProducts[]> = {};
  
  for (const category of categories) {
    if (!grouped[category.group]) {
      grouped[category.group] = [];
    }
    grouped[category.group].push(category);
  }
  
  return grouped;
}

/**
 * Get related products from the same category
 */
export function getRelatedProducts(productSlug: string, limit = 4): ProductInfo[] {
  const category = findProductCategory(productSlug);
  
  if (!category) {
    return [];
  }
  
  return category.products
    .filter(p => p.slug !== productSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}