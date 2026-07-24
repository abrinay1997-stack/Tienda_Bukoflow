import { domAnimation } from 'framer-motion';

// Se importa por separado para que LazyMotion pueda cargarlo con un
// dynamic import propio (code-split), en vez de empaquetar framer-motion
// completo en el bundle principal de cada página que use <Reveal>.
export default domAnimation;
