import supabase from "./supabase";

export async function getFriendRequestStatus(receiverId, senderId) {
  // console.log(receiverId, senderId);
  let { data, error } = await supabase
    .from("friend_requests")
    .select("*")
    .or(
      `and(senderId.eq.${senderId}, receiverId.eq.${receiverId}), and(senderId.eq.${receiverId}, receiverId.eq.${senderId})`,
    );
  if (error) {
    console.error(error);
    throw new Error("Friend Request status could not be fetched.");
  }
  // console.log(data);
  return data.length <= 0 ? null : data[0];
}

export async function getFriendRequestStatusById(requestid) {
  let { data, error } = await supabase
    .from("friend_requests")
    .select("*")
    .eq("id", requestid);
  if (error) {
    console.error(error);
    throw new Error("Friend Request status could not be fetched.");
  }
  return data;
}

export async function acceptRejectFriendRequest(requestid, resuestStatus) {
  console.log("requestid: ", requestid);
  console.log("resuestStatus: ", resuestStatus);
  // console.log("resuestStatus: ", resuestStatus.typeOf());
  if (requestid === "" || requestid === null || requestid === undefined) {
    console.error(error);
    throw new Error("Error with request update");
  }
  const { data, error } = await supabase
    .from("friend_requests")
    .update({ status: resuestStatus })
    .eq("id", requestid)
    .select();
  // console.log("=====> ", data);
  if (error) {
    console.error(error);
    throw new Error("Friend Request status could not be updated.");
  }
  return data;
}

export async function sendFriendRequest(requestid, receiverId, senderId) {
  // console.log("requestid: ", requestid);
  // console.log("receiverId: ", receiverId);
  // console.log("senderId: ", senderId);
  let query = supabase.from("friend_requests");
  //   const dataFromStore = getFriendRequestStatusById(requestid);
  //   console.log("dataFromStore: ", dataFromStore);
  if (requestid === null || requestid === undefined) {
    query = query
      .insert([
        { status: "PENDING", receiverId: receiverId, senderId: senderId },
      ])
      .select();
  } else {
    query = query.update({ status: "ACCEPTED" }).eq("id", requestid).select();
  }
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Friend Request could not be sent.");
  }
  return data;
}

export async function getAllFriends(senderId) {
  console.log("senderId: ", senderId);
  // senderId = "77bf3574-52bb-431e-9c3f-597762277968";
  let { data: friend_requests, error } = await supabase
    .from("friend_requests")
    .select(
      `
      *,
        from:users!friendRequests_senderId_fkey(name, avatar, email),
        to:users!friendRequests_receiverId_fkey(name, avatar, email)
      `,
    )
    .or(`and(senderId.eq.${senderId}), and(receiverId.eq.${senderId})`);
  if (error) {
    console.error(error);
    throw new Error("Friend Request could not be sent.");
  }
  // console.log(friend_requests);
  return friend_requests;
}

// export async function getAll