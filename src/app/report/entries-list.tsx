"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { QueryResultRow } from "@vercel/postgres";

export default function EntriesList({ entries }: { entries: QueryResultRow[] }) {
  const sortedEntries = [...entries].sort((a, b) => a.date < b.date ? 1 : -1);
  
  const columns: Record<keyof QueryResultRow, { name: string }> = {
    date: { name: "Data" },
    quantity: { name: "Quantidade" },
    note: { name: "Anotação" },
    tags: { name: "Tags" },
  };

  const columnKeys = Object.keys(columns) as Array<keyof QueryResultRow>;

  const formatCell = (value: string, key: keyof QueryResultRow) => {
    if (key === "date") {
      const date = new Date(value);
      return date.toLocaleDateString();
    }
    if (key === "tags" && Array.isArray(value)) {
      return value.join(", ");
    }
    return value !== null && value !== undefined ? value.toString() : "";
  };

  const fillRow = (entry: QueryResultRow) => (
    <TableRow key={entry.date}>
      {columnKeys.map((key) => (
        <TableCell key={key}>{formatCell(entry[key], key)}</TableCell>
      ))}
    </TableRow>
  );

  return (
    <div className="flex h-full w-full items-center justify-center border rounded-lg shadow-md p-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columnKeys.map((key) => (
              <TableHead key={key} className="text-center">{columns[key].name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{sortedEntries.map((entry) => fillRow(entry))}</TableBody>
      </Table>
    </div>
  );
}
