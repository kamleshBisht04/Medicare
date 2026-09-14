/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";

import {
  CalendarDays,
  IndianRupee,
  Users,
  CreditCard,
  TrendingUp,
  Activity,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import { dateFormat, format_Date } from "../../data/formatDate";
import {
  PAYMENT_CHART_CONFIG,
  SECONDARY_STAT_CONFIG,
  STAT_CARD_CONFIG,
  STATUS_CHART_CONFIG,
  STATUS_CONFIG,
} from "../../data/dashboardStatics";
import useAdmin from "../../hooks/useAdmin";

//  DASHBOARD

const Dashboard = () => {
  const { aToken, dashData, getDashboardData } = useAdmin();

  //  FETCH DATA
  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);

  //  BASIC DATA

  //  STATISTICS
  const statistics = dashData || {
    totalDoctors: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    cancelledAppointments: 0,
    paidAppointments: 0,
    pendingPayments: 0,
    totalRevenue: 0,
    todayAppointments: 0,
    appointmentTrend: [],
    recentAppointments: [],
  };

  //  PERCENTAGES

  const percentages = useMemo(() => {
    const { totalAppointments } = statistics;

    if (!totalAppointments) {
      return {
        confirmed: 0,
        pending: 0,
        cancelled: 0,
      };
    }

    return {
      confirmed: Math.round(
        (statistics.confirmedAppointments / totalAppointments) * 100,
      ),

      pending: Math.round(
        (statistics.pendingAppointments / totalAppointments) * 100,
      ),

      cancelled: Math.round(
        (statistics.cancelledAppointments / totalAppointments) * 100,
      ),
    };
  }, [statistics]);

  //  CHART DATA

  const statusData = STATUS_CHART_CONFIG.map((item) => ({
    name: item.name,
    value: statistics[item.key],
    color: item.color,
  }));

  const paymentData = PAYMENT_CHART_CONFIG.map((item) => ({
    name: item.name,
    value: statistics[item.key],
  }));

  const appointmentTrend = statistics.appointmentTrend || [];
  //  RECENT APPOINTMENTS
  const recentAppointments = statistics.recentAppointments || [];
  //  STATUS HELPER

  const getStatusConfig = (status) => {
    return STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  };

  //  RENDER

  return (
    <div className="mt-12 min-h-screen w-full bg-[#f8fafc] p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600">
              <Activity size={18} className="text-white" />
            </div>

            <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl">
              Admin Dashboard
            </h1>
          </div>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            Monitor appointments, patients and payment activity.
          </p>
        </div>

        {/* Today */}

        <div className="flex w-fit items-center gap-2 rounded-xl border border-indigo-100 bg-white px-3 py-2 shadow-sm">
          <CalendarDays size={17} className="text-indigo-600" />

          <div>
            <p className="text-[10px] text-gray-400">Today</p>

            <p className="text-xs font-semibold text-gray-700">
              {dateFormat(new Date())}
            </p>
          </div>
        </div>
      </div>
      {/* TOP STAT CARD */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {STAT_CARD_CONFIG.map((card) => {
          const Icon = card.icon;

          const value = statistics[card.key];

          return (
            <div
              key={card.key}
              className={`group rounded-2xl border ${card.border} bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="mt-1 text-2xl font-semibold text-gray-800">
                    {card.currency && "₹"}
                    {value}
                  </h2>

                  <p
                    className={`mt-1 flex items-center gap-1 text-xs ${card.descriptionColor}`}
                  >
                    {card.showTrend && <TrendingUp size={12} />}
                    {card.description}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} ${card.iconHover || ""}`}
                >
                  <Icon size={22} className={card.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* SECONDARY STATS */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SECONDARY_STAT_CONFIG.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.key}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}
                >
                  <Icon size={20} className={card.iconColor} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">{card.title}</p>

                  <p className="text-lg font-semibold text-gray-800">
                    {statistics[card.key]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* CHARTS */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Appointment Status */}

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div>
            <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
              Appointment Status
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Current appointment distribution
            </p>
          </div>

          <div className="mt-3 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="48%"
                  innerRadius={62}
                  outerRadius={92}
                  paddingAngle={4}
                >
                  {statusData.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Overview */}

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div>
            <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
              Payment Overview
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Paid and pending appointment payments
            </p>
          </div>

          <div className="mt-3 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={paymentData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  name="Appointments"
                  fill="#4f46e5"
                  radius={[8, 8, 0, 0]}
                  barSize={55}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* APPOINTMENT TREND */}
      <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
              Appointment Activity
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Appointment bookings during the last 7 days
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-lg bg-indigo-50 px-3 py-1.5">
            <TrendingUp size={14} className="text-indigo-600" />

            <span className="text-xs font-medium text-indigo-700">
              7 Day Trend
            </span>
          </div>
        </div>

        <div className="mt-4 h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={appointmentTrend}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="appointments"
                name="Appointments"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* MAIN CONTENT */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
        {/* RECENT APPOINTMENTS */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-5">
            <div>
              <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
                Recent Appointments
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                Latest patient bookings
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
              <Users size={18} className="text-indigo-600" />
            </div>
          </div>

          {recentAppointments.length > 0 ? (
            <div>
              {recentAppointments.map((item) => {
                const status = getStatusConfig(item.status);

                return (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 border-b border-gray-100 px-4 py-3.5 last:border-b-0 sm:px-5"
                  >
                    {/* Patient Image */}

                    <img
                      src={item.userData?.image || "/default-avatar.png"}
                      alt={item.userData?.name || "Patient"}
                      className="h-10 w-10 shrink-0 rounded-full border border-gray-200 object-cover"
                    />

                    {/* Patient Info */}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-800">
                        {item.userData?.name || "Unknown Patient"}
                      </p>

                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
                        <span className="max-w-[150px] truncate">
                          {item.docData?.name || "Unknown Doctor"}
                        </span>

                        <span className="text-gray-300">•</span>

                        <span>{format_Date(item.slotDate)}</span>

                        <span className="text-gray-300">•</span>

                        <span>{item.slotTime}</span>
                      </div>
                    </div>

                    {/* Status */}

                    <div className="shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${status.badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                        />

                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <CalendarDays size={30} className="text-gray-300" />

              <p className="mt-3 text-sm font-medium text-gray-600">
                No appointments yet
              </p>

              <p className="mt-1 text-xs text-gray-400">
                New appointments will appear here.
              </p>
            </div>
          )}
        </div>

        {/* STATUS SUMMARY */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                Appointment Overview
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Current booking status
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
              <Activity size={17} className="text-indigo-600" />
            </div>
          </div>

          {/* Status Progress */}

          <div className="mt-6">
            {/* Confirmed */}

            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-xs font-medium text-gray-600">
                  Confirmed
                </span>
              </div>

              <span className="text-xs font-semibold text-green-600">
                {statistics.confirmedAppointments} ({percentages.confirmed}%)
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-500"
                style={{
                  width: `${percentages.confirmed}%`,
                }}
              />
            </div>
          </div>

          {/* Pending */}

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />

                <span className="text-xs font-medium text-gray-600">
                  Pending
                </span>
              </div>

              <span className="text-xs font-semibold text-amber-600">
                {statistics.pendingAppointments} ({percentages.pending}%)
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{
                  width: `${percentages.pending}%`,
                }}
              />
            </div>
          </div>

          {/* Cancelled */}

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />

                <span className="text-xs font-medium text-gray-600">
                  Cancelled
                </span>
              </div>

              <span className="text-xs font-semibold text-red-500">
                {statistics.cancelledAppointments} ({percentages.cancelled}%)
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-red-500 transition-all duration-500"
                style={{
                  width: `${percentages.cancelled}%`,
                }}
              />
            </div>
          </div>

          {/* Payment Summary */}

          <div className="mt-7 border-t border-gray-100 pt-5">
            <div className="flex items-center gap-2">
              <CreditCard size={15} className="text-gray-500" />

              <p className="text-xs font-medium text-gray-500">
                Payment Summary
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-gray-600">Paid</span>

              <span className="text-sm font-semibold text-green-600">
                {statistics.paidAppointments}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-600">Pending</span>

              <span className="text-sm font-semibold text-amber-600">
                {statistics.pendingPayments}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-indigo-50 px-3 py-3">
              <span className="text-xs font-medium text-indigo-700">
                Total Revenue
              </span>

              <span className="flex items-center text-sm font-semibold text-indigo-700">
                <IndianRupee size={14} />

                {statistics.totalRevenue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
