import type { NextPage } from "next";
import Head from "next/head";
import { Table, Pagination, Input, Select, Tag } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

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
        return dayjs(a.registered).diff(b.registered);
      },
      multiple: 2,
    },
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    render: (gender: string) => {
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

export function serializeData(data: any) {
  return data.map((user: any) => {
    return {
      ...user,
      key: user.email,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      registered: formatDate(user.registered.date),
    };
  });
}

export function formatDate(date: string) {
  return dayjs(date).format("DD MMM YYYY");
}

const Home: NextPage = () => {
  const [users, setUsers] = useState([]);
  async function fetchUsers({
    page,
    gender,
  }: {
    page: number;
    gender: string;
  }) {
    /**
     * seed=p8sjmuu8r27aqdpc
     * not using fix seed since it doesn't return data correctly while filter by gender
     **/
    const response = await fetch(
      `https://randomuser.me/api/?page=${page}&results=10&inc=name,gender,phone,email,registered&gender=${gender}`
    );
    const data = await response.json();
    setUsers(serializeData(data.results));
  }

  const [currentPage, setCurrentPage] = useState<number>(1);
  function onChangePage(e: number) {
    setCurrentPage(e);
  }

  const [selectedGender, setSelectedGender] = useState<string>("");
  function onSelectGender(e: string) {
    setSelectedGender(e);
  }

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [seearchResult, setSearchResult] = useState<any[]>([]);
  function onSearch(keyword: string) {
    setSearchKeyword(keyword);
    const result = users.filter((user: any) => {
      return user.name.includes(keyword);
    });
    setSearchResult(result);
    console.log(keyword, result);
  }

  useEffect(() => {
    fetchUsers({ page: currentPage, gender: selectedGender });
  }, [selectedGender, currentPage]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full w-2/3 px-8 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">Next.js</h1>
          <p className="text-xl">A simple starter for next.js</p>
          <div className="mt-4 flex flex-col">
            <div className="w-1/2 grid grid-cols-2 gap-3">
              <Input.Search
                placeholder="Search by name"
                onSearch={onSearch}
                enterButton
                allowClear
              />
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                placeholder="filter by gender"
                onChange={onSelectGender}
              >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="male">Male</Select.Option>
              </Select>
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
