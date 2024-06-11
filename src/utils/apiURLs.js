//Group Related API

// Define base URLs
export const USER_BASE_URL = "/user";
export const GROUP_BASE_URL = "/group";

// User URLs
export const USER_GROUPS_URL = `${USER_BASE_URL}/get-user-groups`;

// Group URLs
export const CREATE_GROUP_URL = `${GROUP_BASE_URL}/create`;
export const FETCH_GROUP_DETAILS_URL = (groupId) => `${GROUP_BASE_URL}/fetch-group-details/${groupId}`;
export const FETCH_GROUP_MESSAGES_URL = (groupId) => `${GROUP_BASE_URL}/fetch-group-messages/${groupId}?page=1&limit=20`;
export const UPDATE_GROUP_DETAILS_URL = `${GROUP_BASE_URL}/update-group-details`;
export const NEAREST_GROUP_URL = (coordinates) => `${GROUP_BASE_URL}/nearest-group?latitude=${coordinates[0]}&longitude=${coordinates[1]}`;
export const ADD_USER_URL = `${GROUP_BASE_URL}/add-user`;
export const REMOVE_USER_URL = `${GROUP_BASE_URL}/remove-user`;
export const MAKE_GROUP_PERMANENT_URL = `${GROUP_BASE_URL}/make-group-permanent`;
export const FETCH_NEARBY_USERS_URL = (body) => `${GROUP_BASE_URL}/fetch-nearby-users?latitude=${body?.latitude}&longitude=${body?.longitude}&karma_need=${body?.karma}`;
export const CHECK_GROUP_NAME_UNIQUENESS_URL = (name) => `${GROUP_BASE_URL}/is-group-unique?name=${name}`;
export const LEAVE_GROUP_URL = `${GROUP_BASE_URL}/remove-user`;



// AUTH APIs
// Define base URLs
export const AUTH_BASE_URL = "/authentication";

// Authentication URLs
export const LOGIN_URL = `${AUTH_BASE_URL}/login`;
export const REGISTER_URL = `${AUTH_BASE_URL}/register`;
export const LOGOUT_URL = `${AUTH_BASE_URL}/logout`;

// User URLs
export const UPDATE_USER_LOCATION_URL = `${USER_BASE_URL}/update-user-location`;
export const LOAD_USER_URL = `${USER_BASE_URL}/me`;
export const FETCH_CITIES_LIST_URL = `${USER_BASE_URL}/fetch-cities`;




// Chat API URLs

export const GET_USER_CHATS_URL = `${USER_BASE_URL}/get-user-groups`;
export const GET_CHAT_MESSAGES_URL = (groupId, page) => `${GROUP_BASE_URL}/fetch-group-messages/${groupId}?page=${page}&limit=30`;