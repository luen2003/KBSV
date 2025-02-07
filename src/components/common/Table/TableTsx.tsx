import Table from "./Table";
import React from "react";
const GridTableWithRouter = React.forwardRef((props: any, ref: any) => {
  const {
    mobileTableProps = {},
    responsiveMobile = true,
    ...otherProps
  } = props;
  if (responsiveMobile == false) {
    return <Table ref={ref} {...otherProps} rowClassName={props.rowClassName} />;
  }

  return (
    <React.Fragment>
      {/* {!isMobile ? ( */}
        <Table
          ref={ref}
          {...otherProps}
          rowClassName={props.rowClassName}
        />
      {/* ) : (
        <MobileTable
          {...mobileTableProps}
          {...otherProps}
        />
      )} */}
    </React.Fragment>
  );
}) as any;

GridTableWithRouter.getOptions = Table.getOptions;
GridTableWithRouter.getDataFromQuery = Table.getDataFromQuery;
GridTableWithRouter.makeQuery = Table.makeQuery;

const GridTableHelper = {
  getOptions: Table.getOptions,
  getDataFromQuery: Table.getDataFromQuery,
  makeQuery: Table.makeQuery,
};
export default GridTableWithRouter;
export { GridTableHelper };

export interface FilterInterface {
  column: any[]
  confirm: Function
  ref: any
  options: {
    label: string,
    value: any
  }[]
}
