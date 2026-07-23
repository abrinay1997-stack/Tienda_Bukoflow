
import React from 'react';
import { SectionTitle } from './SectionTitle';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
    <details className="faq-item">
        <summary className="faq-question">
            {question}
        </summary>
        <div className="faq-answer">
            <p>{answer}</p>
        </div>
    </details>
);

export const CustomMusicPage = () => (
    <section className="custom-content-page max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black text-center text-white">Producción Musical</h1>
        <div className="bg-card-bg border-2 border-glass-border rounded-2xl p-10 mt-12 backdrop-blur-md text-center">
            <p className="text-zinc-300 font-light text-lg leading-loose mb-6 text-left">¿Necesitas un beat exclusivo, música para un tráiler, un anuncio o tu videojuego? Estás en el lugar correcto.</p>
            <p className="text-zinc-300 font-light text-lg leading-loose mb-6 text-left">Ofrezco servicios de producción, mezcla y masterización totalmente personalizados para llevar tu visión al siguiente nivel. Mi sonido se especializa en hip-hop cinematográfico, pero puedo adaptarme a cualquier género que necesites.</p>
            
            <h3 className="custom-subtitle-page">Servicios Ofrecidos</h3>
            <ul className="list-none mb-8 text-left">
                <li className="text-white text-lg mb-4 flex items-center"><i className="fas fa-check text-primary-orange mr-4 text-xl"></i> Producción de Beats Exclusivos</li>
                <li className="text-white text-lg mb-4 flex items-center"><i className="fas fa-check text-primary-orange mr-4 text-xl"></i> Música para Cine y Tráilers</li>
                <li className="text-white text-lg mb-4 flex items-center"><i className="fas fa-check text-primary-orange mr-4 text-xl"></i> Diseño de Sonido para Videojuegos</li>
                <li className="text-white text-lg mb-4 flex items-center"><i className="fas fa-check text-primary-orange mr-4 text-xl"></i> Mezcla y Masterización Profesional</li>
                <li className="text-white text-lg mb-4 flex items-center"><i className="fas fa-check text-primary-orange mr-4 text-xl"></i> Licencias a Medida</li>
            </ul>
            
            <p className="text-center font-light text-zinc-300">Mi meta es potenciar tu visión con un sonido de alta calidad que deje una marca.</p>
            
            <a href="mailto:bukoflowpanama@gmail.com" className="cta-primario mt-8">
                <i className="fas fa-envelope"></i>
                <span>Contacta para una cotización</span>
            </a>
        </div>

        <section className="faq-section mt-16">
            <SectionTitle>Preguntas Frecuentes</SectionTitle>
            <div className="faq-container">
                <FAQItem question="¿Cuál es el proceso para un pedido de música personalizada?" answer="El proceso comienza con una consulta para entender tu visión. Luego, crearé un borrador para tu revisión. Una vez aprobado, completaré la producción, mezcla y masterización. ¡Finalmente, recibirás los archivos finales listos para usar!" />
                <FAQItem question="Pago Inicial del 50%" answer="Una vez revisada y aprobada su solicitud, recibirá un presupuesto por correo electrónico. Para iniciar el proyecto, se requiere un pago inicial del 50% mediante PayPal o tarjeta de crédito." />
                <FAQItem question="¿Qué géneros musicales produces?" answer="Mi especialidad es el hip-hop cinematográfico, pero tengo experiencia produciendo en una amplia variedad de géneros, incluyendo Lofi, Trap, Pop y música para bandas sonoras. ¡Estoy abierto a cualquier desafío!" />
                <FAQItem question="¿Cuánto tiempo toma recibir mi pedido?" answer="El tiempo de entrega varía según la complejidad del proyecto. Un beat exclusivo puede tomar de 3 a 7 días, mientras que una banda sonora completa para un tráiler puede tomar más tiempo. Te daré un estimado claro después de nuestra consulta inicial." />
                <FAQItem question="¿Soy propietario de la música una vez creada?" answer="Tendrás derechos exclusivos para usar la pista personalizada con fines comerciales. Conservo el 50 % de los derechos de publicación de las pistas personalizadas (salvo acuerdo contrario) y la producción no se revenderá ni se reutilizará. La cesión total de derechos está disponible bajo petición." />
            </div>
        </section>
    </section>
);
