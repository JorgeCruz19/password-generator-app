import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CopyIcon from './svg/CopyIcon'

const Header = ({ password }) => {
  const handleCopyPassword = () => {
    if (!password) {
      toast.info('First generate a password to copy', {
        position: 'top-right',
        theme: 'light',
      })
      return
    }
    navigator.clipboard
      .writeText(password)
      .then(() =>
        toast.success('Copy to clipboard', {
          position: 'top-right',
          theme: 'light',
        })
      )
      .catch(() =>
        toast.error('Error when copying to clipboard', {
          position: 'top-right',
          theme: 'light',
        })
      )
  }

  return (
    <header>
      <input type='text' readOnly value={password} className='password-copy__input' />
      <CopyIcon handleCopyPassword={handleCopyPassword} />
    </header>
  )
}

export default Header
