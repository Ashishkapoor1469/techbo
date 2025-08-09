"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PostSchema = z.object({
  id: z.string().min(1, "Post ID is required"),
  type: z.enum(["article", "package", "user_update"], {
    errorMap: () => ({ message: "Please select a type" }),
  }),
  title: z.string().min(1, "Title is required").max(100, "Max 100 characters"),
  author: z.string().min(1, "Author is required"),
  link: z.string().url("Invalid URL").optional(),
  tags: z.string().optional(),
});

type PostFormValues = z.infer<typeof PostSchema>;

export default function CreatePostPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      id: "",
      type: undefined,
      title: "",
      author: "",
      link: "",
      tags: "",
    },
  });

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const uploadImage = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) throw new Error("Image upload failed");
    const data = await res.json();
    return data.secure_url;
  };

  const onSubmit = async (values: PostFormValues) => {
    setLoading(true);
    setMessage("");

    try {
      let imageUrl = null;
      if (file) {
        imageUrl = await uploadImage();
      }

      const tagsArray = values.tags
        ? values.tags.split(",").map((t) => t.trim())
        : undefined;

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          imageUrl,
          tags: tagsArray,
          timestamp: new Date().toISOString(),
          likes: 0,
          comments: 0,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("✅ Post created successfully!");
        form.reset();
        handleFileSelect(null);
      } else {
        setMessage(`❌ ${result.error}`);
      }
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background border p-4">
      <Card className="w-full max-w-2xl shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Unique Post ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="framework">Framework</SelectItem>
                        <SelectItem value="package">Package</SelectItem>
                        <SelectItem value="user_update">User Update</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Optional link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="Comma-separated tags" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image upload */}
              <div
                className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center cursor-pointer hover:border-blue-400 transition"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={400}
                    height={200}
                    className="mx-auto rounded-lg object-cover"
                  />
                ) : (
                  <p className="text-gray-500">Click or drag to upload image</p>
                )}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Post"}
              </Button>
            </form>
          </Form>

          {message && <p className="mt-4 text-center">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
