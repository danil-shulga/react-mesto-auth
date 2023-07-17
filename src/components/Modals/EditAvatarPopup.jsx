import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function EditAvatarPopup(props) {
  const { handleAvatarSubmit, isEditAvatarPopupOpen, closeAllPopups } = props;
  // не получилось сделать валидацию для неуправляемого инпута по этому переделал его в управляемый 
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  // const editAvatarInput = useRef(null);

  // useEffect(() => {
  //   editAvatarInput.current.value = "";
  // }, [isEditAvatarPopupOpen]);

  // useEffect(() => {
  //   console.log('asd')
  // },[editAvatarInput.current.value])

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      isOpen={isEditAvatarPopupOpen}
      resetForm={resetForm}
      isValid={isValid}
      onClose={closeAllPopups}
      onSubmit={(e) => handleAvatarSubmit(e, values.avatar)}
    >
      <input
        // ref={editAvatarInput}
        value={values.avatar || ''}
        onChange={handleChange}
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
      <span className="popup__error">{errors.avatar}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
