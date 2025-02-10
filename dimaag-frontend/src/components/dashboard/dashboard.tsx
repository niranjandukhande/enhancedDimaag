"use client"

import { SignOutButton, useUser } from "@clerk/clerk-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Youtube, Twitter, Instagram } from "lucide-react"

function Dashboard() {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    platform: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      platform: value,
    }))
  }

  const handleSave = () => {
    console.log("Saving data:", formData)
    // Here you would typically send this data to your backend
    setIsOpen(false)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        {user?.emailAddresses[0].emailAddress && (
          <p>Email: {user.emailAddresses[0].emailAddress}</p>
        )}
      </div>
      <div className="flex space-x-4 mb-4">
        <SignOutButton>
          <Button variant="outline">Sign Out</Button>
        </SignOutButton>
        <Button asChild variant="outline">
          <Link to="/signin">Sign In</Link>
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Add New Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Link</DialogTitle>
          </DialogHeader>
          <Card>
            <CardHeader>
              <CardTitle>Enter Link Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select
                  onValueChange={handleSelectChange}
                  value={formData.platform}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youtube">
                      <div className="flex items-center">
                        <Youtube className="mr-2" size={16} />
                        YouTube
                      </div>
                    </SelectItem>
                    <SelectItem value="twitter">
                      <div className="flex items-center">
                        <Twitter className="mr-2" size={16} />
                        Twitter
                      </div>
                    </SelectItem>
                    <SelectItem value="instagram">
                      <div className="flex items-center">
                        <Instagram className="mr-2" size={16} />
                        Instagram
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save</Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Dashboard
