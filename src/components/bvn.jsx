import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import { useAuthContext } from "../context/authContext";

export const Bvn = () => {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const baseUrl = "https://api.sandbox.youverify.co/v2/api/identity/ng/bvn";
  const { user } = useAuthContext();

  const [bvn, setBvn] = useState("");
  const [bvnData, setBvnData] = useState({});
  const [isBvnLoading, setIsBvnLoading] = useState(false);
  //   found;
  //   not_found

  console.log({ bvnData });

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //   const response = await fetch(`${proxyUrl}${baseUrl}`, {
      //     method: "POSTs",
      //     headers: {
      //       "Content-Type": "application/json",
      //       token: `SXFn2GA8.HwmyddDZkgmSdODrmtkHu1TwqPpagnKZ5PPE`,
      //       "Access-Control-Allow-Origin": "*",
      //     },
      //     body: JSON.stringify({
      //       id: bvn,
      //       isSubjectConsent: true,
      //       premiumBVN: true,
      //     }),
      //   });
      //   console.log({ response });

      setIsBvnLoading(true);

      const { data } = await axios({
        method: "POST",
        // url: "https://api.sandbox.youverify.co/v2/api/identity/ng/bvn",
        // url: "https://cors-anywhere.herokuapp.com/https://api.sandbox.youverify.co/v2/api/identity/ng/bvn",
        url: `${proxyUrl}${baseUrl}`,
        headers: {
          token: "SXFn2GA8.HwmyddDZkgmSdODrmtkHu1TwqPpagnKZ5PPE",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Origin: "https://api.sandbox.youverify.co/v2/api/identity/ng/bvn",
        },
        data: {
          id: bvn,
          isSubjectConsent: true,
          premiumBVN: true,
        },
      });
      setBvnData(data.data);
      return data;
    } catch (err) {
      console.log({ err });
    } finally {
      setIsBvnLoading(false);
    }
  };

  return (
    <form
      className="flex justify-center items-center flex-col mt-20 w-full m-auto max-w-xs"
      onSubmitCapture={handleSubmit}
    >
      <h1 className="text-white font-bold mb-5">Enter bvn to verify </h1>

      <input
        type="text"
        maxLength="11"
        name="bvn"
        id="bvn"
        className="w-full mb-8"
        placeholder="bvn"
        value={bvn}
        onChange={({ target: { value } }) => setBvn(value)}
      />

      <button
        type="submit"
        className="bg-green-400 w-full py-2 rounded  disabled:cursor-not-allowed disabled:opacity-30"
        disabled={bvn.length < 11}
      >
        {isBvnLoading ? "verifying..." : "verify"}
      </button>
      {!bvnData?.dataValidation && (
        <p className="text-white">{bvnData?.reason}</p>
      )}
    </form>
  );
};
