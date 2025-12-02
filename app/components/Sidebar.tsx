"use client";

import { useState } from "react";
import {
  TbX,
  TbLayoutDashboard,
  TbUsers,
  TbChevronDown,
  TbBriefcase,
  TbSettings,
} from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="sidebar"
          initial={{ x: -260, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -260, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-0 left-0 h-full w-64 bg-gray-900/90 backdrop-blur-xl 
          border-r border-white/10 shadow-[4px_0_20px_rgba(0,0,0,0.5)] z-50"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
            <h2 className="text-lg font-semibold tracking-wide text-white">
              Navigation
            </h2>

            <motion.div
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <TbX
                size={26}
                className="cursor-pointer text-gray-300 hover:text-red-400 transition"
                onClick={() => setOpen(false)}
              />
            </motion.div>
          </div>

          {/* MENU LIST */}
          <ul className="mt-4 space-y-2 px-3">

            {/* Dashboard */}
            <SidebarItem icon={<TbLayoutDashboard size={22} />} label="Dashboard" />

            {/* Employees (submenu) */}
            <li className="group">
              <button
                onClick={() => setSubmenuOpen(!submenuOpen)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl 
                hover:bg-white/10 transition-all"
              >
                <div className="flex items-center">
                  <span className="mr-3 text-gray-300 group-hover:text-blue-400 transition">
                    <TbUsers size={22} />
                  </span>
                  <span className="text-gray-200 group-hover:text-blue-300 transition">
                    Employees
                  </span>
                </div>

                <motion.span
                  animate={{ rotate: submenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300"
                >
                  <TbChevronDown />
                </motion.span>
              </button>

              {/* Submenu Animated */}
              <AnimatePresence>
                {submenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-10 mt-2 space-y-2"
                  >
                    <SubmenuItem label="List" />
                    <SubmenuItem label="Add New" />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Projects */}
            <SidebarItem icon={<TbBriefcase size={22} />} label="Projects" />

            {/* Settings */}
            <SidebarItem icon={<TbSettings size={22} />} label="Settings" />
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------ COMPONENTS ------------------------ */

interface ItemProps {
  icon: React.ReactNode;
  label: string;
}

function SidebarItem({ icon, label }: ItemProps) {
  return (
    <motion.li
      whileHover={{ x: 5 }}
      className="group cursor-pointer"
    >
      <div className="flex items-center w-full px-4 py-3 rounded-xl 
        hover:bg-white/10 transition-all">
        <span className="mr-3 text-gray-300 group-hover:text-blue-400 transition">
          {icon}
        </span>
        <span className="text-gray-200 group-hover:text-blue-300 transition">
          {label}
        </span>
      </div>
    </motion.li>
  );
}

function SubmenuItem({ label }: { label: string }) {
  return (
    <motion.li
      whileHover={{ x: 10 }}
      className="cursor-pointer text-gray-300 hover:text-blue-300 px-2 py-1 rounded transition"
    >
      {label}
    </motion.li>
  );
}