import { Button, Img, Text } from "../../components";

const CartColumnFrame = ({ className, offer, description, subscribe }) => {
  return (
    <>
      <div className={className}>
        <div className="flex md:flex-col flex-row gap-11 items-center justify-start w-full">
          <div className="flex flex-1 flex-col gap-10 items-start justify-start w-full">
            <div className="flex flex-col gap-2.5 items-start justify-start w-full">
              <Text
                className="leading-[60.00px] max-w-[593px] md:max-w-full sm:text-4xl md:text-[38px] text-[40px] text-gray-53 tracking-[-0.50px]"
                size="txtRalewayRomanBold40Gray53"
              >
                {offer}
              </Text>
              <Text
                className="leading-[35.00px] max-w-[593px] md:max-w-full text-base text-gray-53 tracking-[-0.50px]"
                size="txtRubikRegular16Gray53"
              >
                {description}
              </Text>
            </div>
            <div className="flex sm:flex-col flex-row gap-px items-start justify-start w-full">
              <Button className="bg-bluegray-900 cursor-pointer font-bold font-rubik leading-[normal] py-[23px] text-center text-lg text-yellow-100 tracking-[-0.50px] w-[157px] hover:bg-yellow-100 hover:text-bluegray-900">
                {subscribe}
              </Button>
            </div>
          </div>
          <Img
            className="flex-1 md:flex-none md:h-[309px] sm:h-auto h-full max-h-[309px] object-cover sm:w-[] md:w-[]"
            src="images/img_pexelsphotoby.png"
            alt="pexelsphotoby"
          />
        </div>
      </div>
    </>
  );
};

export default CartColumnFrame;
