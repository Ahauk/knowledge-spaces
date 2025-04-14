import { motion } from 'framer-motion';
import { LayoutDashboard, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <motion.div
      className='min-h-screen bg-black flex flex-col items-center justify-center text-center px-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className='text-5xl font-bold text-white mb-4 tracking-tight'
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Knowledge Spaces
      </motion.h1>

      <motion.p
        className='text-lg text-gray-300 mb-8 max-w-xl'
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Visualiza, conecta y organiza tu conocimiento de forma espacial. Explora
        ideas, relaciones y flujos de información con una experiencia
        minimalista y fluida.
      </motion.p>

      <motion.div
        className='flex gap-6'
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to='/canvas'
            className='bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow transition-all flex items-center gap-2'
          >
            <LayoutDashboard size={18} /> Ir al Canvas
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to='/feed'
            className='bg-black border border-green-400 hover:border-green-500 text-green-400 px-6 py-3 rounded-2xl shadow transition-all flex items-center gap-2'
          >
            <Newspaper size={18} /> Ver Feed
          </Link>
        </motion.div>
      </motion.div>

      <motion.footer
        className='text-sm text-gray-500 mt-20'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        by Ahauk • 2025
      </motion.footer>
    </motion.div>
  );
};
