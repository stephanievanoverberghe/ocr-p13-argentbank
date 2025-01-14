import PropTypes from 'prop-types';

function Features({ children }) {
    return (
        <section className="px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{children}</div>
        </section>
    );
}

Features.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Features;
