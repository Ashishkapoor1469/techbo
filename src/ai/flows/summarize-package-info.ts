// SummarizePackageInfo story
'use server';
/**
 * @fileOverview Summarizes package documentation and community feedback.
 *
 * - summarizePackageInfo - A function that summarizes package information.
 * - SummarizePackageInfoInput - The input type for the summarizePackageInfo function.
 * - SummarizePackageInfoOutput - The return type for the summarizePackageInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePackageInfoInputSchema = z.object({
  packageDocumentation: z
    .string()
    .describe('The documentation of the package.'),
  communityFeedback: z.string().describe('Community feedback about the package.'),
});
export type SummarizePackageInfoInput = z.infer<typeof SummarizePackageInfoInputSchema>;

const SummarizePackageInfoOutputSchema = z.object({
  summary: z.string().describe('A summary of the package documentation and community feedback.'),
});
export type SummarizePackageInfoOutput = z.infer<typeof SummarizePackageInfoOutputSchema>;

export async function summarizePackageInfo(input: SummarizePackageInfoInput): Promise<SummarizePackageInfoOutput> {
  return summarizePackageInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePackageInfoPrompt',
  input: {schema: SummarizePackageInfoInputSchema},
  output: {schema: SummarizePackageInfoOutputSchema},
  prompt: `Summarize the following package documentation and community feedback:\n\nDocumentation: {{{packageDocumentation}}}\n\nFeedback: {{{communityFeedback}}}`,
});

const summarizePackageInfoFlow = ai.defineFlow(
  {
    name: 'summarizePackageInfoFlow',
    inputSchema: SummarizePackageInfoInputSchema,
    outputSchema: SummarizePackageInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
