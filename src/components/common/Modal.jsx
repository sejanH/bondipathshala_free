

const Modal = ({ title = 'Notice!', message , showHtml = false, bgColor='warning', customWidth='',hideCloseBtn = false }) => {
    return (
        <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal modal-middle modal-bottom">
                <div className={`modal-box relative bg-${bgColor} ${customWidth}`}>
                    {!hideCloseBtn && (<label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>)}
                    <h3 className="text-lg font-bold md:mt-2">{title}</h3>
                    {
                        showHtml ? (<div className="py-4" dangerouslySetInnerHTML={{__html:message}}></div>) :(<p className="py-4">{message}</p>)
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Modal