import { Button, Popconfirm } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useActions } from '../../../../hooks/useAction';

export const Confirm = () => {
  const { deleteArticle } = useActions();
  let navigate = useNavigate();
  const item = useSelector((state) => state.articleReducer.getArticle.openedItem);

  const confirm = () => {
    deleteArticle({ slug: item.slug, token: localStorage.getItem('token') });
    return navigate('/');
  };

  return (
    <Popconfirm
      placement="right"
      title="Are you sure to delete this article?"
      message=""
      // description="Are you sure to delete this article?"
      onConfirm={confirm}
      onCancel={() => {}}
      okText="Yes"
      cancelText="No"
    >
      <Button danger>Delete</Button>
    </Popconfirm>
  );
};
