import ReactModal from 'react-modal';
import React from "react";

function Modal({tittle, openModal, confirmClick, cancelClick}){

    ReactModal.setAppElement(document.getElementById('section'));

    let onAfterOpen = ()=>{
      let bar = document.getElementById('bar-container');
      bar.style.display = 'none';
    }

    let onAfterClose = ()=>{
      let bar = document.getElementById('bar-container');
      bar.style.display = 'block';
    }

    return(
      <div>
        <ReactModal 
            parentSelector={()=>document.body} 
            appElement={document.body}
            isOpen={openModal}
            onAfterOpen={onAfterOpen}
            onAfterClose={onAfterClose}>
            <h1>{tittle}</h1>
            <div className='btn-container'>
              <button onClick={confirmClick} className='btn btn-confirm'>Confirm</button>
              <button onClick={cancelClick} className='btn btn-cancel'>Cancel</button>
            </div>
        </ReactModal>
      </div>
    );
};
export default Modal;
