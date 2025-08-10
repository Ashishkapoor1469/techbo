"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";

const EditProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  avatarUrl: z.string().optional(),
  bio: z.string().max(200, "Bio must be under 200 characters").optional(),
  location: z.string().optional(),
  websiteUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isAcceptingMessage: z.boolean().optional(),
});

type EditProfileFormData = z.infer<typeof EditProfileSchema>;

export default function EditProfilePage() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue, watch } =
    useForm<EditProfileFormData>({
      resolver: zodResolver(EditProfileSchema),
      defaultValues: {
        name: "",
        username: "",
        bio: "",
        location: "",
        websiteUrl: "",
        isAcceptingMessage: true,
      },
    });

  const isAcceptingMessage = watch("isAcceptingMessage");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return null;

    const formData = new FormData();
    formData.append("file", avatarFile);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to upload image");

    return result.url; // uploaded image URL
  };

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      setLoading(true);

      let avatarUrl = data.avatarUrl || "";
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar();
        if (uploadedUrl) avatarUrl = uploadedUrl;
      }

      const res = await fetch("/api/user/edit-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, avatarUrl }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed to update profile");

      toast({ title: "Profile Updated", description: "Your changes have been saved." });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-3">
              <Avatar className="w-24 h-24">
                <AvatarImage src={preview || ""} alt="Avatar" />
                <AvatarFallback>
                  {watch("name")?.substring(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" type="button" onClick={() => document.getElementById("avatarInput")?.click()}>
                Upload Avatar
              </Button>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            {/* Name */}
            <div>
              <Label>Name</Label>
              <Input placeholder="Full Name" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Username */}
            <div>
              <Label>Username</Label>
              <Input placeholder="Username" {...register("username")} />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            {/* Bio */}
            <div>
              <Label>Bio</Label>
              <Textarea placeholder="Tell us about yourself" {...register("bio")} />
              {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
            </div>

            {/* Location */}
            <div>
              <Label>Location</Label>
              <Input placeholder="City, Country" {...register("location")} />
            </div>

            {/* Website */}
            <div>
              <Label>Website</Label>
              <Input placeholder="https://yourwebsite.com" {...register("websiteUrl")} />
              {errors.websiteUrl && <p className="text-red-500 text-sm">{errors.websiteUrl.message}</p>}
            </div>

            {/* Accept Messages */}
            <div className="flex items-center justify-between">
              <Label htmlFor="isAcceptingMessage">Accept Messages</Label>
              <Switch
                id="isAcceptingMessage"
                checked={isAcceptingMessage}
                onCheckedChange={(value) => setValue("isAcceptingMessage", value)}
              />
            </div>

            <CardFooter className="px-0">
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
