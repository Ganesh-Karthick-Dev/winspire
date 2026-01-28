/**
 * MINIMAL TEST PAGE - To isolate compilation issues
 * This is a stripped-down version to test if basic compilation works
 */

import Layout from '@/components/Layout';

export default function HomeMinimal() {
    return (
        <Layout
            title="Home - Minimal Test"
            description="Minimal test page to isolate compilation issues"
        >
            <div className="page-wrapper" style={{ padding: '2rem' }}>
                <h1>Minimal Test Page</h1>
                <p>If you can see this, basic compilation works!</p>
                <p>We can now add components one by one to find the issue.</p>
            </div>
        </Layout>
    );
}
