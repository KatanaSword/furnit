import React from "react";

import { Img, Input, Line, SelectBox, Text } from "../../components";
import CartColumnFrame from "../../components/CartColumnFrame";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { CloseSVG } from "../../assets/images";

const frame34816OptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const Order = () => {
  const [inputfieldvalue, setInputfieldvalue] = React.useState("");

  return (
    <>
      <div className="bg-gray-50_03 flex flex-col font-gilroy sm:gap-10 md:gap-10 gap-[70px] items-center justify-start mx-auto pb-[329px] w-full">
        <Header className="flex items-center justify-center md:px-5 w-full" />
        <div className="flex flex-col gap-10 items-center justify-start max-w-[1268px] mx-auto pt-[9px] md:px-5 w-full">
          <div className="flex flex-row md:gap-10 items-start justify-between w-full">
            <Text
              className="md:text-3xl sm:text-[28px] text-[32px] text-blue_gray-900"
              size="txtGilroySemiBold32"
            >
              Order details
            </Text>
            <SelectBox
              className="sm:flex-1 font-medium mt-1 text-blue-A700 text-left text-lg w-[8%] sm:w-full"
              placeholderClassName="text-blue-A700"
              indicator={
                <Img
                  className="h-6 mr-[0] w-6"
                  src="images/img_arrowdown_black_900.svg"
                  alt="arrow_down"
                />
              }
              isMulti={false}
              name="Frame34816"
              options={frame34816OptionsList}
              isSearchable={false}
              placeholder="Invoice"
              size="xs"
            />
          </div>
          <div className="flex md:flex-col flex-row gap-[30px] items-start justify-between w-full">
            <div className="flex md:flex-1 flex-col gap-[30px] items-center justify-start w-[67%] md:w-full">
              <div className="bg-white-A700 flex flex-col items-center justify-start p-[30px] sm:px-5 rounded-md shadow-bs1 w-full">
                <div className="flex md:flex-col flex-row gap-[57px] items-start justify-start pr-[5px] pt-[5px] w-full">
                  <Text
                    className="text-black-900 text-lg"
                    size="txtGilroyMedium18"
                  >
                    <span className="text-colors font-gilroy text-left font-semibold">
                      Order Id:
                    </span>
                    <span className="text-colors font-gilroy text-left font-medium">
                      {" "}
                    </span>
                    <span className="text-colors1 font-gilroy text-left font-medium">
                      #21204034879
                    </span>
                  </Text>
                  <div className="flex flex-col gap-4 items-start justify-start">
                    <Text
                      className="text-black-900 text-lg"
                      size="txtGilroySemiBold18"
                    >
                      Shipping Address
                    </Text>
                    <Text
                      className="leading-[29.00px] text-blue_gray-900 text-lg w-full"
                      size="txtGilroyRegular18"
                    >
                      4517 Washington Ave. Manchester, Kentucky 39495
                    </Text>
                  </div>
                  <div className="flex flex-col gap-[22px] items-start justify-start">
                    <Text
                      className="text-black-900 text-lg"
                      size="txtGilroySemiBold18"
                    >
                      Payment Method
                    </Text>
                    <Text
                      className="text-blue_gray-900 text-lg"
                      size="txtGilroyRegular18"
                    >
                      BHIM UPI
                    </Text>
                  </div>
                </div>
              </div>
              <div className="bg-white-A700 flex flex-col gap-[30px] items-start justify-start p-[30px] sm:px-5 rounded-md shadow-bs1 w-full">
                <Text
                  className="text-2xl md:text-[22px] text-green-600 sm:text-xl"
                  size="txtGilroyMedium24"
                >
                  Delivered 02, May 2022
                </Text>
                <div className="flex md:flex-col flex-row font-opensans gap-4 items-center justify-start w-full">
                  <Img
                    className="h-[180px] md:h-auto object-cover rounded w-[180px]"
                    src="images/img_pngwing1.png"
                    alt="pngwingOne"
                  />
                  <div className="flex md:flex-1 flex-col items-start justify-start w-[76%] md:w-full">
                    <Text
                      className="leading-[30.00px] text-2xl md:text-[22px] text-blue_gray-900 sm:text-xl w-full"
                      size="txtOpenSansMedium24"
                    >
                      Samsung Galaxy M12 | 6000 mAh with 8nm Processor
                    </Text>
                    <Text
                      className="mt-5 text-blue_gray-400 text-xl"
                      size="txtOpenSansMedium20"
                    >
                      (Blue,6GB RAM, 128GB Storage)
                    </Text>
                    <div className="flex flex-row items-center justify-start mt-[18px] w-[16%] md:w-full">
                      <Text
                        className="text-blue_gray-900 text-lg"
                        size="txtOpenSansMedium18"
                      >
                        Color:
                      </Text>
                      <Text
                        className="ml-1 text-blue_gray-400 text-lg"
                        size="txtOpenSansMedium18Bluegray400"
                      >
                        Blue
                      </Text>
                    </div>
                    <Text
                      className="mt-[17px] text-2xl md:text-[22px] text-blue_gray-900 sm:text-xl"
                      size="txtOpenSansMedium24"
                    >
                      <span className="text-colors1 font-opensans text-left font-semibold">
                        $
                      </span>
                      <span className="text-colors2 font-opensans text-left font-semibold">
                        555.29
                      </span>
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-rubik items-start justify-start md:px-10 sm:px-5 px-[75px] w-full">
          <CartColumnFrame className="bg-gradient  flex flex-col gap-2 items-start justify-start max-w-[1290px] mx-auto pl-[59px] md:px-5 py-[46px] w-full" />
        </div>
        <Footer className="bg-black-900 flex font-raleway gap-2 items-center justify-center md:px-5 px-[75px] py-[50px] w-full" />
      </div>
    </>
  );
};

export default Order;
