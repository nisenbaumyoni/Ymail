import { useEffect, useState } from "react";
import { folderService } from "../services/folder.service";

// eslint-disable-next-line react/prop-types
export function FolderList({ onFolderClick, inboxCounter }) {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    loadFolders();
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
            onClick={() => {
              onFolderClick(folder.id);
            }}
          >
            <img className={"folderlist-" + folder.id + "-img"} />
            <div>{folder.name}</div>
            <div className="folderlist-count">
              {folder.id === "inbox" ? inboxCounter : ""}
            </div>
          </a>
        );
      })}
    </section>
  );
}
