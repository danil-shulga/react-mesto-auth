class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  _request = ({ url, options }) => {
    return fetch(url, options).then(this._checkResponse);
  };

  getCards() {
    return this._request({
      url: `${this._baseUrl}/cards`,
      options: {
        headers: this._headers,
      },
    });
  }

  createCard(cardData) {
    return this._request({
      url: `${this._baseUrl}/cards`,
      options: {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: cardData.cardTitle,
          link: cardData.imgUrl,
        }),
      },
    });
  }

  deleteCard(cardId) {
    return this._request({
      url: `${this._baseUrl}/cards/${cardId}`,
      options: {
        method: "DELETE",
        headers: this._headers,
      },
    });
  }

  getUserInfo() {
    return this._request({
      url: `${this._baseUrl}/users/me`,
      options: {
        headers: this._headers,
      },
    });
  }

  patchUserInfo(userInfo) {
    return this._request({
      url: `${this._baseUrl}/users/me`,
      options: {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: userInfo.name,
          about: userInfo.about,
        }),
      },
    });
  }

  patchUserAvatar(inputsValues) {
    return this._request({
      url: `${this._baseUrl}/users/me/avatar`,
      options: {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: inputsValues.avatar,
        }),
      },
    });
  }

  _addCardLike(cardId) {
    return this._request({
      url: `${this._baseUrl}/cards/${cardId}/likes`,
      options: {
        method: "PUT",
        headers: this._headers,
      },
    });
  }

  _removeCardLike(cardId) {
    return this._request({
      url: `${this._baseUrl}/cards/${cardId}/likes`,
      options: {
        method: "DELETE",
        headers: this._headers,
      },
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this._removeCardLike(cardId) : this._addCardLike(cardId);
  }
}

const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-66`,
  headers: {
    authorization: "0a72cf5d-7ac9-4a3e-a42d-34c747b3547f",
    "Content-Type": "application/json",
  },
});

export default api;
