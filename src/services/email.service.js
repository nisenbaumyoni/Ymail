/* eslint-disable no-unused-vars */
import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { LoremIpsum } from "lorem-ipsum";

const STORAGE_KEY = "emails";

const loggedinUser = {
  email: "yonin@gmail.com",
  fullname: "Mahta appsus",
};

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export const emailService = {
  query,
  save,
  remove,
  getById,
  createEmail,
  getDefaultFilter,
  loggedinUser,
};

_createMockEmails();

//TODO
async function query(filterBy) {
  let emails = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    var { read, starred, searchBy, dateSort, folder, from, to } = filterBy;
    from = from || "";
    to = to || "";
    read = read || "";
    starred = starred || "";

    console.log("read ", read);
    console.log("starred ", starred);
    console.log("dateSort ", dateSort);
    console.log("folder ", folder);

    emails = emails.filter(
      (email) =>
        email.folder.toLowerCase().includes(folder.toLowerCase()) &&
        (starred === "all" ||
          (email.starred.toLowerCase().includes(starred.toLowerCase()))) &&
        (read === "all" ||
          email.read.toLowerCase().includes(read.toLowerCase()))
    );

    //   emails = emails.filter((email) =>
    //   email.folder.toLowerCase().includes(folder.toLowerCase()) &&
    //   (starred ==='all' || email.starred.toLowerCase().includes(starred.toLowerCase())) &&
    //   (read ==='all' || email.read.toLowerCase().includes(read.toLowerCase()))
    // );

    //   emails = emails.filter((email) =>
    //   email.from.toLowerCase().includes(from.toLowerCase()) &&
    //   email.to.toLowerCase().includes(to.toLowerCase()) &&
    //   read !== "all"
    //     ? email.read.toLowerCase().includes(read.toLowerCase())
    //     : true && starred !== "all"
    //     ? email.starred.toLowerCase().includes(starred.toLowerCase())
    //     : true && email.folder.toLowerCase().includes(folder.toLowerCase())
    // );
  }

  dateSort === "asc"
    ? emails.sort((a, b) => a.sentAt - b.sentAt)
    : emails.sort((a, b) => b.sentAt - a.sentAt);

  return emails;
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.put(STORAGE_KEY, emailToSave);
  } else {
    emailToSave.isOn = false;
    return storageService.post(STORAGE_KEY, emailToSave);
  }
}

function createEmail(
  subject = "",
  body = "",
  isRead = false,
  isStarred = false,
  from = loggedinUser.email,
  to = "",
  nameTo = lorem.generateWords(2),
  folder = "draft"
) {
  const id = utilService.makeId();
  const sentAt = "";
  const removedAt = null;
  const read = true;
  const starred = false;

  return {
    id,
    subject,
    body,
    read,
    starred,
    sentAt,
    removedAt,
    from,
    to,
    nameTo,
    folder,
  };
}

function mockMailAdress() {
  let mockMailAdress = "";
  return lorem.generateWords(1) + "@" + lorem.generateWords(1) + ".com";
}

function _createMockEmails(numOfEmailsToMock = 5) {
  let emails = utilService.loadFromStorage(STORAGE_KEY);

  if (!emails || !emails.length) {
    let emails = [];
    for (let i = 0; i < numOfEmailsToMock; i++) {
      const mockFrom =
        Math.random() >= 0.7 ? loggedinUser.email : mockMailAdress();
      let mockTo = "";
      let mockFolder = "";

      if (mockFrom === loggedinUser.email) {
        mockTo = mockMailAdress();
        mockFolder = Math.random() >= 0.8 ? "sent" : "draft";
      } else {
        mockTo = loggedinUser.email;
        mockFolder = "inbox";
      }

      emails.push({
        id: utilService.makeId(),
        subject: lorem.generateWords(4),
        body: lorem.generateParagraphs(5),
        read: Math.random() >= 0.5 ? "read" : "unread",
        starred: Math.random() <= 0.5 ? "starred" : "unstarred",
        sentAt: Date.now() - Math.floor(Math.random() * 30000000000),
        removedAt: "",
        from: mockFrom,
        to: mockTo,
        nameTo: lorem.generateWords(2),
        folder: mockFolder,
      });
      utilService.saveToStorage(STORAGE_KEY, emails);
    }
  }
}

//TODO
function getDefaultFilter() {
  return {
    read: "all",
    starred: "all",
    searchBy: "",
    dateSort: "desc",
    folder: "inbox",
    from: loggedinUser.email,
    to: "",
  };
}
