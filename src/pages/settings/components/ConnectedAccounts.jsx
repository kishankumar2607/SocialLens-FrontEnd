import React from "react";
import LinkedInAccount from "../accounts/LinkedInAccount";
import InstagramAccount from "../accounts/InstagramAccount";
import FacebookAccount from "../accounts/FacebookAccount";
import TwitterAccount from "../accounts/TwitterAccount";

const ConnectedAccounts = ({ setLoading }) => {
  return (
    <div>
      <section className="card-white-custom space-y-6">
        <h2 className="text-xl font-bold mb-6">Connected Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LinkedInAccount setLoading={setLoading} />
          <InstagramAccount setLoading={setLoading} />
          <FacebookAccount setLoading={setLoading} />
          <TwitterAccount setLoading={setLoading} />
        </div>
      </section>
    </div>
  );
};

export default ConnectedAccounts;
