const paginate = ({ items, page, pageSize }) => {
  const pag = page || 1;
  const pagSize = pageSize || 10;
  const offset = (page - 1) * pagSize;

  const paginatedItems = items.slice(offset).slice(0, pagSize);
  const totalPages = Math.ceil(items.length / pagSize);

  return {
    _page: pag,
    pagSize,
    prePage: pag - 1 ? pag - 1 : null,
    nextPage: totalPages > pag ? pag + 1 : null,
    count: items.length,
    totalPages,
    data: paginatedItems,
  };
};

export default paginate;
