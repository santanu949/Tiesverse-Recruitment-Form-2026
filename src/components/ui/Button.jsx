import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, isLoading, className = '', ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`relative w-full bg-gradient-to-r from-primary to-orange-500 text-white font-extrabold py-4 px-6 rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed shadow-glow hover:shadow-xl hover:shadow-primary/40 ${className}`}
            disabled={isLoading}
            {...props}
        >
            <span className="relative flex items-center justify-center gap-2 tracking-wide text-lg">
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    children
                )}
            </span>
        </motion.button>
    );
};