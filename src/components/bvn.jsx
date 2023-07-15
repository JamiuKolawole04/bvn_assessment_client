import React, { useState, Fragment } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { useAuthContext } from "../context/authContext";

export const Bvn = () => {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const baseUrl = "https://api.sandbox.youverify.co/v2/api/identity/ng/bvn";

  const { user } = useAuthContext();

  const [bvn, setBvn] = useState("");
  const [bvnData, setBvnData] = useState({});
  const [isBvnLoading, setIsBvnLoading] = useState(false);

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsBvnLoading(true);

      const { data } = await axios({
        method: "POST",
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
      toast.error(err.response.data.message, {
        position: "top-right",
      });
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
        className="bg-green-400 w-full py-2 rounded  disabled:cursor-not-allowed disabled:opacity-30 mb-5"
        disabled={bvn.length < 11}
      >
        {isBvnLoading ? "verifying..." : "verify"}
      </button>
      {!bvnData?.dataValidation && !bvnData.allValidationPassed && (
        <p className="text-white mt-3">{bvnData?.reason}</p>
      )}

      {bvnData.allValidationPassed && (
        <Fragment>
          <p className="text-white">bvn validation success</p>
          <p className="text-white">
            Name: {`${bvnData.firstName} ${bvnData.lastName}`}
          </p>
          <p></p>
        </Fragment>
      )}
    </form>
  );
};
