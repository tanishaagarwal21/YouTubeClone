"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { MoreVertical, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CommentSection({ video }: { video: any }) {
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState("")
  const [editingComment, setEditingComment] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    setComments(video.comments || [])

    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [video])

  const handleAddComment = () => {
    if (!newComment.trim() || !user) return

    const newCommentObj = {
      commentId: `comment${Date.now()}`,
      userId: user.userId,
      username: user.username,
      text: newComment,
      timestamp: new Date().toISOString(),
    }

    setComments([newCommentObj, ...comments])
    setNewComment("")
  }

  const handleEditComment = (commentId: string) => {
    const comment = comments.find((c) => c.commentId === commentId)
    if (comment) {
      setEditingComment(commentId)
      setEditText(comment.text)
    }
  }

  const saveEditedComment = () => {
    if (!editText.trim() || !editingComment) return

    setComments(
      comments.map((comment) => (comment.commentId === editingComment ? { ...comment, text: editText } : comment)),
    )

    setEditingComment(null)
    setEditText("")
  }

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter((comment) => comment.commentId !== commentId))
  }

  return (
    <div className="mt-6">
      <h2 className="mb-4 font-medium">{comments.length} Comments</h2>

      {user && (
        <div className="mb-6 flex gap-3">
          <div className="h-8 w-8 overflow-hidden rounded-full bg-muted">
            <Image
              src={`https://avatar.vercel.sh/${user.username}`}
              alt={user.username}
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[60px] resize-none"
            />
            <div className="mt-2 flex justify-end">
              <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                <Send className="mr-2 h-4 w-4" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.commentId} className="flex gap-3">
            <div className="h-8 w-8 overflow-hidden rounded-full bg-muted">
              <Image
                src={`https://avatar.vercel.sh/${comment.userId}`}
                alt={comment.username || "User"}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              {editingComment === comment.commentId ? (
                <div>
                  <Textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="min-h-[60px] resize-none"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditingComment(null)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={saveEditedComment}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.username || "User"}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                    </span>
                    {user && user.userId === comment.userId && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditComment(comment.commentId)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteComment(comment.commentId)}
                            className="text-destructive"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <p className="mt-1 text-sm">{comment.text}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
