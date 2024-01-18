import { useState } from 'react';
import PropTypes from 'prop-types';

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event) => setValue(event.target.value);
  return { value, onChange: handleChange, reset: () => setValue('') };
};

const NewBlogForm = ({ createBlog }) => {
  const title = useFormInput('');
  const author = useFormInput('');
  const url = useFormInput('');

  const addBlog = (event) => {
    event.preventDefault();

    // Client-side validation
    if (!title.value || !author.value || !url.value) {
      alert('All fields are required');
      return;
    }

    createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    });

    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <form onSubmit={addBlog}>
      <h2>Create a new blog</h2>
      {/* Form inputs using the useFormInput hook */}
      <input placeholder="Title" {...title} />
      <input placeholder="Author" {...author} />
      <input placeholder="URL" {...url} />
      <button type="submit">Create</button>
    </form>
  );
};

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
};

export default NewBlogForm;
