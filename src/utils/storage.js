export const getComplaints = () =>
    JSON.parse(localStorage.getItem('complaints') || '[]');
  
  export const saveComplaints = (complaints) =>
    localStorage.setItem('complaints', JSON.stringify(complaints));
  
  export const getAdminSession = () =>
    localStorage.getItem('isAdmin') === 'true';
  
  export const setAdminSession = (value) =>
    localStorage.setItem('isAdmin', value ? 'true' : 'false');
  
  export const getAdminPassword = () =>
    localStorage.getItem('adminPassword') || 'admin123';
  
  export const setAdminPassword = (password) =>
    localStorage.setItem('adminPassword', password);
  
  export const getDarkMode = () =>
    localStorage.getItem('darkMode') === 'true';
  
  export const setDarkMode = (value) =>
    localStorage.setItem('darkMode', value ? 'true' : 'false');
  