import React from 'react'
import { Input, Select } from 'antd';
import _ from 'lodash'
import { withTranslation } from 'react-i18next';
const { Option } = Select

class FilterInput extends React.Component<any, any> {
  submited = false;
  visibleSearch = false;
  refInput: any;

  state = {
    value: _.get(this.props.column, "filteredValue[0].value"),
    operator: this.props.operator || (this.props.type == "number" ? "equals" : "contains"),
  }

  componentDidMount() {
    this.focusInput();
  }

  componentDidUpdate(prevProps: any) {
    //gán lại giá trị của input mỗi lần update.
    if (_.get(this.props.column, "filteredValue[0].value") != _.get(prevProps.column, "filteredValue[0].value")) {
      this.setState({
        value: _.get(this.props.column, "filteredValue[0].value")
      })
    }

    //kiểm tra mỗi lần đổi visible của input
    if (this.visibleSearch != this.props.column.visibleSearch) {
      this.visibleSearch = this.props.column.visibleSearch
      this.focusInput();
      if (this.visibleSearch) this.submited = false;
    }
  }

  focusInput() {
    setTimeout(() => {
      this.refInput.input.focus()
    }, 100)
  }

  onChange = (e: any) => {
    this.setState({ value: e.target.value })
  }

  onSubmit = () => {
    //dùng biến này để kiểm tra tránh submit 2 lần liên tục tạo dupe request
    if (this.submited) return;
    this.submited = true;

    const { column, confirm } = this.props
    let filters = [];
    if (this.state.value) {
      filters.push({
        field: column.field,
        operator: this.state.operator,
        value: this.state.value
      })
    }
    confirm(filters)
    this.submited = false;
  }

  renderOperator() {
    const { messages = {}, hideOperator, operator, t } = this.props

    if (hideOperator) return
    let operators = [
      { value: "contains", label: t("common:infoFilter:contains") || "Contains" },
      { value: "equals", label: t("common:infoFilter:equals") || "Equals" },
      { value: "startsWith", label: t("common:infoFilter:startsWith") || "StartsWith" },
      { value: "endsWith", label: t("common:infoFilter:endsWith") || "EndsWith" },
    ]
    if (this.props.type == "number") {
      operators = [
        { value: "equals", label: '=' },
        { value: "greaterThan", label: '>' },
        { value: "lowersThan", label: '<' },
        { value: "greaterThanOrEquals", label: '>=' },
        { value: "lowersThanOrEquals", label: '<=' }
      ]
    }
    const defaultOperator = operator || operators[0].value

    return <Select defaultValue={defaultOperator} style={{ width: this.props.type == "number" ? 90 : 100 }} onChange={value => this.setState({ operator: value })}>
      {operators.map(operator => <Option value={operator.value} key={operator.value}>{operator.label}</Option>)}
    </Select>
  }

  render() {
    const { confirm, column, hideOperator, type, ...otherProps } = this.props
    let Component = Input
    return <div style={{ padding: 8 }}>
      <Component
        {...otherProps}
        addonBefore={this.renderOperator()}
        ref={ref => this.refInput = ref}
        value={this.state.value}
        onChange={this.onChange}
        onPressEnter={this.onSubmit}
        //onBlur={this.onSubmit}
        style={{ width: this.props.type == "number" ? "220px" : "270px", marginBottom: 8, display: 'block' }}
      />
    </div>
  }
}

export default withTranslation()(FilterInput)
