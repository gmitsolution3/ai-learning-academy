"use client";

import ConsultationActionsCell from "@/components/AdminDashboard/actionCells/ConsultationActionsCell";
import ConsultationManagementEmpty from "@/components/AdminDashboard/empties/ConsultationManagementEmpty";
import ConsultationManagementError from "@/components/AdminDashboard/errors/ConsultationManagementError";
import ConsultationManagementLoader from "@/components/AdminDashboard/loaders/ConsultationManagementLoader";
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
import { useFetch } from "@/hooks/swr/useFetch";
import { IConsultation } from "@/types";
import { formatDate } from "@/utils";
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
  AlertCircle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Mail,
  Phone,
  RefreshCw,
  Users,
  Video,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { IUser } from "@/types";

// Consultancy type badge
const ConsultancyTypeBadge = ({ type }: { type: string }) => {
  const variants: Record<string, string> = {
    Online:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Offline:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Hybrid:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  };

  const icons: Record<string, React.ReactNode> = {
    Online: <Video className="mr-1 h-3 w-3" />,
    Offline: <Users className="mr-1 h-3 w-3" />,
    Hybrid: <Users className="mr-1 h-3 w-3" />,
  };

  return (
    <Badge className={variants[type] || variants.Online}>
      {icons[type]}
      {type}
    </Badge>
  );
};

// Enrollment status badge
const EnrollmentBadge = ({ isEnrolled }: { isEnrolled: boolean }) => {
  return isEnrolled ? (
    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
      <CheckCircle className="mr-1 h-3 w-3" />
      Enrolled
    </Badge>
  ) : (
    <Badge variant="outline" className="text-muted-foreground">
      <XCircle className="mr-1 h-3 w-3" />
      Not Enrolled
    </Badge>
  );
};

export default function ConsultationManagement() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isLoading, isError, refetch } = useFetch(
    "/consultancy/get-all-consultancy",
  );

  const { data: usersData } = useFetch("/users/get-all-users");

  const consultancyList: IConsultation[] =
    data?.data?.consultancy || [];

  const instructorList = usersData?.data?.filter(
    (user: IUser) => user.role === "instructor",
  );

  // Table columns definition
  const columns: ColumnDef<IConsultation>[] = [
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
            Date
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
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatDate(row.original.created_at)}</span>
        </div>
      ),
    },
    {
      accessorKey: "user",
      header: "User Details",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.user.name}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span>{row.original.user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>{row.original.user.phone}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "topic",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
            className="p-0 hover:bg-transparent"
          >
            Topic
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
            {row.original.topic}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {row.original.description.substring(0, 60)}...
          </p>
        </div>
      ),
    },
    {
      accessorKey: "consultancy_type",
      header: "Type",
      cell: ({ row }) => (
        <ConsultancyTypeBadge type={row.original.consultancy_type} />
      ),
    },
    {
      accessorKey: "isEnrolledCourse",
      header: "Enrollment",
      cell: ({ row }) => (
        <EnrollmentBadge isEnrolled={row.original.isEnrolledCourse} />
      ),
    },
    {
      accessorKey: "courseDetails",
      header: "Course/Batch",
      cell: ({ row }) => {
        const { isEnrolledCourse, courseDetails } = row.original;

        if (!isEnrolledCourse || !courseDetails) {
          return (
            <div className="text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4 inline mr-1" />
              Not specified
            </div>
          );
        }

        return (
          <div>
            <div className="flex items-center gap-1 text-sm">
              <BookOpen className="h-3 w-3 text-muted-foreground" />
              <span>{courseDetails.course.name}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>Batch: {courseDetails.batch.name}</span>
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ConsultationActionsCell
          consultation={row.original}
          instructors={instructorList}
        />
      ),
    },
  ];

  const table = useReactTable({
    data: consultancyList,
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
    return <ConsultationManagementLoader />;
  }

  // Error state
  if (isError) {
    return <ConsultationManagementError refetch={refetch} />;
  }

  // Empty state
  if (consultancyList.length === 0) {
    return <ConsultationManagementEmpty refetch={refetch} />;
  }

  return (
    <section className="container mx-auto py-10 px-4 lg:px-0">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">
                Consultation Management
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage all student consultation requests
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                className="gap-2 p-5"
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
          <div className="mb-4">
            <Input
              placeholder="Search consultations by student name, email, topic..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full p-5"
            />
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
              of {table.getFilteredRowModel().rows.length}{" "}
              consultations
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
  );
}
