import { motion } from 'framer-motion';
import { Shield, Eye, Lock, UserCheck, Database, Globe, Mail } from 'lucide-react';

function Privacy() {
    const sections = [
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Information We Collect",
            content: [
                "Business contact details (name, company name, job title, business email, and phone number) provided when you fill out our contact or enquiry forms.",
                "Project and requirement details you share with us during consultations or onboarding.",
                "Usage data such as pages visited, time spent, referral source, and browser/device type collected automatically via cookies and analytics tools.",
                "Communication records including emails, meeting notes, and support ticket history when you engage with our team.",
                "Payment and invoicing information processed through secure, PCI-DSS–compliant third-party payment gateways."
            ]
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "How We Use Your Information",
            content: [
                "To respond to your service enquiries, provide project estimates, and manage client onboarding.",
                "To deliver, maintain, monitor, and improve the IT services, software solutions, and consulting services you have contracted us for.",
                "To send transactional communications such as invoices, project status updates, and critical service notifications.",
                "To send periodic newsletters, product announcements, or case studies — only where you have opted in. You may opt out at any time.",
                "To fulfil our legal and regulatory obligations including anti-money laundering checks, tax record-keeping, and compliance with applicable data protection laws.",
                "To detect and prevent fraud, unauthorized access, and misuse of our platforms."
            ]
        },
        {
            icon: <UserCheck className="w-6 h-6" />,
            title: "Legal Basis for Processing",
            content: [
                "Contract performance: Processing your data is necessary to enter into and execute service agreements with you.",
                "Legitimate interests: We process data to operate and improve our business, prevent fraud, and maintain security.",
                "Legal obligation: We may process data to comply with applicable laws such as GDPR (EU), PDPA (Malaysia/Singapore), or the IT Act (India).",
                "Consent: For marketing communications and non-essential cookies, we rely on your explicit consent, which you may withdraw at any time."
            ]
        },
        {
            icon: <Database className="w-6 h-6" />,
            title: "Data Storage & Retention",
            content: [
                "Your data is stored on secure, encrypted cloud infrastructure (AWS / Google Cloud) with restricted access controls and regular security audits.",
                "Client project data and contracts are retained for a minimum of 7 years to comply with financial and regulatory requirements.",
                "Marketing-related data is retained only while you remain opted in and for 12 months after you opt out.",
                "We apply the principle of data minimisation — we only retain data that is necessary for the stated purpose.",
                "On termination of a service relationship, we will securely delete or anonymise your personal data within 90 days unless legally required to retain it."
            ]
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Third-Party Sharing & International Transfers",
            content: [
                "We do not sell, rent, or trade your personal data to third parties.",
                "We may share data with trusted service providers including cloud hosting providers, analytics tools (e.g., Google Analytics), CRM platforms, and payment processors, all bound by strict data processing agreements.",
                "If we transfer data internationally (e.g., from the EU/UK to India or other regions), we ensure appropriate safeguards are in place such as Standard Contractual Clauses (SCCs).",
                "In the event of a merger, acquisition, or corporate restructuring, data may be transferred to the successor entity subject to equivalent privacy protections."
            ]
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Your Rights",
            content: [
                "Right to access: Request a copy of the personal data we hold about you.",
                "Right to rectification: Request correction of inaccurate or incomplete data.",
                "Right to erasure ('right to be forgotten'): Request deletion of your data, subject to legal retention requirements.",
                "Right to restrict or object to processing: Limit how we use your data or object to processing based on legitimate interests.",
                "Right to data portability: Receive your data in a structured, machine-readable format.",
                "Right to withdraw consent: For marketing and cookies, withdraw consent at any time without affecting prior lawful processing.",
                "To exercise any of these rights, contact us at privacy@berrybeans.com. We will respond within 30 days."
            ]
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Cookies & Tracking Technologies",
            content: [
                "We use essential cookies required for website functionality and security.",
                "With your consent, we use analytics cookies (Google Analytics) to understand how visitors use our site so we can improve it.",
                "We do not serve third-party advertising cookies.",
                "You can manage or withdraw cookie consent at any time using the cookie preference banner on our site or your browser settings."
            ]
        }
    ];

    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-berrypink-50 rounded-full mb-6">
                    <Shield size={16} className="text-berrypink-600" />
                    <span className="text-sm font-bold text-berrypink-600 uppercase tracking-wider">Legal</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">Privacy Policy</h1>
                <p className="text-gray-500 text-sm font-medium">Last updated: March 2026 &nbsp;·&nbsp; Effective: March 2026</p>
                <p className="mt-6 text-lg text-gray-600 leading-relaxed font-light max-w-3xl">
                    BerryBeans ("we", "our", "us") is committed to protecting your personal information and being transparent about how we collect, use, and safeguard it. This policy applies to all individuals who interact with our website, services, and team members.
                </p>
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">Questions about this policy?</h3>
                <p className="text-gray-500 font-light mb-4">Our Data Protection Officer is available to help.</p>
                <a href="mailto:privacy@berrybeans.com" className="inline-flex items-center gap-2 bg-berrypink-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-berrypink-700 transition shadow-md">
                    <Mail size={16} /> privacy@berrybeans.com
                </a>
            </motion.div>
        </div>
    );
}

export default Privacy;
