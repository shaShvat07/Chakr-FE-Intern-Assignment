// app/routes/prospects/ProspectTable.tsx

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import Link from "next/link";
import { Prospect } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react"; // Import the sorting icon
import EditableCell from "./EditableCell";
import { initialProspects } from "@/lib/data";

export default function ProspectTable() {
  const [localProspects, setLocalProspects] =
    useState<Prospect[]>(initialProspects);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [addingProspect, setAddingProspect] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const columns = useMemo<ColumnDef<Prospect>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <Checkbox
            checked={selectedRows.length === localProspects.length}
            onCheckedChange={(checked) => handleSelectAllRows(!!checked)}
            aria-label="Select all"
          />
        ),
        cell: (info) => (
          <Checkbox
            checked={selectedRows.includes(info.row.original.id)}
            onCheckedChange={(checked) =>
              handleSelectRow(!!checked, info.row.original.id)
            }
            aria-label="Select row"
          />    
        ),
      },
      {
        accessorKey: "firstName",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            First Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: (info) => (
          <Link
            href={`/prospects/${info.row.original.id}`}
            className="hover:underline"
          >
           {info.getValue() as React.ReactNode}
          </Link>
        ),
      },
      {
        accessorKey: "lastName",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: (info) => (
          <Link
            href={`/prospects/${info.row.original.id}`}
            className="hover:underline"
          >
            {info.getValue() as React.ReactNode}
          </Link>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: (info) => (
          <EditableCell
            value={info.getValue() as string}
            onChange={(newValue) =>
              handleProspectUpdate({ ...info.row.original, email: newValue })
            }
          />
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: (info) => (
          <EditableCell
            value={info.getValue() as string}
            onChange={(newValue) =>
              handleProspectUpdate({ ...info.row.original, phone: newValue })
            }
          />
        ),
      },
      {
        accessorKey: "company",
        header: "Company",
        cell: (info) => (
          <EditableCell
            value={info.getValue() as string}
            onChange={(newValue) =>
              handleProspectUpdate({ ...info.row.original, company: newValue })
            }
          />
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => info.getValue(),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [localProspects.length, selectedRows]
  );

  const table = useReactTable({
    data: localProspects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const handleProspectUpdate = (updatedProspect: Prospect) => {
    setLocalProspects((prevProspects) =>
      prevProspects.map((p) =>
        p.id === updatedProspect.id ? { ...p, ...updatedProspect } : p
      )
    );
  };

  const handleDelete = () => {
    setLocalProspects((prevProspects) =>
      prevProspects.filter((prospect) => !selectedRows.includes(prospect.id))
    );
    setSelectedRows([]);
  };

  const handleAddProspect = () => {
    if (firstName && lastName && email) {
      const newProspect: Prospect = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        phone: "",
        company: "",
        status: "New",
        dateAdded: new Date(),
      };
      setLocalProspects([newProspect, ...localProspects]);
      setFirstName("");
      setLastName("");
      setEmail("");
      setAddingProspect(false);
    } else {
      alert(
        "Please fill in all fields (First Name, Last Name, Email) to add a new prospect."
      );
    }
  };

  const handleSelectRow = (checked: boolean, prospectId: string) => {
    if (checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, prospectId]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((id) => id !== prospectId)
      );
    }
  };

  const handleSelectAllRows = (checked: boolean) => {
    if (checked) {
      setSelectedRows(localProspects.map((prospect) => prospect.id));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Filter prospects..."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="max-w-sm"
        />
        <div>
          <Button
            className="mr-2"
            onClick={handleDelete}
            disabled={selectedRows.length === 0}
          >
            Delete Selected
          </Button>
          <Button onClick={() => setAddingProspect(true)}>Add Prospect</Button>
        </div>
      </div>

      {addingProspect && (
        <div className="flex mb-4">
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mr-2"
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mr-2"
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mr-2"
          />
          <Button onClick={handleAddProspect}>Save</Button>
        </div>
      )}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-muted min-w-[200px]"
            >
              {row.getVisibleCells().map((cell, index) => (
                <TableCell key={cell.id} className="min-w-[200px]">
                  {/* Render checkboxes only for the first cell (select column) */}
                  {index === 0
                    ? flexRender(cell.column.columnDef.cell, cell.getContext())
                    : flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
