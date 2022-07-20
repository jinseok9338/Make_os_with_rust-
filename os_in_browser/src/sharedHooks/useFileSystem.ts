import { useFileSystem } from "../context/windowFileSystem";
import {
  createSignal,
  createContext,
  ParentComponent,
  createEffect,
  useContext,
  onMount,
} from "solid-js";
import { v4 as uuidv4 } from "uuid";
import { fsFunction } from "../utils/fsFunction";

import { createStore } from "solid-js/store";
import { fileType } from "../context/FileDirectoryContext";
import { setIcon } from "../app/Finder/finderFunction/setIcon";

const useFileSystemhook = (currentdir = "/home/desktop") => {
  //fisrt import fs object
  const { fs } = useFileSystem();
  const { readFileSync, readdirSync, renameFile, makefile } = fsFunction();

  //initialize the files and directory ... but do I need one??
  const [currentDirectory, setCurrentDirectory] = createSignal(currentdir);
  const [currentFiles, setCurrentFiles] = createStore([] as fileType[]);

  //change the files depending on the directory that is passed down in the argument
  /* A hook that is called everytime the cd changes. */
  createEffect((prev) => {
    const cd = currentDirectory();
    if (cd != prev) {
      setCurrentDirectory(cd);
      let cFiles = readdirSync(cd).map(
        (file) =>
          ({
            name: file,
            iconPath: setIcon(file),
            id: uuidv4(),
            filePath: `${cd}/${file}`,
            dir: cd,
          } as fileType)
      );
      setCurrentFiles(cFiles);
    }
    return cd;
  });

  /**
   * It takes two strings, oldPath and newPath, and returns void but set the new files into files signal
   * @param {string} oldPath - The path of the file you want to rename.
   * @param {string} newPath - The new path of the file.
   * set the new files into files signal
   */
  const changeFileName = (oldPath: string, newPath: string) => {
    renameFile(oldPath, newPath);
    const files = readdirSync(currentDirectory()).map(
      (file) =>
        ({
          name: file,
          iconPath: setIcon(file),
          id: uuidv4(),
          filePath: `${currentDirectory()}/${file}`,
          dir: currentDirectory(),
        } as fileType)
    );
    setCurrentFiles(files);
  };

  /**
   * It takes a string as an argument and returns a buffer of the file
   * @param {string} filePath - The path to the file you want to read.
   * @returns the buffer of the file
   */
  const readFile = (filePath: string) => {
    return readFileSync(filePath);
  };

  /**
   * It takes a file path and some data, and then creates a file at that path with that data then set the file signal
   * @param {string} filePath - The path to the file you want to create.
   * @param {any} data - the data you want to write to the file
   */
  const makeFile = (filePath: string, data: any) => {
    makefile(currentDirectory(), filePath, data);
    const files = readdirSync(currentDirectory()).map(
      (file) =>
        ({
          name: file,
          iconPath: setIcon(file),
          id: uuidv4(),
          filePath: `${currentDirectory()}/${file}`,
          dir: currentDirectory(),
        } as fileType)
    );
    setCurrentFiles(files);
  };

  return {
    currentFiles,
    setCurrentFiles,
    currentDirectory,
    changeFileName,
    readFile,
    setCurrentDirectory,
    makeFile,
  };
};

export default useFileSystemhook;

// make two use File System object one for the desktop main and one for the finder