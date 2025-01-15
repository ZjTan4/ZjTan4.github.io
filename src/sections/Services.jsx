import React from "react";
import SectionTitle from "../components/SectionTitle";
import { services } from "../constants";
import ServiceCard from "../components/ServiceCard";

const Services = () => {
    return (
        <section className="py-16" id="services">
            <SectionTitle title="My Services" />
            <div className="container mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                {services.map((service) => (
                    <div key={service.title}>
                        <ServiceCard service={service} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;