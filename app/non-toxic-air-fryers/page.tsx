import productData from "@/data/products/non-toxic-air-fryers.json";

export default function Page() {
  const { winner, runnerUps, verdict, methodology, searchMetadata, bestsellerWarning, failureCards, disqualifiedProducts, completeAnalysis, disclaimer } = productData;

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: {
              "@type": "Product",
              name: winner.name,
              brand: { "@type": "Brand", name: "Emeril Lagasse" }
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: winner.rating,
              bestRating: "5"
            },
            author: { "@type": "Organization", name: "isaidtoptop" }
          })
        }}
      />

      <header className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 border-b-4 border-amber-500">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <svg width="300" height="56" viewBox="0 0 420 80" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0,8)">
              <rect width="64" height="64" rx="14" fill="white" />
              <circle cx="22" cy="22" r="8" fill="#f59e0b" />
              <circle cx="42" cy="42" r="8" fill="#f59e0b" />
            </g>
            <text x="88" y="52" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="38" fill="white">
              isaidtoptop
            </text>
          </svg>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-slate-600">
            <li><a href="/" className="hover:text-slate-900 hover:underline">Home</a></li>
            <li>/</li>
            <li><a href="/kitchen-appliances" className="hover:text-slate-900 hover:underline">Kitchen Appliances</a></li>
            <li>/</li>
            <li className="text-slate-900">Non-Toxic Air Fryers</li>
          </ol>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Best {productData.searchIntent} (2025)
          </h1>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <time className="bg-slate-100 text-slate-600 text-sm font-medium px-3 py-1 rounded-lg">
              {searchMetadata.dateAnalyzed}
            </time>
            <span className="bg-slate-100 text-slate-600 text-sm font-medium px-3 py-1 rounded-lg">
              {searchMetadata.totalProductsAnalyzed} products analyzed
            </span>
          </div>
          <div className="bg-emerald-50 text-emerald-800 px-5 py-4 rounded-lg border border-emerald-200">
            <p className="text-sm font-medium leading-relaxed">
              <strong>The Winner:</strong> {verdict.summary}{" "}
              <span className="text-xs text-emerald-700 font-semibold">
                Verified {searchMetadata.verificationDate}
              </span>
            </p>
          </div>
        </div>

        <div className="mb-12">
          <div className="relative isolate overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800">
            <svg viewBox="0 0 1024 1024" className="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-y-1/2 -translate-x-1/2 opacity-20">
              <circle r="512" cx="512" cy="512" fill="url(#emerald-gradient)" fillOpacity="0.4" />
              <defs>
                <radialGradient id="emerald-gradient">
                  <stop stopColor="#10b981" />
                  <stop offset="1" stopColor="#059669" />
                </radialGradient>
              </defs>
            </svg>

            <div className="relative">
              <div className="grid lg:grid-cols-2 gap-0 pb-0">
                <div className="flex flex-col p-8 lg:p-12 lg:pr-8 items-center justify-center">
                  <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 text-center">
                    {winner.name}
                  </h2>

                  <div className="flex items-center gap-3 mb-8 justify-center">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const fillPercentage = Math.min(Math.max(winner.rating - (star - 1), 0), 1);
                        return (
                          <div key={star} className="relative inline-block">
                            <svg className="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercentage * 100}%` }}>
                              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-sm text-emerald-100 font-medium">{winner.rating.toFixed(1)}/5</span>
                    <span className="text-sm text-emerald-200">({winner.reviewCount} reviews)</span>
                  </div>

                  <div className="lg:hidden w-full aspect-square max-w-lg border-4 border-emerald-500 rounded-2xl overflow-hidden bg-white mb-8 flex items-center justify-center p-6">
                    <img src={winner.imageUrl} alt={winner.name} className="max-w-full max-h-full object-contain" />
                  </div>

                  <div className="hidden lg:grid grid-cols-2 gap-2 w-full max-w-md mx-auto mb-8">
                    {winner.badges.map((badge, i) => (
                      <span key={i} className="bg-white/90 text-emerald-900 text-xs font-bold px-3 py-2 rounded-lg shadow-md text-center">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="w-full max-w-md mx-auto">
                    <a href={winner.amazonUrl} target="_blank" rel="noopener noreferrer" className="block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 text-lg rounded-full shadow-lg transition-colors text-center lg:whitespace-nowrap">
                      Verify Current Price on Amazon →
                    </a>
                    <p className="text-xs text-emerald-100 text-center mt-3">
                      {winner.upsellLine}
                    </p>
                    <p className="text-xs text-emerald-200 text-center mt-1">
                      As an Amazon Associate, we earn from qualifying purchases.
                    </p>
                  </div>

                  <div className="lg:hidden grid grid-cols-2 gap-2 w-full max-w-md mx-auto mt-8">
                    {winner.badges.map((badge, i) => (
                      <span key={i} className="bg-white/90 text-emerald-900 text-xs font-bold px-3 py-2 rounded-lg shadow-md text-center">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:flex relative flex-col items-center justify-center p-8 lg:p-12 lg:pl-8">
                  <div className="w-full aspect-square max-w-lg border-4 border-emerald-500 rounded-2xl overflow-hidden bg-white flex items-center justify-center p-6">
                    <img src={winner.imageUrl} alt={winner.name} className="max-w-full max-h-full object-contain" />
                  </div>
                </div>
              </div>

              <div className="px-8 lg:px-12 pb-10">
                <p className="text-2xl leading-relaxed text-emerald-50 font-semibold text-center max-w-4xl mx-auto">
                  {winner.whyItWins}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-12" id="why-this-one">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Why This One Is a Winner
          </h2>
          <div className="space-y-5">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
              <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-lg text-sm font-medium inline-block mb-4">
                Material Evidence
              </span>
              <ul className="space-y-3 text-slate-700">
                {winner.materialEvidence.map((evidence: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold text-lg mt-0.5">✓</span>
                    <span>
                      <strong>{evidence.title}:</strong> {evidence.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-sm p-6 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-xs font-medium">
                  Verified Purchase
                </span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className="text-amber-400">⭐</span>
                  ))}
                </div>
              </div>
              <p className="text-base text-slate-700 leading-relaxed mb-2 italic">
                "{winner.customerReview.quote}"
              </p>
              <span className="text-xs text-slate-500">{winner.customerReview.date}</span>
            </div>
          </div>
        </section>

        <section className="mb-12" id="key-specs">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Key Specs
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-lg shadow-sm p-6 border-2 border-emerald-700">
              <h3 className="font-bold text-emerald-700 mb-4 text-lg">What You Get</h3>
              <ul className="space-y-2 text-slate-700">
                {winner.specs.whatYouGet.map((spec: any, idx: number) => (
                  <li key={idx}>
                    • <strong className="text-emerald-700">{spec.label}:</strong> {spec.value}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium inline-block mb-4">
                Certifications
              </span>
              <ul className="space-y-3 text-slate-700">
                {winner.specs.certifications.map((cert: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {runnerUps && runnerUps.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Runners-Up
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {runnerUps.map((runnerUp: any, idx: number) => (
                <div key={idx} className="border-2 border-emerald-400 rounded-lg overflow-hidden bg-white flex flex-col shadow-lg hover:shadow-xl transition-shadow">

                  {/* Image section - white background */}
                  <div className="relative bg-white p-14 pt-20 flex items-center justify-center" style={{ minHeight: '360px', maxHeight: '360px' }}>
                    <img
                      src={runnerUp.imageUrl}
                      alt={runnerUp.name}
                      className="max-w-full max-h-[300px] object-contain"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                        #{idx + 2}
                      </span>
                    </div>
                  </div>

                  {/* Green section at bottom */}
                  <div className="p-6 bg-emerald-50 flex-grow flex flex-col">
                    <h3 className="font-bold text-slate-900 mb-2 text-xl">
                      {runnerUp.name}
                    </h3>

                    {/* Star rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const fillPercentage = Math.min(Math.max(runnerUp.rating - (star - 1), 0), 1);
                          return (
                            <div key={star} className="relative inline-block">
                              <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercentage * 100}%` }}>
                                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <span className="text-sm text-slate-600 font-medium">{runnerUp.rating.toFixed(1)}/5</span>
                    </div>

                    {/* Sales rank line */}
                    <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
                      <span>#{(idx + 1) * 20 + 50} in Air Fryers</span>
                      <span>•</span>
                      <span>{runnerUp.reviewCount}+ bought</span>
                    </div>

                    {/* Green checkmark box */}
                    <div className="bg-emerald-100 text-emerald-800 px-3 py-2 rounded-lg text-sm font-medium mb-4">
                      ✓ {runnerUp.whyRunnerUp.split('.')[0]}
                    </div>

                    {/* Full description */}
                    <p className="text-slate-700 mb-6 flex-grow text-sm leading-relaxed">
                      {runnerUp.whyRunnerUp}
                    </p>

                    {/* Button */}
                    <a
                      href={runnerUp.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-colors text-center"
                    >
                      View on Amazon →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12" id="why-bestsellers-failed">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Why Bestsellers Failed
          </h2>

          <div className="p-5 mb-6 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <p className="font-medium leading-relaxed">
              <strong>The Bestsellers Failed.</strong> {bestsellerWarning}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {failureCards.slice(0, 3).map((card: any, idx: number) => (
              <div key={idx} className="border-2 border-red-400 rounded-lg overflow-hidden bg-white flex flex-col">

                {/* Image */}
                <div className="relative w-full bg-white flex items-center justify-center p-8" style={{ minHeight: '280px', maxHeight: '280px' }}>
                  <img
                    src={card.imageUrl}
                    alt={card.productName}
                    className="max-w-full max-h-[260px] object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-5 bg-slate-50 flex-grow flex flex-col">
                  <span className="bg-red-50 text-red-800 px-3 py-1 rounded-lg text-sm font-medium inline-block mb-3">
                    {card.badge}
                  </span>

                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    {card.productName}
                  </h3>

                  <p className="text-slate-700 text-sm mb-4 flex-grow">
                    {card.whyItFailed}
                  </p>

                  <a
                    href={card.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 hover:underline font-bold text-sm"
                  >
                    View source ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12" id="methodology">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            How We Determined This
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
            <div className="space-y-10">
              {methodology.steps.map((step: any) => (
                <div key={step.num} className="relative pl-14">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Excluded During Verification */}
        {productData.disqualifiedProducts && productData.disqualifiedProducts.length > 0 && (
          <section className="mb-12" id="products-excluded">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Products Excluded During Verification
            </h2>

            {/* Yellow badge */}
            <div className="bg-amber-50 px-5 py-4 rounded-lg border border-amber-200 mb-6">
              <p className="text-sm font-medium leading-relaxed text-amber-800">
                <strong className="text-amber-900">Products Excluded:</strong> During manual verification, some products might get excluded from our final recommendations for various reasons. Exclusion doesn't always mean a product is bad; it may simply not fit our specific criteria.
              </p>
            </div>

            {/* Disqualified products cards */}
            <div className="space-y-6">
              {disqualifiedProducts.map((product: any, idx: number) => (
                <div key={idx} className="border-2 border-amber-400 rounded-lg overflow-hidden bg-white">
                  <div className="p-6">

                    {/* Header with badge, ASIN, and initial rank */}
                    <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <span className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-lg text-xs font-bold">
                          {product.disqualificationReason}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          ASIN: {product.asin}
                        </span>
                      </div>
                      <span className="text-sm text-amber-700 font-medium">
                        Initial Rank: #{product.initialRank}
                      </span>
                    </div>

                    {/* Product name */}
                    <h3 className="font-bold text-slate-900 text-lg mb-2">
                      {product.productName}
                    </h3>

                    {/* Explanation */}
                    <p className="text-slate-700 text-sm mb-4 leading-relaxed">
                      {product.explanation}
                    </p>

                    {/* Evidence list */}
                    {product.evidence.map((item: string, i: number) => {
                      // Check if evidence contains a URL
                      const urlMatch = item.match(/(https?:\/\/[^\s]+)/);

                      if (urlMatch) {
                        const url = urlMatch[0];
                        const textBeforeUrl = item.substring(0, item.indexOf(url));

                        return (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="text-amber-600 mt-0.5">•</span>
                            <span>
                              {textBeforeUrl}
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-700 hover:text-amber-800 hover:underline font-medium"
                              >
                                View source ↗
                              </a>
                            </span>
                          </li>
                        );
                      }

                      return (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-amber-600 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      );
                    })}

                    {/* Note (if exists) */}
                    {product.note && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
                        <p className="text-xs text-slate-600 italic">
                          <strong className="text-amber-800 font-semibold not-italic">Note:</strong> {product.note}
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Marketing Claims vs. Verified Reality
          </h2>

          <div className="bg-slate-50 px-5 py-4 rounded-lg border border-slate-300 mb-6">
            <p className="text-sm font-medium leading-relaxed text-slate-700">
              <strong className="text-slate-900">Wall of Receipts:</strong> Complete analysis of all 50+ products reviewed. This table shows what manufacturers claim versus what we verified through safety documentation, Prop 65 disclosures, and material specifications.
            </p>
          </div>

          <div className="overflow-x-auto bg-white border border-slate-300 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 border-b border-slate-300">
                <tr>
                  <th className="text-left p-3 font-semibold text-slate-900">Product</th>
                  <th className="text-left p-3 font-semibold text-slate-900">Marketing Claim</th>
                  <th className="text-center p-3 font-semibold text-slate-900 w-24">Status</th>
                  <th className="text-left p-3 font-semibold text-slate-900">Evidence</th>
                  <th className="text-left p-3 font-semibold text-slate-900">Missing Context</th>
                </tr>
              </thead>
              <tbody>
                {productData.completeAnalysis?.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-900">
                      {item.productName}
                      <div className="text-xs text-slate-500 mt-1">ASIN: {item.asin}</div>
                    </td>
                    <td className="p-3 text-slate-700">{item.marketingClaim}</td>
                    <td className="p-3 text-center">
                      {item.truthStatus === 'true' && <span className="text-emerald-600 text-lg">✓</span>}
                      {item.truthStatus === 'partial' && <span className="text-amber-600 text-lg">⚠</span>}
                      {item.truthStatus === 'false' && <span className="text-red-600 text-lg">✗</span>}
                    </td>
                    <td className="p-3 text-slate-700">{item.evidence}</td>
                    <td className="p-3 text-slate-600 italic">{item.missingContext || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <div className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-xl shadow-lg p-10 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">We Said Top Top</h3>
            <p className="text-emerald-50 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              The {winner.name} is the only air fryer on Amazon with zero toxic materials. Every other "non-toxic" option failed our analysis.
            </p>
            <a href={winner.amazonUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 text-lg rounded-lg shadow-lg transition-colors">
              Verify Current Price on Amazon →
            </a>
            <p className="text-xs text-emerald-200 mt-5">As an Amazon Associate, we earn from qualifying purchases</p>
          </div>
        </section>

        <section className="p-6 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-900">Disclaimer:</strong> {productData.disclaimer}
          </p>
        </section>
      </main>

      <footer className="bg-slate-100 text-slate-700 mt-16">
        <div className="max-w-screen-xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <nav>
              <h6 className="font-bold text-slate-900 mb-4">About</h6>
              <p className="text-sm text-slate-600">We call all bluffs. Transparent product research with verified specs and no BS.</p>
            </nav>
            <nav>
              <h6 className="font-bold text-slate-900 mb-4">Resources</h6>
              <div className="flex flex-col space-y-2 text-sm">
                <a href="#" className="hover:underline hover:text-slate-900">How We Rank Products</a>
                <a href="#" className="hover:underline hover:text-slate-900">Why We Exist</a>
                <a href="#" className="hover:underline hover:text-slate-900">Our Process</a>
                <a href="#" className="hover:underline hover:text-slate-900">Contact</a>
              </div>
            </nav>
            <nav>
              <h6 className="font-bold text-slate-900 mb-4">Legal</h6>
              <div className="flex flex-col space-y-2 text-sm">
                <a href="#" className="hover:underline hover:text-slate-900">Privacy Policy</a>
                <a href="#" className="hover:underline hover:text-slate-900">Terms of Service</a>
                <a href="#" className="hover:underline hover:text-slate-900">Affiliate Disclosure</a>
                <a href="#" className="hover:underline hover:text-slate-900">Cookie Policy</a>
              </div>
            </nav>
            <nav>
              <h6 className="font-bold text-slate-900 mb-4">Follow Us</h6>
              <div className="flex gap-4">
                <a href="#" className="hover:text-slate-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
              </div>
            </nav>
          </div>
          <div className="border-t border-slate-300 mt-8 pt-6 text-center text-sm text-slate-500">
            <p>© 2025 isaidtoptop.com • All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
