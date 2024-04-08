import fs from "fs";

export const getStaticFilePath = (req, fileName) => {
  return `${req.protocol}://${req.get("host")}/images/${fileName}`;
};

export const getLocalPath = (fileName) => {
  return `public/temp${fileName}`;
};

export const removeLocalFile = (localPath) => {
  fs.unlink(localPath, (err) => {
    if (err) console.log("Something went wrong while removing image:", err);
    console.log("Image remove successfully", localPath);
  });
};
