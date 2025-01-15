import Features from '../components/Features';
import Hero from '../components/Hero';
import { featuresData } from '../data/features';

function HomePage() {
    return (
        <div>
            <Hero />
            <Features>
                {featuresData.map((feature) => (
                    <div key={feature.id} className="text-center p-10">
                        <img src={feature.img} alt={feature.alt} className="max-w-[152px] border-[10px] border-[#00bc77] rounded-full mx-auto p-4" />
                        <h3 className="text-xl font-bold mb-2 text-[#222] mt-5">{feature.title}</h3>
                        <p className="leading-none">{feature.description}</p>
                    </div>
                ))}
            </Features>
        </div>
    );
}

export default HomePage;
