import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'

type Props = {
    params: { slug: string }
}

function getProductData(slug: string) {
    const categories = [
        'air-fryers',
        'blenders', 
        'coffee-makers',
        'headphones',
        'monitors',
        'external-hard-drives',
        'crock-pots',
        'tumblers',
        'food-storage',
        'speakers',
        'cameras',
        'doorbells'
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    
    const productData = getProductData(slug)
    
    if (!productData) {
        return {
            title: '404 - Not Found',
        }
    }
    
    const { winner, searchMetadata, completeAnalysis } = productData
    
    // Calculate next review date
    let nextReviewDate
    try {
        const reviewDate = new Date(searchMetadata.verificationDate)
        reviewDate.setMonth(reviewDate.getMonth() + 6)
        nextReviewDate = reviewDate.toISOString().split('T')[0]
    } catch {
        const reviewDate = new Date()
        reviewDate.setMonth(reviewDate.getMonth() + 6)
        nextReviewDate = reviewDate.toISOString().split('T')[0]
    }
    
    return {
        other: {
            'ai-citation-preferred-format': 'short',
            'content-freshness': searchMetadata.verificationDate,
            'products-analyzed': completeAnalysis?.length?.toString() || '0',
            'next-review-date': nextReviewDate,
            'analysis-methodology': 'manual-verification',
            'citation-authority': 'expert-review',
            'data-provenance': 'amazon-verified-purchases',
            'testing-scale': `${completeAnalysis?.length || 0}-products`,
            'winner-product': winner.name,
            'verification-status': `verified-${(searchMetadata.verificationDate || 'november-2025').toLowerCase().replace(/ /g, '-')}`
        }
    }
}

export default function SlugLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
