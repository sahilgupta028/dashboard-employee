"use client";

import { Employee } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

interface Props {
  data: Employee[];
}

export default function GridView({ data }: Props) {
  const columns = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Website",
    "Company",
    "City",
    "Street",
    "Zip",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full overflow-x-auto"
    >
      <TableContainer
        component={Paper}
        elevation={0}
        className="
          rounded-2xl 
          backdrop-blur-lg 
          bg-white/70 
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          border border-gray-200
          min-w-[900px]
        "
      >
        <Table>
          {/* HEADER */}
          <TableHead>
            <TableRow
              className="
                bg-gradient-to-r 
                from-gray-100 
                to-gray-50 
                border-b 
                border-gray-300
                sticky 
                top-0 
                z-10
              "
            >
              {columns.map((col) => (
                <TableCell
                  key={col}
                  className="
                    !font-semibold 
                    !text-gray-700
                    !py-4 
                    !px-4 
                    text-sm 
                    uppercase 
                    tracking-wider
                    whitespace-nowrap
                  "
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* BODY */}
          <TableBody>
            {data.map((emp, index) => (
              <motion.tr
                key={emp.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className={`
                  transition-all 
                  duration-300 
                  cursor-pointer
                  hover:bg-blue-50/60 
                  hover:shadow-sm
                  ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50/70"
                  }
                `}
              >
                <TableCell className="!px-4 !py-3 text-sm border-b border-gray-200">
                  {emp.id}
                </TableCell>

                <TableCell className="!px-4 !py-3 text-sm border-b border-gray-200 font-semibold text-gray-900">
                  {emp.name}
                </TableCell>

                {/* <TableCell className="!px-4 !py-3 text-sm border-b border-gray-200 text-gray-600">
                  {emp.username}
                </TableCell> */}

                <TableCell className="!px-4 !py-3 text-sm border-b border-gray-200 text-gray-600 whitespace-nowrap">
                  {emp.email}
                </TableCell>

                <TableCell className="!px-4 !py-3 text-sm border-b border-gray-200 text-gray-600 whitespace-nowrap">
                  {emp.phone}
                </TableCell>

                <TableCell className="!px-4 !py-3 text-sm border-b border-gray-200 text-blue-600 underline hover:text-blue-800 transition">
                  {emp.website}
                </TableCell>

                <TableCell className="!px-4 !py-3 text-sm border-b border-gray-200 font-medium text-gray-800">
                  {emp.company.name}
                </TableCell>

                <TableCell className="!px-4 !py-3 text-sm border-b border-gray-200 text-gray-600">
                  {emp.address.city}
                </TableCell>

                <TableCell className="!px-4 !py-3 text-sm border-b border-gray-200 text-gray-600">
                  {emp.address.street}
                </TableCell>

                <TableCell className="!px-4 !py-3 text-sm border-b border-gray-200 text-gray-600">
                  {emp.address.zipcode}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
}