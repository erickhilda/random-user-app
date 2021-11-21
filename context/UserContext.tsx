import { createContext, useEffect, useState } from "react";
import { serializeData } from "../utils/serialized-data.util";
import { IUser, GenderType } from "../entities/user.entity";
import { notification } from "antd";

export const UserContext = createContext<any>({});

const RandomUserApp = ({ children }: { children: any }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchUsers({
    page,
    gender,
  }: {
    page: number;
    gender: GenderType;
  }) {
    /**
     * seed=p8sjmuu8r27aqdpc
     * not using fix seed since it doesn't return data correctly while filter by gender
     **/
    try {
      setLoading(true);
      const response = await fetch(
        `https://randomuser.me/api/?page=${page}&results=10&inc=name,gender,phone,email,registered&gender=${gender}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setUsers(serializeData(data.results));
        onSearch(searchKeyword);
      }
      setLoading(false);
    } catch (error) {
      showErrorNotification("error");
      setLoading(false);
    }
  }

  function showErrorNotification(type: "success" | "error") {
    notification[type]({
      message: "Something went wrong",
      description: "Please check your internet connection.",
    });
  }

  const [currentPage, setCurrentPage] = useState<number>(1);
  function onChangePage(e: number) {
    setCurrentPage(e);
  }

  const [selectedGender, setSelectedGender] = useState<GenderType>("all");
  function onSelectGender(e: GenderType) {
    setSelectedGender(e);
  }

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IUser[]>([]);
  function onSearch(keyword: string) {
    setSearchKeyword(keyword);
    const result = users.filter((user: IUser) => {
      return user.name.toLowerCase().includes(keyword.toLowerCase());
    });
    setSearchResult(result);
  }

  useEffect(() => {
    fetchUsers({ page: currentPage, gender: selectedGender });
  }, [selectedGender, currentPage]);

  function resetFilter() {
    console.log('roll');

    setSearchKeyword("");
    setSelectedGender("all");
  }

  return (
    <UserContext.Provider
      value={{
        users,
        loading,

        onChangePage,

        onSelectGender,
        selectedGender,

        searchKeyword,
        searchResult,
        onSearch,

        resetFilter,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default RandomUserApp;
