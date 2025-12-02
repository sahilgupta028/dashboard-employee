"use client";

import { Employee } from "../types";
import { motion } from "framer-motion";
import {
  TbArrowLeft,
  TbMail,
  TbPhone,
  TbWorld,
  TbBuilding,
  TbMapPin,
  TbUser,
} from "react-icons/tb";

interface Props {
  selected: Employee;
  setSelected: (v: null) => void;
}

export default function TileDetail({ selected, setSelected }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="
        max-w-lg mx-auto mt-8 relative
        rounded-3xl p-10 
        bg-white/40 backdrop-blur-2xl 
        shadow-[0_15px_40px_rgba(0,0,0,0.15)]
        border border-white/30 
        ring-1 ring-gray-200/40 
      "
    >
      {/* GLOW AROUND CARD */}
      <div
        className="
          absolute inset-0 rounded-3xl 
          bg-gradient-to-br from-blue-400/20 via-purple-300/20 to-pink-300/20
          blur-2xl opacity-40 pointer-events-none
        "
      />

      {/* Back Button */}
      <motion.button
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setSelected(null)}
        className="
          text-gray-700 flex items-center gap-2
          font-medium mb-6 px-4 py-2.5
          rounded-xl shadow-md
          bg-gradient-to-r from-gray-100 to-gray-200
          hover:shadow-lg hover:bg-gray-300
          transition-all
        "
      >
        <TbArrowLeft size={20} /> Back
      </motion.button>

      {/* Header */}
      <div className="flex items-center gap-5 mb-8 relative">

        {/* Avatar Circle */}
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          className="
            w-16 h-16 rounded-full 
            bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600
            flex items-center justify-center
            shadow-xl ring-4 ring-white/40
          "
        >
          <TbUser size={34} className="text-white" />
        </motion.div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {selected.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{selected.username}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="space-y-4">
        <InfoItem
          icon={<TbMail size={22} className="text-blue-600" />}
          label="Email"
          value={selected.email}
        />

        <InfoItem
          icon={<TbPhone size={22} className="text-purple-600" />}
          label="Phone"
          value={selected.phone}
        />

        <InfoItem
          icon={<TbWorld size={22} className="text-indigo-600" />}
          label="Website"
          value={selected.website}
        />

        <InfoItem
          icon={<TbBuilding size={22} className="text-green-600" />}
          label="Company"
          value={selected.company.name}
        />

        <InfoItem
          icon={<TbMapPin size={22} className="text-red-500" />}
          label="City"
          value={selected.address.city}
        />
      </div>
    </motion.div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="
        flex items-center gap-4
        p-4 rounded-2xl 
        bg-white/60 backdrop-blur-xl
        shadow-[0_4px_14px_rgba(0,0,0,0.08)]
        border border-gray-200/60
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
        transition-all cursor-default
      "
    >
      <div className="text-xl">{icon}</div>
      <div>
        <p className="text-xs uppercase text-gray-500 tracking-wide">
          {label}
        </p>
        <p className="font-semibold text-gray-800 text-[15px]">
          {value}
        </p>
      </div>
    </motion.div>
  );
}