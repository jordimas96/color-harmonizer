function changeHue(hue, maxSaturation = false) {
    document.querySelectorAll("body, body *").forEach((e, i) => {

        let color = window.getComputedStyle(e).color;
        let back = window.getComputedStyle(e).backgroundColor;
        let bord = window.getComputedStyle(e).borderColor;

        color = rgbaToHsla(color);
        back = rgbaToHsla(back);
        bord = rgbaToHsla(bord);

        if (!e.originalSat) {
            e.originalSat = {
                color: color.s,
                back: back.s,
                bord: bord.s,
            };
        }

        color.h = hue; // - 15 + Math.random() * 30;
        back.h = hue; // - 15 + Math.random() * 30;
        bord.h = hue; // - 15 + Math.random() * 30;

        if (maxSaturation) {
            color.s = 100;
            back.s = 100;
            bord.s = 100;
        } else {
            color.s = e.originalSat.color
            back.s = e.originalSat.back
            bord.s = e.originalSat.bord
        }

        e.style.color = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`;
        e.style.backgroundColor = `hsla(${back.h}, ${back.s}%, ${back.l}%, ${back.a})`;
        e.style.borderColor = `hsla(${bord.h}, ${bord.s}%, ${bord.l}%, ${bord.a})`;
        e.style.accentColor = `hsla(${hue}, 100%, 50%, 1)`;

    });
}

function rgbaToHsla(rgbaString) {
    // Extract the RGBA values from the string //
    const match = rgbaString.match(/\d+(\.\d+)?/g);
    const r = parseInt(match[0]) / 255;
    const g = parseInt(match[1]) / 255;
    const b = parseInt(match[2]) / 255;
    const a = parseFloat(match[3] == undefined ? 1 : match[3]);

    // Find the maximum and minimum of the RGB components //
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    // Calculate the brightness //
    const lightness = (max + min) / 2;

    let hue, saturation;

    // If the components are equal, saturation is 0 //
    if (max === min) {
        hue = saturation = 0;
    } else {
        const delta = max - min;
        saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

        switch (max) {
            case r:
                hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                hue = ((b - r) / delta + 2) / 6;
                break;
            case b:
                hue = ((r - g) / delta + 4) / 6;
                break;
        }
    }

    let h = Math.round(hue * 360);
    let s = Math.round(saturation * 100);
    let l = Math.round(lightness * 100);

    return { h, s, l, a };
}







// ================================================================= //

// setTimeout(() => { changeHue(170); }, 0);

setTimeout(() => {
    fillCode(0, false);
}, 1);

function formChanged() {
    let range = document.getElementById("range").value;
    let checkbox = document.getElementById("checkbox").checked;
    changeHue(range, checkbox);
    fillCode(range, checkbox);
}

function fillCode(hue, maxSaturation) {
    let codi = document.getElementById("codi-hidden").innerHTML;

    codi = `changeHue(${hue}, ${maxSaturation});\n\n${codi}`;


    document.getElementById("codi").innerHTML = codi;
}

function copy() {
    var range = document.createRange();
    range.selectNode(document.getElementsByTagName("pre")[0]);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}
