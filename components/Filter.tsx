import { Input, Select, Button } from "antd";
import { GenderType } from "../entities/user.entity";

const Filter = ({
  onSearch,
  searchKeyword,
  onSelectGender,
  selectedGender,
  resetFilter,
}: {
  onSearch: (keyword: string) => void;
  searchKeyword: string;
  onSelectGender: (gender: GenderType) => void;
  selectedGender: GenderType;
  resetFilter: () => void;
}) => {
  return (
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
  );
};

export default Filter;
