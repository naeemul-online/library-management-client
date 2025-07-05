import HeroSection from "@/components/HeroSection";
import BookListPage from "../components/BookListPage";
import { useRef } from "react";
import { motion } from "framer-motion";
const Home = () => {
  const booksSectionRef = useRef<HTMLDivElement>(null);
  const handleBrowseBooks = () => {
    booksSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden min-h-screen pt-24 pb-12 bg-background text-foreground"
    >
      <div>
        <HeroSection onBrowseBooks={handleBrowseBooks} />
        <div ref={booksSectionRef}>
          <BookListPage />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
