const Notification = ({message}) => {
  let typ = message.type==='error' ? 'error' : 'success'

if(message.msg===null){
    return null
  }
  return (
    <div className={typ}>{message.msg}</div>
  )
}

export default Notification