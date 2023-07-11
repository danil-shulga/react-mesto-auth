import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const { handleEditProfileSubmit, isEditProfilePopupOpen, closeAllPopups } = props;
  const  currentUser = useContext(CurrentUserContext);
  const [inputsValue, setInputsValue] = useState({
    name: " ",
    about: " ",
  });

  useEffect(() => {
    setInputsValue({
      name: currentUser.name || " ",
      about: currentUser.about || " ",
    });
  }, [currentUser, isEditProfilePopupOpen]);

  function handleInputChange(evt) {
    setInputsValue({ ...inputsValue, [evt.target.name]: evt.target.value });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onSubmit={(e) => handleEditProfileSubmit(e, inputsValue)}
    >
      <input
        id="user-name"
        type="text"
        name="name"
        value={inputsValue.name}
        className="popup__input popup__input_text_user-name"
        placeholder="Имя"
        autoComplete="off"
        required
        minLength={2}
        maxLength={40}
        onChange={handleInputChange}
      />
      <span className="popup__error user-name-error" />
      <input
        id="user-description"
        type="text"
        name="about"
        value={inputsValue.about}
        className="popup__input popup__input_text_user-description"
        placeholder="О себе"
        autoComplete="off"
        required
        minLength={4}
        maxLength={200}
        onChange={handleInputChange}
      />
      <span className="popup__error user-description-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
