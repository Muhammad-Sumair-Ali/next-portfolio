"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthentication } from "@/app/action/useAuth";

export default function Signup() {
  const {handleSignup, name, setName, email, setEmail, password, setPassword ,loading ,role, setRole, } = useAuthentication();

  return (
    <div className="flex flex-col items-center justify-center -mt-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Create New User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="grid gap-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Checkbox
                      id="user"
                      checked={role === "user"}
                      onCheckedChange={() => setRole("user")}
                    />
                    <Label htmlFor="user" className="ml-2">
                      User
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="admin"
                      checked={role === "admin"}
                      onCheckedChange={() => setRole("admin")}
                    />
                    <Label htmlFor="admin" className="ml-2">
                      Admin
                    </Label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
