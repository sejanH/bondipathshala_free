const Toast = ({message, cssClass,position='top',alignment='end'}) => {
    return (<>
        {message && (<div className={`z-50 toast toast-${position} toast-${alignment}`}>
            <div className={`alert alert-${cssClass}`}>
                <div>
                    <span>{message}</span>
                </div>
            </div>
        </div>)}
    </>
    );
}
export default Toast;