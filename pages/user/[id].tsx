import { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";

const UserDesc: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>{id}</div>;
};

export default UserDesc;
