import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CopyIcon from './svg/CopyIcon'

const Header = ({ password }) => {
  const handleCopyPassword = () => {
    if (!password) return
    navigator.clipboard
      .writeText(password)
      .then(() =>
        toast.success('Copy clipboard', {
          position: 'top-right',
          theme: 'light'
        })
      )
      .catch(() =>
        toast.error('Error to copy clipboard', {
          position: 'top-right',
          theme: 'light'
        })
      )
  }

  return (
    <header>
      <input type='text' readOnly value={password} className='password-copy__input' />
      <CopyIcon handleCopyPassword={handleCopyPassword} />
      <ToastContainer />
    </header>
  )
}

export default Header
