export const getAuthUser = () =>
  localStorage.getItem("user_data") ? JSON.parse(localStorage.getItem("user_data")) : null;

export const getUserTimeZone = (data: any) => {
  let timezone = "";
  let userData = data;
  if (!userData) {
    userData = getAuthUser();
  }
  if (userData?.connect_preferences && userData?.connect_preferences.length) {
    const getTimeZone = userData.connect_preferences.find(
      (obj: any) => obj.preference_type === "TIMEZONE"
    );
    if (getTimeZone && getTimeZone.preference_value) {
      timezone = getTimeZone.preference_value;
    }
  }
  return timezone;
};

export const getPreferenceValue = (data: any, preferenceType: string) => {
  let preferenceValue: any = null;
  let userData = data;
  if (!userData) {
    userData = getAuthUser();
  }
  if (userData?.connect_preferences && userData?.connect_preferences.length) {
    const getPreference = userData.connect_preferences.find(
      (obj: any) => obj.preference_type === preferenceType
    );
    if (getPreference && getPreference.preference_value) {
      preferenceValue = getPreference.preference_value;
    }
  }
  return preferenceValue;
};

export const updateUserData = async (
  data?: any,
  updateStorage?: boolean,
  key?: string,
  value?: any
) => {
  let userData = data;
  if (!userData) {
    userData = getAuthUser();
  }
  if (key) {
    userData[key] = value;
  }
  if (updateStorage) {
    localStorage.setItem("user_data", JSON.stringify(userData));
  }
  return userData;
};

export const userRoles = {
  SYSTEM_ADMIN: "System Admin",
  ADMIN: "Admin",
  FRANCHISEE: "Franchisee",
  LEAEASING: "Leasing",
  MARKETING: "Marketing",
  ACCOUNTING: "Accounting",
  LEASE_APPLICANT: "Lease Applicant",
  
};

export const userRoleAlias = {
  MARKETING: "dashboard_marketing",
  FRANCHISEE: "dashboard_franchisee",
  
};

export const subSting = (string: string, length = 10) => {
  if (!string) return "";
  let subSting = string.substring(0, length);
  if (string.length > length) {
    subSting += `...`;
  }
  return subSting;
};

export const removeSpecialCharacters = (string = "") =>
  string.replace(/[^\w\s]/gi, "-").toLowerCase();

export const capitalizeFirstLetter = (string = "") =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const phoneNumberformat = (value: string) => {
  if (value) {
    const number = value
      .replaceAll("+", "")
      .replaceAll("-", "")
      .replace(/[^0-9]/gi, "");
    return `+(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(
      6,
      number.length
    )}`;
  }
  return "-";
};

// function scrolls to particular section on click of menu / button
export const ScrollToSection = (id: string) => {
  const headerHeight = document.getElementById("mainHeader").offsetHeight + 25;

  const anchor = document.getElementById(id).offsetTop - headerHeight;
  if (anchor) {
    window.scrollTo({ top: anchor, behavior: "smooth" });
  }
};

// return error message from error array
export const getErrorMessage = (error: any) => {
  let msg = "";
  Object.entries(error).forEach((v: any) => {
    if (v[0] && v[1] && v[1].length) {
      if (msg) {
        msg += ", ";
      }
      msg += `${v[0]} ${v[1].join()}`;
    }
  });
  return msg;
};

// convert file to base64
export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// display multiple dropdown values in view or listing page.
export const displayMultipleValue = (obj: any) => {
  if (obj && obj.length > 0) {
    return obj
      .map((val: any) => val.name)
      .join(", ")
      .replace(/, ([^,]*)$/, " and $1");
  }
  return "-";
};

export const displayMultipleValueWithName = (obj: any, name: string) => {
  if (obj && obj.length > 0) {
    return obj
      .map((val: any) => val[name])
      .join(", ")
      .replace(/, ([^,]*)$/, " and $1");
  }
  return "-";
};

/* Return FormData Value */
export const getValue = (value: any) => {
  let filteredValue: any = "";
  if (!value) {
    if (String(value) === "0") {
      filteredValue = 0;
    } else if (typeof value === "boolean") {
      filteredValue = false;
    }
  } else if (Array.isArray(value) && !value.length) {
    filteredValue = [];
  } else if (typeof value === "object" && !Object.keys(value).length) {
    filteredValue = {};
  } else if (value) {
    filteredValue = value;
  }
  return filteredValue;
};

