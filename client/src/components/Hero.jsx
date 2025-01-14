function Hero() {
    return (
        <div
            className="bg-cover bg-no-repeat bg-center h-[300px] relative md:h-[400px] md:bg-[position:0_33%]"
            style={{ backgroundImage: "url('/src/assets/images/bank-tree.jpeg')" }}
        >
            <section className="relative top-8 w-[200px] bg-white p-8 text-left my-0 mx-auto md:absolute md:top-[50px] md:right-[50px] md:w-[300px] md:m-8">
                <p className="font-bold text-base m-0 md:text-xl">No fees.</p>
                <p className="font-bold text-base m-0 md:text-xl">No minimum deposit.</p>
                <p className="font-bold text-base m-0 md:text-xl">High interest rates.</p>
                <p className="text-sm mb-0 md:text-lg leading-none mt-5">Open a savings account with Argent Bank today!</p>
            </section>
        </div>
    );
}

export default Hero;
