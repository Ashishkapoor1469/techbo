"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    bio: "",
    location: "",
    websiteUrl: "",
    password: "",
    avatarUrl: ""
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatarFile(e.target.files[0]);
      setForm((prev) => ({
        ...prev,
        avatarUrl: URL.createObjectURL(e.target.files![0])
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let uploadedAvatarUrl = form.avatarUrl;

      if (avatarFile) {
        const data = new FormData();
        data.append("file", avatarFile);
        data.append("upload_preset", "your_upload_preset");

        const res = await fetch(`https://api.cloudinary.com/v1_1/<cloud_name>/image/upload`, {
          method: "POST",
          body: data
        });

        const uploadRes = await res.json();
        uploadedAvatarUrl = uploadRes.secure_url;
      }

      const res = await fetch("/api/user/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, avatarUrl: uploadedAvatarUrl })
      });

      if (!res.ok) throw new Error("Failed to update profile");

      toast.success("Profile updated successfully");
      router.push("/profile");
    } catch (err) {
      toast.error("Error updating profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto shadow-lg border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-col items-center space-y-3">
          <div className="relative group">
            <Avatar className="w-24 h-24 border-4 border-background shadow-md transition-all duration-300 group-hover:scale-105">
              <AvatarImage src={form.avatarUrl || ""} alt="avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
          <Label className="cursor-pointer font-medium">
            Change Avatar
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" placeholder="johndoe" value={form.username} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" placeholder="Tell the world about yourself..." value={form.bio} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" placeholder="New York, USA" value={form.location} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="websiteUrl">Website</Label>
          <Input id="websiteUrl" name="websiteUrl" placeholder="https://example.com" value={form.websiteUrl} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
        </div>

        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
