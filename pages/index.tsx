import type { NextPage } from "next";
import Head from "next/head";
import DataTable from "../components/Table";
import Filter from "../components/Filter";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Home: NextPage = () => {
  const {
    users,
    loading,

    onChangePage,

    onSelectGender,
    selectedGender,

    searchKeyword,
    searchResult,
    onSearch,

    resetFilter,
  } = useContext(UserContext);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Head>
        <title>Random User App</title>
        <meta
          name="description"
          content="Display data table from Rnadom user API"
        />
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
            <Filter
              onSearch={onSearch}
              searchKeyword={searchKeyword}
              onSelectGender={onSelectGender}
              selectedGender={selectedGender}
              resetFilter={resetFilter}
            />
            {searchKeyword && (
              <div className="mt-4">
                Display result from
                <span className="text-xs font-bold text-gray-400 bg-gray-200 p-2 ml-2 rounded">
                  {searchKeyword}
                </span>
              </div>
            )}
            <div className="mt-6">
              <DataTable
                data={searchKeyword ? searchResult : users}
                loading={loading}
                onChangePage={onChangePage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
