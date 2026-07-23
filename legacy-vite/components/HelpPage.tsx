

import React, { useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { Modal } from './Modal';

// FIX: Extracted props into a dedicated interface to resolve type error when using component in a map with a key.
interface FAQItemProps {
    question: string;
    answer: React.ReactNode;
}

// FIX: Explicitly typed FAQItem as a React.FC to resolve type inference issues with the key prop.
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
    <details className="faq-item">
        <summary className="faq-question">{question}</summary>
        <div className="faq-answer">{answer}</div>
    </details>
);

const generalFaqs = [
    {
        question: '¿Se eliminarán todas las etiquetas de voz una vez que compre el Beat?',
        answer: <p>Sí, una vez que haya comprado el Beat, recibirá archivos sin etiqueta.</p>,
    },
    {
        question: '¿Qué métodos de pago aceptan?',
        answer: <p>Acepto Paypal y tarjetas de crédito.</p>,
    },
    {
        question: '¿Qué son los trackouts?',
        answer: <p>Trackouts o Stems son archivos de audio independientes. Por ejemplo, el bombo, la caja, el piano, etc. son archivos de audio separados ubicados en el instrumento. Sugiero la licencia premium para una combinación de primer nivel.</p>,
    },
    {
        question: '¿Cómo se organizan los trackouts y los stems?',
        answer: <p>Las pistas están organizadas por carpetas, los efectos, envíos y pistas individuales están en una carpeta, los grupos de instrumentos están en otra carpeta.</p>,
    },
    {
        question: '¿Cuáles son las ventajas de tener Track Outs?',
        answer: <p>Tener Track Outs es ideal para mezclar y grabar en un estudio. No solo puedes editar la estructura para adaptarla a tu canción como desees, sino que también es la mejor opción a la hora de mezclar y conseguir un sonido más profesional.</p>,
    },
    {
        question: '¿Los ritmos ya estan masterizados?',
        answer: (
            <>
                <p>Con las licencias Basic y Standard recibirás los beats masterizados.</p>
                <p>Las licencias Premium, Unlimited y Exclusive te darán los beats masterizados y no masterizados, además de todas las pistas del proyecto, por separado y organizado.</p>
            </>
        ),
    },
    {
        question: '¿Cuál es su política de reembolso?',
        answer: <p>Todas las compras son definitivas y no se otorgarán reembolsos bajo ninguna circunstancia. Al comprar, acepta estos términos. La razón por la que no podemos emitir un reembolso es porque una vez que se ha descargado un activo digital, no se puede revocar.</p>,
    },
    {
        question: '¿Ha caducado su licencia?',
        answer: <p>¡No hay problema! Puede actualizar su licencia para continuar usando Beat.</p>,
    },
    {
        question: '¿Qué pasa si el ritmo que quiero actualizar ya se vendió con una licencia exclusiva?',
        answer: <p>En ese caso, ya no podrá actualizar su licencia ya que, una vez vendida la licencia exclusiva, ya no se permite la venta de ninguna licencia.</p>,
    },
    {
        question: 'No encuentro el ritmo. ¿Qué le paso a eso?',
        answer: <p>Si se elimina un latido, se compraron sus derechos exclusivos y no puede revenderlo.</p>,
    },
    {
        question: '¿Cómo obtengo mis latidos?',
        answer: <p>La entrega es inmediata, luego del pago será redirigido a una pantalla desde la cual podrá descargar los beats y el contrato.</p>,
    },
];

