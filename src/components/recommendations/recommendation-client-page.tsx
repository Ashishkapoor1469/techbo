"use client";

import React, { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ItemCard } from '@/components/shared/item-card';
import { getRecommendations } from '@/app/recommendations/actions';
import type { RecommendContentOutput, RecommendContentInput } from '@/ai/flows/recommend-content';
import { Loader2Icon, Wand2Icon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";


const recommendationSchema = z.object({
  searchQuery: z.string().min(3, { message: "Search query must be at least 3 characters." }).max(200),
  userPosts: z.string().max(1000).optional(),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

export function RecommendationClientPage() {
  const [recommendations, setRecommendations] = useState<RecommendContentOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      searchQuery: '',
      userPosts: '',
    },
  });

  const onSubmit: SubmitHandler<RecommendationFormValues> = async (data) => {
    startTransition(async () => {
      try {
        setRecommendations(null); // Clear previous recommendations
        const result = await getRecommendations(data as RecommendContentInput);
        setRecommendations(result);
        if (result.frameworkRecommendations.length === 0 && result.packageRecommendations.length === 0 && data.searchQuery) {
          toast({
            title: "No specific recommendations found",
            description: "Try refining your search query for better results.",
          });
        }
      } catch (error) {
        console.error("Recommendation error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Could not fetch recommendations.",
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Wand2Icon className="mr-2 h-6 w-6 text-primary" />
            Describe Your Needs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="searchQuery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search Query</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'lightweight UI library for real-time charts'" {...field} />
                    </FormControl>
                    <FormDescription>
                      Describe what you're looking for or the problem you're trying to solve.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userPosts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Optional: Your Recent Posts or Interests</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'Interested in Svelte and serverless functions...'" {...field} rows={3} />
                    </FormControl>
                    <FormDescription>
                      Provide more context for better recommendations (e.g., technologies you like, project details).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                {isPending ? (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2Icon className="mr-2 h-4 w-4" />
                )}
                Get Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isPending && (
        <div className="text-center py-8">
          <Loader2Icon className="mx-auto h-12 w-12 text-primary animate-spin" />
          <p className="mt-2 text-muted-foreground">Fetching recommendations...</p>
        </div>
      )}

      {recommendations && !isPending && (
        <div className="space-y-8 mt-10">
          {recommendations.frameworkRecommendations.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Framework Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.frameworkRecommendations.map((fw, index) => (
                  <ItemCard 
                    key={`${fw.name}-${index}`} 
                    item={{ ...fw, id: `${fw.name}-${index}`, logoUrl: `https://placehold.co/64x64.png`, dataAiHint: 'framework logo', tags: [], websiteUrl: fw.url }} 
                    type="framework" 
                  />
                ))}
              </div>
            </section>
          )}

          {recommendations.packageRecommendations.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Package Recommendations</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.packageRecommendations.map((pkg, index) => (
                  <ItemCard 
                    key={`${pkg.name}-${index}`} 
                    item={{ ...pkg, id: `${pkg.name}-${index}`, logoUrl: `https://placehold.co/64x64.png`, dataAiHint: 'package logo', tags: [], version: 'N/A', repositoryUrl: pkg.url }} 
                    type="package" 
                  />
                ))}
              </div>
            </section>
          )}
          
          {recommendations.frameworkRecommendations.length === 0 && recommendations.packageRecommendations.length === 0 && form.getValues("searchQuery") && (
             <p className="text-muted-foreground text-center py-8">No specific recommendations found based on your query.</p>
          )}
        </div>
      )}
    </div>
  );
}
