const USERS_KEY = 'users';
const CURRENT_KEY = 'currentUser';

export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY) || '[]';
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(user) {
  const users = getUsers();
  const exists = users.some((u) => u.email.toLowerCase() === user.email.toLowerCase());
  if (exists) {
    return { success: false, message: 'Account already exists' };
  }
  const id = Date.now();
  const newUser = { id, ...user };
  users.push(newUser);
  saveUsers(users);
  return { success: true, user: newUser };
}

export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());
  if (!user) {
    return { success: false, code: 'not_found' };
  }
  if (user.password !== password) {
    return { success: false, code: 'wrong_password' };
  }
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_KEY);
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function isAuthenticated() {
  return !!getCurrentUser();
}
