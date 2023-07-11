import { useCallback, useEffect, useRef, useState } from "react";
import api from "../utils/api";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Modals from "./Modals/Modals.jsx";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // получение данных текущего пользователя
  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => setCurrentUser(res))
      .catch((res) => console.error("ошибка при загрузке профиля", res));
  }, []);

  // изменение аватара
  function handleAvatarSubmit(e, avatar) {
    e.preventDefault();

    api
      .patchUserAvatar({ avatar })
      .then((res) => {
        closeAllPopups();
        setCurrentUser(res);
      })
      .catch((res) => console.error("ошибка при обновлении аватара", res));
  }

  // изменение данных пользователя
  function handleEditProfileSubmit(e, inputsValue) {
    e.preventDefault();

    api
      .patchUserInfo(inputsValue)
      .then((res) => {
        closeAllPopups();
        setCurrentUser(res);
      })
      .catch((res) =>
        console.error("ошибка при обновлении данных профиля", res)
      );
  }

  // получение массива карточек
  useEffect(() => {
    api
      .getCards()
      .then((res) => setCards(res))
      .catch((res) => console.error("ошибка при загрузке карточек", res));
  }, []);

  // добавление карточки
  function handleAddPlaceSubmit(e, inputsValue) {
    e.preventDefault();

    api
      .createCard(inputsValue)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch((res) => console.log("ошибка при добавлении карточки", res));
  }

  // изменение состояния лайка
  const handleCardLikeSubmit = useCallback(
    (currentCard) => {
      const isLiked = currentCard.likes.some(
        (item) => item._id === currentUser._id
      );
      api
        .changeLikeCardStatus(currentCard._id, isLiked)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((card) => (card._id === currentCard._id ? newCard : card))
          );
        })
        .catch((res) => console.error("ошибка при изменении лайка", res));
    },
    [currentUser]
  );

  // удаление карточки
  function handleCardDeleteSubmit(e) {
    e.preventDefault();

    api
      .deleteCard(selectedCard._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((card) => card._id !== selectedCard._id)
        );
        closeAllPopups();
      })
      .catch((res) => console.error("ошибка при удалении карточки", res));
  }

  const popupsProps = {
    cards,
    setCards,
    isEditAvatarPopupOpen,
    handleAvatarSubmit,
    handleAddPlaceSubmit,
    handleEditProfileSubmit,
    handleCardDeleteSubmit,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isConfirmPopupOpen,
    isImagePopupOpen,
    closeAllPopups,
    selectedCard,
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardDeleteClick = useCallback((cardData) => {
    setSelectedCard(cardData);
    setIsConfirmPopupOpen(true);
  }, []);

  const handleCardClick = useCallback((cardData) => {
    setSelectedCard(cardData);
    setIsImagePopupOpen(true);
  }, []);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Main
            cards={cards}
            setCards={setCards}
            handleCardLikeSubmit={handleCardLikeSubmit}
            onCardDeleteClick={handleCardDeleteClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />
          <Footer />

          {/* подключение всех модальных окон одним компонентом */}
          <Modals {...popupsProps} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
