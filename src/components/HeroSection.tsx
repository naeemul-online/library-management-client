import { Button } from "./ui/button";

const HeroSection = ({ onBrowseBooks }: { onBrowseBooks: () => void }) => {
  return (
    <section className="relative pt-24 pb-16  overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-gray-100 opacity-50"></div>
      <div className="absolute top-20 right-10 text-6xl opacity-20">📖</div>
      <div className="absolute bottom-20 left-10 text-4xl opacity-20">📚</div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold  mb-6 leading-tight">
            Discover, Borrow, and{" "}
            <span className="">
              Manage Your Library
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl  mb-8 leading-relaxed">
            A simple and fast way to manage your books.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700  px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" 
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

          {/* Illustration */}
          <div className="mt-12 text-8xl opacity-60">📚</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
