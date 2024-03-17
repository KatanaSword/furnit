import { Button, Img, Input, Text } from "../../components";

const CartColumnFrame = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex md:flex-col flex-row gap-11 items-center justify-start w-full">
          <div className="flex flex-1 flex-col gap-10 items-start justify-start w-full">
            <div className="flex flex-col gap-2.5 items-start justify-start w-full">
              <Text
                className="leading-[60.00px] max-w-[593px] md:max-w-full sm:text-4xl md:text-[38px] text-[40px] text-gray-53 tracking-[-0.50px]"
                size="txtRalewayRomanBold40Gray53"
              >
                {props?.offer}
              </Text>
              <Text
                className="leading-[35.00px] max-w-[593px] md:max-w-full text-base text-gray-53 tracking-[-0.50px]"
                size="txtRubikRegular16"
              >
                {props?.description}
              </Text>
            </div>
            <div className="flex sm:flex-col flex-row gap-px items-start justify-start w-full">
              <Button className="bg-bluegray-900 cursor-pointer font-bold font-rubik leading-[normal] py-[23px] text-center text-lg text-yellow-100 tracking-[-0.50px] w-[157px]">
                {props?.subscribe}
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

CartColumnFrame.defaultProps = {
  offer: "Subscribe now and get 10% off all items",
  description: (
    <>
      Subscribing now for just 1500 rupees! Enjoy an exclusive 10% discount on
      all items, ensuring you save while elevating your space with our
      high-quality furniture. Subscribe today and indulge in stylish living for
      less!
    </>
  ),
  subscribe: "Subscribe",
};

export default CartColumnFrame;
