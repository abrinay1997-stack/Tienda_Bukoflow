import React, { useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { Modal } from './Modal';

type Service = {
    id: string;
    title: string;
    content: React.ReactNode;
};

const servicesData: Service[] = [
    {
        id: 'mezcla',
        title: 'MEZCLA',
        content: (
            <div>
                <h3 className="font-semibold text-primary-orange text-lg mb-2.5">Song Mixing by BUKOFLOW</h3>
                <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-wider uppercase text-white">IMPACTA CON UNA MEZCLA PROFESIONAL🔥</h2>
                <div className="text-zinc-300 font-light text-left space-y-4 text-base leading-relaxed">
                    <p>En BukoFlow, entendemos que una gran canción merece una mezcla de impacto que destaque por su sonido. Nuestro sistema de mezcla está diseñado para resaltar lo mejor de tu producción, con claridad, buenos balance y que se traduzca lo mejor posible en todos los dispositivos y plataformas. 💡</p>
                    <p>¿Estás listo para transformar tus pistas en una mezcla que impacte? A continuación, te explicamos los requisitos y pasos para trabajar con nosotros.</p>
                    <h4 className="custom-subtitle-page !text-left !mt-6 !mb-3">¿Qué necesitas para tu mezcla estéreo?</h4>
                    <h5 className="font-bold text-white text-lg mt-4">1. Preparación de las Pistas</h5>
                    <p>Para garantizar el mejor resultado, prepara y organiza tus pistas siguiendo estas indicaciones:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li><strong>Organiza tus pistas:</strong> Agrupa instrumentos y voces en categorías claras, como baterías, bajos, teclados, guitarras, voces principales, coros, etc.</li>
                        <li><strong>Elimina efectos innecesarios:</strong> Exporta las pistas limpias, sin efectos de mezcla como reverbs, delays o compresores, a menos que sean esenciales para tu sonido (Si algunos efectos son imprescindibles, indícalo en un documento con instrucciones).</li>
                        <li><strong>Establece un punto de inicio común:</strong> Asegúrate de que todas las pistas comiencen desde el mismo punto (compás 1).</li>
                        <li><strong>Especificaciones técnicas:</strong> Exporta tus archivos en formato WAV o AIFF, con 24 o 32 bits y una frecuencia de muestreo de 44.1 kHz o superior.</li>
                        <li><strong>Documentación adicional:</strong> Incluye un archivo con los nombres de las pistas, referencias de mezcla y cualquier instrucción especial.</li>
                    </ul>
                    <h5 className="font-bold text-white text-lg mt-4">2. Envío de Materiales</h5>
                    <p>Puedes enviarnos por WeTransfer, Google Drive o Dropbox. Recuerda: Todos los archivos deben estar bien etiquetados y organizados para evitar confusiones.</p>
                    <h5 className="font-bold text-white text-lg mt-4">3. Proceso de Mezcla y Revisión</h5>
                    <p>Tienes derecho a revisiones para asegurarnos de que el resultado final cumpla tus expectativas.</p>
                    <h5 className="font-bold text-white text-lg mt-4">4. Entrega Final</h5>
                    <p>Entregaremos tu mezcla en formato estéreo de alta calidad, lista para masterización o distribución en plataformas digitales.</p>
                    <h4 className="custom-subtitle-page !text-left !mt-6 !mb-3">Soporte Post-Entrega</h4>
                    <p>Si después de recibir tu mezcla necesitas ajustes menores o tienes alguna duda, estaremos aquí para apoyarte. 💪</p>
                    <p className="font-bold text-center text-white text-lg pt-4">¿Listo para darle a tu música una mezcla estéreo profesional que resalte cada detalle?</p>
                </div>
                <div className="text-center mt-8">
                    <a href="https://bukoflow.com/services/mezcla-131101" target="_blank" rel="noopener noreferrer" className="cta-primario">
                        <i className="fas fa-shopping-bag mr-2"></i>
                        <span>Compra por $70</span>
                    </a>
                </div>
            </div>
        )
    },
    {
        id: 'mastering',
        title: 'MASTERING',
        content: (
            <div>
                <h3 className="font-semibold text-primary-orange text-lg mb-2.5">Mastering by BUKOFLOW</h3>
                <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-wider uppercase text-white">ELEVA TU SONIDO CON UNA MASTERIZACIÓN ESTÉREO PROFESIONAL🎚️</h2>
                <div className="text-zinc-300 font-light text-left space-y-4 text-base leading-relaxed">
                    <p>En BukoFlow, sabemos que la masterización es el toque final que llevará tu música al máximo nivel. Nuestro servicio de masterización estéreo está diseñado para optimizar tu mezcla, logrando balance, claridad y un impacto que destaque en cualquier plataforma y sistema de reproducción. 🚀</p>
                    <p>¿Estás listo para darle a tu música el acabado profesional que merece? A continuación, te explicamos los requisitos y pasos para trabajar con nosotros.</p>
                    <h4 className="custom-subtitle-page !text-left !mt-6 !mb-3">¿Qué necesitas para tu masterización estéreo?</h4>
                    <h5 className="font-bold text-white text-lg mt-4">1. Preparación del Máster o Mezcla Final</h5>
                    <p>Para asegurar el mejor resultado, ten en cuenta estas recomendaciones al enviar tu mezcla:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li><strong>Nivel de salida:</strong> La mezcla no debe superar los 0db, tener margen dinámico preferiblemente con un peak máximo de -6dB</li>
                        <li><strong>Formato y resolución:</strong> Exporta tu mezcla en formato WAV o AIFF, con 24 o 32 bits y una frecuencia de muestreo de 44.1 kHz o superior.</li>
                        <li><strong>Referencias adicionales:</strong> Si tienes canciones de referencia que representen el sonido que buscas, inclúyelos en el envío.</li>
                    </ul>
                    <h5 className="font-bold text-white text-lg mt-4">2. Envía tus archivos por WeTransfer, Google Drive o Dropbox.</h5>
                    <p>Recuerda: Asegúrate de que todos los archivos estén correctamente etiquetados y organizados.</p>
                    <h5 className="font-bold text-white text-lg mt-4">3. Proceso de Masterización y Revisión</h5>
                    <p>Te enviaremos una primera versión de la masterización para que la escuches en diferentes sistemas de reproducción. Podrás compartir tus comentarios para realizar ajustes y asegurarnos de que el resultado final sea el que deseas.</p>
                    <h5 className="font-bold text-white text-lg mt-4">4. Entrega Final</h5>
                    <p>Recibirás tu track masterizado en formato WAV a 24 Bits, listo para distribución.</p>
                    <h4 className="custom-subtitle-page !text-left !mt-6 !mb-3">Soporte Post-Entrega</h4>
                    <p>Si después de la entrega necesitas ajustes menores o tienes alguna duda, estaremos disponibles para ayudarte.</p>
                    <p className="font-bold text-center text-white text-lg pt-4">¿Listo para que tu música brille con una masterización profesional?</p>
                </div>
                <div className="text-center mt-8">
                    <a href="https://bukoflow.com/services/mastering-50627" target="_blank" rel="noopener noreferrer" className="cta-primario">
                        <i className="fas fa-shopping-bag mr-2"></i>
                        <span>Compra por $30</span>
                    </a>
                </div>
            </div>
        )
    },
    {
        id: 'dolby',
        title: 'MEZCLA DOLBY ATMOS',
        content: (
            <div>
                <h3 className="font-semibold text-primary-orange text-lg mb-2.5">Song Mixing by BUKOFLOW</h3>
                <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-wider uppercase text-white">SUBETE AL ESPACIO INMERSIVO🚀</h2>
                <div className="text-zinc-300 font-light text-left space-y-4 text-base leading-relaxed">
                    <p>Las principales discográficas y plataformas como Apple Music, TIDAL y Amazon Music, entre otras, ahora exigen que las mezclas cumplan con los estándares de Dolby Atmos/Spatial Audio.</p>
                    <p>En BukoFlow, estamos certificados para llevar tu mezcla a los estándares de calidad que la industria requiere. Nuestro servicio de mezcla en Dolby Atmos está diseñado para brindarte una experiencia inmersiva en audio 3D. A continuación, te explicamos los detalles y pasos que debes seguir para trabajar con nosotros.</p>
                    <h4 className="custom-subtitle-page !text-left !mt-6 !mb-3">¿Qué necesitas para tu mezcla en Dolby Atmos?</h4>
                    <h5 className="font-bold text-white text-lg mt-4">1. Contacto</h5>
                    <p>Escríbenos a través de nuestro formulario para discutir los detalles del proyecto, como el género musical, la cantidad de pistas o canciones, las revisiones requeridas y los plazos de entrega. Comparte con nosotros el máster estéreo (mezcla ya masterizada) en el formato de mayor calidad posible.</p>
                    <h5 className="font-bold text-white text-lg mt-4">2. Preparación de los Stems</h5>
                    <p>Para garantizar una mezcla fluida y de alta calidad, sigue estos pasos al preparar los stems.</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li><strong>Organiza tus pistas:</strong> Agrupa instrumentos y voces en categorías claras: baterías, bajos, teclados, guitarras, voces principales, coros, etc.</li>
                        <li><strong>Elimina efectos innecesarios:</strong> Exporta las pistas limpias, sin efectos de mezcla como reverbs o delays, a menos que sean esenciales para el sonido. Si los efectos son importantes, indícalo en las notas que envíes.</li>
                    </ul>
                    <h5 className="font-bold text-white text-lg mt-4">3. Establece un punto de inicio común</h5>
                    <p>Asegúrate de que todas las pistas comiencen desde el mismo punto (por ejemplo, el compás 1), para evitar problemas de sincronización. Exporta en formato de 24 o 32 bits, con una frecuencia de muestreo de 48 kHz o superior. Proporciona una guía detallada: Incluye un archivo con los nombres de las pistas y cualquier instrucción especial, como indicaciones de panorámica o efectos que deseas conservar.</p>
                    <h5 className="font-bold text-white text-lg mt-4">4. Envío de Materiales</h5>
                    <p>Puedes enviarnos los archivos a través de servicios de transferencia como WeTransfer, Google Drive o Dropbox. Asegúrate de que todos los archivos estén bien etiquetados y organizados.</p>
                    <h5 className="font-bold text-white text-lg mt-4">5. Proceso de Mezcla y Revisión</h5>
                    <p>Te enviaremos una primera versión de la mezcla para que la escuches en diferentes sistemas de reproducción. Tienes derecho a revisiones durante el proceso para garantizar que el resultado cumpla tus expectativas.</p>
                    <h5 className="font-bold text-white text-lg mt-4">6. Entrega Final</h5>
                    <p>Recibirás tu proyecto finalizado en formatos optimizados para Dolby Atmos, listos para su distribución en plataformas compatibles como Apple Music, TIDAL o Amazon Music.</p>
                    <h4 className="custom-subtitle-page !text-left !mt-6 !mb-3">Soporte Post-Entrega</h4>
                    <p>Quedamos a tu disposición para resolver cualquier duda o realizar ajustes menores después de la entrega final.</p>
                    <p className="font-bold text-center text-white text-lg pt-4">¿Listo para transformar tu máster en una experiencia inmersiva de audio? Completa el formulario y comencemos tu proyecto ahora mismo.</p>
                </div>
                <div className="text-center mt-8">
                    <a href="https://bukoflow.com/services/mezcla-dolby-atmos-143019" target="_blank" rel="noopener noreferrer" className="cta-primario">
                        <i className="fas fa-envelope mr-2"></i>
                        <span>Contactar</span>
                    </a>
                </div>
            </div>
        )
    },
    {
        id: 'custom',
        title: 'BEAT PERSONALIZADO',
        content: (
             <div>
                <h3 className="font-semibold text-primary-orange text-lg mb-2.5">Custom Beat by BUKOFLOW</h3>
                <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-wider uppercase text-white">PRODUCE EL RITMO PERFECTO PARA TU MÚSICA 🎶</h2>
                <div className="text-zinc-300 font-light text-left space-y-4 text-base leading-relaxed">
                    <p>En BukoFlow, sabemos que cada artista tiene una visión única, y cuando no encuentras el beat perfecto, ¡nosotros lo creamos para ti! Nuestro proceso de producción está diseñado para adaptarse a tus necesidades y entregar un ritmo que cumpla exactamente con tus expectativas. 💡</p>
                    <h4 className="custom-subtitle-page !text-left !mt-6 !mb-3">¿Qué incluye nuestra producción personalizada?</h4>
                    <ul className="list-none space-y-2 pl-4">
                        <li className="flex items-center"><i className="fas fa-check text-primary-orange mr-3"></i>Un beat hecho a tu medida: Trabajamos contigo hasta que estés 100% satisfecho con el resultado.</li>
                        <li className="flex items-center"><i className="fas fa-check text-primary-orange mr-3"></i>Cualquier género, cualquier estilo: Hip-Hop, Trap, R&B, Pop, y más. Nos adaptamos a tu estilo y energía.</li>
                        <li className="flex items-center"><i className="fas fa-check text-primary-orange mr-3"></i>Derechos exclusivos: El ritmo que produzcamos será completamente tuyo, con todos los derechos exclusivos incluidos.</li>
                    </ul>
                    <h4 className="custom-subtitle-page !text-left !mt-6 !mb-3">¿Qué necesitamos de ti para empezar?</h4>
                    <h5 className="font-bold text-white text-lg mt-4">1. Detalles creativos:</h5>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li><strong>Estilo musical:</strong> Hip-Hop, Trap, R&B, u otro género de tu preferencia.</li>
                        <li><strong>Estado de ánimo:</strong> ¿Cómo quieres que se sienta tu canción? Triste, oscuro, feliz, emocional, etc.</li>
                        <li><strong>Referencias:</strong> Envíanos enlaces a canciones que describan el sonido que buscas.</li>
                    </ul>
                    <h4 className="custom-subtitle-page !text-left !mt-6 !mb-3">Proceso de Producción</h4>
                    <h5 className="font-bold text-white text-lg mt-4">1. Envío de la información</h5>
                    <p>Envíanos todos los detalles a bukoflowpanama@gmail.com</p>
                    <h5 className="font-bold text-white text-lg mt-4">2. Producción y revisiones</h5>
                    <p>Trabajaremos en tu beat y te enviaremos avances para asegurarnos de que vamos por el camino correcto. ¡Las revisiones son gratuitas! 💪</p>
                    <h5 className="font-bold text-white text-lg mt-4">3. Entrega final</h5>
                    <p>Recibirás todos los tracks del beat en archivos de alta calidad listo para grabar y mezclarlo con tus voces.</p>
                    <h4 className="custom-subtitle-page !text-left !mt-6 !mb-3">🎛️ Soporte Post-Entrega</h4>
                    <p>Si necesitas pequeños ajustes después de la entrega, estaremos aquí para ayudarte. ¡Dale a tu música el ritmo que merece!</p>
                </div>
                <div className="text-center mt-8">
                    <a href="https://bukoflow.com/services/beat-personalizado-50625" target="_blank" rel="noopener noreferrer" className="cta-primario">
                        <i className="fas fa-envelope mr-2"></i>
                        <span>Contactar</span>
                    </a>
                </div>
            </div>
        )
    }
];


export const ServicesPage = () => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const openModal = (service: Service) => {
        setSelectedService(service);
    };

    const closeModal = () => {
        setSelectedService(null);
    };
    
    return (
        <section className="custom-content-page max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black text-center text-white">Servicios</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <ServiceCard title="MEZCLA" onClick={() => openModal(servicesData[0])} />
                <ServiceCard title="MASTERING" onClick={() => openModal(servicesData[1])} />
                <ServiceCard title="MEZCLA DOLBY ATMOS" onClick={() => openModal(servicesData[2])} />
                <ServiceCard title="BEAT PERSONALIZADO" onClick={() => openModal(servicesData[3])} />
            </div>
            <Modal isOpen={!!selectedService} onClose={closeModal}>
                {selectedService?.content}
            </Modal>
        </section>
    );
};
