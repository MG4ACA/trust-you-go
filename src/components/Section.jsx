import { motion } from "framer-motion";

const Section = ({ id, title, desc, img, animation }) => (
  <motion.section
    key={id}
    id={id}
    initial={animation.initial}
    whileInView={animation.animate}
    transition={animation.transition}
    viewport={{ once: true, amount: 0.5 }}
    className="flex flex-col md:flex-row items-center justify-center gap-8 py-24 px-8 min-h-[60vh] border-b border-white/10"
  >
    <img
      src={img}
      alt={title}
      className="rounded-xl shadow-2xl w-full max-w-md object-cover h-64 md:h-80 animate-fadeIn"
    />
    <div>
      <h2 className="text-4xl font-extrabold mb-4 text-accent drop-shadow-lg">{title}</h2>
      <p className="text-lg text-white/80 mb-6">{desc}</p>
      <a
        href="#contact"
        className="inline-block bg-secondary text-primary px-6 py-2 rounded-full font-bold shadow-lg hover:bg-accent hover:text-white transition-all duration-300"
      >
        Book Now
      </a>
    </div>
  </motion.section>
);

export default Section;
