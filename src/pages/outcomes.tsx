import Layout from '@/components/Layout';
import Section from '@/components/Section';

export default function Outcomes() {
    return (
        <Layout
            title="Outcomes | Winspire"
            description="See the measurable results and outcomes we deliver for healthcare organizations."
        >
            <Section id="outcomes-hero" title="Outcomes" className="pt-32 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
                        Outcomes
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Measurable results that drive growth and efficiency.
                    </p>
                </div>
            </Section>
        </Layout>
    );
}
