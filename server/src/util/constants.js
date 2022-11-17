export const ROLE_MEMBER = "member";
export const ROLE_ADMIN = "admin";

export const EXPIRES_IN = "2h";
export const RESULT_LIMIT = 4;
export const RESULT_LIMIT_HOMEPAGE = 12;

/* export const STATUS_DONATED = "donated";
export const STATUS_WAITING_DONATION = "waiting donation";
export const STATUS_CANCELED = "deleted";
 */
export const USERNAME_REGEX =
  /^[a-zA-Z]{1}[^#$%^&*(){}[\]+\-|/\\='":<>,.?]{4,25}$/;
export const PASSWORD_REGEX =
  /[A-Z]{1,}[^\s]*[0-9]{1,}[^\s]*[@!#$%^&*.()\-_+?~<>[\]{}]{1,}|[A-Z]{1,}[^\s]*[@!#$%.^&*()\-_+?~<>[\]{}]{1,}[^\s]*[0-9]{1,}|[0-9]{1,}[^\s]*[A-Z]{1,}[^\s]*[@!#$%^&.*()\-_+?~<>[\]{}]{1,}|[0-9]{1,}[^\s]*[@!#$%^&*.()\-_+?~<>[\]{}]{1,}[^\s]*[A-Z]{1,}|[@!#$%^&*.()\-_+?~<>[\]{}]{1,}[^\s]*[0-9]{1,}[^\s]*[A-Z]{1,}|[@!#$%^.&*()\-_+?~<>[\]{}]{1,}[^\s]*[A-Z]{1,}[^\s]*[0-9]{1,}/;
export const EMAIL_REGEX = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9.]+\.[a-z]{2,3}$/;
/* export const DONATION_NOTIFICATION = "donation";
export const CANCELATION_NOTIFICATION = "cancelation";
export const UPDATE_NOTIFICATION = "update"; */
/* export const RESULT_LIMIT = 4;
export const RESULT_LIMIT_HOMEPAGE = 12; */
