import React, { memo } from "react";

interface Props{
    title:string,
    subTitle?:string
}

const Header: React.FC<Props> = ({title}) => {
  return <div>{title}</div>;
};

export default memo(Header);
