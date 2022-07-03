import airdrop from "./images/menu/airdrop.png";
import recents from "./images/menu/recents.png";
import apps from "./images/menu/apps.png";
import folder from "./images/menu/folder.png";
import desktop from "./images/menu/desktop.png";
import download from "./images/menu/download.png";
import pictures from "./images/menu/pictures.png";
import icloud from "./images/menu/icloud.png";
import documents from "./images/menu/documents.png";
import laptop from "./images/menu/laptop.png";
import { useFileDirectory } from "../../context/FileDirectoryContext";
import { For } from "solid-js";

interface Favorite {
  src: string;
  title: string;
  directory: string;
}

const favoriteArray: Favorite[] = [
  { src: airdrop, title: "AirDrop", directory: "/home" },
  { src: recents, title: "Recents", directory: "/recents" },
  { src: apps, title: "Apps", directory: "/home/apps" },
  { src: folder, title: "Google Drive", directory: "/home/folder" },
  { src: desktop, title: "Desktop", directory: "/home/desktop" },
  { src: documents, title: "Documents", directory: "/home/documents" },
  { src: download, title: "Download", directory: "/home/downlaods" },
  { src: pictures, title: "Pictures", directory: "/home/pictures" },
];

interface SideBarProps {
  currentDirectory: string;
  ChangeDirectory: (directory: string) => void;
}

const SideBar = ({ currentDirectory, ChangeDirectory }: SideBarProps) => {
  console.log(currentDirectory);
  const onclick = (directory: string) => {
    ChangeDirectory(directory);
  };

  const Favorites = () => (
    <>
      <div class="item-category">Favourites</div>
      <For each={favoriteArray}>
        {({ directory, src, title }) => (
          <div class="item-selected" id={directory}>
            <img
              src={src}
              alt=""
              onClick={(e) => {
                onclick(directory);
              }}
            />
            <span
              style={`font-weight:${
                currentDirectory == directory ? "700" : "normal"
              };`}
            >
              {title}
            </span>
          </div>
        )}
      </For>
    </>
  );

  return (
    <div class="box-sidebar ">
      <div class="sidebar-background">
        <div class="sidebar-items" style={"margin-top:1rem;"}>
          <Favorites />
          <div class="item-category">iCloud</div>
          <div class="item-selected">
            <img src={icloud} alt="" />
            <span>iCloud Drive</span>
          </div>
          <div class="item-category">Locations</div>
          <div class="item-selected">
            <img src={laptop} alt="" />
            <span>Your MacBook</span>
          </div>
          <div class="item-category">Tags</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;