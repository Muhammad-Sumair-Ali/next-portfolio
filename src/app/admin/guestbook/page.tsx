"use client"

import { useGuestbookActions } from "@/hooks/useGuestbook"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MessageSquare, Users, Clock } from "lucide-react"

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


function GuestBookAnalytics() {
  const { messages, error,isLoading, fetchMessages } =
    useGuestbookActions()

  const [sortOption, setSortOption] = useState("newest")

  useEffect(() => {
    fetchMessages()
  }, [])

  // Calculate metrics
  const totalMessages = messages?.length || 0
  const uniqueUsers = messages ? new Set(messages.map((message) => message.name)).size : 0
  const latestMessageDate =
    messages && messages.length > 0
      ? formatTimeAgo(new Date(Math.max(...messages.map((m) => new Date(m.date).getTime()))).toString())
      : "No messages"

  // Sort messages based on selected option
  const sortedMessages = [...(messages || [])].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortOption === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    }
    return 0
  })

  // Get recent messages for the chart (last 7 entries)
  const recentMessages = [...(sortedMessages || [])].slice(0, 7).reverse()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-destructive">Error loading guestbook data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Guestbook Analytics</h1>
        <p className="text-muted-foreground">Insights and messages from your guestbook visitors</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Messages</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl">{totalMessages}</CardTitle>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Unique Visitors</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl">{uniqueUsers}</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Latest Message</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">{latestMessageDate}</CardTitle>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
        </Card>
      </div>

 

      {/* Messages List */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Messages</h2>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedMessages.length > 0 ? (
          sortedMessages.map((message) => <MessageCard key={message.id} message={message} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No messages found</p>
          </div>
        )}
      </div>


           {/* Message Visualization */}
           <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Recent Messages Activity</CardTitle>
          <CardDescription>Timeline of the last 7 messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full flex items-end gap-2">
            {recentMessages.map((message, index) => (
              <div
                key={message.id}
                className="relative flex-1 bg-primary/10 rounded-t-md hover:bg-primary/20 transition-all group"
                style={{ height: `${60 + index * 10}px` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background p-1 rounded shadow-sm text-xs whitespace-nowrap">
                  {message.name}
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <span className="text-xs">{formatTimeAgo(message.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MessageCard({ message }:any) {
  const formattedDate = message.date ? formatTimeAgo(message.date) : "Unknown date"

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={message.avatar} alt={message.name} />
              <AvatarFallback>{message.name?.charAt(0) || "?"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{message.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{message.message}</p>
      </CardContent>
    </Card>
  )
}

export default GuestBookAnalytics

