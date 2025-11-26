import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Footer from '../components/Footer';

interface Product {
    verdict: { summary: string; };
    winner: { imageUrl: string; name: string; };
}

export default function SpeakersCategory() {
    const productsDir = path.join(process.cwd(), 'app/speakers/products');
    
    if (!fs.existsSync(productsDir)) {
        return <div>No products yet</div>;
    }
    
    const allFiles = fs.readdirSync(productsDir);
    const productFiles = allFiles.filter(file => file.endsWith('.json'));
    
    const products = productFiles.map(file => {
        const slug = file.replace('.json', '');
        const filePath = path.join(productsDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Product;
        return {
            slug,
            title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            imageUrl: data.winner.imageUrl,
            productName: data.winner.name,
            verdict: data.verdict
        };
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <header className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 border-b-4 border-amber-500">
                <div className="max-w-4xl mx-auto px-6 py-5">
                    <Link href="/"><span className="text-white text-2xl font-bold">I SAID TOP TOP</span></Link>
                </div>
            </header>
            <div className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-6 py-3">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-emerald-600 hover:text-emerald-700">Home</Link>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-600">Speakers</span>
                    </nav>
                </div>
            </div>
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-5xl font-bold text-emerald-700 mb-4">Speakers</h1>
                    <p className="text-xl text-slate-600">We've analyzed {products.length} types of Speakers to find the top product in each category.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <Link key={product.slug} href={`/${product.slug}`} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                            <div className="aspect-square bg-white flex items-center justify-center p-8">
                                <img src={product.imageUrl} alt={product.productName} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="p-6 bg-slate-50">
                                <h2 className="text-xl font-bold text-emerald-700 mb-2">{product.title}</h2>
                                <p className="text-sm font-medium text-slate-900 mb-3">Winner: {product.productName}</p>
                                <p className="text-sm text-slate-600 line-clamp-3 mb-4">{product.verdict.summary}</p>
                                <span className="text-emerald-600 font-medium text-sm group-hover:text-emerald-700">View full analysis →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
