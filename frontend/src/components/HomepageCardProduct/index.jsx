import { Button, Img, Text } from "../../components";

const HomepageCardProduct = ({
  className,
  image,
  category,
  status,
  name,
  price,
}) => {
  return (
    <>
      <div className={className}>
        <div className="h-[400px] relative w-full">
          <Img
            className="absolute h-[400px] inset-[0] justify-center m-auto object-cover w-full"
            alt="image"
            src={image}
          />
          <Button className="absolute bg-bluegray-900 bottom-[4%] cursor-pointer font-rubik leading-[normal] left-[5%] py-[9px] text-center text-sm text-white-A700 tracking-[-0.50px] w-[106px]">
            {category}
          </Button>
          <div className="absolute flex flex-col md:gap-10 gap-[106px] items-center justify-start right-[5%] top-[4%] w-auto">
            {!status ? (
              <Text
                className="bg-red-A200 justify-center px-[7px] text-sm text-white-A700 tracking-[-0.50px] w-auto"
                size="txtRubikRegular14WhiteA700"
              >
                {status}
              </Text>
            ) : null}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <Text
            className="text-black-900 text-xl tracking-[-0.50px] w-auto"
            size="txtRalewaySemiBold20"
          >
            {name}
          </Text>
          <Text
            className="text-bluegray-900 text-lg tracking-[-0.50px] w-auto"
            size="txtRubikRegular18Bluegray900"
          >
            {price}
          </Text>
        </div>
      </div>
    </>
  );
};

export default HomepageCardProduct;
