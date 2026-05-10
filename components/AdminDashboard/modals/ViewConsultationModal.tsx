"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Mail,
  Phone,
  User,
  BookOpen,
  Users,
  Video,
  MessageSquare,
  Hash,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { formatDate } from "@/utils";

interface User {
  name: string;
  email: string;
  phone: string;
}

interface CourseDetails {
  course: {
    _id: string;
    name: string;
  };
  batch: {
    _id: string;
    name: string;
  };
}

interface Consultation {
  _id: string;
  created_at: string;
  user: User;
  consultancy_type: "Online" | "Offline" | "Hybrid";
  topic: string;
  isEnrolledCourse: boolean;
  description: string;
  instructorId: string;
  courseDetails?: CourseDetails;
}

interface ViewConsultationModalProps {
  consultation: Consultation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Consultancy type badge
const ConsultancyTypeBadge = ({ type }: { type: string }) => {
  const variants: Record<string, string> = {
    Online: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Offline: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Hybrid: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
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
      Enrolled Student
    </Badge>
  ) : (
    <Badge variant="outline" className="text-muted-foreground">
      <XCircle className="mr-1 h-3 w-3" />
      Not Enrolled
    </Badge>
  );
};

export default function ViewConsultationModal({
  consultation,
  open,
  onOpenChange,
}: ViewConsultationModalProps) {
  if (!consultation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Consultation Details</DialogTitle>
          <DialogDescription>
            View detailed information about this consultation request.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <FieldGroup>
            {/* Header Section with Status */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2">
              <div className="flex items-center gap-2">
                <ConsultancyTypeBadge type={consultation.consultancy_type} />
                <EnrollmentBadge isEnrolled={consultation.isEnrolledCourse} />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Requested: {formatDate(consultation.created_at)}</span>
              </div>
            </div>

            {/* Topic */}
            <Field>
              <FieldLabel>Consultation Topic</FieldLabel>
              <FieldContent>
                <div className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  {consultation.topic}
                </div>
              </FieldContent>
              <FieldDescription>
                The main subject of the consultation request
              </FieldDescription>
            </Field>

            {/* User Information Section */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <User className="h-4 w-4" />
                Student Information
              </h4>
              <div className="rounded-lg border">
                <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Full Name</span>
                  </div>
                  <div className="text-sm font-medium text-right">
                    {consultation.user.name}
                  </div>
                </div>
                <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm font-medium">Email Address</span>
                  </div>
                  <div className="text-sm font-medium text-right">
                    {consultation.user.email}
                  </div>
                </div>
                <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-medium">Phone Number</span>
                  </div>
                  <div className="text-sm font-medium text-right">
                    {consultation.user.phone}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Information (if enrolled) */}
            {consultation.isEnrolledCourse && consultation.courseDetails ? (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Course & Batch Information
                </h4>
                <div className="rounded-lg border">
                  <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span className="text-sm font-medium">Course</span>
                    </div>
                    <div className="text-sm font-medium text-right">
                      {consultation.courseDetails.course.name}
                    </div>
                  </div>
                  <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm font-medium">Batch</span>
                    </div>
                    <div className="text-sm font-medium text-right">
                      {consultation.courseDetails.batch.name}
                    </div>
                  </div>
                  <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Hash className="h-4 w-4" />
                      <span className="text-sm font-medium">Course ID</span>
                    </div>
                    <div className="text-sm font-medium text-right">
                      <code className="text-xs">{consultation.courseDetails.course._id}</code>
                    </div>
                  </div>
                  <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Hash className="h-4 w-4" />
                      <span className="text-sm font-medium">Batch ID</span>
                    </div>
                    <div className="text-sm font-medium text-right">
                      <code className="text-xs">{consultation.courseDetails.batch._id}</code>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-md bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-yellow-800 dark:text-yellow-400">
                      Not Enrolled in Course
                    </p>
                    <p className="text-yellow-700 dark:text-yellow-300">
                      This student is not enrolled in any course. They are seeking general consultation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <Field>
              <FieldLabel>Description</FieldLabel>
              <FieldContent>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap p-4 bg-muted/30 rounded-lg">
                  {consultation.description}
                </div>
              </FieldContent>
              <FieldDescription>
                Detailed description of the consultation request
              </FieldDescription>
            </Field>

            {/* Additional Information */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Additional Information
              </h4>
              <div className="rounded-lg border">
                <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Hash className="h-4 w-4" />
                    <span className="text-sm font-medium">Consultation ID</span>
                  </div>
                  <div className="text-sm font-medium text-right">
                    <code className="text-xs">{consultation._id}</code>
                  </div>
                </div>
                {consultation.instructorId && (
                  <div className="flex items-start justify-between py-2 px-4 border-b last:border-0">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">Assigned Instructor</span>
                    </div>
                    <div className="text-sm font-medium text-right">
                      <code className="text-xs">{consultation.instructorId}</code>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FieldGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}