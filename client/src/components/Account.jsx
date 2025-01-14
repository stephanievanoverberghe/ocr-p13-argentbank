import PropTypes from 'prop-types';

function Account({ title, amount, description }) {
    return (
        <section className="flex justify-between items-center border-[1px] border-black bg-white w-[80%] mx-auto flex-col md:flex-row p-6 mb-8 text-left">
            <div className="w-full flex-1 text-[#2C3E50]">
                <h3>{title}</h3>
                <p className="text-4xl font-bold">{amount}</p>
                <p>{description}</p>
            </div>
            <div className="w-full mt-4 md:mt-0 md:w-auto">
                <button className="bg-[#00bc77] text-white px-4 py-2 font-bold w-full">View transactions</button>
            </div>
        </section>
    );
}

Account.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Account;
