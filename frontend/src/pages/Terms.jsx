import { motion } from 'framer-motion';
import { FileText, Scale, CreditCard, AlertTriangle, Briefcase, RefreshCw, Mail } from 'lucide-react';

function Terms() {
    const sections = [
        {
            icon: <Briefcase className="w-6 h-6" />,
            title: "Services & Engagement",
            content: [
                "BerryBeans provides IT consulting, software development (web, mobile, backend), UI/UX design, cloud architecture, digital marketing, data analysis, and full-stack application development services.",
                "All services are delivered under a mutually agreed Statement of Work (SOW) or Service Agreement that defines scope, timelines, deliverables, and pricing.",
                "Any work outside the agreed scope constitutes a change request and will be subject to additional estimation and approval before proceeding.",
                "BerryBeans reserves the right to subcontract portions of the work to qualified partners while retaining full accountability to the client.",
                "Clients must provide timely feedback, approvals, access to systems, and required assets. Delays caused by the client's non-cooperation will not be attributed to BerryBeans for SLA purposes."
            ]
        },
        {
            icon: <CreditCard className="w-6 h-6" />,
            title: "Payment Terms",
            content: [
                "Unless otherwise stated in the SOW, payment is due within 14 days of invoice date.",
                "A standard milestone-based payment schedule applies: typically 40% upon project kickoff, 40% upon delivery of the first major milestone, and 20% upon final delivery and acceptance.",
                "Invoices unpaid beyond the due date will attract a late payment charge of 1.5% per month (or the maximum permitted by law, whichever is lower).",
                "All prices are exclusive of applicable taxes (GST, VAT, SST, or equivalent) unless explicitly stated. The client is responsible for withholding taxes applicable in their jurisdiction.",
                "BerryBeans reserves the right to suspend services on accounts with outstanding invoices of more than 30 days without written agreement."
            ]
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Intellectual Property",
            content: [
                "Upon receipt of full payment, BerryBeans assigns all rights, title, and interest in custom-developed software, code, and deliverables to the client, unless otherwise agreed in writing.",
                "BerryBeans retains ownership of all pre-existing tools, frameworks, libraries, templates, and proprietary methodologies used in delivering the work ('Background IP').",
                "Open-source components incorporated into deliverables remain subject to their respective open-source licences.",
                "BerryBeans reserves the right to reference the client's name and project as a case study in its portfolio and marketing materials unless the client requests otherwise in writing.",
                "The client warrants that all materials, brand assets, and content provided to BerryBeans are owned by or properly licensed to the client."
            ]
        },
        {
            icon: <Scale className="w-6 h-6" />,
            title: "Confidentiality & NDA",
            content: [
                "Both parties agree to keep confidential all non-public business information, technical knowledge, and trade secrets shared in the course of the engagement.",
                "Confidentiality obligations remain in force for five (5) years after the termination of the engagement.",
                "BerryBeans will not disclose client data to any third party without explicit written consent, except where required by law or court order.",
                "All team members and contractors working on a client's project are bound by confidentiality agreements."
            ]
        },
        {
            icon: <AlertTriangle className="w-6 h-6" />,
            title: "Limitation of Liability & Warranty",
            content: [
                "BerryBeans warrants that services will be delivered with reasonable skill, care, and in accordance with the agreed specifications.",
                "A 30-day defect warranty applies post-handover: BerryBeans will fix bugs attributable to our own code at no additional cost within this period.",
                "BerryBeans shall not be liable for indirect, consequential, incidental, or punitive damages, loss of revenue, or loss of data.",
                "Our total aggregate liability under any engagement is capped at the total fees paid by the client in the three (3) months immediately preceding the claim.",
                "Force majeure events (including natural disasters, cyberattacks, government restrictions, or infrastructure failures outside our control) excuse timely performance."
            ]
        },
        {
            icon: <RefreshCw className="w-6 h-6" />,
            title: "Termination",
            content: [
                "Either party may terminate the engagement with 30 days' written notice.",
                "The client is liable for all work completed and costs incurred up to the termination date, including any third-party licences or tooling purchased on their behalf.",
                "BerryBeans may terminate immediately if the client breaches payment obligations, engages in unlawful activity, or materially violates these terms.",
                "Upon termination, BerryBeans will deliver all completed work and source code (proportionate to payments received) within 14 business days.",
                "Clauses relating to confidentiality, intellectual property, payment of outstanding amounts, and limitation of liability survive termination."
            ]
        },
        {
            icon: <Scale className="w-6 h-6" />,
            title: "Governing Law & Dispute Resolution",
            content: [
                "These Terms are governed by and construed in accordance with the laws of India (with primary operations in Tamil Nadu / Karnataka).",
                "International clients acknowledge that their local law may also apply in certain respects and agree to resolve conflicts in good faith.",
                "Any dispute shall first be attempted to be resolved amicably within 30 days of written notice of the dispute.",
                "If unresolved, disputes shall be submitted to binding arbitration under the Arbitration and Conciliation Act, 1996 (India).",
                "Nothing in this clause prevents either party from seeking urgent injunctive relief in a competent court."
            ]
        }
    ];

    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-berrypink-50 rounded-full mb-6">
                    <FileText size={16} className="text-berrypink-600" />
                    <span className="text-sm font-bold text-berrypink-600 uppercase tracking-wider">Legal</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">Terms of Service</h1>
                <p className="text-gray-500 text-sm font-medium">Last updated: March 2026 &nbsp;·&nbsp; Effective: March 2026</p>
                <p className="mt-6 text-lg text-gray-600 leading-relaxed font-light max-w-3xl">
                    These Terms of Service ("Terms") govern the relationship between BerryBeans and its clients and website visitors. By engaging our services or using our website, you agree to be bound by these Terms. Please read them carefully.
                </p>
                <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                    <p className="text-amber-800 text-sm font-medium">
                        ⚠️ These Terms apply to all service engagements. Where a specific Master Service Agreement (MSA) or Statement of Work (SOW) exists, that document takes precedence to the extent of any inconsistency.
                    </p>
                </div>
            </motion.div>

            <div className="space-y-10">
                {sections.map((section, i) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8"
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2.5 bg-berrypink-50 rounded-xl text-berrypink-600">{section.icon}</div>
                            <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                        </div>
                        <ul className="space-y-3">
                            {section.content.map((item, j) => (
                                <li key={j} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed font-light">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-berrypink-400 flex-shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 bg-gradient-to-br from-berrypink-50 to-white rounded-[2rem] border border-berrypink-100 p-8 text-center"
            >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Questions about these Terms?</h3>
                <p className="text-gray-500 font-light mb-4">Our legal team is happy to clarify anything before you sign.</p>
                <a href="mailto:legal@berrybeans.com" className="inline-flex items-center gap-2 bg-berrypink-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-berrypink-700 transition shadow-md">
                    <Mail size={16} /> legal@berrybeans.com
                </a>
            </motion.div>
        </div>
    );
}

export default Terms;
