
import PropTypes from 'prop-types';
import { useAuth } from '../context/AppProvider';
import { useChat } from '../context/ChatProvider';
import { useEffect, useRef } from 'react';


function Message({ message }) {

    const { user } = useAuth();
    const { chatData } = useChat();
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", });
    }, [message]);


    return (
        <>
            <div className={`message px-5  py-3 ${message.senderId === user.uid && "flex flex-row-reverse"}`}>
                <div className={`flex gap-x-2 w-fit ${message.senderId === user.uid && " flex-row-reverse"} `}>
                    <div className="flex flex-col items-center gap-y-1">
                        <span className="w-9 h-9 text-lg cursor-pointer bg-light-fourthBg dark:bg-dark-fourthBg text-light-mainColor dark:text-dark-mainColor rounded-full flex justify-center items-center">
                            {message.senderId === user.uid ? user.displayName.charAt(0).toUpperCase() : chatData.chosenUser.displayName.charAt(0).toUpperCase()}
                        </span>
                        <span className="text-[10px] text-light-secColor dark:text-dark-secColor text-nowrap	">
                            {new Date(message.date.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 w-full max-w-[200px] text-wrap ">
                        <div className={`${message.senderId !== user.uid ? "overflow-y-auto	flex flex-col p-2 bg-light-secBg dark:bg-dark-secBg rounded-xl rounded-tl-sm" : "overflow-y-auto flex flex-col p-2 bg-light-blueColor dark:bg-dark-blueColor rounded-xl rounded-tr-sm"} `}>
                            <p ref={ref} className="text-sm  break-words">{message.text && message.text}</p>
                            {message.file && <img src={message.file} className="w-full" alt="" />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

// for the props validation
Message.propTypes = {
    message: PropTypes.shape({
        senderId: PropTypes.string.isRequired,
        date: PropTypes.shape({
            seconds: PropTypes.number.isRequired,
        }).isRequired,
        text: PropTypes.string,
        file: PropTypes.string,
        id: PropTypes.string,
    }).isRequired,
};


export default Message;

