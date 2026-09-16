/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import {
  CalendarDays,
  Clock,
  IndianRupee,
  Users,
  CheckCircle2,
} from "lucide-react";
import useADoctor from "../../hooks/useDoctor";
import { format_Date } from "../../data/formatDate";

const DoctorDashboard = () => {
  const { dashData, dToken, getDoctorDashboard } = useADoctor();

  useEffect(() => {
    if (dToken) {
      getDoctorDashboard();
    }
  }, [dToken]);

  const stats = {
    total: dashData?.totalAppointments ?? 0,
    today: dashData?.todayAppointments ?? 0,
    completed: dashData?.completedAppointments ?? 0,
    pending: dashData?.pendingAppointments ?? 0,
    earnings: dashData?.earnings ?? 0,
    todayAppointments: dashData?.todayAppointmentsList ?? [],
    recentAppointments: dashData?.recentAppointments ?? [],
  };

  const statCards = [
    {
      title: "Total Appointments",
      value: stats.total,
      icon: CalendarDays,
      bg: "bg-indigo-50",
      color: "text-indigo-600",
    },
    {
      title: "Today's Appointments",
      value: stats.today,
      icon: Clock,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Total Earnings",
      value: `₹${stats.earnings}`,
      icon: IndianRupee,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "completed") {
      return "bg-blue-50 text-blue-700 ring-blue-100";
    }

    if (status === "confirmed") {
      return "bg-green-50 text-green-700 ring-green-100";
    }

    if (status === "cancelled") {
      return "bg-red-50 text-red-600 ring-red-100";
    }

    return "bg-amber-50 text-amber-700 ring-amber-100";
  };

  const getStatusText = (status) => {
    if (status === "completed") return "Completed";
    if (status === "confirmed") return "Confirmed";
    if (status === "cancelled") return "Cancelled";

    return "Pending";
  };

  return (
    <div className="mt-12 min-h-screen w-full bg-[#f8fafc] p-3 sm:p-4 md:p-5 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl">
          Doctor Dashboard
        </h1>

        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Overview of your appointments and practice activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    {item.title}
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-gray-800">
                    {item.value}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg}`}
                >
                  <Icon size={21} className={item.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Today's Appointments */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                Today's Appointments
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Patients scheduled for today
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2">
              <Users size={15} className="text-indigo-600" />

              <span className="text-xs font-medium text-indigo-700">
                {stats.today}
              </span>
            </div>
          </div>

          {stats.todayAppointments.length > 0 ? (
            <div>
              {stats.todayAppointments.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 last:border-b-0 hover:bg-gray-50"
                >
                  {/* Patient */}
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={item.userData?.image}
                      alt={item.userData?.name || "Patient"}
                      className="h-10 w-10 shrink-0 rounded-full border border-gray-200 object-cover"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-800">
                        {item.userData?.name || "Unknown Patient"}
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <Clock size={12} className="text-gray-400" />

                        <p className="text-xs text-gray-500">
                          {item.slotTime || "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fee + Status */}
                  <div className="flex shrink-0 items-center gap-4">
                    <div className="hidden items-center gap-1 sm:flex">
                      <IndianRupee size={13} className="text-gray-500" />

                      <span className="text-sm font-semibold text-gray-700">
                        {item.amount || item.docData?.fees || 0}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset ${getStatusStyle(
                        item.status,
                      )}`}
                    >
                      {getStatusText(item.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
                <CalendarDays size={22} className="text-indigo-500" />
              </div>

              <p className="text-sm font-semibold text-gray-700">
                No appointments today
              </p>

              <p className="mt-1 text-xs text-gray-500">
                You don't have any appointments scheduled for today.
              </p>
            </div>
          )}
        </div>

        {/* Overview */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Appointment Overview
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Current appointment status
            </p>
          </div>

          <div className="space-y-4 p-5">
            {/* Pending */}
            <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                  <Clock size={17} className="text-amber-500" />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">Pending</p>

                  <p className="text-xs text-gray-500">Awaiting confirmation</p>
                </div>
              </div>

              <span className="text-lg font-semibold text-amber-600">
                {stats.pending}
              </span>
            </div>

            {/* Completed */}
            <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                  <CheckCircle2 size={17} className="text-green-500" />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">Completed</p>

                  <p className="text-xs text-gray-500">
                    Successfully completed
                  </p>
                </div>
              </div>

              <span className="text-lg font-semibold text-green-600">
                {stats.completed}
              </span>
            </div>

            {/* Total Earnings */}
            <div className="flex items-center justify-between rounded-xl bg-indigo-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                  <IndianRupee size={17} className="text-indigo-500" />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">Earnings</p>

                  <p className="text-xs text-gray-500">
                    From completed appointments
                  </p>
                </div>
              </div>

              <span className="text-lg font-semibold text-indigo-600">
                ₹{stats.earnings}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Recent Appointments
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Latest patient appointments
            </p>
          </div>

          <span className="text-xs font-medium text-gray-400">
            {stats.total} Total
          </span>
        </div>

        {stats.recentAppointments.length > 0 ? (
          <div>
            {stats.recentAppointments.map((item, index) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 last:border-b-0 hover:bg-gray-50"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-5 text-xs font-medium text-gray-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <img
                    src={item.userData?.image}
                    alt={item.userData?.name || "Patient"}
                    className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {item.userData?.name || "Unknown Patient"}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {format_Date(item.slotDate) || "-"}
                    </p>
                  </div>
                </div>

                <div className="hidden items-center gap-1 sm:flex">
                  <Clock size={13} className="text-gray-400" />

                  <span className="text-xs text-gray-500">
                    {item.slotTime || "-"}
                  </span>
                </div>

                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset ${getStatusStyle(
                    item.status,
                  )}`}
                >
                  {getStatusText(item.status)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-gray-500">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
