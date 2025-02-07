import { SearchOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Base64 } from "js-base64";
import _ from "lodash";
import FilterInput from "./SearchComponents/Input";
import React from "react";
import TableParam from "./interface/TableParam";
import { TableParam2Backend } from "./interface/TableParam2Backend";
import { FilterIcon } from "lucide-react";

class GridTable extends React.Component {
  props: any = {};
  initialProps: any;
  pagination: any;
  total: number;
  data: any[];
  addIndexCol: boolean;
  columns: any[] = [];
  state: any;
  rowClassName?: string

  constructor(props: any) {
    super(props);
    this.initialProps = {
      bordered: true,
      size: "middle",
      showHeader: true,
      hasData: false
    };

    this.state = {
      loading: false,
      reload: false
    };
    this.pagination = {};
    this.total = this.props.total || 0;
    this.data = this.props.data || [];
    this.handleTableChange = this.handleTableChange.bind(this);
    this.addIndexCol = this.props.addIndexCol;
    this.rowClassName = this.props.rowClassName
  }

  /**
   * Convert lại dữ liệu từ query đổi sang đúng format của column trong antd
   */
  defaultOptionToColumns = (defaultOptions: any) => {
    this.columns = this.columns.map((column) => {
      // set field
      if (!column.field) {
        column.field = column.key;
      }

      const sort = defaultOptions.sorting.find(
        (item: any) => item.field === column.field
      );
      if (sort) {
        const { direction } = sort;
        column.sortOrder = direction === "asc" ? "ascend" : "descend";
      } else {
        delete column.sortOrder;
      }

      const filters = defaultOptions.filters.filter(
        (item: any) => item.field === column.field
      );
      if (filters.length) {
        column.filteredValue = [...filters];
      } else {
        column.filteredValue = [];
      }
      if (column.filterable) {
        //    delete column.filterable;
        column = { ...column, ...this.getColumnSearchProps(column) };
      }
      return column;
    });
  };

  currentColumnsString = "";
  componentDidMount() {
    this.init();
    // this.setState({ reload: !this.state.reload });
  }

  componentDidUpdate(prevProps: any) {
    // update data trong trường hợp đổi từ props bên ngoài
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      this.data = this.props.data;
    }

