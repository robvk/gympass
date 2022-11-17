import React from "react";
import "./invoice.css";
import { useSelector } from "react-redux";

const Invoice = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const getDateTime = (date, days) => {
    const membershipDate = new Date(date);
    membershipDate.setDate(membershipDate.getDate() + days);
    return `${membershipDate.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}  ${membershipDate.toLocaleTimeString("en-GB").slice(0, 5)}`;
  };

  const dueDate = getDateTime(user.membership.invoice[0].date, 7);

  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  const a = new Date(),
    b = new Date(dueDate),
    difference = dateDiffInDays(a, b);

  return (
    <>
      <div className="invoice-container">
        <h1>INVOICE</h1>
        <h2>Membership Credit: {user.membership.currentCredit}</h2>
        <h2>
          Membership Start Date:{" "}
          {getDateTime(user.membership.membershipDate, 0)}
        </h2>
        <h2>
          Membership End Date:{" "}
          {getDateTime(user.membership.membershipEndDate, 0)}
        </h2>

        {difference > 0 ? (
          <h2>Invoice Payment Status: {user.membership.invoice[0].status}</h2>
        ) : (
          <h2>Invoice Payment Status: Unpaid</h2>
        )}
        <h2>
          Invoice Payment Due Date:{" "}
          {getDateTime(user.membership.invoice[0].date, 7)}
        </h2>
        <div>
          {user.membership.invoice.map((invoice) => (
            <p key={user.membership.invoice._id}>
              €{invoice.amount} spent and {invoice.description} on{" "}
              {getDateTime(invoice.date, 0)}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Invoice;
