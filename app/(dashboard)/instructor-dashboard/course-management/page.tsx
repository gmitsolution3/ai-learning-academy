"use client";

import { useFetch } from "@/hooks/swr/useFetch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RefreshCw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Plus,
  Clock,
  DollarSign,
  Globe,
  FolderOpen,
} from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatDuration, formatPrice } from "@/utils";
import { ICourse } from "@/types";
import CourseManagementActionCell from "@/components/InstructorDashboard/actionCells/CourseManagementActionCell";
import CourseManagementLoader from "@/components/InstructorDashboard/loaders/CourseManagementLoader";
import CourseManagementError from "@/components/InstructorDashboard/errors/CourseManagementError";
import CourseManagementEmpty from "@/components/InstructorDashboard/empties/CourseManagementEmpty";
import CreateCourseModal from "@/components/InstructorDashboard/modals/CreateCourseModal";
import {
  CourseLevelBadge,
  CourseStatusBadge,
  LanguageBadge,
} from "@/utils/course.utils";

export default function CourseManagementPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, isLoading, isError, refetch } = useFetch(
    "/course/get-all-courses",
  );
  const { data: categoriesData } = useFetch(
    "/categories/get-categories",
  );
  const { data: usersData } = useFetch("/users/get-all-users");

  const courseList: ICourse[] = data?.data || [];
  const categoryList = categoriesData?.data || [];
  const userList = usersData?.data || [];

  // Table columns definition
  const columns: ColumnDef<ICourse>[] = [
    {
      id: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => (
        <div className="w-16 h-12 rounded-md overflow-hidden bg-muted">
          {row.original.thumbnail ? (
            <img
              src={row.original.thumbnail}
              alt={row.original.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <FolderOpen className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
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
            Course Title
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
          <p className="text-sm text-muted-foreground line-clamp-1">
            {row.original.short_description}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div>{row.original.category.name}</div>,
    },
    {
      accessorKey: "course_level",
      header: "Level",
      cell: ({ row }) => (
        <CourseLevelBadge level={row.original.course_level} />
      ),
    },
    {
      accessorKey: "language",
      header: "Language",
      cell: ({ row }) => (
        <LanguageBadge language={row.original.language} />
      ),
    },
    {
      accessorKey: "regular_price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
            className="p-0 hover:bg-transparent"
          >
            Price
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
          {row.original.discount_price ? (
            <div>
              <span className="font-semibold text-green-600">
                {formatPrice(row.original.discount_price)}
              </span>
              <span className="text-sm text-muted-foreground line-through ml-2">
                {formatPrice(row.original.regular_price)}
              </span>
            </div>
          ) : (
            <span className="font-semibold">
              {formatPrice(row.original.regular_price)}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "total_duration",
      header: "Duration",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{formatDuration(row.original.total_duration)}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <CourseStatusBadge status={row.original.status} />
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
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <CourseManagementActionCell
          course={row.original}
          categories={categoryList}
          instructors={userList}
        />
      ),
    },
  ];

  const table = useReactTable({
    data: courseList,
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
    return <CourseManagementLoader />;
  }

  // Error state
  if (isError) {
    return <CourseManagementError refetch={refetch} />;
  }

  // Empty state
  if (courseList.length === 0) {
    return (
      <>
        <CourseManagementEmpty refetch={refetch} onOpenChange={setShowCreateModal} />
        <CreateCourseModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
          onSuccess={refetch}
          categories={categoryList}
          instructors={userList}
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
              <CardTitle className="text-2xl">
                Course Management
              </CardTitle>
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
            {/* Search Input */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search courses by title, description, or instructor..."
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
                Create New Course
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
                of {table.getFilteredRowModel().rows.length} courses
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

      <CreateCourseModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSuccess={refetch}
        categories={categoryList}
        instructors={userList}
      />
    </>
  );
}
