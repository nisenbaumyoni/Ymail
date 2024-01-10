import { useEffect,useState } from "react";
import { folderService } from "../services/folder.service";

export function FolderList({onFolderClick}) {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    loadFolders();
    console.log(folders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadFolders() {
    try {
      const folders = folderService.getAllFolders();
      setFolders(folders);
    } catch (err) {
      console.log("Had issues loading folders", err);
    }
  }

  return (
    <section className="folderlist">
      {folders.map((folder) => {
        return (
          <a
            key={folder.id}
            className="folderlist-folder"
            // onClick={() => onFolderClick(folder.id)}
          >
            <div
              // className={
              //   "emailfolder-name" + (getCount(folder.id) ? " has-count" : "")}
              
            >
              {folder.name}
            </div>
            {/* <div className="email-folder-count">
              {getCount(folder.id) || ""}
            </div> */}
          </a>
        );
      })}
    </section>
  );
}
