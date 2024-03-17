import { Link } from "react-router-dom";
import { Button, Img, Text } from "../../components";

const Footer = (props) => {
  return (
    <>
      <footer className={props.className}>
        <div className="flex flex-col md:gap-10 gap-[149px] items-center justify-center w-full">
          <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between w-full">
            <div className="flex flex-col gap-4 items-start justify-start w-auto">
              <Link to="/">
                <Text
                  className="md:text-3xl sm:text-[28px] text-[32px] text-gray-53 tracking-[-0.50px] w-auto"
                  size="txtRalewayRomanBold32Gray53"
                >
                  Furnit.
                </Text>
              </Link>
              <Text
                className="leading-[35.00px] max-w-[360px] md:max-w-full text-base text-gray-50_a3 tracking-[-0.50px]"
                size="txtRubikRegular16Gray50a3"
              >
                Elevate your space with Furnit stylish furniture range, Fast
                shipping and exceptional service guaranteed, Browse our
                collections and transform your home with ease, Shop now and
                experience the Furnit difference!
              </Text>
            </div>
            <div className="flex flex-col gap-5 items-start justify-start w-[209px]">
              <Text
                className="text-gray-53 text-xl tracking-[-0.50px] w-auto"
                size="txtRalewayRomanSemiBold20"
              >
                Customer
              </Text>
              <div className="flex flex-col gap-6 items-start justify-start w-auto">
                <Link to="/order">
                  <Text
                    className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                    size="txtRubikRegular14Gray50a3"
                  >
                    Order Status
                  </Text>
                </Link>
                <Link to="/">
                  <Text
                    className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                    size="txtRubikRegular14Gray50a3"
                  >
                    Collections
                  </Text>
                </Link>
                <Link to="/aboutus">
                  <Text
                    className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                    size="txtRubikRegular14Gray50a3"
                  >
                    Our Story
                  </Text>
                </Link>
                <Link to="/">
                  <Text
                    className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                    size="txtRubikRegular14Gray50a3"
                  >
                    Affiliates
                  </Text>
                </Link>
                <Link to="/">
                  <Text
                    className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                    size="txtRubikRegular14Gray50a3"
                  >
                    Security
                  </Text>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-5 items-start justify-start w-[209px]">
              <Text
                className="text-gray-53 text-xl tracking-[-0.50px] w-auto"
                size="txtRalewayRomanSemiBold20"
              >
                Information
              </Text>
              <div className="flex flex-col gap-6 items-start justify-start w-auto">
                <Link to="">
                  <Text
                    className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                    size="txtRubikRegular14Gray50a3"
                  >
                    Customer Service
                  </Text>
                </Link>
                <Link to="">
                  <Text
                    className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                    size="txtRubikRegular14Gray50a3"
                  >
                    Careers
                  </Text>
                </Link>
                <Link to="/contactus">
                  <Text
                    className="text-gray-50_a3 text-sm tracking-[-0.50px] w-auto"
                    size="txtRubikRegular14Gray50a3"
                  >
                    FAQ
                  </Text>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-5 items-start justify-start w-[220px]">
              <Text
                className="text-gray-53 text-xl tracking-[-0.50px] w-auto"
                size="txtRalewayRomanSemiBold20"
              >
                Follow Us
              </Text>
              <div className="flex flex-row gap-5 items-start justify-start w-auto">
                <Button className="bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10">
                  <Img
                    className="h-6"
                    src="images/img_camera.svg"
                    alt="camera_One"
                  />
                </Button>
                <Button className="bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10">
                  <Img
                    className="h-6"
                    src="images/img_facebook.svg"
                    alt="facebook_One"
                  />
                </Button>
                <Button className="bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10">
                  <Img
                    className="h-6"
                    src="images/img_twitter.svg"
                    alt="twitter_One"
                  />
                </Button>
                <Button className="bg-yellow-100 flex h-10 items-center justify-center p-2 rounded-[50%] w-10">
                  <Img
                    className="h-6"
                    src="images/img_music.svg"
                    alt="music_One"
                  />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col flex-row md:gap-10 items-start justify-between w-full">
            <Text
              className="text-base text-gray-50_a3 tracking-[-0.50px] w-auto"
              size="txtRubikRomanRegular16"
            >
              © Copyright 2022. All Rights Reserved.
            </Text>
            <div className="flex flex-row gap-[41px] items-start justify-start w-[272px]">
              <Link to="/">
                <Text
                  className="flex-1 text-base text-gray-50_a3 tracking-[-0.50px] w-auto"
                  size="txtRubikRomanRegular16"
                >
                  Terms of condition
                </Text>
              </Link>
              <Link to="/">
                <Text
                  className="text-base text-gray-50_a3 tracking-[-0.50px] w-auto"
                  size="txtRubikRomanRegular16"
                >
                  Privacy Policy
                </Text>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

Footer.defaultProps = {};

export default Footer;
