import { useCallback, useEffect, useState } from "react";
import useAllFriends from "../features/Friends/useAllFriends";
import { useUser } from "../features/LoginRegister/useUser";
import ImageView from "./ImageView";
import Spinner from "./Spinner";
import { useDarkMode } from "../context/DarkModeContext";
const dummyData = [
  {
    id: 1,
    tabName: "All Requests",
  },
  {
    id: 2,
    tabName: "Requests Received",
  },
  {
    id: 3,
    tabName: "Requests Sent",
  },
];

function Tab() {
  const { isDarkMode } = useDarkMode();
  const [currentTab, setCurrentTab] = useState("All Requests");
  const { user } = useUser();
  const usersId = user?.id.toString();
  const { allFriendsList, isPending, error } = useAllFriends(usersId);
  const [filteredList, setFilteredList] = useState(allFriendsList);
  const filteredFriendsList = useCallback(() => {
    return allFriendsList?.filter((item) => {
      if (currentTab === "Requests Sent") return item.senderId === usersId;
      else if (currentTab === "Requests Received")
        return item.senderId !== usersId;
      else return item;
    });
  }, [allFriendsList, usersId, currentTab]);

  useEffect(() => {
    setFilteredList(filteredFriendsList());
  }, [filteredFriendsList]);

  function handleTabClick(e) {
    setCurrentTab(e.target.name);
  }

  return (
    <div className="grid w-full grid-rows-[40px_1fr] gap-2">
      <div className="flex gap-2">
        {dummyData.map((item) => {
          return (
            <button
              key={item.id}
              className={`rounded-md border-2 border-[#6d87f3] px-5 py-2 ${currentTab === item.tabName ? "bg-[#6d87f3] text-white" : "bg-white text-[#6d87f3]"}`}
              onClick={handleTabClick}
              name={item.tabName}
            >
              {item.tabName}
            </button>
          );
        })}
      </div>

      <div
        className={`w-full overflow-auto rounded-md ${isDarkMode ? "bg-[#666666]" : "bg-white"} py-2 pt-0`}
        style={{ height: "calc(100vh - 196px)" }}
      >
        <table className="apptableBorder w-full">
          <thead>
            <tr
              className={`sticky top-0  ${isDarkMode ? "bg-[#666666]" : "bg-white"}`}
              style={{ boxShadow: "0px -1px 0px lightgrey inset" }}
            >
              <th className="w-2/12 text-center" style={{ padding: "10px" }}>
                Photo
              </th>

              <th className="w-3/12 text-left" style={{ padding: "10px" }}>
                Username
              </th>

              <th className="w-3/12 text-left" style={{ padding: "10px" }}>
                Email
              </th>

              <th className="w-2/12 text-center" style={{ padding: "10px" }}>
                Request
              </th>

              <th className="w-2/12 text-center" style={{ padding: "10px" }}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {!isPending ? (
              filteredList?.map((data) => {
                return (
                  <tr key={data.id}>
                    <td className="flex items-center justify-center text-center">
                      <ImageView
                        src={
                          data.senderId === usersId
                            ? data.to.avatar
                            : data.from.avatar
                        }
                        dimensions={"60px"}
                      />
                    </td>

                    <td>
                      {data.senderId === usersId
                        ? data.to.name
                        : data.from.name}
                    </td>

                    <td>
                      {data.senderId === usersId
                        ? data.to.email
                        : data.from.email}
                    </td>

                    <td className="text-center">
                      {data.senderId === usersId ? "Sent" : "Received"}
                    </td>

                    <td
                      className={`${data.status === "ACCEPTED" ? "text-green-500" : "text-red-500"} text-center text-sm font-semibold`}
                    >
                      {data.status}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="w-full">
                <td colSpan={5}>
                  <Spinner />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tab;
