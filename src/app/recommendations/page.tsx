import { RecommendationClientPage } from "@/components/recommendations/recommendation-client-page";

export default function RecommendationsPage() {
  return (
    <section className="space-y-8">
       <header>
        <h1 className="text-3xl font-bold tracking-tight">AI Content Recommender</h1>
        <p className="text-muted-foreground">
          Get personalized framework and package recommendations based on your project needs or interests.
        </p>
      </header>
      <RecommendationClientPage />
    </section>
  );
}
