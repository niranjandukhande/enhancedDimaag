import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useContentMutation } from "@/hooks/useContentMutation";
import { contentSchema, contentType } from "@/types/content";
import { validateLink } from "@/utils/validateLink";
import { Lock, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function LinkModel() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    platform: "",
    isPrivate: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      isPrivate: checked,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      platform: value,
    }));
  };

  const contentSave = useContentMutation();
  const handleSave = async () => {
    try {
      if (!validateLink(formData.platform, formData.link)) {
        if (formData.platform === "twitter") {
          toast.error("we are not accepting x.com links");
          setIsOpen(false);
          return;
        }
        toast.error("Please select a valid platform");
        return;
      }

      const contentDetails: contentType = {
        title: formData.title,
        typeOfContent: formData.platform,
        description: formData.description,
        isPublic: !formData.isPrivate,
        link: formData.link,
      };
      const reqBody = contentSchema.safeParse(contentDetails);
      if (reqBody.error) {
        console.log("error", reqBody.error);
        throw reqBody.error;
      }
      await contentSave.mutateAsync(contentDetails);
    } catch (err) {
      console.error("Error inserting user:", err);
    }

    setIsOpen(false);
  };

  return (
    <div>
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
                  className="h-24 resize-none"
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
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Lock size={16} className="text-gray-500" />
                  <Label
                    htmlFor="isPrivate"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Private Link
                  </Label>
                </div>
                <Switch
                  id="isPrivate"
                  checked={formData.isPrivate}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save</Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LinkModel;
