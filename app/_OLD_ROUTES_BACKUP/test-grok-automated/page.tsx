import productData from "@/data/products/test-grok-automated.json";

export default function Page() {
  const { winner, failures, verdict, methodology, searchMetadata, bestsellerWarning, failureCards } = productData;
  
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 border-b-4 border-amber-500">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-white">AUTOMATED TEST</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">{productData.searchIntent} - AUTOMATED</h1>
        
        <div className="bg-emerald-50 p-4 rounded mb-8">
          <p><strong>Winner:</strong> {winner.name}</p>
          <p><strong>Why:</strong> {winner.whyItWins}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {failureCards.map((card, i) => (
            <div key={i} className="border-2 border-red-400 rounded p-4">
              <h3 className="font-bold">{card.name}</h3>
              <span className="bg-red-100 text-red-800 px-2 py-1 text-xs rounded">{card.badge}</span>
              <p className="text-sm mt-2">{card.description}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Methodology</h2>
          {methodology.steps.map((step, i) => (
            <div key={i} className="mb-4">
              <strong>{step.num}. {step.title}</strong>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
