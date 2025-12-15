import Layout from '@/components/Layout';
import OutcomesHero from '@/components/outcomes/OutcomesHero';
import OutcomesVision from '@/components/outcomes/OutcomesVision';

export default function Outcomes() {
    return (
        <Layout
            title="Outcomes | Winspire"
            description="See the measurable results and outcomes we deliver for healthcare organizations."
            hideNavbar={true}
        >
            <OutcomesHero />
            <OutcomesVision />
        </Layout>
    );
}
