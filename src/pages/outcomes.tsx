import Layout from '@/components/Layout';
import OutcomesHero from '@/components/outcomes/OutcomesHero';
import OutcomesVision from '@/components/outcomes/OutcomesVision';
import OutcomesCarousel from '@/components/outcomes/OutcomesCarousel';
import OutcomesTeam from '@/components/outcomes/OutcomesTeam';

export default function Outcomes() {
    return (
        <Layout title="Outcomes" description="Measurable results with Winspire">
            <OutcomesHero />
            <OutcomesVision />
            <OutcomesTeam />
            <OutcomesCarousel />
        </Layout>
    );
}
