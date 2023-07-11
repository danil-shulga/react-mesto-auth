import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [inputsValue, setInputsValue] = useState({ cardTitle: "", imgUrl: "" });
  const { handleAddPlaceSubmit, isAddPlacePopupOpen, closeAllPopups } = props;

  function handleInputChange(e) {
    setInputsValue({ ...inputsValue, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    setInputsValue({ cardTitle: "", imgUrl: "" });
  }, [isAddPlacePopupOpen]);

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onSubmit={(e) => handleAddPlaceSubmit(e, inputsValue)}
    >
      <input
        id="card-title"
        className="popup__input popup__input_card-title"
        name="cardTitle"
        type="text"
        value={inputsValue.cardTitle}
        onChange={handleInputChange}
        placeholder="Название места"
        autoComplete="off"
        minLength={2}
        maxLength={30}
        required
      />
      <span className="popup__error card-title-error" />
      <input
        id="img-url"
        className="popup__input popup__input_img-url"
        name="imgUrl"
        type="url"
        value={inputsValue.imgUrl}
        onChange={handleInputChange}
        placeholder="Ссылка на фото"
        autoComplete="off"
        required
      />
      <span className="popup__error img-url-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
