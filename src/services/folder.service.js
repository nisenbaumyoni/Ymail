const folders = [
  {
    id: "inbox",
    name: "Inbox",
  },
  {
    id: "sent",
    name: "Sent",
  },
  {
    id: "drafts",
    name: "Drafts",
  },
  {
    id: "starred",
    name: "Starred",
  },
  {
    id: "all",
    name: "All Mail",
  },
  {
    id: "bin",
    name: "Bin",
  },
];

function getAllFolders() {
  return folders;
}

export const folderService = { getAllFolders, folders };
