import { Table, Pagination, Tag } from "antd";
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

const DataTable = ({
  data,
  loading,
  onChangePage,
}: {
  data: IUser[];
  loading: boolean;
  onChangePage: (page: number) => void;
}) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
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
    </>
  );
};

export default DataTable;
