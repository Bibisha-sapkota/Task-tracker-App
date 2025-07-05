import React from 'react';

const Button = ({ type, onClick }) => {
  const baseclasses = "text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-offset";

  const styles = {
    add: "bg-green-500 hover:bg-green-600 focus:ring-green-400",
    delete: "bg-red-500 hover:bg-red-600 focus:ring-red-400",
  };

  return (
    <button
      className={`${baseclasses} ${styles[type] || styles.add}`}//||= default add gari raw xa
      onClick={onClick}
      type="button"
    >
      {type === 'delete' ? 'Delete Button' : 'Add Button'}
    </button>
  );
};

export default Button;
