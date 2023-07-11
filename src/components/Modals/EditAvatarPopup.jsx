import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { handleAvatarSubmit, isEditAvatarPopupOpen, closeAllPopups } = props;
  const editAvatarInput = useRef(null);

  useEffect(() => {
    editAvatarInput.current.value = "";
  }, [isEditAvatarPopupOpen]);

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onSubmit={(e) => handleAvatarSubmit(e, editAvatarInput.current.value)}
    >
      <input
        ref={editAvatarInput}
        type="url"
        name="avatar"
        className="popup__input popup__input_avatar-url"
        id="user-avatar"
        placeholder="Ссылка на фото"
        autoComplete="off"
        minLength={4}
        maxLength={200}
        required
      />
      <span className="popup__error user-avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
