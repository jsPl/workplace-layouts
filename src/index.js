import './index.css'
import SVG from 'svg.js'
import Workplace from './workplace/Workplace'
import { stage } from './Stage'

SVG.on(document, 'DOMContentLoaded', () => {
    const wp1 = new Workplace({ title: 'wp1', color: '#f06' });
    const wp2 = new Workplace({ title: 'wp2', color: '#309EFF' });
    const wp3 = new Workplace({ title: 'wp3', color: '#FFCF60' });

    wp2.svg.x(150);
    wp3.svg.x(300);

    stage.workplaces.push(wp1, wp2, wp3);
});