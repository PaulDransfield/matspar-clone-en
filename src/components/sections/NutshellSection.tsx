// components/sections/NutshellSection.tsx
import Image from 'next/image';

interface NutshellItemProps {
  iconSrc: string;
  title: string;
  description: string;
}

const NutshellItem: React.FC<NutshellItemProps> = ({ iconSrc, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="relative h-16 w-16 mb-4">
        <Image src={iconSrc} alt={title} fill className="object-contain" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const NutshellSection = () => {
  const items = [
    {
      iconSrc: "https://ext.same-assets.com/2461038866/3960679616.svg",
      title: "Explore",
      description: "See all grocery stores' selections gathered in one place.",
    },
    {
      iconSrc: "https://ext.same-assets.com/2461038866/1009158470.svg",
      title: "Compare",
      description: "Compare grocery stores while you build your shopping bag.",
    },
    {
      iconSrc: "https://ext.same-assets.com/2461038866/880699145.svg",
      title: "Relax",
      description: "Enjoy your free time while your groceries are delivered to your door.",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Smart Shop in a nutshell
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <NutshellItem
              key={item.title}
              iconSrc={item.iconSrc}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NutshellSection;