const licenseFaqs = [
    {
        question: '¿Cuál es la principal diferencia entre la Licencia Básica y la Standard?',
        answer: <p>La diferencia clave es la calidad del archivo de audio. La Licencia Básica te da el beat en formato MP3, mientras que la Standard incluye tanto el MP3 como el archivo WAV de alta calidad, que es mejor para la mezcla profesional.</p>
    },
    {
        question: 'Si quiero la mejor calidad de sonido para mi mezcla, ¿qué licencia debo elegir?',
        answer: <p>Para la mejor calidad y flexibilidad en la mezcla, recomendamos la Licencia Ilimitada o la Exclusiva. Ambas incluyen los "Stems" (pistas separadas), lo que le da a tu ingeniero de sonido control total sobre cada elemento del beat.</p>
    },
    {
        question: '¿Qué son los "Stems" o "Trackouts"?',
        answer: <p>Son los archivos de audio individuales que componen el beat completo. Por ejemplo, el bombo, la caja, el bajo, el piano, etc., cada uno en su propio archivo WAV. Esto permite una mezcla y masterización mucho más detallada y profesional de tu canción.</p>
    },
    {
        question: '¿Puedo usar un beat con Licencia Básica para una canción en Spotify o Apple Music?',
        answer: <p>Sí, todas nuestras licencias, incluida la Básica, te permiten subir tu canción a plataformas de streaming como Spotify, Apple Music, iTunes, etc.</p>
    },
    {
        question: '¿Necesito una licencia especial para monetizar mi video en YouTube?',
        answer: <p>Sí, para monetizar tu video musical en YouTube, necesitas la Licencia Ilimitada o la Exclusiva. Las licencias Básica y Standard no incluyen este derecho.</p>
    },
    {
        question: '¿Qué significa que una licencia "no requiere actualizar"?',
        answer: <p>Significa que la licencia que compras es perpetua para los términos acordados. No tendrás que pagar renovaciones para seguir usando el beat dentro de los límites de esa licencia.</p>
    },
    {
        question: '¿Qué es la "acreditación" y cómo debo hacerla?',
        answer: <p>Es dar crédito al productor del beat. Debes incluir "Producido por BUKOFLOW" o "(Prod. BUKOFLOW)" en el título de tu canción, en la descripción del video y en cualquier metadato donde se listen los créditos de producción.</p>
    },
    {
        question: 'Si compro una Licencia Exclusiva, ¿el beat es completamente mío?',
        answer: <p>Sí. Al comprar la Licencia Exclusiva, el beat se retira de la tienda y ya no se venderá a nadie más. Obtienes derechos de uso exclusivos y completos sobre el beat.</p>
    },
    {
        question: 'Compré una Licencia Básica pero ahora quiero los Stems. ¿Puedo actualizar?',
        answer: <p>Sí, puedes actualizar tu licencia a una superior (por ejemplo, de Básica a Ilimitada) para obtener los Stems. Solo pagarías la diferencia de precio. Sin embargo, esto solo es posible si el beat no ha sido vendido con una Licencia Exclusiva mientras tanto.</p>
    },
    {
        question: '¿Qué pasa si compro una licencia y luego alguien más compra la Licencia Exclusiva para el mismo beat?',
        answer: <p>Tu licencia no exclusiva seguirá siendo válida según los términos con los que la compraste. Sin embargo, no podrás actualizar tu licencia una vez que los derechos exclusivos hayan sido vendidos.</p>
    },
    {
        question: '¿Las licencias tienen un límite de reproducciones (streams) o ventas?',
        answer: <p>Nuestras licencias (Básica, Standard, Ilimitada) están diseñadas para no tener límites en streams o ventas, permitiéndote crecer sin preocupaciones. La Licencia Exclusiva, por supuesto, tampoco tiene límites.</p>
    },
    {
        question: '¿Puedo usar los beats para actuaciones en vivo?',
        answer: <p>Sí, las licencias Ilimitada y Exclusiva te otorgan el derecho de usar los beats en actuaciones pagadas en vivo.</p>
    },
    {
        question: '¿Y para la radio o la televisión?',
        answer: <p>Para la distribución y reproducción en radio comercial o televisión, necesitas la Licencia Ilimitada o la Exclusiva.</p>
    },
    {
        question: '¿Los beats vienen masterizados?',
        answer: <p>Con las licencias Básica y Standard, recibirás los beats ya masterizados. Con las licencias Ilimitada y Exclusiva, recibirás tanto la versión masterizada como la no masterizada (junto con los Stems), lo que te da a ti y a tu ingeniero la máxima flexibilidad.</p>
    },
    {
        question: '¿Puedo registrar mi canción con Content ID de YouTube?',
        answer: <p>No puedes registrar tu canción en el sistema Content ID de YouTube con ninguna de las licencias no exclusivas. Esto podría causar reclamaciones de derechos de autor falsas a otros artistas que licencien el mismo beat. Solo con la Licencia Exclusiva podrías hacerlo.</p>
    },
    {
        question: '¿Por qué la Licencia Exclusiva es mucho más cara?',
        answer: <p>El precio refleja el valor de la exclusividad total. Al comprarla, te aseguras de que ningún otro artista podrá usar ese beat, convirtiéndolo en una pieza única para tu proyecto y se retira permanentemente de nuestra tienda.</p>
    },
    {
        question: '¿Qué licencia me recomiendan si estoy empezando?',
        answer: <p>La Licencia Standard es un excelente punto de partida. Te ofrece el archivo WAV de alta calidad, ideal para grabar voces y obtener un buen sonido, a un precio accesible.</p>
    },
    {
        question: '¿Qué licencia es mejor para un artista establecido?',
        answer: <p>Para un proyecto serio con potencial comercial, la Licencia Ilimitada es la mejor opción. Te da los Stems para una mezcla profesional, derechos de monetización, y te permite actuar en vivo y distribuir en radio/TV. Si el presupuesto lo permite, la Exclusiva garantiza que tu sonido sea único.</p>
    },
    {
        question: '¿El contrato de licencia es legalmente vinculante?',
        answer: <p>Sí, al realizar la compra, aceptas los términos y condiciones del acuerdo de licencia. Recibirás un contrato en PDF junto con tus archivos de audio que detalla todos tus derechos y restricciones.</p>
    },
    {
        question: 'Si compro una licencia, ¿soy dueño de los derechos de autor del beat?',
        answer: <p>No. Al comprar una licencia (excepto la Exclusiva), estás comprando los derechos para usar el beat según los términos del acuerdo. El productor (BUKOFLOW) retiene los derechos de autor de la composición musical. Con la Licencia Exclusiva, adquieres derechos de uso exclusivos, pero los derechos de publicación suelen compartirse.</p>
    }
];


export const HelpPage = () => {
    const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
    const [isLicenseHelpModalOpen, setIsLicenseHelpModalOpen] = useState(false);
    
    return (
        <>
            <section className="custom-content-page max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-black text-center text-white">Centro de Ayuda</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <ServiceCard title="¿NECESITAS AYUDA PARA ELEGIR UNA LICENCIA?" onClick={() => setIsLicenseHelpModalOpen(true)} />
                    <ServiceCard title="PREGUNTAS Y RESPUESTAS" onClick={() => setIsFaqModalOpen(true)} />
                </div>
            </section>

            <Modal isOpen={isLicenseHelpModalOpen} onClose={() => setIsLicenseHelpModalOpen(false)}>
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-wider uppercase text-white">Ayuda con Licencias</h2>
                    <div className="faq-container text-left">
                        {licenseFaqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isFaqModalOpen} onClose={() => setIsFaqModalOpen(false)}>
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-wider uppercase text-white">Preguntas Frecuentes</h2>
                    <div className="faq-container text-left">
                        {generalFaqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
};