/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  setMenuOpen: (v: boolean) => void;
  setView: (v: "grid" | "tile") => void;
}

export default function Navbar({ setMenuOpen, setView }: NavbarProps) {
  const [viewMode, setViewMode] = useState<"grid" | "tile">("grid");
  const [menuOpen, localSetMenuOpen] = useState(false);

  const handleViewChange = (_: any, v: "grid" | "tile" | null) => {
    if (v) {
      setViewMode(v);
      setView(v);
    }
  };

  // Sync with parent menu state
  useEffect(() => {
    setMenuOpen(menuOpen);
  }, [menuOpen, setMenuOpen]);

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <AppBar
        position="sticky"
        elevation={8}
        className="!bg-blue-700/80 backdrop-blur-xl border-b border-white/10"
      >
        <Toolbar className="flex justify-between px-4 md:px-8">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <IconButton
                color="inherit"
                onClick={() => localSetMenuOpen(!menuOpen)}
              >
                {menuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
              </IconButton>
            </motion.div>

            <motion.h1
              className="text-xl md:text-2xl font-semibold tracking-wide text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Employee Dashboard
            </motion.h1>
          </div>

          {/* RIGHT SECTION - VIEW TOGGLE */}
          <AnimatePresence>
            <motion.div
              key="toggle-group"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewChange}
                className="bg-white/10 rounded-xl backdrop-blur-md border border-white/20 overflow-hidden"
              >
                <ToggleButton
                  value="grid"
                  className="text-white px-4 md:px-6 hover:bg-white/20 transition font-medium"
                >
                  <ViewModuleIcon className="mr-2" /> Grid
                </ToggleButton>

                <ToggleButton
                  value="tile"
                  className="text-white px-4 md:px-6 hover:bg-white/20 transition font-medium"
                >
                  <ViewAgendaIcon className="mr-2" /> Tile
                </ToggleButton>
              </ToggleButtonGroup>
            </motion.div>
          </AnimatePresence>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}