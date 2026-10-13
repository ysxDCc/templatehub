export default function FeaturesSection() {
  const features = [
    {
      title: 'Production-grade code',
      description: 'Zero bundled frameworks or bloat. Standard modern HTML5, clean CSS classes, and standalone assets.'
    },
    {
      title: 'Tested on all viewports',
      description: 'Every layout is verified across iPhone, iPad, laptop, and ultra-wide desktop breakpoints.'
    },
    {
      title: 'Interactive live preview',
      description: 'Test every button, form, tab, and responsive layout in real time directly in the browser sandbox.'
    },
    {
      title: 'Commercial project rights',
      description: 'All paid plans include unlimited deployment rights for your personal and commercial client work.'
    },
    {
      title: 'Rapid time-to-market',
      description: 'Launch complete client websites in hours instead of starting from an empty canvas every time.'
    },
    {
      title: 'Monthly template additions',
      description: 'Our collection expands continuously across emerging technology, e-commerce, and agency verticals.'
    }
  ];

  return (
    <section className="py-20 border-b border-white/[0.08] bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Built for developers who value quality and speed.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Every template is engineered to serve as a reliable, modular starting point for real-world production deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl bg-zinc-900/40 border border-white/[0.08] hover:border-white/20 transition-colors"
            >
              <h3 className="text-sm font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
