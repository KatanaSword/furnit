import { Img, Text } from "../../components";

const TeamCard = ({ className, image, name, occupation }) => {
  return (
    <>
      <div className={className}>
        <div className="flex flex-col gap-[30px] items-center justify-start w-full">
          <div className="h-[450px] relative w-full">
            <Img
              className="md:h-[450px] h-full m-auto object-cover w-full"
              alt="rectangle1487"
              src={image}
            />
          </div>
          <div className="flex flex-col gap-2.5 items-center justify-start w-full">
            <Text
              className="md:text-3xl sm:text-[28px] text-[32px] text-black-900 text-center tracking-[-0.50px] w-full"
              size="txtRalewayRomanBold32Black900"
            >
              {name}
            </Text>
            <Text
              className="text-center text-gray-500 text-lg tracking-[-0.50px] w-full"
              size="txtRubikRegular18Gray500"
            >
              {occupation}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamCard;
