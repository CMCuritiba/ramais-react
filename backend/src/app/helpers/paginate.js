const paginate = (query, { page, pageSize }) => {
  if (!page || page < 1) page = 1;

  page -= 1;

  const offset = page * pageSize;
  const limit = pageSize;

  return {
    ...query,
    offset,
    limit,
  };
};

export default paginate;
