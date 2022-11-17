import React, { useState } from "react";
import "./getMembership.css";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, updateError } from "../../slices/authSlice";
import { useEffect, useRef } from "react";
import { CREDIT_VALUE } from "../../../constants";
import GetMembershipModal from "../../components/Modals/GetMembershipModal";
import { toast, ToastContainer } from "react-toastify";
import CreditBox from "../../components/CreditBox/CreditBox";

const GetMembership = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [membership, setMembership] = useState({
    membership: {
      credit: user.membership.credit,
      currentCredit: user.membership.currentCredit,
      status: user.membership.status,
      membershipDate: user.membership.membershipDate,
      membershipEndDate: user.membership.membershipEndDate,
      invoice: user.membership.invoice,
    },
    userType: user.membership.userType,
  });

  //const finalAmount = selectedCredit * CREDIT_VALUE;

  const [isGetMembershipModal, setIsGetMembershipModal] = useState(false);

  const [confirmedCredit, setConfirmedCredit] = useState("");

  const openGetMembershipModal = (e) => {
    const selectedCredit = Number(e.target.id);
    setConfirmedCredit(selectedCredit);
    if (membership) {
      membership.membership.currentCredit += selectedCredit;
      membership.membership.credit = selectedCredit;
    }
    setIsGetMembershipModal(true);
  };
  console.log(confirmedCredit);

  useEffect(() => {
    const date = new Date();
    if (auth.user) {
      setMembership(() => ({
        membership: {
          credit: user.membership.credit,
          currentCredit: user.membership.currentCredit,
          status: user.membership.status,
          membershipDate: new Date(),
          membershipEndDate: date.setDate(date.getDate() + 30),
          invoice: [
            ...user.membership.invoice,
            {
              amount: confirmedCredit * CREDIT_VALUE,
              date: new Date(),
              description: `${confirmedCredit} credits purchased`,
              status: "outstanding",
            },
          ],
        },
        userType: "member",
      }));
    }
  }, [user]);

  const getDateTime = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return `${date.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}  ${date.toLocaleTimeString("en-GB").slice(0, 5)}`;
  };

  if (updateError) {
    toast.error(
      "Oops! Sorry. Something went wrong. The credits cannot be added to your account."
    );
  }

  return (
    <div className="get-membership-container">
      <ToastContainer />
      {isGetMembershipModal && (
        <GetMembershipModal
          credit={confirmedCredit}
          getMembership={() => {
            dispatch(updateUser(membership));
            toast.success(
              `You have succesfully bought the ${confirmedCredit} credits.`
            );
            setIsGetMembershipModal(false);
          }}
          onCancel={() => setIsGetMembershipModal(false)}
          dueDate={getDateTime()}
        />
      )}

      <CreditBox
        credit="10"
        openModal={openGetMembershipModal}
        price="20"
        title="SMALL"
      />
      <CreditBox
        credit="20"
        openModal={openGetMembershipModal}
        price="40"
        title="MEDIUM"
      />
      <CreditBox
        credit="40"
        openModal={openGetMembershipModal}
        price="80"
        title="LARGE"
      />
    </div>
  );
};

export default GetMembership;
