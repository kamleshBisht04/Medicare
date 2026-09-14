import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  CircleAlert,
  IndianRupee,
  CreditCard,
  WalletCards,
} from "lucide-react";

//    STATIC DATA / CONFIG

export const STATUS_CONFIG = {
  confirmed: {
    label: "Confirmed",
    color: "green",
    dot: "bg-green-500",
    badge: "bg-green-50 text-green-700",
  },

  pending: {
    label: "Pending",
    color: "amber",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700",
  },

  cancelled: {
    label: "Cancelled",
    color: "red",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-600",
  },
};

/* Top statistics static information */
export const STAT_CARD_CONFIG = [
  {
    key: "totalAppointments",
    title: "Total Appointments",
    description: "All bookings",
    icon: CalendarDays,
    border: "border-indigo-100",
    iconBg: "bg-indigo-50",
    iconHover: "group-hover:bg-indigo-100",
    iconColor: "text-indigo-600",
    descriptionColor: "text-indigo-600",
    showTrend: true,
  },

  {
    key: "pendingAppointments",
    title: "Pending",
    description: "Waiting for confirmation",
    icon: CircleAlert,
    border: "border-amber-100",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    descriptionColor: "text-amber-600",
  },

  {
    key: "confirmedAppointments",
    title: "Confirmed",
    description: "Confirmed bookings",
    icon: CheckCircle2,
    border: "border-green-100",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    descriptionColor: "text-green-600",
  },

  {
    key: "totalRevenue",
    title: "Total Revenue",
    description: "From paid appointments",
    icon: IndianRupee,
    border: "border-violet-100",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    descriptionColor: "text-violet-600",
    currency: true,
  },
];

/* Secondary statistics static information */
export const SECONDARY_STAT_CONFIG = [
  {
    key: "todayAppointments",
    title: "Today's Appointments",
    icon: Clock,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },

  {
    key: "paidAppointments",
    title: "Paid Appointments",
    icon: CreditCard,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },

  {
    key: "pendingPayments",
    title: "Pending Payments",
    icon: WalletCards,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },

  {
    key: "cancelledAppointments",
    title: "Cancelled",
    icon: XCircle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
];

/* Pie chart static information */
export const STATUS_CHART_CONFIG = [
  {
    key: "confirmedAppointments",
    name: "Confirmed",
    color: "#22c55e",
  },
  {
    key: "pendingAppointments",
    name: "Pending",
    color: "#f59e0b",
  },
  {
    key: "cancelledAppointments",
    name: "Cancelled",
    color: "#ef4444",
  },
];

/* Payment chart static information */
export const PAYMENT_CHART_CONFIG = [
  {
    key: "paidAppointments",
    name: "Paid",
  },
  {
    key: "pendingPayments",
    name: "Pending",
  },
];
