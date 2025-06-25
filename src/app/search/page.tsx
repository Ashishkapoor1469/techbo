import { SearchClientPage } from "@/components/search/search-client-page";

export default function SearchPage() {
  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Search Codeaxe</h1>
        <p className="text-muted-foreground">Find posts, frameworks, packages, and users.</p>
      </header>
      <SearchClientPage />
    </section>
  );
}
