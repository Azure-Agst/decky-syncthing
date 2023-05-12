import { VFC } from "react";

/*
 * This logo is a custom modification of the SVG from the syncthing repo.
 * REF: https://github.com/syncthing/syncthing/blob/main/assets/logo-only.svg
 * 
 * I don't know if I need a license to use this? Let me know if I do.
 */

export const MenuIcon: VFC<any> = () => (
    <svg 
        version="1.1"     
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        stroke="transparent"
        fill="currentColor"
        viewBox="0 0 117.3 117.3"
        height="1em"
        width="1em"
        id="Layer_1"    
    >
        <defs>
            <mask id="sub">
                <rect width="100%" height="100%" fill="white"/>
                <circle fill="none" stroke="black" stroke-width="6" stroke-miterlimit="10" cx="58.7" cy="58.5" r="43.7"/>
                <g>
                    <path fill="black" d="M94.7,47.8c4.7,1.6,9.8-0.9,11.4-5.6c1.6-4.7-0.9-9.8-5.6-11.4c-4.7-1.6-9.8,0.9-11.4,5.6
                        C87.5,41.1,90,46.2,94.7,47.8z"/>
                    <line fill="none" stroke="black" stroke-width="6" stroke-miterlimit="10" x1="97.6" y1="39.4" x2="67.5" y2="64.4"/>
                </g>
                <g>
                    <path fill="black" d="M77.6,91c-0.4,4.9,3.2,9.3,8.2,9.8c5,0.4,9.3-3.2,9.8-8.2c0.4-4.9-3.2-9.3-8.2-9.8
                        C82.4,82.4,78,86,77.6,91z"/>
                    <line fill="none" stroke="black" stroke-width="6" stroke-miterlimit="10" x1="86.5" y1="91.8" x2="67.5" y2="64.4"/>
                </g>
                <path fill="black" d="M60,69.3c2.7,4.2,8.3,5.4,12.4,2.7c4.2-2.7,5.4-8.3,2.7-12.4c-2.7-4.2-8.3-5.4-12.4-2.7
                    C58.5,59.5,57.3,65.1,60,69.3z"/>
                <g>
                    <path fill="black" d="M21.2,61.4c-4.3-2.5-9.8-1.1-12.3,3.1c-2.5,4.3-1.1,9.8,3.1,12.3c4.3,2.5,9.8,1.1,12.3-3.1
                        C26.8,69.5,25.4,64,21.2,61.4z"/>
                    <line fill="none" stroke="black" stroke-width="6" stroke-miterlimit="10" x1="16.6" y1="69.1" x2="67.5" y2="64.4"/>
                </g>
            </mask>
        </defs>
        <g>
            <circle cx="58.7" cy="58.7" r="58.7" mask="url(#sub)"/>
        </g>
    </svg>
);