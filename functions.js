import axios from "axios";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";
import { formatDateString, formatTimeString } from "./helpers";

const github = axios.create({
  baseURL: "https://api.github.com/",
});

export function getRepoList(username) {
  return github.get(`/users/${username}/repos`).then(({ data }) => data);
}

export const addUser = async (
  username,
  avatar_url,
  html_url,
  name,
  location,
  bio,
  email,
  id
) => {
  const newName = !name ? "" : name;
  const newLocation = !location ? "" : location;
  const newBio = !bio ? "" : bio;
  const newEmail = !email ? "" : email;

  try {
    const docRef = await setDoc(doc(collection(db, "users"), `${username}`), {
      username,
      avatar_url: avatar_url,
      html_url: html_url,
      name: newName,
      location: newLocation,
      bio: newBio,
      email: newEmail,
      id,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getUserById = async (uid) => {
  const q = query(collection(db, "users"), where("id", "==", `${uid}`));
  const docArray = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => docArray.push(doc.data()));
  return docArray[0];
};

export const addPortfolioRepo = async (
  username,
  html_url,
  name,
  description,
  userId
) => {
  try {
    const docRef = await setDoc(
      doc(collection(db, "repos", "type", "portfolio"), `${username}+${name}`),
      {
        username,
        html_url,
        name,
        description,
        userId,
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export const addProjectRepos = async (
  username,
  html_url,
  name,
  description,
  theme,
  languagesWanted,
  userId
) => {
  try {
    const docRef = await setDoc(
      doc(
        collection(db, "repos", "type", "collaboration"),
        `${username}+${name}`
      ),
      {
        username,
        html_url,
        name,
        description,
        theme,
        languagesWanted,
        userId,
      }
    );
  } catch (e) {
    console.log(e);
  }
};

const uniqueDevLang = (devName, langObj) => {
  if (devName === langObj[devName]) {
    const uniqueArray = Array.from(new Set(langObj[devName]));
    return uniqueArray;
  }
};

export const makeUniqueArray = (array) => {
  const uniqueArray = Array.from(new Set(array));
  return uniqueArray;
};

export const getDevLanguages = async (devName) => {
  const reposRef = collection(db, "repos", "type", "portfolio");
  const q = query(reposRef, where("username", "==", `${devName}`));
  const querySnapshot = await getDocs(q);

  const langObj = {};
  langObj[devName] = [];
  const repoNames = [];
  querySnapshot.forEach(async (doc) => {
    repoNames.push(doc.data().name);
  });

  for (let i = 0; i < repoNames.length; i++) {
    const repos = await github.get(
      `/repos/${devName}/${repoNames[i]}/languages`
    );

    const languages = Object.keys(repos.data).map((lang) => lang);
    if (langObj.hasOwnProperty(devName)) {
      languages.forEach((lang) => langObj[devName].push(lang));
    }
  }
  return langObj;
};

export const getPortfolioById = async (id) => {
  const q = query(
    collection(db, "repos", "type", "portfolio"),
    where("userId", "==", `${id}`)
  );
  const docArray = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => docArray.push(doc.data()));
  return docArray;
};
export const getProjectById = async (id) => {
  const q = query(
    collection(db, "repos", "type", "collaboration"),
    where("userId", "==", `${id}`)
  );
  const docArray = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => docArray.push(doc.data()));
  return docArray;
};

export const editProfile = async (username, bio, email, location, name) => {
  const docRef = doc(db, "users", `${username}`);
  console.log('called')
  await updateDoc(docRef, {
    bio,
    email,
    location,
    name,
  });
};

export const getDevList = async () => {
  const newObj = {};
  const collectionRef = collection(db, "users");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const devList = [];
  querySnapshot.forEach((doc) => {
    const devName = doc.data().username;
    devList.push(doc.data());
  });
  return devList;
};

export const getUserDataById = async (uid, key) => {
  const usersData = await getUserById(uid);
  return key ? usersData[key] : usersData;
};

export const getChatId = async (userid, otherUserId) => {
  const data = await getUserById(userid);
  const otherUser = await getUserById(otherUserId);
  console.log(otherUser.username);
  const q = query(
    collection(db, "users", data.username, "conversations"),
    where(`members.${otherUser.username}.is_active`, "==", true)
  );
  const docArray = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => docArray.push(doc.id));
  return docArray[0];
};
// onPress - devcard?, devprofile
// add chatname somewhere else
export const addChat = async (addedChatName, userId, ...otherMembersIds) => {
  const id = await getChatId(userId, otherMembersIds);
  console.log(id);
  if (!id) {
    const members = [...otherMembersIds];
    members.push(userId);
    const memberData = await Promise.all(
      members.map(async (userId) => {
        const username = await getUserDataById(userId, "username");
        const avatarUrl = await getUserDataById(userId, "avatar_url");

        return [
          [username],
          {
            user_id: userId,
            username,
            avatar_url: avatarUrl,
            is_active: true /* to be dynamic */,
          },
        ];
      })
    );
    const docMemberData = { members: Object.fromEntries(memberData) };
    const usernames = Object.keys(docMemberData.members);
    const chatUID = usernames.join(", "); // option to rename the chat

    usernames.forEach(async (username) => {
      const chatName = (await addedChatName)
        ? addedChatName
        : otherMembersIds.length === 1
        ? usernames[usernames.findIndex((user) => user !== username)]
        : chatUID;
      const docChatData = {
        members: docMemberData.members,
        chat: {
          chat_name: chatName,
          chat_id: chatUID,
        },
      };
      const docFields = setDoc(
        doc(collection(db, "users", username, "conversations"), `${chatUID}`),
        docChatData
      );
    });
    return chatUID;
  } else {
    console.log("in else block");
    return id;
  }
};

export const getChatDataByUserId = async (userId, chatId) => {
  const username = await getUserDataById(userId, "username");

  const q = query(collection(db, "users", username, "conversations"));
  const chatArr = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => chatArr.push(doc.data()));
  const chat = await chatArr.find(({ chat }) => chat.chat_id === chatId);
  return chat;
};

// onSubmit - chat
export const addMsg = async (chatUID, senderId, msgContent) => {
  const sender = await getUserDataById(senderId);
  const senderUsername = await getUserDataById(senderId, "username");
  const chatData = await getChatDataByUserId(senderId, chatUID);
  const { members } = chatData;
  const usernames = Object.keys(members);
  const receivers = { ...members };
  delete receivers[sender.username];

  try {
    const docMsgData = {
      msg_content: msgContent,
      msg_date_sent: new Date(),
      display_date: formatDateString(new Date()),
      display_time: formatTimeString(new Date()),
      sender: members[senderUsername],
      receivers: receivers,
    };

    usernames.forEach(async (username) => {
      const docMsgRef = await setDoc(
        doc(
          collection(
            db,
            "users",
            username,
            "conversations",
            chatUID,
            "messages"
          ),
          `${docMsgData.msg_date_sent}`
        ),
        docMsgData
      );
      const docLastMsgRef = await updateDoc(
        doc(collection(db, "users", username, "conversations"), `${chatUID}`),
        { last_message: docMsgData }
      );
    });
  } catch (e) {
    console.log(e);
  }
};

export const getMessageList = async (username) => {
  const q = query(collection(db, "users", `${username}`, "conversations"));
  const chatList = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => chatList.push(doc.data()));
  return chatList;
};

export const getMessagesById = async (chat_id, username) => {
  const q = query(
    collection(db, "users", username, "conversations", chat_id, "messages")
  );
  const msgList = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => msgList.push(doc.data()));
  return msgList;
};
