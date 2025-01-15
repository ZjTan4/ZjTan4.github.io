import React from "react";

const ContactDetailCard = ({contact}) => {
    return (
        <div className="flex items-center gap-3">
            <span>{contact.icon}</span>
            {contact.link ? (
                <a href={contact.link} className="text-blue-500 hover:underline">{contact.value}</a>
            ) : (
                <span className="text-white/70">{contact.value}</span>
            )}
        </div>
    );
};

export default ContactDetailCard;