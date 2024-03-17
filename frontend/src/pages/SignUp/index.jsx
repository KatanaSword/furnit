import { Button, Img, Input, Text } from "../../components";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="bg-gray-50_03 flex flex-col font-gilroy sm:gap-10 md:gap-10 gap-[79px] items-center justify-start mx-auto p-[35px] sm:px-5 w-full">
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
        <div className="flex flex-col gap-[34px] items-center justify-start mb-[364px] md:px-5 w-[39%] md:w-full">
          <Text
            className="md:text-3xl sm:text-[28px] text-[32px] text-blue_gray-900"
            size="txtGilroySemiBold32"
          >
            Create Account
          </Text>
          <div className="flex flex-col items-center justify-end pt-[5px] w-full">
            <div className="flex flex-col items-center justify-start w-full">
              <div className="flex sm:flex-col flex-row gap-4 items-center justify-between w-full">
                <div className="flex sm:flex-1 flex-col gap-[7px] items-start justify-start rounded-lg w-[49%] sm:w-full">
                  <Text
                    className="text-blue_gray-900 text-lg"
                    size="txtGilroyMedium18Bluegray900"
                  >
                    Fullname
                  </Text>
                  <Input
                    name="Group10198"
                    placeholder="e.g saurabh tajane"
                    className="font-medium p-0 placeholder:text-blue_gray-700 text-base text-left w-full"
                    wrapClassName="border border-blue_gray-100 border-solid w-full"
                    size="sm"
                  ></Input>
                </div>
                <div className="flex sm:flex-1 flex-col gap-[7px] items-start justify-start rounded-lg w-[49%] sm:w-full">
                  <Text
                    className="text-blue_gray-900 text-lg"
                    size="txtGilroyMedium18Bluegray900"
                  >
                    Username
                  </Text>
                  <Input
                    name="Group10198 One"
                    placeholder="e.g madmax"
                    className="font-medium p-0 placeholder:text-blue_gray-700 text-base text-left w-full"
                    wrapClassName="border border-blue_gray-100 border-solid w-full"
                  ></Input>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start justify-start mt-[19px] rounded-lg w-full">
                <Text
                  className="text-blue_gray-900 text-lg"
                  size="txtGilroyMedium18Bluegray900"
                >
                  Mobile Number
                </Text>
                <Input
                  name="mobileNo"
                  placeholder="1234567890"
                  className="font-medium p-0 placeholder:text-blue_gray-700 text-base text-left w-full"
                  wrapClassName="border border-blue_gray-100 border-solid w-full"
                ></Input>
              </div>
              <div className="flex flex-col gap-1.5 items-start justify-start mt-[21px] rounded-lg w-full">
                <Text
                  className="text-blue_gray-900 text-lg"
                  size="txtGilroyMedium18Bluegray900"
                >
                  Email
                </Text>
                <Input
                  name="email"
                  placeholder="e.g saurabh@gmail.com"
                  className="font-medium p-0 placeholder:text-blue_gray-700 text-base text-left w-full"
                  wrapClassName="border border-blue_gray-100 border-solid w-full"
                  type="email"
                  size="sm"
                ></Input>
              </div>
              <div className="flex flex-col gap-1.5 items-start justify-start mt-[21px] rounded-lg w-full">
                <Text
                  className="text-blue_gray-900 text-lg"
                  size="txtGilroyMedium18Bluegray900"
                >
                  Set Password
                </Text>
                <Input
                  name="Group10198 Two"
                  placeholder="set password"
                  className="!placeholder:text-blue_gray-200 !text-blue_gray-200 font-medium p-0 text-left text-lg w-full"
                  wrapClassName="border border-blue_gray-100 border-solid w-full"
                  type="password"
                  size="sm"
                ></Input>
              </div>
              <Button
                className="cursor-pointer font-medium min-w-[528px] sm:min-w-full mt-6 text-base text-center"
                shape="round"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
