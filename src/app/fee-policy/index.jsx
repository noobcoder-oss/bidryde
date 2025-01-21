import React from "react";
import "./FeePolicy.scss";
import { CollapsiblePanel, Navbar } from "@/Components";
import { uid } from "react-uid";
import BookingRelatedPolicies from "./components/BookingRelatedPolicies";
import OtherFeesAndPolicies1 from "./components/OtherFeesAndPolicies1";
import PayoutRelatedPolicies from "./components/PayoutRelatedPolicies";
import OtherFeesAndPolicies2 from "./components/OtherFeesAndPolicies2";

const LEASE_FEE_POLICIES = [
  {
    header: "Booking Related Policies",
    component: <BookingRelatedPolicies/>,
  },
  {
    header: "Other Fee's & Penalities",
    component: <OtherFeesAndPolicies1/>,
  },
];

const HOST_FEE_POLICIES = [
  {
    header: "Payout Related Policies",
    component: <PayoutRelatedPolicies/>,
  },
  {
    header: "Other Fee's & Penalities",
    component: <OtherFeesAndPolicies2/>,
  },
];

function FeePolicy() {
  return (
    <div className="mainFeeContainer">
      <Navbar hidePageButtons={true} />
      <div className="contentContainer">
        <h5>Lease Fee Policies</h5>
        <div className="introTextContainer">
          {LEASE_FEE_POLICIES.map((question) => (
            <CollapsiblePanel data={question} key={uid(question)} />
          ))}
        </div>
        <h5>Host Fee Policies</h5>
        <div className="introTextContainer">
          {HOST_FEE_POLICIES.map((question) => (
            <CollapsiblePanel data={question} key={uid(question)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeePolicy;
