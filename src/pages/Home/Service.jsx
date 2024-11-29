const services = [
  { title: 'Cardiology', description: "A Cardiologist is a Physician Who's an Expert In The Care of Your Heart and Blood." },
  { title: 'Pediatrician', description: "A Pediatrician is a Doctor Who Treats Newborns, Children, Adolescents & Young Adults." },
  { title: 'Gynecology', description: "A Gynecologist Specializes In Diagnosing and Treating Many Conditions and Diseases." },
  { title: 'Psychological', description: "Psychology is The Scientific Study of Mind and Behavior in Humans and Non-Humans." },
];

const Service = () => {
  return (
      <div className="py-12 bg-gray-100 text-center">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
                <h3 className="text-xl font-semibold text-blue-600">{service.title}</h3>
                <p className="text-gray-700 mt-2">{service.description}</p>
                <a href="#" className="text-blue-500 font-semibold mt-4 inline-block hover:underline">Get Started</a>
              </div>
          ))}
        </div>
      </div>
  );
};

export default Service;