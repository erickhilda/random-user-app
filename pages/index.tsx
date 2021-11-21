import type { NextPage } from "next";
import Head from "next/head";
import {
  Table,
  Pagination,
  Input,
  Select,
  Tag,
  Button,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { serializeData } from "../utils/serialized-data.util";
import { Day } from "../utils/date.util";
import { IUser, GenderType } from "../entities/user.entity";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: {
      compare: (a: any, b: any) => {
        return a.name.localeCompare(b.name);
      },
      multiple: 1,
    },
  },
  {
    dataIndex: "email",
    title: "Email",
    key: "email",
  },
  {
    title: "Register Date",
    dataIndex: "registered",
    key: "register",
    sorter: {
      compare: (a: any, b: any) => {
        return Day(a.registered).diff(b.registered);
      },
      multiple: 2,
    },
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    render: (gender: GenderType) => {
      let color = gender === "female" ? "geekblue" : "green";
      return (
        <Tag color={color} key={gender}>
          {gender.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Phone number",
    dataIndex: "phone",
    key: "phone",
  },
];

const Home: NextPage = () => {
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
      showErrorNotification('error');
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
  const [seearchResult, setSearchResult] = useState<IUser[]>([]);
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
    setSearchKeyword("");
    setSelectedGender("all");
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Head>
        <title>Random User App</title>
        <meta name="description" content="Display data table from Rnadom user API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full w-2/3 py-8 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">Data Table Demonstrations</h1>
          <p className="text-xl">
            A simple app for displaying data table with fucntionality to search,
            filter, and pagination
          </p>
          <div className="mt-4 flex flex-col">
            <div className="w-2/3 grid grid-cols-3 gap-2">
              <Input.Search
                placeholder="Search by name"
                onSearch={onSearch}
                enterButton
                allowClear
                onChange={(e) => onSearch(e.target.value)}
                value={searchKeyword}
              />
              <div className="grid grid-cols-2 gap-2">
                <Select
                  defaultValue="all"
                  placeholder="filter by gender"
                  onChange={onSelectGender}
                  value={selectedGender}
                  className="w-full"
                >
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                  <Select.Option value="male">Male</Select.Option>
                </Select>
                <Button type="primary" onClick={resetFilter}>
                  Reset Filter
                </Button>
              </div>
            </div>
            {searchKeyword && (
              <div className="mt-4">
                Display result from
                <span className="text-xs font-bold text-gray-400 bg-gray-200 p-2 ml-2 rounded">
                  {searchKeyword}
                </span>
              </div>
            )}
            <div className="mt-6">
              <Table
                columns={columns}
                dataSource={searchKeyword ? seearchResult : users}
                pagination={false}
                scroll={{ y: 400 }}
                loading={loading}
              />
              <Pagination
                defaultCurrent={1}
                total={50}
                onChange={onChangePage}
                className="mt-4"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
