import { Button, Popconfirm } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import { useActions } from '../../../../hooks/useAction';

export const Confirm = () => {
   // const { deleteArticle } = useActions();
   let navigate = useNavigate();
   const item = useSelector((state) => state.articleReducer.getArticle.openedItem);

   const confirm = () => {
      // deleteArticle({ slug: item.slug, token: localStorage.getItem('token') }).then((res) => {
      //    console.log(res);
      //    if (res.ok) return navigate('/');
      // });
      fetch(`https://blog.kata.academy/api/articles/${item.slug}`, {
         method: 'DELETE',
         headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         },
      }).then((res) => {
         console.log(res);
         if (res.ok) return navigate('/');
      });
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
