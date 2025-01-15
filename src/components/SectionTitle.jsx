import React from "react";

const SectionTitle = ({title}) => {
    return (
        <div className="text-center">
            <h1 className="inline-block border-b-4 border-blue-600 pb-2 font-serif text-xl font-semibold text-white/60 uppercase tracking-widest">
                {title}
                </h1>
        </div>
    );
};

export default SectionTitle;