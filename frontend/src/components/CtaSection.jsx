import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

function CtaSection() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 w-full mx-auto max-w-7xl">
            <div className="fluent-panel relative overflow-hidden rounded-[3rem] py-24 px-8 shadow-xl border border-white/60">
                {/* Soft background glows similar to image */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-multiply"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-multiply"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight"
                    >
                        Ready to brew <br className="hidden md:block" /> something <span className="text-[#f05a66]">amazing?</span>
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed mb-12"
                    >
                        Our team of expert engineers and designers is ready to help you navigate the digital landscape.
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <ScrollLink
                            to="contact"
                            smooth={true}
                            duration={500}
                            offset={-80}
                            className="inline-block bg-[#f05a66] text-white font-bold py-4 px-10 rounded-2xl hover:bg-[#e04a56] transition-all duration-300 cursor-pointer shadow-[0_8px_25px_rgba(240,90,102,0.3)] hover:shadow-[0_12px_35px_rgba(240,90,102,0.4)] hover:-translate-y-1"
                        >
                            Contact Us Today
                        </ScrollLink>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default CtaSection;
