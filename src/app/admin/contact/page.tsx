"use client"

import { useFetchContact } from "@/app/action/useCustom"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, MoreVertical, RefreshCw, Mail, Calendar, AlertCircle } from "lucide-react"

interface ContactMessage {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  services: string[]
  createdAt: string
  updatedAt: string
  __v: number
}

function ContactDashboard() {
    const { data, error, loading, refetch: fetchData } = useFetchContact();

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])  

  const filteredData = (data ?? []).filter(
    (message: ContactMessage) =>
      message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    setIsDialogOpen(true)
  }

  const formatTimeAgo = (dateString: string | undefined): string => {
    if (!dateString) return "Unknown"

    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

  return (
    <div className=" mx-auto p-2 space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Contact Messages</CardTitle>
              <CardDescription>View and manage messages from your contact form</CardDescription>
            </div>
            <Button variant="outline" size="icon" onClick={() => fetchData()} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email or subject..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading messages...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center gap-2">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <p className="text-sm text-destructive">Failed to load messages</p>
                <Button variant="outline" size="sm" onClick={() => fetchData()}>
                  Try Again
                </Button>
              </div>
            </div>
          ) : filteredData && filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {filteredData.map((message: ContactMessage) => (
                <Card
                  key={message._id}
                  className="cursor-pointer bg-zinc-50 hover:shadow-md transition-shadow"
                  onClick={() => handleViewMessage(message)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base font-medium">{message.name}</CardTitle>
                        <CardDescription className="text-xs flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {message.email}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewMessage(message)
                            }}
                          >
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`
                            }}
                          >
                            Reply via email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Subject:</h4>
                        <p className="text-sm line-clamp-1">{message.subject}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">Services:</h4>
                        <div className="flex flex-wrap gap-1">
                          {message.services.map((service: string) => (
                            <Badge key={service} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatTimeAgo(message.createdAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center gap-2">
                <Mail className="h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">No messages found</p>
                {searchTerm && (
                  <Button variant="outline" size="sm" onClick={() => setSearchTerm("")}>
                    Clear search
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedMessage && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedMessage.subject}</DialogTitle>
              <DialogDescription>
                Message from {selectedMessage.name} ({selectedMessage.email})
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Received on {formatTimeAgo(selectedMessage.createdAt)}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Services Requested:</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedMessage.services.map((service) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Message:</h4>
                <div className="p-3 bg-muted rounded-md whitespace-pre-wrap">{selectedMessage.message}</div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`
                  }}
                >
                  Reply via Email
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

export default ContactDashboard

