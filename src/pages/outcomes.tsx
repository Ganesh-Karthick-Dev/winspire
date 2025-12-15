import Layout from '@/components/Layout';
import OutcomesHero from '@/components/outcomes/OutcomesHero';

export default function Outcomes() {
    return (
        <Layout
            title="Outcomes | Winspire"
            description="See the measurable results and outcomes we deliver for healthcare organizations."
            hideNavbar={true}
        >
            <OutcomesHero />
        </Layout>
    );
}
