// RecommendContentBasedOnSearch
'use server';

/**
 * @fileOverview Recommends relevant frameworks and packages based on a search query.
 *
 * - recommendContent - A function that recommends content based on a search query.
 * - RecommendContentInput - The input type for the recommendContent function.
 * - RecommendContentOutput - The return type for the recommendContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentInputSchema = z.object({
  searchQuery: z.string().describe('The search query to use for recommending frameworks and packages.'),
  userPosts: z.string().optional().describe('Optional: User recent posts to include in the recommendation.'),
});

export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

const RecommendContentOutputSchema = z.object({
  frameworkRecommendations: z.array(
    z.object({
      name: z.string().describe('The name of the recommended framework.'),
      description: z.string().describe('A short description of the framework.'),
      url: z.string().describe('The URL of the framework.'),
      reason: z.string().describe('The reason why this framework is recommended based on the search query.'),
    })
  ).describe('A list of recommended frameworks.'),
  packageRecommendations: z.array(
    z.object({
      name: z.string().describe('The name of the recommended package.'),
      description: z.string().describe('A short description of the package.'),
      url: z.string().describe('The URL of the package.'),
      reason: z.string().describe('The reason why this package is recommended based on the search query.'),
    })
  ).describe('A list of recommended packages.'),
});

export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(input: RecommendContentInput): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const recommendContentPrompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: RecommendContentInputSchema},
  output: {schema: RecommendContentOutputSchema},
  prompt: `You are a recommendation engine that suggests relevant frameworks and packages based on a user's search query.

  Search Query: {{{searchQuery}}}
  {{#if userPosts}}
  User Recent Posts: {{{userPosts}}}
  {{/if}}

  Based on the search query, recommend relevant frameworks and packages.
  Explain why each framework and package is recommended.

  Format your response as a JSON object matching the schema.
  `, 
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async input => {
    const {output} = await recommendContentPrompt(input);
    return output!;
  }
);
