import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Category metadata (icons and descriptions)
const categoryMetadata: { [key: string]: { icon: string; description: string } } = {
  'air-fryers': {
    icon: '🍳',
    description: 'Verified reviews of air frying equipment'
  },
  'blenders': {
    icon: '🥤',
    description: 'Blending equipment tested for power and versatility'
  },
  'coffee-makers': {
    icon: '☕',
    description: 'Expert reviews of coffee brewing equipment'
  },
  'external-hard-drives': {
    icon: '💾',
    description: 'Storage solutions tested for reliability'
  },
  'headphones': {
    icon: '🎧',
    description: 'Audio equipment tested for quality and performance'
  },
  'monitors': {
    icon: '🖥️',
    description: 'Display technology tested for performance and accuracy'
  }
};

// Format slug to display name
function formatCategoryName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Format product filename to display name
function formatProductName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function GET() {
  // FIXED: Use process.cwd() which works on both local and Vercel
  const appDir = path.join(process.cwd(), 'app');
  const categories: any = {};

  // Folders to exclude
  const excludedFolders = [
    'api', 'components', 'fonts', '[slug]', 'about', 
    'affiliate-disclosure', 'privacy', 'terms', '_OLD_ROUTES_BACKUP'
  ];

  try {
    // Check if app directory exists
    if (!fs.existsSync(appDir)) {
      console.error('App directory not found at:', appDir);
      console.log('Current working directory:', process.cwd());
      console.log('Directory contents:', fs.readdirSync(process.cwd()));
      return NextResponse.json({});
    }

    const items = fs.readdirSync(appDir);
    
    for (const item of items) {
      const itemPath = path.join(appDir, item);
      
      // Skip if not a directory or if excluded
      if (!fs.statSync(itemPath).isDirectory() || excludedFolders.includes(item)) {
        continue;
      }

      // Check if products folder exists
      const productsPath = path.join(itemPath, 'products');
      if (!fs.existsSync(productsPath)) {
        continue;
      }

      // Get all JSON files in products folder
      const files = fs.readdirSync(productsPath);
      const jsonFiles = files.filter(file => file.endsWith('.json'));

      if (jsonFiles.length > 0) {
        const categorySlug = item;
        const categoryName = formatCategoryName(categorySlug);
        
        // Get metadata or use defaults
        const metadata = categoryMetadata[categorySlug] || {
          icon: '📦',
          description: `Verified reviews of ${categoryName.toLowerCase()}`
        };

        // Build products list from JSON files
        const products = jsonFiles.map(file => {
          const slug = file.replace('.json', '');
          return {
            name: formatProductName(slug),
            slug: slug
          };
        });

        categories[categoryName] = {
          icon: metadata.icon,
          description: metadata.description,
          products: products
        };
      }
    }
  } catch (error) {
    console.error('Error reading categories:', error);
    // Return empty object instead of crashing
    return NextResponse.json({});
  }

  return NextResponse.json(categories);
}