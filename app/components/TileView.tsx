"use client";

import { useState, useEffect } from "react";
import { Employee } from "../types";
import {
  TbDotsVertical,
  TbMail,
  TbPhone,
  TbUser,
  TbPencil,
  TbFlag,
  TbTrash,
} from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  data: Employee[];
  setSelected: (emp: Employee) => void;
}

export default function TileView({ data, setSelected }: Props) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = () => setOpenMenuId(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {data.map((item) => (
        <motion.div
          key={item.id}
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          whileHover={{ y: -8, scale: 1.03 }}
          transition={{ duration: 0.25 }}
          className="
            relative p-6 rounded-2xl cursor-pointer overflow-visible
            shadow-[0_8px_20px_rgba(0,0,0,0.08)]
            bg-white/70 backdrop-blur-xl
            border border-gray-200 
            hover:border-blue-500/50 hover:shadow-xl
            transition-all duration-300 group
          "
        >

          {/* Glow Hover Border */}
          <div
            className="
              absolute inset-0 rounded-2xl opacity-0 
              group-hover:opacity-100 
              transition duration-300 pointer-events-none
              bg-gradient-to-br from-blue-500/15 to-purple-500/15
            "
          />

          {/* More Menu Button */}
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuId(openMenuId === item.id ? null : item.id);
            }}
            whileTap={{ scale: 0.9 }}
            className="
              absolute top-4 right-4 p-2 rounded-full 
              hover:bg-gray-100 active:bg-gray-200
              text-gray-500 hover:text-gray-700 z-20
            "
          >
            <TbDotsVertical size={22} />
          </motion.div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {openMenuId === item.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -5 }}
                transition={{ duration: 0.15 }}
                className="
                  absolute top-12 right-4 w-44 z-30 rounded-xl 
                  bg-white shadow-xl border border-gray-200
                  overflow-hidden
                "
              >
                <div className="py-1 text-sm text-gray-700">

                  <div className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <TbPencil size={18} /> Edit
                  </div>

                  <div className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <TbFlag size={18} /> Flag
                  </div>

                  <div className="flex items-center gap-2 px-4 py-3 hover:bg-red-50 cursor-pointer text-red-600">
                    <TbTrash size={18} /> Delete
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Avatar */}
          <div className="
            w-14 h-14 rounded-full 
            bg-gradient-to-br from-blue-600 to-purple-600 
            flex items-center justify-center 
            shadow-lg mb-4
          ">
            <TbUser size={30} className="text-white" />
          </div>

          {/* Name */}
          <h3 className="text-xl font-semibold text-gray-900">
            {item.name}
          </h3>

          {/* Info Section */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <TbMail size={18} className="text-blue-500" />
              <span className="truncate">{item.email}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <TbPhone size={18} className="text-purple-500" />
              <span>{item.phone}</span>
            </div>
          </div>

          {/* Details Button */}
          <motion.button
            onClick={() => setSelected(item)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              mt-5 w-full py-2.5 rounded-lg font-medium
              bg-gradient-to-r from-blue-600 to-purple-600
              text-white shadow hover:shadow-lg 
              transition
            "
          >
            View Details
          </motion.button>
        </motion.div>
      ))}
    </motion.div>
  );
}