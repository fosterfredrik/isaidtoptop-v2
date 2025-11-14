export default function FAQ({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
    if (!faqs || faqs.length === 0) return null;
    
    return (
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    )
  }