import PopupWithForm from './PopupWithForm';

const ConfirmDeletePopup = ({ isOpen, onClose, onConfirm, buttonText, deletedCard }) => {

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirm(deletedCard);
  };

  return (
    <PopupWithForm
      name={'confirm'}
      title={'Вы уверены?'}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={buttonText}
      onSubmit={handleConfirm}
      isValid={true}
    />
  );
};

export default ConfirmDeletePopup;