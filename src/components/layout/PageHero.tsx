import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  breadcrumb: BreadcrumbItem[];
  backgroundImage?: string;
}

export default function PageHero({ title, subtitle, badge, breadcrumb, backgroundImage }: PageHeroProps) {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[320px] lg:h-[400px] overflow-hidden">
        {/* Background */}
        {backgroundImage ? (
          <div className="absolute inset-0">
            <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A4039]/90 via-[#4A4039]/70 to-[#4A4039]/50"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#4A4039] via-[#5A5049] to-[#6B5D53]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#B8956A]/10 to-transparent"></div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          {badge && (
            <span className="text-sm font-medium text-[#D4A574] tracking-[0.3em] uppercase mb-4 animate-fadeInUp">{badge}</span>
          )}
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 animate-fadeInUp animation-delay-200">{title}</h1>
          <p className="text-white/80 text-lg lg:text-xl max-w-2xl animate-fadeInUp animation-delay-400">{subtitle}</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-[#FAF6F1] py-4 border-b border-[#E8DCC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-[#6B5D53]">
            <Link href="/" className="hover:text-[#B8956A] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
            {breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                <span className="text-[#B8956A]">/</span>
                {item.href ? (
                  <Link href={item.href} className="hover:text-[#B8956A] transition-colors">{item.name}</Link>
                ) : (
                  <span className="text-[#B8956A] font-medium">{item.name}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
