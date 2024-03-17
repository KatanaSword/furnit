import { Button, Img, Input, Line, Text } from "../../components";
import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <>
      <div className="bg-gray-50 flex flex-col font-gilroy items-center justify-start mx-auto w-full">
        <div className="flex md:flex-col flex-row gap-[30px] items-start justify-between mx-auto md:px-5 w-full">
          <div className="bg-gray-50_01 flex flex-col justify-start p-6 sm:px-5 w-full">
            <Link to="/">
              <Img
                className="h-[30px] w-[90px]"
                src="images/img_car.svg"
                alt="furnit"
              />
            </Link>
            <div className="flex flex-col gap-[41px] justify-start mt-12 w-3/5 md:w-full">
              <div className="flex flex-col gap-[42px] items-start justify-start ml-2 md:ml-[0] w-[95%] md:w-full">
                <div className="flex flex-row gap-2 items-start justify-start w-[81%] md:w-full">
                  <Img
                    className="h-6 w-6"
                    src="images/img_save.svg"
                    alt="save"
                  />
                  <Text
                    className="mt-[3px] text-base text-blue_gray-700"
                    size="txtGilroySemiBold16"
                  >
                    Dashboard
                  </Text>
                </div>
                <div className="flex flex-row gap-2 items-end justify-start w-[74%] md:w-full">
                  <Img
                    className="h-6 w-6"
                    src="images/img_dollaraltsoli.svg"
                    alt="dollaraltSoli"
                  />
                  <Text
                    className="mt-[5px] text-base text-blue_gray-700"
                    size="txtGilroySemiBold16"
                  >
                    Payments
                  </Text>
                </div>
                <div className="flex flex-row gap-2 items-start justify-start w-full">
                  <Img
                    className="h-6 w-6"
                    src="images/img_walletoutline.svg"
                    alt="walletOutline"
                  />
                  <Text
                    className="mt-[3px] text-base text-blue_gray-700"
                    size="txtGilroySemiBold16"
                  >
                    Wallet & Cards
                  </Text>
                </div>
                <div className="flex flex-row gap-2 items-start justify-start w-[89%] md:w-full">
                  <Img className="h-6 w-6" src="images/img_car.svg" alt="car" />
                  <Text
                    className="mt-[3px] text-base text-blue_gray-700"
                    size="txtGilroySemiBold16"
                  >
                    Transactions
                  </Text>
                </div>
                <div className="flex flex-row gap-2 items-start justify-start w-[70%] md:w-full">
                  <Img
                    className="h-6 w-6"
                    src="images/img_checkmark.svg"
                    alt="checkmark"
                  />
                  <Text
                    className="mt-1 text-base text-blue_gray-700"
                    size="txtGilroySemiBold16"
                  >
                    Analytics
                  </Text>
                </div>
                <div className="flex flex-row gap-2 items-end justify-start w-[74%] md:w-full">
                  <Img
                    className="h-6 w-6"
                    src="images/img_menu.svg"
                    alt="menu"
                  />
                  <Text
                    className="mt-[5px] text-base text-blue_gray-700"
                    size="txtGilroySemiBold16"
                  >
                    Messages
                  </Text>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start w-[67%] md:w-full">
                <Line className="bg-blue-A700 h-6 w-0.5" />
                <Img
                  className="h-6 ml-1.5 w-6"
                  src="images/img_settings.svg"
                  alt="settings"
                />
                <Text
                  className="ml-2 mt-[5px] text-base text-blue-A700"
                  size="txtGilroySemiBold16BlueA700"
                >
                  Settings
                </Text>
              </div>
            </div>
            <div className="flex flex-row font-opensans gap-2 items-end justify-start mb-6 ml-2 md:ml-[0] mt-[478px] w-[27%] md:w-full">
              <Img
                className="h-6 w-6"
                src="images/img_question.svg"
                alt="question"
              />
              <Text
                className="mt-[5px] text-base text-blue_gray-700"
                size="txtOpenSansRomanSemiBold16"
              >
                Help
              </Text>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-8 items-center justify-start md:mt-0 mt-8 w-full">
            <div className="flex md:flex-col flex-row md:gap-5 items-end justify-start w-full">
              <Text
                className="mb-0.5 md:mt-0 mt-3.5 md:text-3xl sm:text-[28px] text-[32px] text-blue_gray-900"
                size="txtGilroySemiBold32"
              >
                Settings
              </Text>
              <div className="bg-white-A700 border border-blue_gray-100 border-solid flex flex-col font-opensans h-14 items-end justify-start md:ml-[0] ml-[819px] p-2 rounded-[50%] w-14">
                <div className="md:h-9 h-[35px] mb-1 relative w-9">
                  <Img
                    className="absolute bottom-[0] h-8 left-[0] w-8"
                    src="images/img_notification.svg"
                    alt="notification"
                  />
                  <Text
                    className="absolute bg-red-700 border border-blue_gray-50 border-solid h-[18px] justify-center pb-[5px] pt-0.5 px-[5px] right-[0] rounded-[50%] text-white-A700 text-xs top-[0] w-[18px]"
                    size="txtOpenSansRomanSemiBold12"
                  >
                    2
                  </Text>
                </div>
              </div>
              <div className="border border-blue-A700_01 border-solid flex flex-col h-14 items-center justify-start ml-6 md:ml-[0] p-1 rounded-[50%] w-14">
                <Img
                  className="h-12 md:h-auto rounded-[50%] w-12"
                  src="images/img_profileimglarg.png"
                  alt="ProfileImgLarg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[59px] items-center justify-start w-full">
              <div className="sm:h-[297px] md:h-[37px] h-[41px] pt-1 relative w-full">
                <Line className="absolute bg-gray-300 bottom-[0] h-px inset-x-[0] mx-auto w-full" />
                <div className="absolute bottom-[0] flex sm:flex-col flex-row gap-[34px] items-start justify-between left-[3%] w-[69%]">
                  <div className="flex flex-col gap-3.5 items-center justify-start">
                    <Text
                      className="text-base text-blue-A700"
                      size="txtGilroyMedium16BlueA700"
                    >
                      My Profile
                    </Text>
                    <Line className="bg-blue-A700 h-0.5 w-full" />
                  </div>
                  <Text
                    className="text-base text-blue_gray-400"
                    size="txtGilroyMedium16Bluegray400"
                  >
                    Notifications
                  </Text>
                  <Text
                    className="text-base text-blue_gray-400"
                    size="txtGilroyMedium16Bluegray400"
                  >
                    Language
                  </Text>
                  <Text
                    className="sm:mt-0 mt-0.5 text-base text-blue_gray-400"
                    size="txtGilroyMedium16Bluegray400"
                  >
                    General settings
                  </Text>
                  <Text
                    className="text-base text-blue_gray-400"
                    size="txtGilroyMedium16Bluegray400"
                  >
                    Theme
                  </Text>
                  <Text
                    className="text-base text-blue_gray-400"
                    size="txtGilroyMedium16Bluegray400"
                  >
                    Help and feedback
                  </Text>
                </div>
              </div>
              <div className="flex flex-col gap-6 items-center justify-start w-[49%] md:w-full">
                <div className="h-[93px] relative w-[93px]">
                  <Img
                    className="h-[93px] m-auto rounded-[50%] w-[93px]"
                    src="images/img_profileimglarg.png"
                    alt="ProfileImgLarg One"
                  />
                  <Button
                    className="absolute bottom-[0] flex h-[23px] items-center justify-center outline outline-[3.33px] outline-gray-50_02 right-[0] rounded-[50%] w-[23px]"
                    size="xs"
                  >
                    <Img
                      className="h-[15px]"
                      src="images/img_edit.svg"
                      alt="edit"
                    />
                  </Button>
                </div>
                <div className="flex flex-col items-center justify-end pt-[5px] w-full">
                  <div className="flex flex-col items-center justify-start w-full">
                    <div className="flex sm:flex-col flex-row gap-4 items-center justify-between w-full">
                      <div className="flex sm:flex-1 flex-col gap-[7px] items-start justify-start rounded-lg w-[49%] sm:w-full">
                        <Text
                          className="text-blue_gray-900 text-lg"
                          size="txtGilroyMedium18Bluegray900"
                        >
                          First Name
                        </Text>
                        <Input
                          name="Group10198"
                          placeholder="jane"
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
                          Last Name
                        </Text>
                        <Input
                          name="Group10198 One"
                          placeholder="Jnson"
                          className="font-medium p-0 placeholder:text-blue_gray-700 text-base text-left w-full"
                          wrapClassName="border border-blue_gray-100 border-solid w-full"
                        ></Input>
                      </div>
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
                        placeholder="jane@gmail.com"
                        className="font-medium p-0 placeholder:text-blue_gray-700 text-base text-left w-full"
                        wrapClassName="border border-blue_gray-100 border-solid w-full"
                        type="email"
                        size="sm"
                      ></Input>
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
                        placeholder="+91 1234567890"
                        className="font-medium p-0 placeholder:text-blue_gray-700 text-base text-left w-full"
                        wrapClassName="border border-blue_gray-100 border-solid w-full"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
