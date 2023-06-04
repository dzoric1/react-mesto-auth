import success from '../assets/images/success.svg'
import failure from '../assets/images/failure.svg'

const InfoTooltip = () => {
  return (
    <div className="popup popup_type_info">
      <div className="popup__container popup__container_info">
        <button className="popup__close" type="button" aria-label="Закрыть попап"></button>
        <img className='popup__info-icon' src={failure} alt="Успешно" />
        <p className='popup__info-text'>Что-то пошло не так!
          Попробуйте ещё раз!</p>
      </div>
    </div>
  )
}

export default InfoTooltip