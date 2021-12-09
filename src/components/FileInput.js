import React from 'react';

const TextInput = (props) => {
  return (
    <div
      className={`custom file-field`}
      style={props.ContainerStyle}
    >
      <div
        className="btn"
      >
        <span>{props.label}</span>
        <input
          style={props.ButtonStyle}
          type="file"
          onChange={props.onChange}
          className={`${props.name} files`}
          accept={props.accept}
          multiple={props.multiple}
        />
      </div>
    </div>
  );
};

export default TextInput;