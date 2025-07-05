import HeroSection from "@/components/HeroSection";
import BookListPage from "../components/BookListPage";
import { useRef } from "react";

const Home = () => {
  const booksSectionRef = useRef<HTMLDivElement>(null);
  const handleBrowseBooks = () => {
    booksSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div>
      <HeroSection onBrowseBooks={handleBrowseBooks} />
      <div ref={booksSectionRef}>
        <BookListPage />
      </div>
    </div>
  );
};

export default Home;
