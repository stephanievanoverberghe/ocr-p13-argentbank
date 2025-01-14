import Features from '../components/Features';
import Hero from '../components/Hero';

import chat from './../assets/images/icon-chat.png';
import money from './../assets/images/icon-money.png';
import security from './../assets/images/icon-security.png';

const featuresData = [
    {
        id: 1,
        img: chat,
        alt: 'Chat Icon',
        title: 'You are our #1 priority',
        description: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
    {
        id: 2,
        img: money,
        alt: 'Money Icon',
        title: 'More savings means higher rates',
        description: 'The more you save with us, the higher your interest rate will be!',
    },
    {
        id: 3,
        img: security,
        alt: 'Security Icon',
        title: 'Security you can trust',
        description: 'We use top of the line encryption to make sure your data and money is always safe.',
    },
];

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
