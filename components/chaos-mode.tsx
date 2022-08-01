import type { NextPage } from 'next';
import { useRef } from 'react';
import Link from 'next/link'
import { motion, AnimatePresence } from "framer-motion"
import { useGlobalState } from '../utils/global-state';

// const ImageList = [{key: 1, width: 451, height: 451}, 
//     {key: 2, width: 654, height: 654}, 
//     {key: 3, width: 493, height: 565},
//     {key: 4, width: 511, height: 511},
//     {key: 5, width: 692, height: 740},
//     {key: 6, width: 689, height: 518},
//     {key: 7, width: 577, height: 577},
//     {key: 8, width: 668, height: 674},
//     {key: 9, width: 500, height: 473},
//     {key: 10, width: 730, height: 565}]

const ChaosMode: NextPage = () => {
    const [chaos] = useGlobalState('chaos');
    const ref = useRef(null);

    const style = { cursor: 'move' }

    return (
        <AnimatePresence>
            {chaos &&
                <motion.div className="chaosmodewrap" initial={{ opacity: 0 }} animate={{ opacity: 1, display: 'block' }} transition={{ duration: 0.2 }} exit={{ opacity: 0 }} ref={ref}>
                    <Link href="/mint">
                        <a className="">
                            <motion.div className="chasmodemintbutton w-inline-block" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: [0.5, 1.5, 1.0] }} transition={{ duration: 0.3, delay: 1 }} exit={{ opacity: 0 }}>
                                <div className="chaosmintbuttontext">MINT</div>
                            </motion.div>
                        </a>
                    </Link>
                    {[...Array(10)].map((_, i) => {
                        return <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: i * 0.05 }} exit={{ opacity: 0 }} className={`chaosimg draggable img-0${i + 1}`}><motion.img drag dragConstraints={ref} style={style} src={`images/chaos-img-0${i + 1}.png`}  alt="" className={`chaos-img _00${i + 1}`} /></motion.div>
                    })}
                    <div className="marquee-horizontal">
                        <div className="marquee-horizontal-css w-embed">
                            <style dangerouslySetInnerHTML={{ __html: "\n.track-horizontal {\n  position: absolute;\n  white-space: nowrap;\n  will-change: transform;\n  animation: marquee-horizontal 2s linear infinite;\n  /* manipulate the speed of the marquee by changing \"40s\" line above*/\n}\n@keyframes marquee-horizontal {\n  from { transform: translateX(0); }\n  to { transform: translateX(-50%); }\n}\n" }} />
                        </div>
                        <div className="track-horizontal"><img src="images/chaos-rgb.svg"  alt="" className="chaos-rbg" /><img src="images/chaos-rgb-flipped.svg"  alt="" className="chaos-rbg flipped" /><img src="images/chaos-rgb.svg"  alt="" className="chaos-rbg" /><img src="images/chaos-rgb-flipped.svg"  alt="" className="chaos-rbg flipped" /><img src="images/chaos-rgb.svg"  alt="" className="chaos-rbg" /><img src="images/chaos-rgb-flipped.svg"  alt="" className="chaos-rbg flipped" /><img src="images/chaos-rgb.svg"  alt="" className="chaos-rbg" /><img src="images/chaos-rgb-flipped.svg"  alt="" className="chaos-rbg flipped" /><img src="images/chaos-rgb.svg"  alt="" className="chaos-rbg" /><img src="images/chaos-rgb-flipped.svg" alt="" className="chaos-rbg flipped" /><img src="images/chaos-rgb.svg"  alt="" className="chaos-rbg" /><img src="images/chaos-rgb-flipped.svg"  alt="" className="chaos-rbg flipped" /><img src="images/chaos-rgb.svg"  alt="" className="chaos-rbg" /><img src="images/chaos-rgb-flipped.svg"  alt="" className="chaos-rbg flipped" /><img src="images/chaos-rgb.svg"  alt="" className="chaos-rbg" /></div>
                    </div>
                </motion.div>}
        </AnimatePresence>
    )
}

export default ChaosMode;