    if (
      JSON.stringify(prevProps.columns) !== JSON.stringify(this.props.columns)
    ) {
      this.init();
    }
    if (
      JSON.stringify(this.props.router?.query) !=
      JSON.stringify(prevProps.router?.query)
    ) {
      this.setState({ reload: !this.state.reload }); // chỉ cần render lại view
    }
  }

  static makeQuery(options: TableParam) {
    const { filters = [], sorting = [], pageSize, page } = options;
    const queryObj: any = {
      f: [],
      s: {},
      ps: pageSize,
      p: page
    };

    for (const filter of filters) {
      queryObj.f.push([
        filter.field,
        filter.operator || "contains",
        filter.value
      ]);
    }
    for (const sort of sorting) {
      queryObj.s[sort.field] = sort.direction;
    }
    return Base64.encode(JSON.stringify(queryObj));
  }

  /**
   * Khai báo các function cho dropdown search box
   */
  getColumnSearchProps = (column: any) => {
    const ref = React.createRef<any>();
    return {
      filterDropdown: ({ confirm, setSelectedKeys }: any) => {
        // gọi hàm confirm mỗi lần submit form search
        const confirmFnc = (values: any) => {
          const currentColumn = this.columns.find(
            (c) => c.dataIndex === column.dataIndex
          );
          setSelectedKeys(values);
          confirm();
          // this.reload();
        };
        if (column.renderFilter) {
          return column.renderFilter({ column, confirm: confirmFnc, ref });
        }
        return <FilterInput column={column} ref={ref} confirm={confirmFnc} />;
      },
      filterIcon: (filtered: any) => {
        return (
          // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
          <FilterIcon
            size="16"
            className="text-color-gray"
          />
        );
      },
      onFilterDropdownVisibleChange: (visible: boolean) => {
        if (!visible && column.visibleSearch != visible) {
          column.visibleSearch = visible;
          if (ref.current) {
            ref.current?.onSubmit();
          }
        }
        column.visibleSearch = visible;
      }
    };
  };

  clearAll = async () => {
    const { pageSize, page } = this.pagination;
    await this.handleTableChange({ pageSize, current: page + 1 }, {}, {});
  };

  /**
   * Khởi tạo các options từ query trên url
   */
  init() {
    const query = this.props.router?.query;
    const defaultOptions = GridTable.getDataFromQuery(query, this.props);

    this.pagination = {
      pageSize: defaultOptions.pageSize || 20,
      page: defaultOptions.page || 0
    };
    this.columns = (this.props.columns || []).map((column: any) => ({
      ...column
    })); // deepClone
    if (this.addIndexCol) {
      this.columns.unshift({
        title: "#",
        align: "center",
        dataIndex: "base_index",
        key: "base_index",
        width: 50,
        responsive: ["lg"]
      });
    }
    this.defaultOptionToColumns(defaultOptions);
    this.reload();
  }

  /**
   * Reset table
   * @returns
   */
  async reset() {
    if (this.state.loading) return;
    this.setState({ loading: false });
    this.total = 0;
    this.data = [];
  }

  /**
   * Reload Table
   */
  async reload() {
    if (this.state.loading) return;
    this.setState({ loading: true });
    if (typeof this.props.fetchData === "function") {
      const params: TableParam = this.buildFetchData();
      // console.log("Filter params:", params);
      const queryOptions = GridTable.makeQuery(params);

      const modifyParam: TableParam2Backend = {
        filters: {},
        rows: null,
        first: null,
        sortField: null,
        sortOrder: null,
      }
      modifyParam.first = (params.page || 0) * (params.pageSize || 0);
      modifyParam.rows = params.pageSize || 20;
      params.filters?.map(filter => {
        modifyParam.filters[filter.field] = {
          value: (Array.isArray(filter.value) || typeof filter.value == 'object') ? JSON.stringify(filter.value) : filter.value,
          matchMode: filter.operator as any,
        }
      });
      if (params.sorting?.length) {
        const first = params.sorting[0];
        modifyParam.sortField = first.field;
        modifyParam.sortOrder = first.direction;
      }
      // console.log("Modify params:", modifyParam);

      const result = (await this.props.fetchData({ ...modifyParam, filters: JSON.stringify(modifyParam.filters) })) || {};
      if (result.totalRows != undefined) this.total = result.totalRows;
      this.data = _.get(result, "items", []);
    }
    this.setState({ loading: false });
  }

  /**
   * Set filter từ table vào biến this.columns để controlled
   */
  setFiltersToColumns = (filters: any = {}) => {
    this.columns = this.columns.map((column) => {
      const filter = filters[column.key];
      if (filter) {
        column.filteredValue = filter;
      } else {
        delete column.filteredValue;
      }
      return column;
    });
  };

  setSorterToColumns = (sorter: any = {}) => {
    this.columns = this.columns.map((column) => {
      if (column.key == sorter.columnKey) {
        column.sortOrder = sorter.order;
      } else {
        // delete column.sortOrder;
        column.sortOrder = null;
      }
      return column;
    });
  };

  setPagination = (pagination: any) => {
    this.pagination = {
      pageSize: pagination.pageSize,
      page: pagination.current - 1
    };
  };

  handleTableChange = async (pagination: any, filters: any, sorter: any) => {
    this.setFiltersToColumns(filters);
    this.setSorterToColumns(sorter);
    this.setPagination(pagination);
    this.reload();
  };

  static getDataFromQuery(
    query: TableParam = {},
    defaultOptions: TableParam = {}
  ): TableParam {
    let queryObj: any = query.filters || {};
    if (typeof query.filters === "string") {
      try {
        queryObj = JSON.parse(Base64.decode(query.filters));
      } catch (e) {
        throw new Error(`filters params invalid format.`);
      }
    }
    if (!queryObj) return {};
    const filters = queryObj.f || [];
    const sorting = queryObj.s || {};
    const queryOut = {
      filters: defaultOptions.filters || [],
      sorting: defaultOptions.sorting || [],
      pageSize: queryObj.ps || defaultOptions.pageSize,
      page: queryObj.p || defaultOptions.page
    };

    for (const filter of filters) {
      queryOut.filters.push({
        field: filter[0],
        operator: filter[1],
        value: filter[2]
      });
    }
    for (const field in sorting) {
      queryOut.sorting.push({
        field,
        direction: sorting[field]
      });
    }

    return queryOut;
  }

  static getOptions(query: any, defaultOptions: TableParam) {
    if (query && Object.keys(query).length > 0)
      return this.getDataFromQuery(query, defaultOptions);
    return defaultOptions;
  }

  /**
   * Build data từ this.columns để khớp với format trên server
   */
  buildFetchData = (): TableParam => {
    const params: TableParam = {
      filters: [],
      sorting: [],
      pageSize: this.pagination.pageSize,
      page: this.pagination.page
    };

    this.columns.map((column) => {
      if (column.filteredValue) {
        params.filters = [...(params?.filters || []), ...column.filteredValue];
      }
      if (column.sortOrder) {
        params.sorting?.push({
          field: column.field,
          direction: column.sortOrder == "ascend" ? "asc" : "desc"
        });
      }
    });
    return params;
  };

  getPagination = (pagination: any) => {
    if (pagination === false) return false;
    if (!pagination) pagination = {};
    const { pageSize, page } = this.pagination;
    return {
      ...pagination,
      total: this.total,
      position: "bottom",
      pageSize: pageSize || 20,
      current: page + 1,
      showSizeChanger: true,
      showTotal: () => `Tổng: ${this.total}`,
      pageSizeOptions: ["10", "20", "30", "50", "100"]
    };
  };

  render() {
    const {
      hasData = true,
      data = [],
      ellipsis,
      fetchData,
      columns,
      pagination,
      ...otherProps
    } = this.props;
    const { page = 0, pageSize = 20 } = this.pagination || {};
    return (
      <div>
        <Table
          {...this.initialProps}
          // tableLayout="fixed"
          scroll={{
            scrollToFirstRowOnChange: true,
            x: 400,
            y: '68vh',
          }}
          {...otherProps}
          columns={this.columns}
          dataSource={
            hasData
              ? this.data.map((row, index) => {
                return {
                  key: row.id,
                  ...row,
                  base_index: page * pageSize + index + 1
                };
              })
              : null
          }
          onChange={this.handleTableChange}
          loading={this.state.loading}
          pagination={this.getPagination(pagination)}
          rowClassName={this.props.rowClassName}
        />
      </div>
    );
  }
}

export default GridTable;
