import { Button, ButtonProps } from "antd"

export const Btn = (props: ButtonProps) => {
    return <Button
        {...props}
        style={{
            width: "152px",
            height: "36px",
            alignItems: "center",
            padding: "12px 24px 12px 24px",
            margin: "8px",
            borderRadius: "4px",
            ...(props.style || {})
        }}
    >
        {props?.children ? props.children : ""}
    </Button>
}