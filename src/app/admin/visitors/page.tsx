"use client";

import type React from "react";

import { useFetchVisitors } from "@/app/action/useCustom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  Globe,
  Users,
  Clock,
  Monitor,
  Smartphone,
  Laptop,
  Tablet,
  MapPin,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PaginatedTable from "../components/common/UsersTable";

export default function VisitorAnalyticsAdmin() {
  const { data = [], loading, error } = useFetchVisitors();
  // console.log("DATA", data);
  const [visitorData, setVisitorData] = useState<any[]>([]);
  const [visitorStats, setVisitorStats] = useState({
    total: 0,
    countries: 0,
    cities: 0,
    browsers: { Chrome: 0, Firefox: 0, Safari: 0, Edge: 0, Other: 0 },
    devices: { Desktop: 0, Mobile: 0, Tablet: 0 },
    countryData: [] as { name: string; value: number }[],
    timeData: [] as { name: string; value: number }[],
  });

  // Chart colors
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  useEffect(() => {
    if (data) {
      setVisitorData(data);

      // Process data for stats
      const countries = new Set();
      const cities = new Set();
      const browsers = { Chrome: 0, Firefox: 0, Safari: 0, Edge: 0, Other: 0 };
      const devices = { Desktop: 0, Mobile: 0, Tablet: 0 };
      const countryCount: Record<string, number> = {};

      // Create time buckets for the last 24 hours (hourly)
      const now = new Date();
      const timeData = Array.from({ length: 24 }, (_, i) => {
        const hour = new Date(now);
        hour.setHours(now.getHours() - 23 + i, 0, 0, 0);
        return {
          name: `${hour.getHours()}:00`,
          value: 0,
        };
      });

      data?.forEach((visitor: any) => {
        // Count countries and cities
        countries.add(visitor.country);
        cities.add(visitor.city);

        // Count browsers
        if (visitor.userAgent.includes("Chrome")) browsers.Chrome++;
        else if (visitor.userAgent.includes("Firefox")) browsers.Firefox++;
        else if (
          visitor.userAgent.includes("Safari") &&
          !visitor.userAgent.includes("Chrome")
        )
          browsers.Safari++;
        else if (visitor.userAgent.includes("Edge")) browsers.Edge++;
        else browsers.Other++;

        // Count devices (simple detection)
        if (visitor.userAgent.includes("Mobile")) devices.Mobile++;
        else if (visitor.userAgent.includes("Tablet")) devices.Tablet++;
        else devices.Desktop++;

        // Count by country
        countryCount[visitor.country] =
          (countryCount[visitor.country] || 0) + 1;

        // Add to time data
        const visitTime = new Date(visitor.timestamp);
        const hourIndex = (now.getHours() - visitTime.getHours() + 24) % 24;
        if (
          visitTime.getDate() === now.getDate() ||
          (now.getDate() - visitTime.getDate() === 1 &&
            visitTime.getHours() > now.getHours())
        ) {
          timeData[23 - hourIndex].value++;
        }
      });

      // Convert country data to array for chart
      const countryData = Object.entries(countryCount)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

      setVisitorStats({
        total: data.length,
        countries: countries.size,
        cities: cities.size,
        browsers,
        devices,
        countryData,
        timeData,
      });
    }
  }, [data]);

  // Format data for pie charts
  const getBrowserData = () => {
    return Object.entries(visitorStats.browsers).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getDeviceData = () => {
    return Object.entries(visitorStats.devices).map(([name, value]) => ({
      name,
      value,
    }));
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm">
          <p className="font-medium">{`${label || payload[0].name}`}</p>
          <p className="text-sm">{`${payload[0].value} visitors`}</p>
        </div>
      );
    }
    return null;
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-500">Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error || "Failed to load visitor data"}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Visitor Analytics</h1>
        <p className="text-muted-foreground">
          Monitor and analyze your website traffic and visitor behavior
        </p>
      </div>

      {loading ? (
        <AnalyticsSkeleton />
      ) : (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Visitors"
              value={visitorStats.total}
              icon={<Users className="h-4 w-4" />}
              description="All-time visitors"
            />
            <StatCard
              title="Countries"
              value={visitorStats.countries}
              icon={<Globe className="h-4 w-4" />}
              description="Unique countries"
            />
            <StatCard
              title="Cities"
              value={visitorStats.cities}
              icon={<MapPin className="h-4 w-4" />}
              description="Unique cities"
            />
            <StatCard
              title="Last Visit"
              value={
                visitorData.length > 0
                  ? formatDistanceToNow(new Date(visitorData[0].timestamp), {
                      addSuffix: true,
                    })
                  : "N/A"
              }
              icon={<Clock className="h-4 w-4" />}
              description="Most recent visitor"
              isText
            />
          </div>
          {/* Tabs for different analytics views */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="geography">Geography</TabsTrigger>
              <TabsTrigger value="devices">Devices & Browsers</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Visitor Activity (Last 24 Hours)
                  </CardTitle>
                  <CardDescription>
                    Hourly breakdown of visitor traffic
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={visitorStats.timeData}
                      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => value}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                        name="Visitors"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="shadow-lg rounded-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                      <Globe className="h-5 w-5 text-blue-500" />
                      Top Countries
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-72 px-4 -ml-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={visitorStats.countryData}
                        layout="vertical"
                        margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                          type="number"
                          tick={{ fontSize: 12, fill: "#888" }}
                        />
                        <YAxis
                          dataKey="name"
                          type="category"
                          tick={{ fontSize: 12, fill: "#555" }}
                          width={100}
                        />
                        <Tooltip
                          content={<CustomTooltip />}
                          cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                        />
                        <Bar
                          dataKey="value"
                          name="Visitors"
                          radius={[8, 8, 8, 8]}
                          fill="url(#colorUv)"
                          barSize={20}
                        />
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                          >
                            <stop
                              offset="0%"
                              stopColor="#3b82f6"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="100%"
                              stopColor="#60a5fa"
                              stopOpacity={1}
                            />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      Device Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getDeviceData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {getDeviceData().map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Geography Tab */}
            <TabsContent value="geography" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Locations</CardTitle>
                  <CardDescription>
                    Breakdown of visitor locations by country and city
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PaginatedTable
                    data={visitorData}
                    searchable={true}
                    searchKeys={["country", "city", "region", "isp"]}
                    columns={[
                      {
                        key: "index",
                        header: "NO",
                        cell: (_, index) => index + 1,
                      },
                      {
                        key: "country",
                        header: "Country",
                        cell: (visitor) => (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{visitor.country}</Badge>
                          </div>
                        ),
                        sortable: true,
                      },
                      {
                        key: "city",
                        header: "City",
                        cell: (visitor) => visitor.city,
                        sortable: true,
                      },
                      {
                        key: "region",
                        header: "Region",
                        cell: (visitor) => visitor.region,
                        sortable: true,
                      },
                      {
                        key: "isp",
                        header: "ISP",
                        cell: (visitor) => (
                          <span className="max-w-[200px] truncate block">
                            {visitor.isp}
                          </span>
                        ),
                        sortable: true,
                      },
                      {
                        key: "timestamp",
                        header: "Last Visit",
                        cell: (visitor) =>
                          formatDistanceToNow(new Date(visitor.timestamp), {
                            addSuffix: true,
                          }),
                        sortable: true,
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Devices Tab */}
            <TabsContent value="devices" className="space-y-6 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                      <Monitor className="h-5 w-5 text-blue-500" /> Device Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-80 flex justify-center items-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getDeviceData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={90}
                          innerRadius={40}
                          fill="#4F46E5"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {getDeviceData().map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                      <Globe className="h-5 w-5 text-green-500" /> Browsers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-80 flex justify-center items-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getBrowserData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={90}
                          innerRadius={40}
                          fill="#16A34A"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {getBrowserData().map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    User Agents
                  </CardTitle>
                  <CardDescription>
                    Detailed browser and device information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PaginatedTable
                    data={visitorData}
                    searchable={true}
                    searchKeys={["userAgent"]}
                    columns={[
                      {
                        key: "index",
                        header: "#",
                        cell: (_, index) => index + 1,
                      },
                      {
                        key: "deviceType",
                        header: "Device Type",
                        cell: (visitor) => (
                          <div className="flex items-center gap-2">
                            {visitor.userAgent.includes("Mobile") ? (
                              <>
                                <Smartphone className="h-4 w-4 text-blue-500" />{" "}
                                Mobile
                              </>
                            ) : visitor.userAgent.includes("Tablet") ? (
                              <>
                                <Tablet className="h-4 w-4 text-orange-500" />{" "}
                                Tablet
                              </>
                            ) : (
                              <>
                                <Laptop className="h-4 w-4 text-gray-700" />{" "}
                                Desktop
                              </>
                            )}
                          </div>
                        ),
                        sortable: true,
                      },
                      {
                        key: "userAgent",
                        header: "User Agent",
                        cell: (visitor) => (
                          <span className="max-w-[300px] truncate block text-gray-600">
                            {visitor.userAgent}
                          </span>
                        ),
                      },
                      {
                        key: "timestamp",
                        header: "Last Visit",
                        cell: (visitor) =>
                          formatDistanceToNow(new Date(visitor.timestamp), {
                            addSuffix: true,
                          }),
                        sortable: true,
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Visitors
              </CardTitle>
              <CardDescription>
                Detailed information about your most recent visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaginatedTable
                data={visitorData}
                searchable={true}
                searchKeys={["country", "city", "region", "isp"]}
                columns={[
                  {
                    key: "index",
                    header: "NO",
                    cell: (_, index) => index + 1,
                    sortable: true,
                  },
                  {
                    key: "location",
                    header: "Location",
                    cell: (visitor) => (
                      <div className="flex flex-col">
                        <span>
                          {visitor.city}, {visitor.region}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {visitor.country}
                        </span>
                      </div>
                    ),
                    sortable: true,
                  },
                  {
                    key: "device",
                    header: "Device",
                    cell: (visitor) =>
                      visitor.userAgent.includes("Chrome")
                        ? "Chrome"
                        : visitor.userAgent.includes("Firefox")
                        ? "Firefox"
                        : visitor.userAgent.includes("Safari")
                        ? "Safari"
                        : visitor.userAgent.includes("Edge")
                        ? "Edge"
                        : "Other",
                    sortable: true,
                  },
                  {
                    key: "isp",
                    header: "ISP",
                    cell: (visitor) => (
                      <span className="max-w-[200px] truncate block">
                        {visitor.isp}
                      </span>
                    ),
                    sortable: true,
                  },
                  {
                    key: "timestamp",
                    header: "Time",
                    cell: (visitor) => (
                      <div className="flex flex-col">
                        <span>
                          {new Date(visitor.timestamp).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(visitor.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ),
                    sortable: true,
                  },
                ]}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  icon,
  description,
  isText = false,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description: string;
  isText?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
            <span className={`text-2xl font-bold ${isText ? "text-lg" : ""}`}>
              {value}
            </span>
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Loading Skeleton
function AnalyticsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="h-80">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-36" />
            </CardHeader>
            <CardContent className="h-64">
              <Skeleton className="h-full w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
