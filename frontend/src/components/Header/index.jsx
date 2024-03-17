import { Link } from "react-router-dom";
import { Img, Text, Input } from "../../components";

const Header = (props) => {
  return (
    <>
      <header className={props.className}>
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
            <Link to="/shop">
              <Text
                className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular18"
              >
                Shop
              </Text>
            </Link>
            <Link to="/wishlist">
              <Text
                className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular18"
              >
                Wishlist
              </Text>
            </Link>
            <Link to="/aboutus">
              <Text
                className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular18"
              >
                About
              </Text>
            </Link>
            <Link to="/contactus">
              <Text
                className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular18"
              >
                Contact
              </Text>
            </Link>
            <Link to="/team">
              <Text
                className="text-black-900 text-lg tracking-[-0.50px] w-auto"
                size="txtRubikRomanRegular18"
              >
                Team
              </Text>
            </Link>
          </div>
          <div className="flex sm:hidden justify-center items-center gap-8">
            <Link to="/signup">
              <Img
                className="h-6 w-6 object-cover object-center"
                src="images/img_icon.svg"
                alt="icon"
              />
            </Link>
            <Link to="/cart">
              <Img
                className="h-6 w-6 object-cover object-right"
                src="images/img_icon.svg"
                alt="icon"
              />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

Header.defaultProps = {};

export default Header;
