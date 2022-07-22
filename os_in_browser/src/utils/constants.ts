import { customMenu } from "../types/customMenu";

export const TIFF_IMAGE_FORMATS = ["cr2", "dng", "nef", "tif", "tiff"];

export const IMAGE_FILE_EXTENSIONS = [
  ...TIFF_IMAGE_FORMATS,
  "ani",
  "apng",
  "avif",
  "bmp",
  "cur",
  "gif",
  "ico",
  "jfif",
  "jif",
  "jpe",
  "jpeg",
  "jpg",
  "pjp",
  "pjpeg",
  "png",
  "svg",
  "webp",
  "xbm",
];

export const TEXT_FORMAT = ["txt", "utxt", "utf8", "text"];

export const DIRECTORY_LIST = [
  "/home/desktop",
  "/home/download",
  "/home/apps",
  "/home/pictures",
  "/home/documents",
  "/home/folder",
];

type MenuCollection = { [key: string]: customMenu[] };

export const iconCustomMenu = (...args: any): MenuCollection => ({
  fileMenu: [
    {
      iconPath: "fa fa-file",
      title: "delete File",
      onClick: args["delete File"],
    },
    {
      iconPath: "fa fa-cogs",
      title: "settings",
      onClick: args["settings"],
    },
  ],
});
