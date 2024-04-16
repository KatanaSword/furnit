import { Link, NavLink } from "react-router-dom";
import { Img, Text } from "../../components";

const Header = ({ className }) => {
  return (
    <>
      <header className={className}>
        <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
          <div className="header-row ">
            <Link to="/">
              <Img
                className="h-[30px] w-[90px]"
                src="images/img_car.svg"
                alt="furnit"
              />
            </Link>
            <div className="mobile-menu">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="flex sm:flex-1 flex-row gap-9 sm:hidden items-center justify-between w-[498px] sm:w-full">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-reddish_orange-S700 text-lg tracking-[-0.50px] w-auto"
                  : "text-black-900 text-lg tracking-[-0.50px] w-auto"
              }
            >
              <Text size="txtRubikRomanRegular18">Shop</Text>
            </NavLink>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                isActive
                  ? "text-reddish_orange-S700 text-lg tracking-[-0.50px] w-auto"
                  : "text-black-900 text-lg tracking-[-0.50px] w-auto"
              }
            >
              <Text size="txtRubikRomanRegular18">Wishlist</Text>
            </NavLink>
            <NavLink
              to="/aboutus"
              className={({ isActive }) =>
                isActive
                  ? "text-reddish_orange-S700 text-lg tracking-[-0.50px] w-auto"
                  : "text-black-900 text-lg tracking-[-0.50px] w-auto"
              }
            >
              <Text size="txtRubikRomanRegular18">About</Text>
            </NavLink>
            <NavLink
              to="/contactus"
              className={({ isActive }) =>
                isActive
                  ? " text-reddish_orange-S700 text-lg tracking-[-0.50px] w-auto"
                  : "text-black-900 text-lg tracking-[-0.50px] w-auto"
              }
            >
              <Text size="txtRubikRomanRegular18">Contact</Text>
            </NavLink>
            <NavLink
              to="/team"
              className={({ isActive }) =>
                isActive
                  ? "text-reddish_orange-S700 text-lg tracking-[-0.50px] w-auto"
                  : "text-black-900 text-lg tracking-[-0.50px] w-auto"
              }
            >
              <Text size="txtRubikRomanRegular18">Team</Text>
            </NavLink>
          </div>
          <div className="flex sm:hidden justify-center items-center gap-8">
            <Link to="/signup">
              <Img
                className="h-6 w-6 object-cover object-center"
                src="images/img_icon.svg"
                alt="icon"
              />
            </Link>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "bg-yellow-100 text-lg tracking-[-0.50px] w-auto p-2 rounded-full"
                  : "text-black-900 text-lg tracking-[-0.50px] w-auto p-2"
              }
            >
              <Img
                className="h-6 w-6 object-cover object-right"
                src="images/img_icon.svg"
                alt="icon"
              />
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
