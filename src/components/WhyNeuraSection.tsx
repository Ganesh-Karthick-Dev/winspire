'use client';

import React, { useMemo } from 'react';
import ReactFlow, {
    Node,
    Edge,
    Background,
    Controls,
    MarkerType,
    ReactFlowProvider,
    Handle,
    Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Icons
import {
    FaUserMd, FaDesktop, FaMobileAlt, FaServer, FaDatabase, FaCalendarCheck,
    FaUserInjured, FaFileMedical, FaFileInvoiceDollar, FaCloud, FaChartBar,
    FaShieldAlt, FaExchangeAlt, FaCode, FaSearch, FaClipboardCheck, FaWarehouse
} from 'react-icons/fa';
import {
    SiApachekafka, SiPrometheus, SiElasticsearch, SiMongodb, SiPostgresql, SiGraphql
} from 'react-icons/si';
import {
    MdPayment, MdHealthAndSafety, MdOutlineLocalHospital
} from 'react-icons/md';
import {
    HiOfficeBuilding, HiCreditCard, HiDocumentReport
} from 'react-icons/hi';
import { BiNetworkChart } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';

// Node component with icon
const CustomNode = ({ data }: { data: { label: string; icon?: React.ReactNode } }) => (
    <div style={{
        padding: '10px 16px',
        borderRadius: '10px',
        background: '#fff',
        border: '2px solid #0066FF',
        color: '#1a1a2e',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '12px',
        fontWeight: 600,
        textAlign: 'center',
        minWidth: '130px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'center',
    }}>
        <Handle type="target" position={Position.Left} style={{ background: '#94a3b8', width: 6, height: 6 }} />
        <Handle type="source" position={Position.Right} style={{ background: '#94a3b8', width: 6, height: 6 }} />
        <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: '#94a3b8', width: 6, height: 6 }} />
        {data.icon && <span style={{ fontSize: '16px', color: '#0066FF', display: 'flex' }}>{data.icon}</span>}
        {data.label}
    </div>
);

const nodeTypes = { custom: CustomNode };

