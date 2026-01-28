/**
 * Culture Section Component for Temp Company Page
 * 
 * Transparent section with culture values numbered list.
 */

'use client';

export default function CultureSection() {
    const values = [
        'Hire carefully and invest deeply in our people',
        'Trust teams with ownership and accountability',
        'Focus on outcomes rather than activity',
        'Recognize contributions consistently',
        'Encourage continuous learning and improvement',
    ];

    return (
        <section
            className="relative min-h-screen py-24 md:py-40 px-6 md:px-16 z-20"
            style={{ background: 'transparent' }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
                {/* Left Column - Description */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-8">
                    <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm block">
                        Our Culture
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white">
                        Stability Behind the Scenes Drives Consistency for Clients
                    </h2>
                    <div className="space-y-6 text-lg text-white/80">
                        <p>
                            We believe the strongest results come from stable, empowered teams.
                        </p>
                        <p>
                            Our culture is not built on slogans or perks. It is built to help
                            people do their best work sustainably.
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-white bg-white/5 backdrop-blur-sm p-8 rounded-3xl border-l-8 border-cyan-400">
                        That stability shows up directly in the consistency our clients
                        experience.
                    </p>
                </div>

                {/* Right Column - Values List */}
                <div className="lg:col-span-12 xl:col-span-7">
                    <div className="bg-white/5 backdrop-blur-sm p-6 md:p-12 rounded-[40px] border border-white/10 shadow-2xl space-y-6">
                        <h4 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-6 uppercase tracking-widest text-sm">
                            At Winspire, we:
                        </h4>
                        {values.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-6 p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group"
                            >
                                <span className="w-12 h-12 flex items-center justify-center bg-cyan-400/20 text-cyan-400 rounded-full font-bold group-hover:scale-110 transition-transform">
                                    0{i + 1}
                                </span>
                                <p className="text-lg md:text-xl font-medium text-white/80">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
