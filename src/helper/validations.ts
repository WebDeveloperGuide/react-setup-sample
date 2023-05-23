import Messages from "./messages";

const emailRegex =
  /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Validations = {
  validateEmail: (value: any) => {
    let error;
    if (!value) {
      error = Messages.ERROR.LOGIN;
    } else if (!emailRegex.test(value)) {
      error = Messages.ERROR.LOGIN;
    }
    return error;
  },
  validateLoginForm: (data: any) => {
    const errors: any = {};
    if (!data.email) {
      errors.email = Messages.ERROR.LOGIN;
    } else if (!emailRegex.test(data.email)) {
      errors.email = Messages.ERROR.LOGIN;
    }
    if (!data.password) {
      errors.password = Messages.ERROR.LOGIN;
    }
    return errors;
  },
};

export default Validations;
