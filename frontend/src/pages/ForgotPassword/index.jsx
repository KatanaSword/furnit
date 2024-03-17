import { Button, Img, Input, Text } from "../../components";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <div className="bg-gray-50_03 flex flex-col font-gilroy items-center justify-start mx-auto p-[150px] md:px-10 sm:px-5 w-full">
        <div className="flex flex-col items-center justify-start mb-[375px] w-[47%] md:w-full">
          <header className="flex items-center justify-center md:px-5 w-full">
            <div className="flex md:flex-col flex-row md:gap-5 items-center justify-center w-full">
              <div className="header-row my-[7px]">
                <Link to="/">
                  <Img
                    className="h-[30px] w-[90px]"
                    src="images/img_car.svg"
                    alt="furnit"
                  />
                </Link>
              </div>
            </div>
          </header>
          <div className="flex flex-col gap-4 items-center justify-start mt-[62px]">
            <Text
              className="md:text-3xl sm:text-[28px] text-[32px] text-blue_gray-900"
              size="txtGilroySemiBold32"
            >
              Forgot your password
            </Text>
            <Text
              className="text-blue_gray-500 text-lg"
              size="txtGilroyRegular18Bluegray500"
            >
              No worries, we’ll send you reset instructions.
            </Text>
          </div>
          <div className="flex flex-col gap-6 items-center justify-start mt-[29px] w-full">
            <div className="flex flex-col gap-1.5 items-start justify-start rounded-lg w-full">
              <Text
                className="text-blue_gray-900 text-lg"
                size="txtGilroyMedium18Bluegray900"
              >
                Email
              </Text>
              <Input
                name="Group10198"
                placeholder="Enter Your Email"
                className="!placeholder:text-blue_gray-200 !text-blue_gray-200 font-medium p-0 text-base text-left w-full"
                wrapClassName="border border-blue_gray-100 border-solid w-full"
                type="email"
              ></Input>
            </div>
            <Button
              className="cursor-pointer font-medium min-w-[528px] sm:min-w-full text-base text-center"
              shape="round"
            >
              Reset Password
            </Button>
            <div className="flex flex-row font-poppins gap-2 items-start justify-center w-[31%] md:w-full">
              <Img
                className="h-6 w-6"
                src="images/img_arrowleft_blue_A700.svg"
                alt="arrowleft"
              />
              <Text
                className="mt-1 text-blue-A700 text-lg"
                size="txtPoppinsRegular18"
              >
                Back to Sign in
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
