import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function signin({ email, password, username }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        avatar: "",
      },
    },
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  console.log("userId", data);
  const userId = data?.user?.id;
  createUser({ userId, email, username });
  return data;
}

async function createUser({ userId, email, username }) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ userId, email, name: username }])
    .select();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  console.log("New User created in users table : ", data);
}

export async function getUserById(userIdInput, userId) {
 // console.log("======>", userIdInput, userId);
  if (userIdInput === null || userIdInput === "") return null;
  // let key = "userId";
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq([userId], `${userIdInput}`);
  // .ilike([key], `%${searchInput}%`);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  // console.log(users);
  return users;
}

export async function getUserByNameEmail(searchInput) {
  console.log("======>", searchInput);
  if (searchInput === null || searchInput === "") return null;
  let key = "userId";
  if (searchInput?.split("@").length > 1) key = "email";
  else key = "name";
  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    // .eq("name", "vinod");
    .ilike([key], `%${searchInput}%`);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  console.log("users: ", users);
  return users;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  // console.log("data from getCurrentUser: ", data);
  // console.log("data: ", data?.user);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data?.user;
}

export async function updateUser({ password, username, avatar }) {
  // 1. Update password OR userName
  let updateData;
  if (password != "" && username == "") updateData = { password };
  else if ((username != "") & (password == ""))
    updateData = { data: { username } };
  else if (username != "" && password != "")
    updateData = { password, data: { username } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  // Update the username in the user table also
  const { data: checkData1, error: error3 } = await supabase
    .from("users")
    .update({
      name: data.user.user_metadata.username,
    })
    .eq("userId", data.user.user_metadata.sub)
    .select();
  if (error3) {
    console.error("This is while updating the user table data: ", error3);
    throw new Error(
      error3.message,
      ": This is while updating the user table data",
    );
  }
  console.log("checkData1: ", checkData1);
  if (!avatar) return data;
  // 2. Upload the avatar image
  // https://lyhygstmyfkkurwpzwkx.supabase.co/storage/v1/object/public/avatar/avatar-0.957109885715715-48a25d39-f3b4-49f4-895f-bf700e78ddc1-profilePic.png
  const fileName =
    `avatar-${Math.random()}-${data.user.id}-${avatar.name}`.replaceAll(
      "/",
      "",
    );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`;
  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar);
  if (storageError) {
    console.error(storageError);
    throw new Error(storageError.message);
  }
  // 3. Update avatar in user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: imagePath,
    },
  });
  if (error2) {
    console.error(error2);
    throw new Error(error2.message);
  }
  // Update the avatar in the user table also
  const { data: checkData2, error: error4 } = await supabase
    .from("users")
    .update({
      avatar: updatedUser.user.user_metadata.avatar,
    })
    .eq("userId", updatedUser.user.id)
    .select();
  if (error4) {
    console.error("This is while updating the user table data: ", error4);
    throw new Error(
      error4.message,
      ": This is while updating the user table data",
    );
  }
  console.log(
    "checkData2: ",
    checkData2,
    updatedUser.user.user_metadata.avatar,
  );
  return updatedUser;
}

export async function logOut() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}