
import Paragraph from "antd/es/typography/Paragraph";
import { useState } from "react";

export const EllipsisText = ({src}: {src: string}) => {

    const [ellipsis, setEllipsis] = useState(false);

    const typoExpand = () => {
        setEllipsis(!ellipsis);
    };

    const renderShowLess = () => {
        return (ellipsis) ? (<><div className="text-color-blue cursor-pointer" onClick={() => setEllipsis(!ellipsis)}>show less...</div></>) : <div></div>;
    }

    return (
        <>
            <Paragraph
                ellipsis={{
                    rows: 3,
                    expandable: true,
                    expanded: ellipsis,
                    onExpand: typoExpand,
                    symbol: "show more"
                }}
            >
                {src}
            </Paragraph>
            {renderShowLess()}
        </>
    );
}