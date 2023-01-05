import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface IUsers {
  name: string;
  umur: number | string;
  alamat: string;
  email: string;
}

interface Props {
  dataUsers: IUsers[];
}

const UserPage: NextPage<Props> = ({ dataUsers }) => {
  const socket = io("http://localhost:5000", {
    withCredentials: true,
    extraHeaders: {
      "react-client": "react-client",
    },
  });

  const [socketData, setSocketData] = useState<string>("");
  const [qr, setQr] = useState<any>();

  useEffect(() => {
    socket.on("message", (data) => {
      setSocketData(data);
    });
    socket.on("qr", (data) => {
      setQr(data);
    });
    socket.on("coba", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("message");
      socket.off("qr");
    };
  }, []);

  return (
    <>
      <Head>
        <title>Halaman Users</title>
        <meta name="description" content="halaman user ekatunggal.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <table className="w-full">
        <thead>
          <tr className="border h-12">
            <th>No</th>
            <th>Name</th>
            <th>Umur</th>
            <th>Alamat</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {dataUsers.map((item, index) => (
            <tr
              className={`border h-10 ${
                index % 2 != 0 ? `bg-gray-50` : `bg-white`
              }`}
              key={index}
            >
              <td className="pl-5">{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.umur}</td>
              <td>{item.alamat}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>{socketData}</h1>
      {qr && <img src={qr} alt="qrcode" />}
    </>
  );
};

// export async function getStaticProps() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users");
//   const dataUsers = await res.json();
//   return {
//     props: {
//       dataUsers,
//     },
//   };
// }

export async function getServerSideProps() {
  const res = await fetch("http://localhost:5000/users/");
  const dataUsers = await res.json();
  return {
    props: { dataUsers: dataUsers.data },
  };
}

export default UserPage;