export const getMUISelectValue = (value: any) => {
  let returnValue: any = false;
  if (typeof value === "undefined") {
    returnValue = "";
  } else if (value === "true" || value === true) {
    returnValue = true;
  }
  return returnValue;
};

// function scrolls to particular error
export const scrollToError = (errors: any) => {
  const catchedInputErrorElement = document.querySelector(`input[name=${Object.keys(errors)[0]}]`);
  catchedInputErrorElement.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "start",
  });
};

// function scrolls to particular error
export const scrollToErrorByClass = (errors: any) => {
  let catchedInputErrorElement = document.querySelector(`input[name=${Object.keys(errors)[0]}]`);
  if (!catchedInputErrorElement) {
    [catchedInputErrorElement] = document.getElementsByClassName(`${Object.keys(errors)[0]}`);
  }
  if (catchedInputErrorElement) {
    catchedInputErrorElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }
};

export const getLocationTabs = () => {
  let tabs = [];
  const { access } = getAuthUser();
  if (access && access?.length > 0) {
    const getLocation = access.find((obj: any) => obj.alias === "locations");
    if (getLocation && getLocation?.child_menu?.length > 0) {
      const loca = getLocation?.child_menu?.find((obj: any) => obj.alias === "locations_location");
      if (loca?.page_sections?.length) {
        tabs = loca?.page_sections;
      }
    }
  }
  return tabs;
};

export const getFranchiseeFlag = () => {
  let flag = false;
  const { roleDetails } = getAuthUser();
  if (roleDetails && roleDetails?.franchisee_flag) {
    flag = true;
  }
  return flag;
};

export const getAssociationLocations = () => {
  const userData = getAuthUser();
  let locations: any = [];
  if (localStorage.getItem("selected_locations")) {
    locations = JSON.parse(localStorage.getItem("selected_locations"));
  }
  return {
    get_location_by_ids:
      userData?.role === userRoles.ADMIN || userData?.role === userRoles.SYSTEM_ADMIN
        ? null
        : locations.length
        ? [...new Set(locations)]
        : false,
  };
};

export const getAllAssociationLocations = () => {
  const userData = getAuthUser();
  const locations: any = [];
  userData.connect_associations.map((val: any) => {
    val.locations.map((v: any) => {
      if (locations.indexOf(v.id) === -1) {
        locations.push(v.id);
      }
      return true;
    });
    return true;
  });
  return {
    get_location_by_ids:
      userData?.role === userRoles.ADMIN || userData?.role === userRoles.SYSTEM_ADMIN
        ? null
        : locations.length
        ? [...new Set(locations)]
        : false,
  };
};

export const getAssociationOwnersAndUsers = (addOwnerStatus: any) => {
  const userData: any = getAuthUser();
  let users: any = [];
  if (userData?.role === userRoles.ADMIN || userData?.role === userRoles.SYSTEM_ADMIN) {
    users = null;
  } else if (userData && userData?.connect_associations) {
    userData?.connect_associations.map((association: any) => {
      if (association?.users?.length) {
        users = [...users, ...association.users];
      }
      if (addOwnerStatus && association?.owners?.length) {
        users = [...users, ...association.owners];
      }
      return true;
    });
  }
  return { users: users ? [...new Set(users)] : null };
};

export const getShortName = (locationFullName: string) => {
  if (!locationFullName) {
    return "-";
  }
  const word = locationFullName.split(" ");
  let shortName = "";
  if (word.length === 2) {
    shortName = word[0].charAt(0) + word[1].charAt(0);
  }
  if (word.length === 3) {
    shortName = word[0].charAt(0) + word[1].charAt(0) + word[2].charAt(0);
  }
  if (word.length === 1 || word.length > 3) {
    shortName = word[0].substring(0, 3);
  }
  return shortName.toUpperCase();
};

// add remove days months and years
export const minusDays = (date: any, number: number) => {
  const newDate = new Date(date);
  return new Date(newDate.setDate(date.getDate() - number));
};

export const addDays = (date: any, number: number) => {
  const newDate = new Date(date);
  return new Date(newDate.setDate(date.getDate() + number));
};

export const addMonths = (date: any, number: number) => {
  const newDate = new Date(date);
  return new Date(newDate.setMonth(newDate.getMonth() + number));
};

export const addYears = (date: any, number: number) => {
  const newDate = new Date(date);
  return new Date(newDate.setFullYear(newDate.getFullYear() + number));
};

export const blockInvalidChar = (e: any) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
