"use client";
import { useEffect, useState } from "react";
import Signup from "../components/Signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UsersIcon,
  UserPlus,
  Search,
  MoreVertical,
  UserCheck,
  UserX,
  Activity,
  Filter,
  AlertCircle,
} from "lucide-react";
import { useFetch } from "@/app/action/useCustom";
import { useSession } from "next-auth/react";

// Define interface for user data
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  image?: string;
  provider?: string;
  providerId?: string;
  username?: string;
  profileUrl?: string;
  bio?: string;
  location?: string;
  locale?: string;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

// Define interface for API response
interface ApiResponse {
  data: User[];
  success?: boolean;
  message?: string;
}

const UsersDashboard = () => {
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const { data: session } = useSession();
  const token = localStorage.getItem("adminToken")
  const {
    data: apiResponse,
    error,
    loading,
    refetch: fetchData,
  } = useFetch<ApiResponse>("/api/auth/users");

  const users: User[] = (apiResponse && 'data' in apiResponse) ? apiResponse.data : [];
  
  useEffect(() => {
    fetchData();
    
    // Set current user role
    if (session && session.user && session.user.email) {
      const userInfo = users.find(user => user.email === session.user.email);
      if (userInfo) {
        setCurrentUserRole(userInfo.role);
      }
    }
  }, [session]);

  const isAdmin = currentUserRole === "admin";

  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.role === "user").length;
  const adminUsers = users.filter(user => user.role === "admin").length;
  const oauthUsers = users.filter(user => user.provider).length;

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get initials from name
  const getInitials = (name: string | undefined): string => {
    if (!name) return "?";
    const parts = name.split(" ");
    return `${parts[0]?.charAt(0) || ""}${parts[1]?.charAt(0) || ""}`;
  };

  // Format date to "time ago" format
  const formatTimeAgo = (dateString: string | undefined): string => {
    if (!dateString) return "Unknown";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your users, roles and permissions
          </p>
        </div>
        {token && (
          <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus size={16} />
                Add New User
              </Button>
            </DialogTrigger>
            <DialogContent className="h-auto">
              <DialogHeader className="sr-only">
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with the form below.
                </DialogDescription>
              </DialogHeader>
              <Signup />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All registered users in the system
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Standard Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Users with standard permissions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Admin Users
            </CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Users with administrative privileges
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              OAuth Users
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{oauthUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Users with OAuth login
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-users" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <TabsList>
            <TabsTrigger value="all-users">All Users</TabsTrigger>
            <TabsTrigger value="admin">Admins</TabsTrigger>
            <TabsTrigger value="user">Standard Users</TabsTrigger>
            {isAdmin && <TabsTrigger value="oauth">OAuth Users</TabsTrigger>}
          </TabsList>
          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {isAdmin && (
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <TabsContent value="all-users" className="m-0">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <p>Loading users...</p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center p-8 text-red-500">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <p>Error loading users</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            User
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Role
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Provider
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Joined
                          </th>
                          {isAdmin && (
                            <th className="h-12 px-4 text-left align-middle font-medium w-[50px]"></th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <tr
                              key={user._id}
                              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                              <td className="p-4 align-middle">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    {user.image ? (
                                      <AvatarImage src={user.image} alt={user.name} />
                                    ) : (
                                      <AvatarFallback>
                                        {getInitials(user.name)}
                                      </AvatarFallback>
                                    )}
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 align-middle">
                                <Badge
                                  variant={user.role === "admin" ? "default" : "secondary"}
                                >
                                  {user.role}
                                </Badge>
                              </td>
                              <td className="p-4 align-middle">
                                {user.provider ? (
                                  <Badge variant="outline">{user.provider}</Badge>
                                ) : (
                                  <span className="text-muted-foreground">Email</span>
                                )}
                              </td>
                              <td className="p-4 align-middle">
                                {formatTimeAgo(user.createdAt)}
                              </td>
                              {isAdmin && (
                                <td className="p-4 align-middle">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem>
                                        View profile
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>
                                        Reset password
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        {user.role === "admin" ? "Remove admin" : "Make admin"}
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-600">
                                        Delete user
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              )}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={isAdmin ? 5 : 4} className="h-24 text-center">
                              No users found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin" className="m-0">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">User</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Joined</th>
                        {isAdmin && (
                          <th className="h-12 px-4 text-left align-middle font-medium w-[50px]"></th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.filter(user => user.role === "admin").length > 0 ? (
                        filteredUsers
                          .filter(user => user.role === "admin")
                          .map((user) => (
                            <tr
                              key={user._id}
                              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                              <td className="p-4 align-middle">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    {user.image ? (
                                      <AvatarImage src={user.image} alt={user.name} />
                                    ) : (
                                      <AvatarFallback>
                                        {getInitials(user.name)}
                                      </AvatarFallback>
                                    )}
                                  </Avatar>
                                  <div className="font-medium">{user.name}</div>
                                </div>
                              </td>
                              <td className="p-4 align-middle">{user.email}</td>
                              <td className="p-4 align-middle">
                                {formatTimeAgo(user.createdAt)}
                              </td>
                              {isAdmin && (
                                <td className="p-4 align-middle">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem>View profile</DropdownMenuItem>
                                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>Remove admin</DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-600">
                                        Delete user
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              )}
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={isAdmin ? 4 : 3} className="h-24 text-center">
                            No admin users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="m-0">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">User</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Provider</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Joined</th>
                        {isAdmin && (
                          <th className="h-12 px-4 text-left align-middle font-medium w-[50px]"></th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.filter(user => user.role === "user").length > 0 ? (
                        filteredUsers
                          .filter(user => user.role === "user")
                          .map((user) => (
                            <tr
                              key={user._id}
                              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                              <td className="p-4 align-middle">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    {user.image ? (
                                      <AvatarImage src={user.image} alt={user.name} />
                                    ) : (
                                      <AvatarFallback>
                                        {getInitials(user.name)}
                                      </AvatarFallback>
                                    )}
                                  </Avatar>
                                  <div className="font-medium">{user.name}</div>
                                </div>
                              </td>
                              <td className="p-4 align-middle">{user.email}</td>
                              <td className="p-4 align-middle">
                                {user.provider ? (
                                  <Badge variant="outline">{user.provider}</Badge>
                                ) : (
                                  <span className="text-muted-foreground">Email</span>
                                )}
                              </td>
                              <td className="p-4 align-middle">
                                {formatTimeAgo(user.createdAt)}
                              </td>
                              {isAdmin && (
                                <td className="p-4 align-middle">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem>View profile</DropdownMenuItem>
                                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>Make admin</DropdownMenuItem>
                                      <DropdownMenuItem>Reset password</DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-600">
                                        Delete user
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              )}
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={isAdmin ? 5 : 4} className="h-24 text-center">
                            No standard users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="oauth" className="m-0">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">User</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Provider</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Provider ID</th>
                          <th className="h-12 px-4 text-left align-middle font-medium w-[50px]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.filter(user => user.provider).length > 0 ? (
                          filteredUsers
                            .filter(user => user.provider)
                            .map((user) => (
                              <tr
                                key={user._id}
                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                              >
                                <td className="p-4 align-middle">
                                  <div className="flex items-center gap-3">
                                    <Avatar>
                                      {user.image ? (
                                        <AvatarImage src={user.image} alt={user.name} />
                                      ) : (
                                        <AvatarFallback>
                                          {getInitials(user.name)}
                                        </AvatarFallback>
                                      )}
                                    </Avatar>
                                    <div className="font-medium">{user.name}</div>
                                  </div>
                                </td>
                                <td className="p-4 align-middle">{user.email}</td>
                                <td className="p-4 align-middle">
                                  <Badge variant="outline">{user.provider}</Badge>
                                </td>
                                <td className="p-4 align-middle truncate max-w-[200px]">
                                  {user.providerId}
                                </td>
                                <td className="p-4 align-middle">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem>View profile</DropdownMenuItem>
                                      <DropdownMenuItem>Edit user</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>
                                        {user.role === "admin" ? "Remove admin" : "Make admin"}
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-600">
                                        Delete user
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="h-24 text-center">
                              No OAuth users found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {totalUsers > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredUsers.length}</strong> of <strong>{totalUsers}</strong> users
          </div>
          {isAdmin && totalUsers > 10 && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersDashboard;