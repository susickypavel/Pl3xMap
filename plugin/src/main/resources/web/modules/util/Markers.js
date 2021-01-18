import { P } from '../../map.js';

class Marker {
    constructor(opts) {
        this.opts = opts;
        this.id = this.opts.pop("id");
        this.tooltip = this.opts.pop("tooltip");
    }
    init() {
        for (const key in this.opts) {
            this.marker.options[key] = this.opts[key];
        }
    }
    addTo(layer) {
        this.marker.remove();
        this.marker.addTo(layer);
    }
}

class Options {
    constructor(json) {
        for (const prop in json) {
            this[prop] = json[prop];
        }
    }
    pop(key) {
        const val = this[key];
        delete this[key];
        return val;
    }
}

class Rectangle extends Marker {
    constructor(opts) {
        super(opts);
        const points = this.opts.pop("points");
        this.marker = L.rectangle([P.unproject(points[0].x, points[0].z), P.unproject(points[1].x, points[1].z)]);
        super.init();
    }
}

class PolyLine extends Marker {
    constructor(opts) {
        super(opts);
        const points = this.opts.pop("points");
        const latlng = [];
        for (let i = 0; i < points.length; i++) {
            latlng.push(P.unproject(points[i].x, points[i].z));
        }
        this.marker = L.polyline(latlng);
        super.init();
    }
}

class Polygon extends Marker {
    constructor(opts) {
        super(opts);
        const points = this.opts.pop("points");
        const latlng = [];
        for (let i = 0; i < points.length; i++) {
            latlng.push(P.unproject(points[i].x, points[i].z));
        }
        this.marker = L.polygon(latlng);
        super.init();
    }
}

class Circle extends Marker {
    constructor(opts) {
        super(opts);
        const center = this.opts.pop("center");
        this.marker = L.circle(P.unproject(center.x, center.z), String(opts.pop("radius")));
        super.init();
    }
}

class Icon extends Marker {
    constructor(opts) {
        super(opts);
        const point = this.opts.pop("point");
        const size = this.opts.pop("size");
        const anchor = this.opts.pop("anchor");
        const popup_anchor = this.opts.pop("popup_anchor");
        this.marker = L.marker(P.unproject(point.x, point.z), {
            icon: L.icon({
                iconUrl: `images/icon/${opts.pop("icon")}`,
                iconSize: [size.x, size.z],
                iconAnchor: [anchor.x, anchor.z],
                popupAnchor: [popup_anchor.x, popup_anchor.z]
            })
        }).bindPopup(opts.pop("popup"));
        super.init();
    }
}

export { Marker, Options, Rectangle, PolyLine, Polygon, Circle, Icon };