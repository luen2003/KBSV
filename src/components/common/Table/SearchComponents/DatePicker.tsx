import * as React from 'react'
import { DatePicker } from 'antd';
import _ from 'lodash'
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
class FilterDatePicker extends React.Component<any, any> {
  submited = false;
  refInput: any;
  constructor(props: any) {
    super(props);
    this.state = {
      ...this.getDates()
    }
  }

  componentDidUpdate(prevProps: any) {
    if (JSON.stringify(prevProps.column.filteredValue) != JSON.stringify(this.props.column.filteredValue)) {
      this.setState({
        ...this.getDates()
      })
    }
    if (this.props.column.visibleSearch) this.submited = false;
  }

  getDates = (dateStrings?: any) => {
    if (!dateStrings) dateStrings = _.get(this.props.column, "filteredValue[0].value", [])
    if (!dateStrings) return {}
    if (!dateStrings[0]) dateStrings[0] = undefined
    if (!dateStrings[1]) dateStrings[1] = undefined
    return {
      dateStrings: dateStrings,
      dates: [
        dateStrings[0] ? dayjs(dateStrings[0]) : undefined,
        dateStrings[1] ? dayjs(dateStrings[1]) : undefined
      ]
    }
  }

  onChange = (dates: any, dateStrings: any, { range }: { range: any}) => {
    this.setState({
      ...this.getDates(dateStrings)
    }, () => {
      console.log("State", this.state);
      if (range == "end") this.onSubmit()
    })
  }

  onSubmit = () => {
    //dùng biến này để kiểm tra tránh submit 2 lần liên tục tạo dupe request
    if (this.submited) return;
    this.submited = true;

    const { column, confirm } = this.props
    let filters = [];
    if (this.state.dateStrings && this.state.dateStrings[0] && this.state.dateStrings[1]) {
      filters.push({
        field: column.field,
        operator: this.props.operator || 'between',
        value: [
          dayjs(this.state.dateStrings[0]).startOf("days").toISOString(),
          dayjs(this.state.dateStrings[1]).endOf("days").toISOString()
        ]
      })
    }
    confirm(filters)
  }

  render() {
    const { confirm, column, allowClear, ...otherProps } = this.props
    return <div style={{ padding: 8 }}>
      <RangePicker
        {...otherProps}
        allowClear={typeof allowClear === "boolean" ? allowClear : true}
        ref={ref => this.refInput = ref}
        value={this.state.dates}
        onCalendarChange={this.onChange as any}
        //onBlur={this.onSubmit}
        style={{ width: "256px", marginBottom: 8, }}
        //autoFocus={true}
        defaultValue={[null, null]}
      />
    </div>
  }
}

export default FilterDatePicker
