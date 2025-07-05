import { Button } from "./ui/button";

const HeroSection = ({ onBrowseBooks }: { onBrowseBooks: () => void }) => {
  return (
     <section className="relative pt-28 pb-20 overflow-hidden bg-background text-foreground">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-grid-gray-100 opacity-40 pointer-events-none" />
      <div className="absolute top-20 right-10 text-6xl opacity-10 select-none">📖</div>
      <div className="absolute bottom-20 left-10 text-4xl opacity-10 select-none">📚</div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Discover, Borrow, and{" "}
            <span className="text-primary">Manage Your Library</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A fast, intuitive, and minimal way to track and manage your personal or institutional books.
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
              onClick={onBrowseBooks}
            >
              Browse Books
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
          </div>

          {/* Large Illustration Emoji */}
          <div className="mt-16 text-8xl opacity-30 select-none">📚</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
