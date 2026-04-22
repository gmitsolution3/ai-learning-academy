"use client";

import BatchManagementActionCell from "@/components/InstructorDashboard/actionCells/BatchManagementActionCell";
import BatchManagementEmpty from "@/components/InstructorDashboard/empties/BatchManagementEmpty";
import BatchManagementError from "@/components/InstructorDashboard/errors/BatchManagementError";
import BatchManagementLoader from "@/components/InstructorDashboard/loaders/BatchManagementLoader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/swr/useFetch";
import { IBatch } from "@/types";
import { formatDate } from "@/utils";
import {
  BatchStatusBadge,
  EnrollmentSummary,
} from "@/utils/batch.utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import CreateBatchModal from "@/components/InstructorDashboard/modals/CreateBatchModal";

// Table columns definition
const columns: ColumnDef<IBatch>[] = [
  {
    accessorKey: "batch_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="p-0 hover:bg-transparent"
        >
          Batch Name
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.batch_name}</p>
        <p className="text-xs text-muted-foreground">
          {row.original.batch_slug}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium">
          {row.original.course.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {row.original.course.slug}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "batch_status",
    header: "Status",
    cell: ({ row }) => (
      <BatchStatusBadge status={row.original.batch_status} />
    ),
  },
  {
    accessorKey: "batch_starting_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="p-0 hover:bg-transparent"
        >
          Date Range
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span>
            Start: {formatDate(row.original.batch_starting_date)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span>
            End: {formatDate(row.original.batch_ending_date)}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "enrolled_type",
    header: "Enrollment",
    cell: ({ row }) => (
      <EnrollmentSummary types={row.original.enrolled_type} />
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => formatDate(row.original.created_at),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <BatchManagementActionCell batch={row.original} />
    ),
  },
];

export default function BatchManagementPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, isLoading, isError, refetch } = useFetch(
    "/batch/get-all-batches",
  );
  const { data: coursesData } = useFetch("/course/get-all-courses");

  const batchList: IBatch[] = data?.data || [];
  const courseList = coursesData?.data || [];

  const table = useReactTable({
    data: batchList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  // Loading state
  if (isLoading) {
    return <BatchManagementLoader />;
  }

  // Error state
  if (isError) {
    return <BatchManagementError refetch={refetch} />;
  }

  // Empty state
  if (batchList.length === 0) {
    return (
      <>
        <BatchManagementEmpty
          refetch={refetch}
          onOpenChange={setShowCreateModal}
        />
        
        <CreateBatchModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
          onSuccess={refetch}
          courses={courseList}
        />
      </>
    );
  }

  return (
    <>
      <section className="container mx-auto py-10 px-4 lg:px-0">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">
                  Batch Management
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage all course batches and enrollments
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => refetch()}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isLoading && "animate-spin duration-300"}`}
                  />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Create Button Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search batches by name, course, or status..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="w-full p-5"
                />
              </div>

              <Button
                className="gap-2 p-5"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus className="h-4 w-4" />
                Create New Batch
              </Button>
            </div>

            {/* Table */}
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
              <div className="text-sm text-muted-foreground">
                Showing{" "}
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}{" "}
                to{" "}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length,
                )}{" "}
                of {table.getFilteredRowModel().rows.length} batches
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm whitespace-nowrap">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    table.setPageIndex(table.getPageCount() - 1)
                  }
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <CreateBatchModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSuccess={refetch}
        courses={courseList}
      />
    </>
  );
}