const FlowComponent: React.FC = () => {
    const nodes: Node[] = useMemo(() => [
        // Healthcare staff (left side)
        { id: 'staff', type: 'custom', position: { x: 50, y: 300 }, data: { label: 'Healthcare staff', icon: <FaUserMd /> } },
        // Web front-end (above, to the right)
        { id: 'web', type: 'custom', position: { x: 300, y: 200 }, data: { label: 'Web front-end', icon: <FaDesktop /> } },
        // Mobile app (below, to the right)
        { id: 'mobile', type: 'custom', position: { x: 300, y: 400 }, data: { label: 'Mobile app', icon: <FaMobileAlt /> } },
        // API gateway
        { id: 'apigateway', type: 'custom', position: { x: 550, y: 300 }, data: { label: 'API gateway', icon: <FaServer /> } },
        // GraphQL API
        { id: 'graphql', type: 'custom', position: { x: 800, y: 300 }, data: { label: 'GraphQL API', icon: <SiGraphql /> } },
        // FHIR server
        { id: 'fhir', type: 'custom', position: { x: 1050, y: 300 }, data: { label: 'FHIR server (HAPI FHIR)', icon: <MdHealthAndSafety /> } },

        // ===== 10 RCM MODULES (children of FHIR) =====
        { id: 'appointment', type: 'custom', position: { x: 1300, y: -280 }, data: { label: 'Appointment module', icon: <FaCalendarCheck /> } },
        { id: 'patient', type: 'custom', position: { x: 1300, y: -210 }, data: { label: 'Patient module', icon: <FaUserInjured /> } },
        { id: 'ehr', type: 'custom', position: { x: 1300, y: -140 }, data: { label: 'EHR module', icon: <FaFileMedical /> } },
        { id: 'postgres', type: 'custom', position: { x: 1550, y: -140 }, data: { label: 'PostgreSQL', icon: <SiPostgresql /> } },
        { id: 'billing', type: 'custom', position: { x: 1300, y: -70 }, data: { label: 'Billing system', icon: <FaFileInvoiceDollar /> } },
        { id: 'storage', type: 'custom', position: { x: 1550, y: -70 }, data: { label: 'Object storage', icon: <FaCloud /> } },
        // Kafka and infrastructure children
        { id: 'kafka', type: 'custom', position: { x: 1300, y: 10 }, data: { label: 'Kafka', icon: <SiApachekafka /> } },
        { id: 'prometheus', type: 'custom', position: { x: 1550, y: 0 }, data: { label: 'Prometheus', icon: <SiPrometheus /> } },
        { id: 'elastic', type: 'custom', position: { x: 1550, y: 60 }, data: { label: 'Elastic Stack', icon: <SiElasticsearch /> } },
        { id: 'jaeger', type: 'custom', position: { x: 1550, y: 120 }, data: { label: 'JAEGER', icon: <FaSearch /> } },
        // Rest of RCM modules
        { id: 'charge', type: 'custom', position: { x: 1300, y: 350 }, data: { label: 'Charge capture', icon: <HiCreditCard /> } },
        { id: 'coding', type: 'custom', position: { x: 1300, y: 420 }, data: { label: 'Coding engine', icon: <FaCode /> } },
        { id: 'claims', type: 'custom', position: { x: 1300, y: 490 }, data: { label: 'Claims processor', icon: <FaClipboardCheck /> } },
        { id: 'reporting', type: 'custom', position: { x: 1300, y: 560 }, data: { label: 'Reporting module', icon: <HiDocumentReport /> } },
        { id: 'datawarehouse', type: 'custom', position: { x: 1550, y: 560 }, data: { label: 'Data warehouse', icon: <FaWarehouse /> } },
        { id: 'audit', type: 'custom', position: { x: 1300, y: 630 }, data: { label: 'Audit tracker', icon: <FaChartBar /> } },
        { id: 'mongodb', type: 'custom', position: { x: 1550, y: 630 }, data: { label: 'MongoDB', icon: <SiMongodb /> } },

        // Authorization server (bottom - separate from FHIR)
        { id: 'auth', type: 'custom', position: { x: 1050, y: 750 }, data: { label: 'Authorization server', icon: <RiLockPasswordLine /> } },


        // ===== EXTERNAL SYSTEMS (far right) =====
        { id: 'clearing', type: 'custom', position: { x: 2200, y: 150 }, data: { label: 'Claim clearinghouse', icon: <FaExchangeAlt /> } },
        { id: 'insurance', type: 'custom', position: { x: 2200, y: 210 }, data: { label: 'Insurance portals', icon: <FaShieldAlt /> } },
        { id: 'payment', type: 'custom', position: { x: 2200, y: 270 }, data: { label: 'Payment gateway', icon: <MdPayment /> } },
        { id: 'banking', type: 'custom', position: { x: 2200, y: 330 }, data: { label: 'Banking system', icon: <HiOfficeBuilding /> } },
        { id: 'medicare', type: 'custom', position: { x: 2200, y: 390 }, data: { label: 'Medicare API', icon: <MdOutlineLocalHospital /> } },

        // ===== ICD (far right bottom) =====
        { id: 'icd', type: 'custom', position: { x: 2200, y: 550 }, data: { label: 'ICD/CPT provider', icon: <BiNetworkChart /> } },
    ], []);

    const edges: Edge[] = useMemo(() => [
        // Healthcare staff → Web front-end
        { id: 'e1', source: 'staff', target: 'web', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // Healthcare staff → Mobile app
        { id: 'e2', source: 'staff', target: 'mobile', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // Web front-end → API gateway
        { id: 'e3', source: 'web', target: 'apigateway', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // Mobile app → API gateway
        { id: 'e4', source: 'mobile', target: 'apigateway', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // API gateway → GraphQL API
        { id: 'e5', source: 'apigateway', target: 'graphql', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // GraphQL API → FHIR server
        { id: 'e6', source: 'graphql', target: 'fhir', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // GraphQL API → Authorization server
        { id: 'e7', source: 'graphql', target: 'auth', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // FHIR → All 9 RCM modules
        { id: 'e8', source: 'fhir', target: 'appointment', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e9', source: 'fhir', target: 'patient', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e10', source: 'fhir', target: 'ehr', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e11', source: 'fhir', target: 'billing', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e12', source: 'fhir', target: 'charge', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e13', source: 'fhir', target: 'coding', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e14', source: 'fhir', target: 'claims', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e15', source: 'fhir', target: 'reporting', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e16', source: 'fhir', target: 'audit', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // FHIR → External Systems (5 nodes)
        { id: 'e17', source: 'fhir', target: 'clearing', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e18', source: 'fhir', target: 'insurance', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e19', source: 'fhir', target: 'payment', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e20', source: 'fhir', target: 'banking', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e21', source: 'fhir', target: 'medicare', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // FHIR → ICD
        { id: 'e22', source: 'fhir', target: 'icd', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // EHR → PostgreSQL
        { id: 'e23', source: 'ehr', target: 'postgres', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // Billing → Object storage
        { id: 'e24', source: 'billing', target: 'storage', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // FHIR → Kafka
        { id: 'e25', source: 'fhir', target: 'kafka', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // Kafka → Prometheus, Elastic Stack, JAEGER
        { id: 'e26', source: 'kafka', target: 'prometheus', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e27', source: 'kafka', target: 'elastic', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        { id: 'e28', source: 'kafka', target: 'jaeger', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // Reporting → Data warehouse
        { id: 'e29', source: 'reporting', target: 'datawarehouse', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
        // Audit → MongoDB
        { id: 'e30', source: 'audit', target: 'mongodb', type: 'smoothstep', style: { stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '5 4' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
    ], []);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.5 }}
            proOptions={{ hideAttribution: true }}
        >
            <Background color="#dbeafe" gap={20} />
            <Controls showInteractive={false} />
        </ReactFlow>
    );
};

const WhyNeuraSection: React.FC = () => {
    return (
        <section className="why-neura-section">
            <div className="why-neura-card">
                <div className="header-section">
                    <div className="accent-label">
                        <div className="dots-wrapper"><span className="dot" /><span className="dot" /></div>
                        <span className="label-text">Neura AI</span>
                    </div>
                    <p className="sub-label">Technology Differentiator</p>
                </div>

                <h2 className="section-title">
                    Why Neura AI Is <span className="title-highlight">Fundamentally Different</span>
                </h2>

                <div className="text-content">
                    <p>Most RCM technology focuses on visibility. Neura focuses on <strong>control, sequencing, and decision timing</strong>.</p>
                    <p className="highlight-text">By redesigning the entire revenue ecosystem, Neura delivers a <strong>60–70% efficiency improvement within 60–90 days</strong>.</p>
                </div>

                <div className="flow-diagram">
                    <ReactFlowProvider>
                        <FlowComponent />
                    </ReactFlowProvider>
                </div>
            </div>

            <style jsx>{`
                .why-neura-section { position: relative; min-height: 120vh; padding: 8px 16px; background: transparent; z-index: 20; display: flex; align-items: flex-start; justify-content: center; }
                .why-neura-card { width: 100%; height: calc(120vh - 16px); padding: 28px 36px; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(40px); border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.5); box-shadow: 0 30px 100px rgba(0, 0, 0, 0.08); overflow: hidden; display: flex; flex-direction: column; }
                .header-section { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
                .accent-label { display: flex; align-items: center; gap: 12px; }
                .dots-wrapper { display: flex; flex-direction: column; gap: 4px; }
                .dot { width: 8px; height: 5px; background: #0066FF; border-radius: 50%; }
                .label-text { font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 700; color: #0a1f44; }
                .sub-label { font-family: 'Outfit', sans-serif; font-size: 0.7rem; color: #0066FF; margin: 0; padding-left: 20px; }
                .section-title { font-family: 'Outfit', sans-serif; font-size: clamp(1.3rem, 2vw, 1.8rem); font-weight: 800; color: #0a1f44; margin-bottom: 12px; }
                .title-highlight { background: linear-gradient(135deg, #0066FF, #00a2ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .text-content { margin-bottom: 16px; max-width: 800px; }
                .text-content p { font-family: 'Outfit', sans-serif; font-size: 0.9rem; line-height: 1.4; color: #333; margin: 0 0 6px 0; }
                .text-content strong { color: #0066FF; font-weight: 700; }
                .highlight-text { padding: 8px 12px; background: rgba(0, 102, 255, 0.05); border-left: 3px solid #0066FF; border-radius: 0 6px 6px 0; }
                .flow-diagram { flex: 1; width: 100%; min-height: 700px; padding-bottom: 60px; background: linear-gradient(135deg, #f8fafc 0%, #eef6ff 100%); border-radius: 14px; border: 1px solid rgba(0, 102, 255, 0.1); }
                @media (max-width: 768px) { .why-neura-card { padding: 20px 14px; height: auto; min-height: calc(100vh - 40px); } .flow-diagram { height: 500px; flex: none; } }
                @keyframes flowAnimation { 0% { stroke-dashoffset: 18; } 100% { stroke-dashoffset: 0; } }
                .flow-diagram :global(.react-flow__edge-path) { animation: flowAnimation 1s linear infinite; }
            `}</style>
        </section>
    );
};

export default WhyNeuraSection;
