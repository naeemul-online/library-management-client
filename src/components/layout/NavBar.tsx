import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router";

export default function NavBar() {
  return (
    <nav className="flex justify-center items-center h-16">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem className="flex ">
            <NavigationMenuLink className="">
              <NavLink
                to="/books"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-black"
                }
              >
                All Books
              </NavLink>
            </NavigationMenuLink>
            <NavigationMenuLink>
              <NavLink
                to="/create-book"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-black"
                }
              >
                Add Book
              </NavLink>
            </NavigationMenuLink>
            <NavigationMenuLink>
              <NavLink
                to="/borrow-summery"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-black"
                }
              >
                Borrow Summery
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
