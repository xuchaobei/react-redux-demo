import React from 'react';

const ArticleList = (props) => {
  const { articles } = props;

  // 列表渲染，列表中的每一项要设置 key
  return articles.map((item) => {
    const { id, title } = item;
    return <div key={id}> {title}</div>;
  });

};

// class ArticleList extends React.Component {
//   render() {
//     const { articles } = this.props;
//     return articles.map((item) => {
//       const { title } = item;
//       return <div> {title}</div>;
//     });
//   }
// }

export default ArticleList;
