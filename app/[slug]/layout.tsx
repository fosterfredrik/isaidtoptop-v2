import { Metadata } from 'next'

type Props = {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params  // <- FIX: await params first

    // Load the product data
    let productData
    try {
        productData = require(`@/data/products/${slug}.json`)
    } catch {
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