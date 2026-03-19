const pages = {
  home: false,
  perfil: false,
  friends: false,
  photo: false,
  config: false,
  logout: false,
};

export const activePage = (page: keyof typeof pages) => {
  return page ? { ...pages, [page]: true } : page;
};
