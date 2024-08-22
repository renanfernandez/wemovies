import { Link } from 'react-router-dom'
import OrderCompletedImage from '../assets/OrderCompleted'

const OrderCompleted = () => {
  return (
    <section className="message-screen">
      <div className="message-screen--content">
        <h2>Compra realizada com sucesso!</h2>
        <OrderCompletedImage />
        <Link className="btn btn--primary" to='/'>VOLTAR</Link>
      </div>
    </section>
  )
}

export default OrderCompleted