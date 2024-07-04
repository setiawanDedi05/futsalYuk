import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import * as color from '../../../../../config/color';

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
`;

const TabItems = styled.div`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
  text-align:center;
  border-bottom: 4px solid
    ${(props: any) => (props.selected ? color.green : "transparent")};
`;


const Tab = ({ children, onTabSelected }: any) => {
    const [itemId, setItemId] = useState(0);

    useEffect(() => {
        onTabSelected && onTabSelected(itemId);
    }, [itemId, onTabSelected]);

    return (
        <TabContainer>
            {React.Children.map(children, (child, index) => {
                return React.cloneElement(child, {
                    onClick: () => {
                        setItemId(index);
                    },
                    selected: itemId === index
                });
            })}
        </TabContainer>
    );
};

export const TabItem = memo(({ children, ...restProps }: any) => (
    <TabItems {...restProps}>{children}</TabItems>
));

export default Tab;