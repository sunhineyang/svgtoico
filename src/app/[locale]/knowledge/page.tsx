import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
// import { KnowledgePage } from '@/components/knowledge/knowledge-page';
// import { generateMetadata } from './metadata';

// export { generateMetadata };

export default function Knowledge() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Knowledge Page</h1>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
