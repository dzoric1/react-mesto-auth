import { useState, useEffect, } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarProfilePopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';

import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import auth from '../utils/Auth';


function App() {

  const [cards, setCards] = useState([])
  const [isProfileEditPopupOpen, setProfileEditPopupOpen] = useState(false)
  const [isAddCardPopupOpen, setisAddCardPopupOpen] = useState(false)
  const [isAvatarEditPopupOpen, setIisAvatarEditPopupOpen] = useState(false)
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [deletedCard, setDeletedCard] = useState({ _id: '' })
  const [currentUser, setCurrentUser] = useState({})

  const [editButtonText, setEditButtonText] = useState('Сохранить')
  const [addButtonText, setAddButtonText] = useState('Создать')
  const [avatarButtonText, setAvatarButtonText] = useState('Сохранить')
  const [confirmButtonText, setConfirmButtonText] = useState('Вы уверены?')

  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getCards(),
    ])
      .then(([userData, cardsData]) => {
        setCards(cardsData)
        setCurrentUser(userData)
      })
      .catch(err => console.warn(err))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    auth.checkToken(localStorage.getItem('token'))
      .then(({ data }) => {
        setEmail(data.email)
        setIsLoggedIn(true)
        navigate('/')
      })
      .catch(err => console.warn(err))
  }, [])

  function handleProfileEditClick() {
    setProfileEditPopupOpen(true)
  }

  function handleAddCardClick() {
    setisAddCardPopupOpen(true)
  }

  function handleAvatarClick() {
    setIisAvatarEditPopupOpen(true)
  }

  function handleDeleteCardClick(id) {
    setConfirmDeletePopupOpen(true)
    setDeletedCard(id)
  }

  function closeAllPopups() {
    setIisAvatarEditPopupOpen(false)
    setisAddCardPopupOpen(false)
    setProfileEditPopupOpen(false)
    setConfirmDeletePopupOpen(false)
    setInfoToolTipPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleLikeClick(card, isLiked) {
    if (isLiked) {
      api.toggleLike(card._id, 'DELETE')
        .then(newCard => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.warn(err))
    } else {
      api.toggleLike(card._id, 'PUT')
        .then(newCard => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.warn(err))
    }
  }

  function handleCardDelete(id) {
    setConfirmButtonText('Удаление...')
    api.deleteCard(id)
      .then(() => {
        setCards(cards.filter(card => card._id !== id))
        closeAllPopups()
      })
      .catch(err => console.warn(err))
      .finally(() => setConfirmButtonText('Вы уверены?'))
  }

  function handleUpdateUser(userData) {
    setEditButtonText('Сохранение...')
    api.patchUserInfo(userData)
      .then(newUserData => {
        setCurrentUser(newUserData)
        closeAllPopups()
      })
      .catch(err => console.warn(err))
      .finally(() => setEditButtonText('Сохранить'))
  }

  function handleUpdateAvatar(avatar) {
    setAvatarButtonText('Сохранение...')
    api.updateAvatar(avatar)
      .then(newUserData => {
        setCurrentUser(newUserData)
        closeAllPopups()
      })
      .catch(err => console.warn(err))
      .finally(() => setAvatarButtonText('Сохранить'))
  }

  function handleAddCardSubmit(card) {
    setAddButtonText('Создание...')
    api.addCard(card)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.warn(err))
      .finally(() => setAddButtonText('Создать'))
  }

  function handleRegisterSubmit(data) {
    auth.register(data)
      .then(() => {
        navigate('/sign-in')
        setIsSuccess(true)
      })
      .then(() => {
        setInfoToolTipPopupOpen(true)
      })
      .catch(err => {
        setIsSuccess(false)
        setInfoToolTipPopupOpen(true)
        console.log(err)
      })
  }

  function handleLoginSubmit(data) {
    const email = data.email

    auth.login(data)
      .then((data) => {
        localStorage.setItem('token', data.token)
        setIsLoggedIn(true)
        setEmail(email)
        navigate('/')
      })
      .catch(err => {
        setIsSuccess(false)
        setInfoToolTipPopupOpen(true)
        console.log(err)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header email={email} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Main
                  onEditProfile={handleProfileEditClick}
                  onAddCard={handleAddCardClick}
                  onAvatarEdit={handleAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleLikeClick}
                  onCardDeleteClick={handleDeleteCardClick}
                  cards={cards}
                  isLoading={isLoading}
                />

                <Footer />

                <EditProfilePopup
                  isOpen={isProfileEditPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  buttonText={editButtonText}
                />

                <AddCardPopup
                  isOpen={isAddCardPopupOpen}
                  onClose={closeAllPopups}
                  onAddCard={handleAddCardSubmit}
                  buttonText={addButtonText}
                />

                <EditAvatarProfilePopup
                  isOpen={isAvatarEditPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                  buttonText={avatarButtonText}
                />

                <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopups}
                />

                <ConfirmDeletePopup
                  isOpen={isConfirmDeletePopupOpen}
                  onClose={closeAllPopups}
                  onConfirm={handleCardDelete}
                  buttonText={confirmButtonText}
                  deletedCard={deletedCard}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegisterSubmit} />}
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLoginSubmit} />}
          />
        </Routes>

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoToolTipPopupOpen}
          isSuccess={isSuccess}
        />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App