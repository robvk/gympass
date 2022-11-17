import React from "react";
import "./clubDetail.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  checkIn,
  setIsClubDetailPage,
  resetIsSuccess,
  resetError,
  resetCurrentClub,
} from "../../slices/clubSlice";
import { updateUser } from "../../slices/authSlice";
import useFetch from "../../hooks/useFetch";
import { useParams, Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { ROLE_MEMBER, ROLE_NON_MEMBER, CREDIT_VALUE } from "../../../constants";
import CheckInModal from "../../components/Modals/CheckInModal";
import { toast, ToastContainer } from "react-toastify";

const ClubDetail = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user);
  const auth = useSelector((state) => state.auth);

  const { isSuccess, message, error, currentClub } = useSelector(
    (state) => state.club
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCheckInModal, setIsCheckInModal] = useState(false);

  const [membership, setMembership] = useState({
    membership: {
      credit: user.membership.credit,
      currentCredit: user.membership.currentCredit,
      status: user.membership.status,
      membershipDate: user.membership.membershipDate,
      membershipEndDate: user.membership.membershipEndDate,
      invoice: user.membership.invoice,
    },
  });

  const [club, setClub] = useState(currentClub);
  const { isLoading, performFetch, cancelFetch } = useFetch(
    `/club/${id}`,
    (response) => {
      const clubCreditFromApi = response.data.club.credit;
      localStorage.setItem("clubCreditFromFetch", clubCreditFromApi);
      setClub(response.data.club);
      setClubCredit(response.data.club.credit);
    }
  );

  const clubCreditFromFetch = localStorage.getItem("clubCreditFromFetch");
  const [clubCredit, setClubCredit] = useState(clubCreditFromFetch);

  useEffect(() => {
    if (auth.user) {
      setMembership(() => ({
        membership: {
          credit: user.membership.credit,
          currentCredit: user.membership.currentCredit - clubCredit,
          status: user.membership.status,
          membershipDate: user.membership.membershipDate,
          membershipEndDate: user.membership.membershipEndDate,
          invoice: [
            ...user.membership.invoice,
            {
              amount: clubCredit * CREDIT_VALUE,
              date: new Date(),
              description: `checked in for ${club?.title}`,
              status: "Outstanding",
            },
          ],
        },
      }));
    }
    performFetch();
    dispatch(setIsClubDetailPage(true));
    return () => {
      cancelFetch();
      dispatch(resetCurrentClub());
    };
  }, [auth.user]);

  useEffect(() => {
    if (error) {
      setIsCheckInModal(false);
      toast.error(error, {
        toastId: "error1",
      });
      setTimeout(() => {
        dispatch(resetError());
      }, 2000);
    }
    if (isSuccess) {
      setIsCheckInModal(false);
      toast.success(
        `You have checked in. You have ${user.membership?.currentCredit} credits left.`,
        {
          toastId: "success1",
        }
      );
      setClub(currentClub);
      dispatch(resetIsSuccess());
    }
  }, [error, isLoading, isSuccess, message, dispatch]);

  const openCheckInModal = () => {
    setIsCheckInModal(true);
  };
  if (isLoading) {
    return <Spinner />;
  }

  const handleCredit = () => {
    navigate("/getMembership");
  };

  return (
    <>
      {club && (
        <div className="club-detail-container">
          <ToastContainer />
          {isCheckInModal && (
            <CheckInModal
              clubTitle={club?.title}
              onCheckIn={() => {
                dispatch(checkIn(club?._id));
                dispatch(updateUser(membership));
              }}
              onCancel={() => setIsCheckInModal(false)}
              clubCredit={club?.credit}
            />
          )}
          <div className="club-detail">
            <img className="club-image" src={club?.image} alt="" />
            <h4 className="club-detail-title">
              Club Name
              <p className="club-detail-info">{club?.title}</p>
            </h4>
            <h4 className="club-detail-title">
              Club Credit
              <p className="club-detail-info">Only {club?.credit} Credit </p>
            </h4>
            <h4 className="club-detail-title">
              Club Owner Name
              <p className="club-detail-info">{club?.admin?.name}</p>
            </h4>
            <h4 className="club-detail-title">
              Organizer Website
              <p className="club-detail-info">
                {club.website ? club.website : "Not available"}
              </p>
            </h4>
            <h4 className="club-detail-title">
              Club Address
              <p className="club-detail-info">
                {club?.address.street} {club?.address.house_number}
                {", "}
                {club?.address.postcode} {club?.address.city}
              </p>
            </h4>

            <h4 className="club-detail-title">
              All About This Club
              <p className="club-detail-info">{club.description}</p>
            </h4>
            {user &&
              club &&
              user.userType === ROLE_MEMBER &&
              user.membership?.currentCredit >= club.credit &&
              user.membership.status === "active" &&
              user.membership?.membershipEndDate > new Date().toISOString() &&
              club.member?._id !== user._id && (
                <div className="club-detail-buttons">
                  <button
                    className="club-detail-checkin-button"
                    onClick={openCheckInModal}
                  >
                    Check in
                  </button>
                </div>
              )}
            {user &&
              club &&
              user.userType === ROLE_MEMBER &&
              user.membership?.currentCredit >= club.credit &&
              user.membership.status === "active" &&
              user.membership?.membershipEndDate > new Date().toISOString() &&
              club.member?._id === user._id && (
                <div className="club-detail-buttons">
                  <button
                    className="club-detail-checkin-button"
                    onClick={openCheckInModal}
                  >
                    Recheck in
                  </button>
                </div>
              )}
            {user &&
              user.userType === ROLE_MEMBER &&
              user.membership?.currentCredit < clubCredit && (
                <div className="club-detail-buttons">
                  <button
                    className="club-detail-checkin-button"
                    onClick={handleCredit}
                  >
                    Get Credit
                  </button>
                </div>
              )}
            {user &&
              user.userType === ROLE_MEMBER &&
              user.membership?.membershipEndDate < new Date().toISOString() && (
                <div className="club-detail-buttons">
                  <p>Your subscription has expired. Please buy new credit.</p>
                  <button
                    className="club-detail-checkin-button"
                    onClick={handleCredit}
                  >
                    Get Credit
                  </button>
                </div>
              )}
            {user && user.userType === ROLE_NON_MEMBER && (
              <p className="club-detail-signup">
                To check in for this club please first be a member{" "}
                <Link to="/getMembership" className="club-detail-signup-here">
                  here
                </Link>
                .
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ClubDetail;
