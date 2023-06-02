import useValidationForm from "../utils/useValidationForm";
import PopupWithForm from "./PopupWithForm"

const EditAvatarProfilePopup = ({ isOpen, onClose, onUpdateAvatar, buttonText }) => {

  const { inputValues, errors, isValid, handleChange, resetForm } = useValidationForm()


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputValues);
  }


  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={buttonText}
      onSubmit={handleSubmit}
      isValid={isValid}
      resetForm={resetForm}
    >
      <label className="popup__fieldset">
        <input
          className="popup__form-input popup__form-input_type_avatar"
          type="url"
          placeholder="Ссылка на аватар"
          name="avatar"
          required
          value={inputValues.avatar || ''}
          onChange={handleChange}
        />
        <span className="popup__input-error avatar-error">{errors.avatar}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarProfilePopup