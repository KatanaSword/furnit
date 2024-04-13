const sizeClasses = {
  txtRubikRomanRegular20: "font-normal font-rubik",
  txtRalewaySemiBold20: "font-raleway font-semibold",
  txtRalewayBold40: "font-bold font-raleway",
  txtRubikSemiBold18Bluegray900: "font-rubik font-semibold",
  txtRubikSemiBold18: "font-rubik font-semibold",
  txtRubikRegular14WhiteA700: "font-normal font-rubik",
  txtRalewayBold24: "font-bold font-raleway",
  txtRalewaySemiBold40: "font-raleway font-semibold",
  txtRubikRegular24: "font-normal font-rubik",
  txtRubikRegular14Black900: "font-normal font-rubik",
  txtRubikRegular20: "font-normal font-rubik",
  txtRalewayRomanBold40: "font-bold font-raleway",
  txtRubikRegular14Gray50a3: "font-normal font-rubik",
  txtRalewayRomanBold20: "font-bold font-raleway",
  txtRubikSemiBold18Yellow100: "font-rubik font-semibold",
  txtRalewayRomanRegular20Black900: "font-normal font-raleway",
  txtPoppinsSemiBold20DeeporangeA400: "font-poppins font-semibold",
  txtPollerOneRegular40: "font-normal font-pollerone",
  txtPlusJakartaSansRomanSemiBold14: "font-plusjakartasans font-semibold",
  txtRubikRegular18Gray53: "font-normal font-rubik",
  txtRubikSemiBold18DeeporangeA400: "font-rubik font-semibold",
  txtRalewayRomanRegular20: "font-normal font-raleway",
  txtPoppinsBold20: "font-bold font-poppins",
  txtRalewayRomanSemiBold20: "font-raleway font-semibold",
  txtRalewayRomanBold20WhiteA700: "font-bold font-raleway",
  txtRalewayRomanSemiBold20Gray53: "font-raleway font-semibold",
  txtRubikRegular16: "font-normal font-rubik",
  txtRubikRegular16Gray50a3: "font-normal font-rubik",
  txtPoppinsRegular16: "font-normal font-poppins",
  txtRalewayRomanBold40Gray53: "font-bold font-raleway",
  txtRubikRegular18: "font-normal font-rubik",
  txtRalewayBold36: "font-bold font-raleway",
  txtRubikRegular14: "font-normal font-rubik",
  txtPoppinsSemiBold20: "font-poppins font-semibold",
  txtRubikRegular18Gray500: "font-normal font-rubik",
  txtPoppinsRegular16Gray500: "font-normal font-poppins",
  txtRalewayRomanBold32: "font-bold font-raleway",
  txtRubikRomanRegular18: "font-normal font-rubik",
  txtRalewayRomanBold32Gray53: "font-bold font-raleway",
  txtRubikRomanRegular16: "font-normal font-rubik",
  txtRubikRegular18Bluegray900: "font-normal font-rubik",
  txtRalewayRomanBold36: "font-bold font-raleway",
  txtRalewayRomanRegular24Bluegray900: "font-normal font-raleway",
  txtRubikBold36: "font-bold font-rubik",
  txtPoppinsRegular14: "font-normal font-poppins",
  txtRalewayRomanRegular24: "font-normal font-raleway",
  txtRalewayRomanSemiBold24: "font-raleway font-semibold",
  txtPoppinsSemiBold18: "font-poppins font-semibold",
  txtJosefinSansRomanBold24Gray500: "font-bold font-josefinsans",
  txtJosefinSansRomanSemiBold20: "font-josefinsans font-semibold",
  txtRalewayRomanBold48: "font-bold font-raleway",
  txtRubikSemiBold14: "font-rubik font-semibold",
  txtRubikRegular12: "font-normal font-rubik",
  txtPoppinsRegular14Black9007f1: "font-normal font-poppins",
  txtRubikRegular16Gray53: "font-normal font-rubik",
  txtRalewayRomanBold32Black900: "font-bold font-raleway",
  txtRalewayRomanSemiBold18: "font-raleway font-semibold",
  txtRubikRegular12Black9007f: "font-normal font-rubik",
  txtJosefinSansRomanBold24: "font-bold font-josefinsans",
  txtRubikRegular18WhiteA700: "font-normal font-rubik",
  txtRalewayBold36Black900: "font-bold font-raleway",
  txtRalewayRomanBold18: "font-bold font-raleway",
  txtRalewayRomanBold16: "font-bold font-raleway",
  txtPoppinsSemiBold40: "font-poppins font-semibold",
  txtRalewayRomanSemiBold20Gray900: "font-raleway font-semibold",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
