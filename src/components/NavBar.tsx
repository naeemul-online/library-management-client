import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, NavLink, useNavigate } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

export default function NavBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📚</span>
              <span className="text-xl font-bold">MyLibrary</span>
            </div>
          </Link>

          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem className="hidden md:flex items-center space-x-8">
                <NavigationMenuLink className="">
                  <NavLink
                    to="/books"
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : ""
                    }
                  >
                    All Books
                  </NavLink>
                </NavigationMenuLink>

                <NavigationMenuLink>
                  <NavLink
                    to="/create-book"
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : ""
                    }
                  >
                    Add Book
                  </NavLink>
                </NavigationMenuLink>

                <NavigationMenuLink>
                  <NavLink
                    to="/borrow-summery"
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : ""
                    }
                  >
                    Borrow Summery
                  </NavLink>
                </NavigationMenuLink>

                <ModeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <button
                    onClick={() => handleNavigate("/")}
                    className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-4 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                  >
                    Books
                  </button>
                  <button
                    onClick={() => handleNavigate("/create-book")}
                    className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-4 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                  >
                    Add Book
                  </button>
                  <button
                    onClick={() => handleNavigate("/borrow-summery")}
                    className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-4 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                  >
                    Borrow Summary
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
