"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import GridView from "./components/GridView";
import TileView from "./components/TileView";
import TileDetail from "./components/TileDetail";
import { Employee } from "./types";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<"grid" | "tile">("grid");
  const [data, setData] = useState<Employee[]>([]);
  const [selected, setSelected] = useState<Employee | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((d) => setData(d));
  }, []);

  return (
    <div className="min-h-screen flex">
      <Sidebar open={menuOpen} setOpen={setMenuOpen} />

      <div className="flex-1">
        <Navbar setMenuOpen={setMenuOpen} setView={setView} />

        <main className="p-6">
          {selected ? (
            <TileDetail selected={selected} setSelected={setSelected} />
          ) : view === "grid" ? (
            <GridView data={data} />
          ) : (
            <TileView data={data} setSelected={setSelected} />
          )}
        </main>
      </div>
    </div>
  );
}