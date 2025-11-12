import Link from 'next/link';

interface BreadcrumbProps {
    categorySlug: string;
    productName: string;
}

export default function Breadcrumb({ categorySlug, productName }: BreadcrumbProps) {
    // Map category slugs to display names
    const categoryNames: { [key: string]: string } = {
        'coffee-makers': 'Coffee Makers',
        'air-fryers': 'Air Fryers',
        'external-hard-drives': 'External Hard Drives'
    };

    const categoryName = categoryNames[categorySlug] || categorySlug;

    return (
        <div className="bg-white border-b">
            <div className="max-w-4xl mx-auto px-6 py-3">
                <nav className="flex items-center gap-2 text-sm">
                    <Link href="/" className="text-emerald-600 hover:text-emerald-700">Home</Link>
                    <span className="text-slate-400">/</span>
                    <Link href={`/${categorySlug}`} className="text-emerald-600 hover:text-emerald-700">{categoryName}</Link>
                    <span className="text-slate-400">/</span>
                    <span className="text-slate-600">{productName}</span>
                </nav>
            </div>
        </div>
    );
}