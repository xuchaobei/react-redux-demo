import React, { useState } from 'react';

const AddPostForm = (props) => {
  const { onSubmit } = props;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'content') {
      setContent(e.target.value);
    }
  };

  const handleSave = () => {
    if (title.length > 0 && content.length > 0) {
      onSubmit({ title, content });
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="title">Post Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={handleChange}
        />
        <button type="button" className="button" onClick={handleSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
