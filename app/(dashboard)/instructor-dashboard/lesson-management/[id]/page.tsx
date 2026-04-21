"use client";

import LessonManagementActionCell from "@/components/InstructorDashboard/actionCells/LessonManagementActionCell";
import LessonManagementEmpty from "@/components/InstructorDashboard/empties/LessonManagementEmpty";
import LessonManagementError from "@/components/InstructorDashboard/errors/LessonManagementError";
import LessonManagementLoader from "@/components/InstructorDashboard/loaders/LessonManagementLoader";
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
import { ILesson } from "@/types";
import { formatDuration } from "@/utils";
import {
  CompletionBadge,
  ContentTypeBadge,
} from "@/utils/lesson.utils";
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
import Link from "next/link";
import { use, useState } from "react";

export default function LessonManagementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: moduleId } = use(params);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isLoading, isError, refetch } = useFetchById(
    "/lessons/get-lesson-by-module-id",
    moduleId,
  );

  const lessonList: ILesson[] = data?.data?.lessons || [];

  const columns: ColumnDef<ILesson>[] = [
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
            Lesson Title
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
          <p className="font-medium line-clamp-2">
            {row.original.title}
          </p>
          {row.original.description && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {row.original.description}
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "content_type",
      header: "Content Type",
      cell: ({ row }) => (
        <ContentTypeBadge type={row.original.content_type} />
      ),
    },
    {
      accessorKey: "duration",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
            className="p-0 hover:bg-transparent"
          >
            Duration
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
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{formatDuration(row.original.duration)}</span>
        </div>
      ),
    },
    {
      accessorKey: "is_completed",
      header: "Status",
      cell: ({ row }) => (
        <CompletionBadge completed={row.original.is_completed} />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <LessonManagementActionCell
          lesson={row.original}
          moduleId={moduleId}
        />
      ),
    },
  ];

  const table = useReactTable({
    data: lessonList,
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
    return <LessonManagementLoader />;
  }

  // Error state
  if (isError) {
    return <LessonManagementError refetch={refetch} />;
  }

  // Empty state
  if (lessonList.length === 0) {
    return (
      <>
        <LessonManagementEmpty
          refetch={refetch}
          moduleId={moduleId}
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
                  Lesson Management
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Module ID:{" "}
                  <code className="text-xs">{moduleId}</code>
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
                  placeholder="Search lessons by title, description, or content type..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="w-full p-5"
                />
              </div>

              <Button asChild className="gap-2 p-5">
                <Link
                  href={`/instructor-dashboard/lesson-management/${moduleId}/create-lesson`}
                >
                  <Plus className="h-4 w-4" />
                  Create New Lesson
                </Link>
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
                of {table.getFilteredRowModel().rows.length} lessons
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
    </>
  );
}
