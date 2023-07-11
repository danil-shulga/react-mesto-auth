import React from "react";

function PopupWithForm(props) {
  const { name, title, buttonText, isOpen, onClose, onSubmit, children } = props;
  return (
    <div
      className={`popup popup_${name} ${isOpen && "popup_opened"}`}
      onMouseDown={onClose}
    >
      <div
        className="popup__container"
        onMouseDown={(evt) => evt.stopPropagation()}
      >
        <form
          className="popup__form"
          name={`${name}`}
          action="/"
          method="post"
          noValidate=""
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__btn-save" type="submit">
            {buttonText || 'Сохранить'}
          </button>
        </form>
        <button
          className="popup__btn-close"
          type="reset"
          aria-label="закрыть без сохранения"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
