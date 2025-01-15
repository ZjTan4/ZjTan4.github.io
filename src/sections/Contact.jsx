import React from "react";
import SectionTitle from "../components/SectionTitle";

import contactImage from "../assets/contact.svg";
import { contactDetails } from "../constants";
import ContactDetailCard from "../components/ContactDetailCard";

const Contact = () => {
    return (
        <section className="px-4 py-16 lg:py-20" id="contact">
            <SectionTitle title="Contact Me" />
            <div className="container mt-10 flex flex-col gap-10 rounded-2xl border-2 border-white/10 bg-white/5 p-10 md:flex-row">
                <div className="flex flex-1 items-center justify-center">
                    <img 
                        src={contactImage} 
                        alt="Contact Image"
                        className="h-40"
                    />
                </div>
                <div className="flex flex-1 flex-col gap-5">
                    <h1 className="font-serif text-2xl font-bold text-white/70">Get in Touch</h1>
                    <p className="text-white/60">
                        Have a question or want to work together? Feel free to reach out to me. I'm always open to new opportunities and collaborations.
                    </p>
                    <div className="flex flex-col gap-4">
                        {contactDetails.map((contact) => (
                            <div>
                                <ContactDetailCard contact={contact}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;