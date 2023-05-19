import { useSelector } from 'react-redux';

import { useActions } from '../../hooks/useAction';

export function Pagination() {
  const { fetchArticles } = useActions();
  const page = useSelector((state) => state.articleReducer.page);
  const total = useSelector((state) => state.articleReducer.articlesCount);
  const newPerson = useSelector((state) => state.accountReducer.personData);

  const onChange = (e) => {
    fetchArticles(e, newPerson.token);
  };

  return (
    <Pagination
      defaultCurrent={1}
      total={total}
      current={page}
      defaultPageSize={5}
      hideOnSinglePage
      showSizeChanger={false}
      // centered
      onChange={onChange}
      style={{ display: 'inline-block', marginTop: '30px' }}
    />
  );
}
