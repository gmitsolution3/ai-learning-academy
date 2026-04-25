"use client";

import ModuleManagementActionCell from "@/components/InstructorDashboard/actionCells/ModuleManagementActionCell";
import ModuleManagementEmpty from "@/components/InstructorDashboard/empties/ModuleManagementEmpty";
import ModuleManagementError from "@/components/InstructorDashboard/errors/ModuleManagementError";
import ModuleManagementLoader from "@/components/InstructorDashboard/loaders/ModuleManagementLoader";
import CreateModuleModal from "@/components/InstructorDashboard/modals/CreateModuleModal";
import { Badge } from "@/components/ui/badge";
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
import { useFetchById } from "@/hooks/swr/useFetchById";
import { IModule } from "@/types";
import { formatDate } from "@/utils";
import { formatOrderIndex } from "@/utils/module.utils";
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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  GripVertical,
  Plus,
  RefreshCw,
} from "lucide-react";
import { use, useMemo, useState } from "react";

// Table columns definition
const columns: ColumnDef<IModule>[] = [
  {
    id: "order",
    header: "Order",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
        <Badge variant="secondary" className="w-12 justify-center">
          {formatOrderIndex(row.original.order_index)}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="p-0 hover:bg-transparent"
        >
          Module Title
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
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <code className="text-xs bg-muted px-2 py-1 rounded">
        {row.original.slug}
      </code>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
          className="p-0 hover:bg-transparent"
        >
          Created
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
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span>{formatDate(row.original.created_at)}</span>
      </div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Last Updated",
    cell: ({ row }) => formatDate(row.original.updated_at),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ModuleManagementActionCell
        module={row.original}
        courseId={row.original.course_id}
      />
    ),
  },
];

export default function ModuleManagementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = use(params);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, isLoading, isError, refetch } = useFetchById(
    "/modules/get-modules-by-course-id",
    courseId,
  );

  const moduleList: IModule[] = useMemo(() => {
    return data?.data
      ? [...data.data].sort((a, b) => a.order_index - b.order_index)
      : [];
  }, [data?.data, isLoading]);


  const nextOrderIndex =
    [...moduleList].sort((a, b) => b.order_index - a.order_index)[0]
      ?.order_index + 1 || 0;

  const table = useReactTable({
    data: moduleList,
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
    return <ModuleManagementLoader />;
  }

  // Error state
  if (isError) {
    return <ModuleManagementError refetch={refetch} />;
  }

  // Empty state
  if (moduleList.length === 0) {
    return (
      <>
        <ModuleManagementEmpty
          refetch={refetch}
          onOpenChange={setShowCreateModal}
          courseId={courseId}
        />
        <CreateModuleModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
          onSuccess={refetch}
          courseId={courseId}
          nextOrderIndex={nextOrderIndex}
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
                  Module Management
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Course ID:{" "}
                  <code className="text-xs">{courseId}</code>
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
                  placeholder="Search modules by title or slug..."
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
                Create New Module
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
                of {table.getFilteredRowModel().rows.length} modules
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

      <CreateModuleModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSuccess={refetch}
        courseId={courseId}
        nextOrderIndex={nextOrderIndex}
      />
    </>
  );
}
