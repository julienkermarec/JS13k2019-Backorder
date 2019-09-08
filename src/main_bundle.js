
hand = null;
boxs = [];
boxs_left = [];
in_hand = null;
orders = [];
nb_orders = null;
score = 0;
nb_order_completed = 0;
level = 1;
timer = 120;
timer_countdown = null;
timer_interval = null;
default_countdown = 1;


AFRAME.registerComponent('play-listener', {
    init: function () {
        console.log("init play-listener ");
        countdown = null;
        this.el.addEventListener('click', (evt) => {
            console.log("play-listener click");
            console.log("play-listener countdown", countdown);
            if (countdown != null)
                return;
            document.getElementById('camera').setAttribute('wasd-controls', '');
            document.getElementById('menu').setAttribute('visible', 'false');
            document.getElementById('menu').setAttribute('position', '0 4.75 0.5');
            document.getElementById('menu_home').setAttribute('visible', 'false');
            document.getElementById("menu_home").setAttribute('position', '0 0 0');
            document.getElementById('view_countdown_text').setAttribute('text', 'anchor:align;width:7;color:black;value:' +
                countdown + ';align:center;shader:sdf');
            start()
        });
    }
});


AFRAME.registerComponent('cursor-listener', {
    init: function () {
        var COLORS = ['red', 'green', 'blue', 'purple', 'pink', 'gray', 'brown'];
        this.el.addEventListener('click', function (evt) {
            var randomIndex = Math.floor(Math.random() * COLORS.length);
            this.setAttribute('material', 'color', COLORS[randomIndex]);
            console.log('I was clicked at: ', evt.detail.intersection.point);
        });
    }
});


AFRAME.registerComponent('instructions-listener', {
    init: function () {
        console.log("init instructions-listener")
        this.el.addEventListener('click', (evt) => {
            console.log("click instructions-listener")
            setTimeout(() => {
                if (menu) {
                    document.getElementById('menu_home').setAttribute('visible', 'false');
                    document.getElementById("menu_home").setAttribute('position', '0 5 0');
                    document.getElementById('menu_instructions').setAttribute('visible', 'true');
                    document.getElementById("menu_instructions").setAttribute('position', '0 0 0.05');
                }
            }, 50);
        });
    }
});

AFRAME.registerComponent('back-listener', {
    init: function () {
        console.log("init back-listener")
        this.el.addEventListener('click', (evt) => {
            console.log("click back-listener")
            setTimeout(() => {
                document.getElementById('menu_instructions').setAttribute('visible', 'false');
                document.getElementById('menu_instructions').setAttribute('position', '0 5 0');
                document.getElementById('menu_home').setAttribute('visible', 'true');
                document.getElementById('menu_home').setAttribute('position', '0 0 0.05');
            }, 50)
        });


        init();
    }
});

AFRAME.registerComponent('score-listener', {
    init: function () {
        console.log("init score-listener ")
        this.el.addEventListener('click', (evt) => {
            console.log("click score-listener ");
            setTimeout(() => {
                console.log("go to next level ?")
                timer_countdown > 0 ? start(level++) : start(level);
            }, 50)
        });
    }
});


AFRAME.registerComponent('time-listener', {
    init: function () {
        this.el.addEventListener('click', function (evt) {
            console.log("time-lsitener this", this.id);
            console.log('I was clicked at: ', evt.detail.intersection.point);
            // playError("time", 0);
        })
    }
});
AFRAME.registerComponent('dock-listener', {
    init: function () {
        console.log("dock-listener init");
        this.el.addEventListener('click', function (evt) {
            console.log("dock-listener this", this.parentNode.id);
            console.log("in_hand", in_hand);
            // playError("dock", 0);
            country = this.parentNode.id;
            if (orders.length == 0)
                return;
            if (in_hand != null) {
                box_id = in_hand;
                box_e = document.getElementById(box_id);
                console.log("boxs", boxs);
                console.log("nb_order_completed", nb_order_completed);
                console.log("orders", orders);
                console.log("box_e.id", box_e.getAttribute('data-key'));
                console.log("boxs[nb_orders - boxs_left.length].key", boxs[nb_order_completed].key);
                if (box_e.getAttribute('data-key').toString() !== orders[nb_order_completed].key.toString()) {
                    playError("Bad order", 10);
                    return;
                }
                if (box_e.getAttribute("data-country") !== this.parentNode.id) {
                    playError("Bad country", 10);
                    return;
                }
                validOrder(box_id);
                hb = document.getElementById('hb');
                dhbct = document.getElementById('hb_' + country);
                posy = 1.255 + (box_e.getAttribute('data-height') / 2)
                dhbct.setAttribute('position', '0 ' + posy + ' -0.5');
                dhbct.setAttribute('visible', 'true');
                dhbct.setAttribute('animation', 'property: position; to: 0 ' + posy + ' -1.5; dur: 2000');

                // animation = createAnimation('position','0 ' + posy + ' -0.5','ease',0,'normal',2000,0);

                // hbct.appendChild(animation);
                // box_e.childNodes[0].setAttribute('opacity','1')
                box_e.setAttribute('visible', 'false')
                hb.setAttribute("visible", "false");
                hb.setAttribute("position", "0 -4.8 -0.3");

                dhbc = document.getElementById('hbc_' + country);
                dhbt1 = document.getElementById('hbt1_' + country);
                dhbt2 = document.getElementById('hbt2_' + country);
                dhbcity = document.getElementById('hbcity_' + country);
                dhbcityt = document.getElementById('hbcityt_' + country);
                dhbc.setAttribute("height", box_e.getAttribute('data-width')); // LARGEUR
                dhbc.setAttribute("width", box_e.getAttribute('data-depth')); // DEPTH
                dhbc.setAttribute("depth", box_e.getAttribute('data-height')); // HAUTEUR
                dhbc.setAttribute("color", box_e.getAttribute('data-color'));
                dhbt1.setAttribute("text", "anchor:align;width:3.3;color:white;value:" + box_e.getAttribute('data-text') + ";align:center;shader:sdf");
                dhbt2.setAttribute("text", "anchor:align;width:3.3;color:white;value:" + box_e.getAttribute('data-numb') + ";align:center;shader:sdf");

                dhbcity.setAttribute("depth", box_e.getAttribute('data-width'));
                dhbcityt.setAttribute("text", "width: 1.5; color: black; value: " + box_e.getAttribute('data-city') + "; align: center;shader:sdf");

                setTimeout(() => {
                    dhbct.setAttribute('visible', 'false');
                }, 2000)

                in_hand = null;
            }
        });
    }
});


airports = {
    france:
        [
            { code: 'CDG', title: 'Charles de Gaulle International Airport', city: 'Paris' },
            { code: 'NCE', title: 'Nice-Côte d\'Azur Airport', city: 'Nice' },
            { code: 'LYS', title: 'Lyon Saint-Exupery Airport', city: 'Lyon' },
            { code: 'MRS', title: 'Marseille Provence Airport', city: 'Marseille' },
            { code: 'TLS', title: 'Toulouse-Blagnac Airport', city: 'Toulouse/Blagnac' },
            { code: 'ORY', title: 'Paris-Orly Airport', city: 'Paris' },
            { code: 'BSL', title: 'EuroAirport Basel-Mulhouse-Freiburg Airport', city: 'Bale/Mulhouse' },
            { code: 'BOD', title: 'Bordeaux-Merignac Airport', city: 'Bordeaux/Merignac' },
            { code: 'NTE', title: 'Nantes Atlantique Airport', city: 'Nantes' },
            { code: 'SXB', title: 'Strasbourg Airport', city: 'Strasbourg' },
            { code: 'LIL', title: 'Lille-Lesquin Airport', city: 'Lille/Lesquin' },
            { code: 'AJA', title: 'Ajaccio-Napoleon Bonaparte Airport', city: 'Ajaccio/Napoleon Bonaparte' },
            { code: 'BES', title: 'Brest Bretagne Airport', city: 'Brest/Guipavas' },
            { code: 'BIA', title: 'Bastia-Poretta Airport', city: 'Bastia/Poretta' },
            { code: 'MPL', title: 'Montpellier-Mediterranee Airport', city: 'Montpellier/Mediterranee' },
            { code: 'CLY', title: 'Calvi-Sainte-Catherine Airport', city: 'Calvi/Sainte-Catherine' },
            { code: 'FSC', title: 'Figari Sud-Corse Airport', city: 'Figari Sud-Corse' },
            { code: 'RNS', title: 'Rennes-Saint-Jacques Airport', city: 'Rennes/Saint-Jacques' },
            { code: 'BIQ', title: 'Biarritz-Anglet-Bayonne Airport', city: 'Biarritz/Anglet/Bayonne' },
            { code: 'EGC', title: 'Bergerac-Roumanière Airport', city: 'Bergerac/Roumanière' },
            { code: 'LIG', title: 'Limoges Airport', city: 'Limoges/Bellegarde' },
            { code: 'CFE', title: 'Clermont-Ferrand Auvergne Airport', city: 'Clermont-Ferrand/Auvergne' },
            { code: 'LRH', title: 'La Rochelle-Ile de Re Airport', city: 'La Rochelle/Ile de Re' },
            { code: 'PUF', title: 'Pau Pyrenees Airport', city: 'Pau/Pyrenees (Uzein)' },
            { code: 'LDE', title: 'Tarbes-Lourdes-Pyrenees Airport', city: 'Tarbes/Lourdes/Pyrenees' },
            { code: 'BVE', title: 'Brive Souillac Airport', city: 'Brive' },
            { code: 'EBU', title: 'Saint-etienne-Boutheon Airport', city: 'Saint-etienne/Boutheon' },
            { code: 'PGF', title: 'Perpignan-Rivesaltes (Llabanère) Airport', city: 'Perpignan/Rivesaltes' },
            { code: 'BVA', title: 'Paris Beauvais Tille Airport', city: 'Beauvais/Tille' },
            { code: 'PIS', title: 'Poitiers-Biard Airport', city: 'Poitiers/Biard' }
        ],
    germany: [
        { code: 'FRA', title: 'Frankfurt am Main Airport', city: 'Frankfurt am Main' },
        { code: 'MUC', title: 'Munich Airport', city: 'Munich' },
        { code: 'DUS', title: 'Dusseldorf Airport', city: 'Dusseldorf' },
        { code: 'TXL', title: 'Berlin - Tegel Airport', city: 'Berlin' },
        { code: 'HAM', title: 'Hamburg Airport', city: 'Hamburg' },
        { code: 'STR', title: 'Stuttgart Airport', city: 'Stuttgart' },
        { code: 'CGN', title: 'Cologne Bonn Airport', city: 'Cologne' },
        { code: 'HAJ', title: 'Hannover Airport', city: 'Hannover' },
        { code: 'SXF', title: 'Berlin - Schonefeld Airport', city: 'Berlin' },
        { code: 'NUE', title: 'Nuremberg Airport', city: 'Nuremberg' },
        { code: 'LEJ', title: 'Leipzig / Halle Airport', city: 'Leipzig' },
        { code: 'BRE', title: 'Bremen Airport', city: 'Bremen' },
        { code: 'DRS', title: 'Dresden Airport', city: 'Dresden' },
        { code: 'DTM', title: 'Dortmund Airport', city: 'Dortmund' },
        { code: 'FMM', title: 'Memmingen Allgau Airport', city: 'Memmingen' },
        { code: 'FDH', title: 'Friedrichshafen Airport', city: 'Friedrichshafen' },
        { code: 'FKB', title: 'Karlsruhe Baden - Baden Airport', city: 'Baden - Baden' },
        { code: 'FMO', title: 'Munster Osnabrück Airport', city: 'Münster' },
        { code: 'SCN', title: 'Saarbrucken Airport', city: 'Saarbrucken' },
        { code: 'PAD', title: 'Paderborn Lippstadt Airport', city: 'Paderborn' },
        { code: 'GWT', title: 'Westerland Sylt Airport', city: 'Westerland' },
        { code: 'RLG', title: 'Rostock - Laage Airport', city: 'Rostock' },
        { code: 'HHN', title: 'Frankfurt - Hahn Airport', city: 'Frankfurt am Main' },
        { code: 'LBC', title: 'Lubeck Blankensee Airport', city: 'Lubeck' },
        { code: 'KSF', title: 'Kassel - Calden Airport', city: 'Kassel' },
        { code: 'HDF', title: 'Heringsdorf Airport', city: 'Heringsdorf' },
        { code: 'ERF', title: 'Erfurt Airport', city: 'Erfurt' },
        { code: 'MHG', title: 'Mannheim - City Airport', city: 'Mannheim' },
        { code: 'NRN', title: 'Weeze Airport', city: 'Weeze' }
    ],
    italy: [
        { code: 'FCO', title: 'Leonardo da Vinci–Fiumicino Airport', city: 'Rome' },
        { code: 'MXP', title: 'Malpensa International Airport', city: 'Milan' },
        { code: 'VCE', title: 'Venice Marco Polo Airport', city: 'Venice' },
        { code: 'BLQ', title: 'Bologna Guglielmo Marconi Airport', city: 'Bologna' },
        { code: 'NAP', title: 'Naples International Airport', city: 'Napoli' },
        { code: 'CTA', title: 'Catania-Fontanarossa Airport', city: 'Catania' },
        { code: 'LIN', title: 'Milano Linate Airport', city: 'Milan' },
        { code: 'TRN', title: 'Turin Airport', city: 'Torino' },
        { code: 'FLR', title: 'Peretola Airport', city: 'Firenze' },
        { code: 'VRN', title: 'Verona Villafranca Airport', city: 'Verona' },
        { code: 'PMO', title: 'Falcone–Borsellino Airport', city: 'Palermo' },
        { code: 'OLB', title: 'Olbia Costa Smeralda Airport', city: 'Olbia (SS)' },
        { code: 'PSA', title: 'Pisa International Airport', city: 'Pisa' },
        { code: 'BRI', title: 'Bari Karol Wojtyła Airport', city: 'Bari' },
        { code: 'GOA', title: 'Genoa Cristoforo Colombo Airport', city: 'Genova' },
        { code: 'CAG', title: 'Cagliari Elmas Airport', city: 'Cagliari' },
        { code: 'SUF', title: 'Lamezia Terme Airport', city: 'Lamezia Terme (CZ)' },
        { code: 'BGY', title: 'Il Caravaggio International Airport', city: 'Bergamo' },
        { code: 'BDS', title: 'Brindisi – Salento Airport', city: 'Brindisi' },
        { code: 'AHO', title: 'Alghero-Fertilia Airport', city: 'Alghero' },
        { code: 'AOI', title: 'Ancona Falconara Airport', city: 'Ancona' },
        { code: 'TSF', title: 'Treviso-Sant\'Angelo Airport', city: 'Treviso' },
        { code: 'CUF', title: 'Cuneo International Airport', city: 'Cuneo' },
        { code: 'TRS', title: 'Trieste–Friuli Venezia Giulia Airport', city: 'Trieste' },
        { code: 'RMI', title: 'Federico Fellini International Airport', city: 'Rimini' },
        { code: 'REG', title: 'Reggio Calabria Airport', city: 'Reggio Calabria' },
        { code: 'BZO', title: 'Bolzano Airport', city: 'Bolzano' },
        { code: 'CIA', title: 'Ciampino–G. B. Pastine International Airport', city: 'Rome' },
        { code: 'EBA', title: 'Marina Di Campo Airport', city: 'Marina Di Campo' },
        { code: 'PEG', title: 'Perugia San Francesco d\'Assisi – Umbria International Airport', city: 'Perugia' }
    ]
}
function createText(type, text, position = null, rotation = null, scale = null) {
    object = document.createElement(type);
    object.setAttribute('text', text);
    object.setAttribute('position', position);
    object.setAttribute('rotation', rotation);
    object.setAttribute('scale', scale);
    return object;
}
function createObject(type, width = 1, height = 1, depth = null, position = null, rotation = null, scale = null, color = null, opacity = null) {
    object = document.createElement(type);
    object.setAttribute('width', width);
    object.setAttribute('height', height);
    object.setAttribute('depth', depth);
    object.setAttribute('position', position);
    object.setAttribute('rotation', rotation);
    object.setAttribute('scale', scale);
    object.setAttribute('color', color);
    object.setAttribute('opacity', opacity != null ? opacity : 1);
    return object;
}

function createAnimation(attribute, to, easing, delay, direction, dur, repeat) {
    animation = document.createElement('a-animation');
    animation.setAttribute('attribute', attribute);
    animation.setAttribute('to', to);
    animation.setAttribute('easing', easing);
    animation.setAttribute('delay', delay);
    animation.setAttribute('direction', direction);
    animation.setAttribute('dur', dur);
    animation.setAttribute('repeat', repeat);
    return animation;
}

function updateBoxs() {
    for (let i = 0; i < (6 * 2 * 3); i++) {
        // for (let i = 0; i < 6; i++) {
        eb = document.getElementById('box_' + i);
        m = -0.55;
        if (i % 2 !== 0)
            m = 0.55;
        // text = randLetter();
        rh = (3.7 + Math.floor(Math.random() * 7.5) + 1) * 0.1;
        rw = (3.2 + Math.floor(Math.random() * 7.5) + 1) * 0.1;
        // rh = 1;
        // rw = 0.5;
        numb = Math.random().toString().slice(2, 5);
        airport = null;
        while (airport == null || airport.city.length / 30 > rw) {
            airport = randAirport();
            text = airport.code;
            destination = airport.country;
            city = airport.city;
            // console.log(airport.code, numb, airport.city.length / 30, rw, airport.city.length / 30 > rw);
        }
        key = text + numb;
        // eb.id = key;
        colors = ["#EDD19F", "brown", "orange"];
        let color = colors[randArray(colors)];
        eb.innerHTML = "";

        // b = createObject("a-box", 0.8, rh, rw, "0 0 0", "0 0 0", null, color);
        b2 = createObject("a-box", 0.03, 0.3, 0.4, "0.4 0 0", "0 0 0", null, "black");
        b3 = createObject("a-box", 0.03, 0.07, rw, "0.4 0.2 0", "0 0 0", null, "white");
        t2 = createText("a-text", "anchor:align;width:3.3;color:white;value:" + text + ";align:center;shader:sdf", "0.02 0.06 0", "0 90 0", "1 1 1");
        t3 = createText("a-text", "anchor:align;width:3.3;color:white;value:" + numb + ";align:center;shader:sdf", "0.02 -0.06 0", "0 90 0", "1 1 1");
        t4 = createText("a-text", "anchor:align;width:1.5;color:black;value:" + city + ";align:center;shader:sdf", "0.02 0 0", "0 90 0", "1 1 1");
        // b.appendChild(b2);
        // b.appendChild(b3);
        b3.appendChild(t4);
        b2.appendChild(t2);
        b2.appendChild(t3);

        eb.removeEventListener('click', () => { });
        eb.innerHTML = "";
        eb.appendChild(b2);
        eb.appendChild(b3);

        // eb.appendChild(b);


        // console.log("eb", eb);
        // eb.childNodes[0].setAttribute("width", rw);
        // eb.childNodes[0].setAttribute("height", rh);
        eb.setAttribute('geometry', 'primitive: box; width: 0.8; height: ' + rh + '; depth: ' + rw + '');
        eb.setAttribute('material', 'color: ' + color + '; opacity: 1; shader: flat');
        // console.log("rh", rh);
        eb.setAttribute('position', '0 ' + (rh / 2) + ' ' + m);

        eb.setAttribute('visible', 'true');
        eb.setAttribute('data-text', text);
        eb.setAttribute('data-numb', numb);
        eb.setAttribute('data-height', rh);
        eb.setAttribute('data-width', rw);
        eb.setAttribute('data-depth', 0.8);
        eb.setAttribute('data-color', color);
        eb.setAttribute('data-key', key);
        eb.setAttribute('data-city', airport.city);
        eb.setAttribute('data-country', airport.country);
        eb.setAttribute('data-title', airport.title);
        boxs.push({
            text: text,
            numb: numb,
            country: airport.country,
            city: airport.city,
            title: airport.title,
            key: key
        });
        //END CLICK
    }

    // document.getElementById("raycaster").components.raycaster.refreshObjects();
}
function createEtageres() {


    hl = document.getElementById('hl');
    hr = document.getElementById('hr');
    hb = document.getElementById('hb');
    hbc = document.getElementById('hbc');
    hbt1 = document.getElementById('hbt1');
    hbt2 = document.getElementById('hbt2');
    hbcity = document.getElementById('hbcity');
    hbcityt = document.getElementById('hbcityt');

    if (document.getElementById("etageres"))
        document.getElementById("etageres").innerHTML = "";
    console.log("initEtageres");
    box_id = 0;
    etageres = [['0 0 0', '0 0 0'], ['0 0 0', '0 -180 0'], ['0 0 0', '0 90 0'], ['0 0 2.5', '0 0 0'], ['0 0 -2.5', '0 -180 0'], ['2.5 0 0', '0 90 0']]
    for (let etagere of etageres) {
        //ETAGERE
        e = document.createElement('a-entity');
        e.setAttribute('position', etagere[0]);
        e.setAttribute('rotation', etagere[1]);
        //PIEDS
        ppos = ["-2.6 1.5 -2.4", "-2.6 1.5 -0.1", "-3.9 1.5 -0.1", "-3.9 1.5 -2.4"];
        for (let p of ppos) {
            f = createObject("a-box", 1, 3, 1, p, null, "0.1 1 0.1", "#A27B4B");
            e.appendChild(f);
        }
        //PLAQUE
        hpos = ["0.1", "1.3", "02.5"];
        for (let p of hpos) {
            h = createObject("a-box", 1.5, 0.1, 2.5, "-3.25 " + p + " -1.250", null, "1 1 1", "black");
            e.appendChild(h);
        }
        //CARTONS
        hpos = ["0.1", "1.3", "02.5"];
        for (let p of hpos) {
            h = createObject("a-box", 1.5, 0.1, 2.5, "-3.25 " + p + " -1.250", null, "1 1 1", "black");
            for (let bbox of [0, 1]) {
                eb = document.createElement('a-entity');
                eb.classList.add('clickable');
                eb.setAttribute("mixin", "box");
                eb.id = "box_" + box_id;
                // START CLICK
                eb.addEventListener('click', function (evt) {
                    if (orders.length == 0)
                        return;
                    console.log("----------------------");
                    console.log("eb-click this", this);
                    console.log("eb-click evt", evt);
                    // console.log("eb-click id", this.id);
                    key = this.getAttribute("data-key");
                    color = this.getAttribute("data-color");
                    // console.log("eb-click data-key", key);
                    // console.log("in_hand", in_hand);
                    if (in_hand != null) {
                        if (this.id == in_hand) {
                            // this.childNodes[0].setAttribute('opacity', '1')
                            this.setAttribute('material', 'color: ' + color + '; opacity: 1; shader: flat');
                            this.childNodes[0].setAttribute('visible', 'true')
                            this.childNodes[1].setAttribute('visible', 'true')
                            hb.setAttribute("visible", "false");
                            hb.setAttribute("position", "0 -4.8 -0.3");
                            this.setAttribute('material', 'color: ' + color + '; opacity: 1; shader: flat');
                            in_hand = null;
                        }
                        else {
                            playError("Bad place", 0);
                        }
                    }
                    else {
                        in_hand = this.id;
                        this.setAttribute('material', 'color: ' + color + '; opacity: 0.3; shader: flat');
                        // this.childNodes[0].setAttribute('opacity', '0.3')
                        this.childNodes[0].setAttribute('visible', 'false')
                        this.childNodes[1].setAttribute('visible', 'false')
                        // this.setAttribute('material', 'color', 'blue');
                        hb.setAttribute("visible", "true");
                        hb.setAttribute("position", "0 -0.8 -0.3");
                        hbc.setAttribute("depth", 0.790);
                        //depth = largeur
                        //width = depth
                        //height = height
                        console.log("this.getAttribute('data-depth')", this.getAttribute('data-depth'));
                        hrl = '-20 0 0';
                        hrr = '-20 0 0';
                        if (this.getAttribute('data-width') < 0.5) {
                            hrl = '-20 -15 0';
                            hrr = '-20 15 0';
                        }
                        else if (this.getAttribute('data-width') < 0.7) {
                            hrl = '-20 -8 0';
                            hrr = '-20 8 0';
                        }
                        else if (this.getAttribute('data-width') > 0.95) {
                            hrl = '-20 8 0';
                            hrr = '-20 -8 0';
                        }
                        console.log("hrl", hrl);
                        hl.setAttribute('rotation', hrl);
                        hr.setAttribute('rotation', hrr);
                        hbc.setAttribute("height", this.getAttribute('data-width')); // LARGEUR
                        hbc.setAttribute("width", this.getAttribute('data-depth')); // DEPTH
                        hbc.setAttribute("depth", this.getAttribute('data-height')); // HAUTEUR
                        hbc.setAttribute("color", this.getAttribute('data-color'));
                        hbcity.setAttribute("depth", this.getAttribute('data-width'));
                        hbt1.setAttribute("text", "anchor:align;width:3.3;color:white;value:" + this.getAttribute('data-text') + ";align:center;shader:sdf");
                        hbt2.setAttribute("text", "anchor:align;width:3.3;color:white;value:" + this.getAttribute('data-numb') + ";align:center;shader:sdf");
                        hbcityt.setAttribute("text", "width: 1.5; color: black; value: " + this.getAttribute('data-city') + "; align: center");
                        console.log('I was clicked at: ', evt.detail.intersection.point);


                    }
                });
                //END CLICK
                box_id++;
                h.appendChild(eb);
            }
            e.appendChild(h);
        }


        if (document.getElementById("etageres")) {
            document.getElementById("etageres").appendChild(e);
        }
        //     for (box of boxs) {
        //         console.log("box.key", box.key);
        //         console.log("document.getElementById(box.key)", document.getElementById('etageres').components);
        //         document.getElementById(box.key).components.raycaster.refreshObjects();
        //     }
        // }
    }

}
// });

function playError(text, points) {
    console.log("playError", points);
    score -= points;
    updateScore();
    document.getElementById("error_text").setAttribute('text', 'anchor:align;width:2.8;color:white;value:' + text + ';align:center;shader:sdf');
    document.getElementById("error").setAttribute('visible', 'true');
    setTimeout(() => {
        document.getElementById("error").setAttribute('visible', 'false');
    }, 800);

}

function randArray(myArray) {
    return Math.floor(Math.random() * myArray.length);
}
function randArrayItem(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}
function randAirport() {

    let random_airport = Math.floor(Math.random() * 3);
    let random_airport_index;
    let country;
    if (random_airport == 0) {
        country = 'france';
    }
    if (random_airport == 1) {
        country = 'germany';
    }
    if (random_airport == 2) {
        country = 'italy';
    }
    random_airport_index = Math.floor(Math.random() * airports[country].length);
    // console.log("random_airport",random_airport);
    // console.log("random_airport_index",random_airport_index);

    return {
        country: country,
        code: airports[country][random_airport_index].code,
        title: airports[country][random_airport_index].title,
        city: airports[country][random_airport_index].city
    }
}
function randLetter() {
    return Math.random().toString(36).replace(/[0-9]/g, '').slice(1, 4).toUpperCase()
}

function updateScore() {
    console.log("updateScore", score);
    document.getElementById('score').setAttribute("text", "anchor:align;width:1.2;color:white;value:Score : " + score + ";align:center;shader:sdf");
}
function updateLevel() {
    document.getElementById('level').setAttribute("text", "anchor:align;width:1.2;color:white;value:Level " + level + ";align:center;shader:sdf");
}
function validOrder(box_id) {
    console.log("validOrder", box_id)
    element = document.getElementById(box_id);
    console.log("element", element);
    key = element.getAttribute('data-key');
    nb_order_completed++;
    score += 20;
    updateScore();

    document.getElementById("order_" + key).childNodes[0].setAttribute("opacity", "0.3");
    // document.getElementById("order_" + key).setAttribute("visible","false");
    list = document.getElementById("view_orders_list");
    left = -0.3 * (nb_order_completed);
    list.setAttribute("position", left + " 0 0");
    if (nb_order_completed == nb_orders) {
        timer_element = document.getElementById("timer");
        clearInterval(timer_interval);
        timer_element.setAttribute('visible', 'false');
        finishScreen();
    }
}

function start() {
    orders = [];
    boxs = [];
    boxs_left = [];
    in_hand = null;
    nb_order_completed = 0;
    score = 0;
    updateScore();
    updateLevel();
    console.log("start", level);
    updateBoxs();

    document.getElementById('menu').setAttribute('visible', 'false');
    document.getElementById('menu').setAttribute('position', '0 4.75 -0.65');
    document.getElementById('menu_home').setAttribute('visible', 'false');
    document.getElementById('menu_score').setAttribute('visible', 'false');
    document.getElementById('menu_instructions').setAttribute('visible', 'false');

    countdown = default_countdown;
    console.log("start countdown", countdown);
    document.getElementById('view_countdown_text').setAttribute('text', 'anchor:align;width:7;color:black;value:' + countdown + ';align:center;shader:sdf');
    document.getElementById('view_countdown').setAttribute('visible', 'true');

    document.getElementById('camera').setAttribute('wasd-controls', 'acceleration: 180');
    interval_countdown = setInterval(() => {
        console.log("countdown", countdown);
        countdown--;
        document.getElementById('view_countdown_text').setAttribute('text', 'anchor:align;width:7;color:black;value:' + countdown + ';align:center;shader:sdf');

        if (countdown == 0) {
            console.log("clear interval");
            clearInterval(interval_countdown);
            document.getElementById('view_countdown').setAttribute('visible', 'false');
            countdown = null;
            launch();
        }
    }, 1000);
}
function launch() {
    console.log("--- launch ----- ");
    nb_orders = 0 + (4 * level);
    boxs_left = JSON.parse(JSON.stringify(boxs));
    for (let i = 0; i < nb_orders; i++) {
        addOrder();
    }
    timer_countdown = timer;
    timer_interval = setInterval(() => {
        timer_countdown--;
        // console.log("timer_countdown", timer_countdown);
        // console.log("timer", timer);
        width = 0.285 * (timer_countdown / timer);
        left = (width / 2) - 0.1425;
        // console.log("width", width);
        timer_element = document.getElementById("timer");
        timer_element.setAttribute("position", left + " -0.002 0.002")
        timer_element.setAttribute("width", width);
        timer_element.setAttribute('visible', 'true');
        if (timer_countdown == 0) {
            playError("finished", 0);
            clearInterval(timer_interval);
            timer_element.setAttribute('visible', 'false');
            finishScreen()
        }
    }, 1000)
}

function finishScreen() {

    document.getElementById('view_orders_list').innerHTML = "";
    document.getElementById('view_orders_list').setAttribute('position', '0 0 0');
    document.getElementById("menu").setAttribute('visible', 'true');
    document.getElementById('menu').setAttribute('position', '0 1.75 -0.65');
    document.getElementById("menu_score").setAttribute('visible', 'true');
    document.getElementById("menu_score").setAttribute('position', '0 0 0.05');
    elements = ["menu_score_level", "menu_score_score", "menu_score_timer"];

    title = timer_countdown > 0 ? 'ORDERS COMPLETED !' : (nb_orders - nb_order_completed) + ' ORDERS LEFT !';
    document.getElementById("menu_score_title").setAttribute("text", "anchor:align;width:2.5;color:white;value:" + title + ";align:center;shader:sdf")
    // (" + timer_countdown + " sec left)
    for (let element of elements) {
        text = (element == "menu_score_level" ? "Level : " + level : (element == "menu_score_score" ? "Score : " + score : (timer_countdown > 0 ? "Time : " + (timer - timer_countdown) + "seconds" : nb_order_completed + "/" + nb_orders + " orders")));
        document.getElementById(element).setAttribute("text", "anchor:align;lineHeight: 40; wrapCount: 30; width:1.3;color:white;value:" + text + ";align:center;shader:sdf")
    }

    text = timer_countdown > 0 ? 'Next level ->' : '<- Retry';
    document.getElementById('menu_score_button').setAttribute('text', 'anchor:align;width:2.1;color:white;value:' + text + ';align:center;shader:sdf');

    // document.getElementById('camera').childNodes[1].setAttribute('wasd-controls-enabled', 'false');
    // document.getElementById('camera').childNodes[1].setAttribute('wasd-controls', '');

    // document.getElementById('camera').setAttribute('position', "0 1.252 -3");
    // //console.log('YOU LO0SE');
    // document.getElementById('camera2').setAttribute('rotation', "0 0 0");
    // document.getElementById('camera2').setAttribute('position', '0 2 1.8');
    // console.log("position = ", document.getElementById('camera2').getAttribute('position'));
    // console.log("rotation = ", document.getElementById('camera2').getAttribute('rotation'));
    let rotation = document.getElementById('camera').getAttribute('rotation');
    console.log("rotation", rotation)
    // document.getElementById('rig').setAttribute('rotation', '0 -90 0');
    document.getElementById('camera').setAttribute('position', '0 2.02 0');
    document.getElementById('camera').removeAttribute('wasd-controls');
    document.getElementById('rig').setAttribute('rotation', '0 ' + (rotation.y * -1) + ' 0');
    // console.log("position = ", document.getElementById('camera2').getAttribute('position'));
    // console.log("rotation = ", document.getElementById('camera').getAttribute('rotation'));
}
function addOrder() {
    random_index = randArray(boxs_left);
    box = boxs_left[random_index];
    boxs_left.splice(random_index, 1);
    //   <a-entity id="order_1" position="0 -0.152 0" visible="true">
    //   <a-box width="0.2" height="0.150" depth="0.01" position="0 0 0" scale="" color="black" material=""
    //     opacity="1">
    //     <a-text text="anchor:align;width:1.2;color:white;value:RGB;align:center;shader:sdf"
    //       position="0 0.03 0.007" rotation="0 0 0" scale="1 1 1"></a-text>
    //     <a-text text="anchor:align;width:1.2;color:white;value:123;align:center;shader:sdf"
    //       position="0 -0.035 0.007" rotation="0 0 0" scale="1 1 1"></a-text>
    //   </a-box>
    // </a-entity>
    left = orders.length > 0 ? 0.3 * orders.length : 0;
    oe = document.createElement('a-entity');
    oe.setAttribute('position', left + ' -0.152 0');
    oe.setAttribute('id', "order_" + box.key);
    ob = createObject('a-box', 0.2, 0.150, 0.01, null, null, null, "black");
    obt1 = createText("a-text", "anchor:align;width:1.2;color:white;value:" + box.text + ";align:center;shader:sdf", "0 0.03 0.007", null, null);
    obt2 = createText("a-text", "anchor:align;width:1.2;color:white;value:" + box.numb + ";align:center;shader:sdf", "0 -0.035 0.007", null, null);

    ob.appendChild(obt1);
    ob.appendChild(obt2);
    oe.appendChild(ob);
    document.getElementById('view_orders_list').appendChild(oe);

    orders.push(box);
}




function init() {

    // console.log("position = ", document.getElementById('camera2').getAttribute('position'));
    // console.log("rotation = ", document.getElementById('camera2').getAttribute('rotation'));
    createEtageres();
    updateBoxs();

    var song = { songData: [{ i: [2, 255, 128, 0, 1, 154, 116, 9, 0, 0, 15, 4, 49, 0, 0, 0, 84, 4, 1, 2, 53, 25, 7, 32, 39, 3, 45, 4], p: [1, 11, 2, 3, 4, 10, 5, 6, 12], c: [{ n: [142, , 145, 149, , 142, 145, , 149, 142, , 149, 142, , 145, 149, , 142, 145, , 149, 142, , 149, 130, , , , , 118, , , , , , , 130, , , , , 130], f: [13, , , , , , , , , , , , , , , , , , , , , , , , 40] }, { n: [137, , 140, 144, , 137, 140, , 144, 137, , 144, 137, , 140, 144, , 137, 140, , 144, 137, , 144, 125, , , , , 113, , , , , , , 125, , , , , 125], f: [] }, { n: [144, , 147, 151, , 144, 147, , 151, 144, , 151, 144, , 147, 151, , 144, 147, , 151, 144, , 151, 132, , , , , 120, , , , , , , 132, , , , , 132], f: [] }, { n: [142, , 145, 149, , 142, 145, , 149, 142, , 149, 142, , 145, 149, , 142, 145, , 149, 142, , 149, 130, , , 118, , 118, 130, , , 118, , 118, 130, , , 118, , 118, 130, , , 118, , 118], f: [13, , , , , , , , , , , , , , , , , , , , , , , , 49] }, { n: [137, , 140, 144, , 137, 140, , 144, 137, , 144, 137, , 140, 144, , 137, 140, , 144, 137, , 144, 125, , , 113, , 113, 125, , , 113, , 113, 125, , , 113, , 113, 125, , , 113, , 113], f: [] }, { n: [144, , 147, 151, , 144, 147, , 151, 144, , 151, 144, , 147, 151, , 144, 147, , 151, 144, , 151, 132, , , 120, , 120, 132, , , 120, , 120, 132, , , 120, , 120, 132, , , 120, , 120], f: [] }, { n: [], f: [] }, { n: [], f: [] }, { n: [], f: [] }, { n: [142, , 144, 149, , 142, 144, , 149, 142, , 149, 142, , 144, 149, , 142, 144, , 149, 142, , 149, 130, , , 118, , 118, 130, , , 118, , 118, 130, , , 118, , 118, 130, , , 118, , 118], f: [] }, { n: [142, , 144, 149, , 142, 144, , 149, 142, , 149, 142, , 144, 149, , 142, 144, , 149, 142, , 149, 130, , , , , 118, , , , , , , 130, , , , , 130], f: [] }, { n: [130], f: [] }] }, { i: [0, 255, 123, 1, 3, 156, 118, 7, 1, 7, 4, 6, 37, 0, 0, 0, 0, 0, 0, 2, 26, 66, 1, 39, 0, 0, 0, 0], p: [1, 1, 1, 1, 1, 1, 1, 1, 2, 3], c: [{ n: [135, , , , , , 135, , , , , , 135, , , , , , 135], f: [] }, { n: [135], f: [] }, { n: [], f: [] }] }, { i: [0, 221, 128, 1, 3, 210, 128, 0, 1, 127, 0, 0, 105, 0, 0, 3, 77, 3, 1, 3, 57, 174, 1, 71, 20, 0, 75, 2], p: [, , , , 1, 1, 1, 2, 3], c: [{ n: [, , , 135, , , , , 135, , , 135, , , , 135, , , , , 135, , , 135], f: [13, , , , , , , , , , , , , , , , , , , , , , , , 53] }, { n: [, , , 135, , , , , 135, , , 135, , , , 135, , , , 135, , , 135, 135], f: [] }, { n: [139], f: [13, , , , , , , , , , , , , , , , , , , , , , , , 105] }] }, { i: [2, 146, 140, 0, 2, 224, 128, 3, 0, 0, 112, 17, 134, 0, 3, 3, 179, 4, 1, 3, 41, 218, 11, 45, 150, 3, 111, 4], p: [1, 4, 2, 3, 1, 4, 2, 3, 5], c: [{ n: [130, , , 118], f: [14] }, { n: [125, , , 113], f: [] }, { n: [132, , 139], f: [] }, { n: [130, , 137], f: [] }, { n: [130], f: [14, , , , , , , , , , , , , , , , , , , , , , , , 55] }] }, { i: [2, 40, 140, 1, 0, 0, 140, 0, 0, 255, 5, 0, 20, 0, 0, 0, 0, 0, 0, 3, 161, 192, 0, 16, 67, 4, 7, 1], p: [, , , 2, 1, 1, 1, 1], c: [{ n: [123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123], f: [] }, { n: [, , , , , , , , , , , , 123, , , 123, , , 123, , , 123, 123, 123], f: [] }] }, { i: [3, 146, 140, 0, 3, 224, 128, 3, 0, 0, 4, 0, 56, 124, 4, 0, 80, 4, 1, 1, 49, 146, 11, 37, 119, 4, 72, 2], p: [1, 2, 3, 4, 1, 2, 3, 4, 5], c: [{ n: [, , , 142, , , , , 142, , , 142, , , , 142, , , , , 142, , , 142], f: [14, , , , , , , , , , , , , , , , , , , , , , , , 55] }, { n: [, , , 142, , , , , 142, , , 142, , , , 142, , , , , 142, , , 142], f: [14, , , , , , , , , , , , , , , , , , , , , , , , 39] }, { n: [, , , 137, , , , , 137, , , 137, , , , 137, , , , , 137, , , 137], f: [14, , , , , , , , , , , , , , , , , , , , , , , , 55] }, { n: [, , , 132, , , , , 132, , , 132, , , , 132, , , , , 132, , , 132], f: [14, , , , , , , , , , , , , , , , , , , , , , , , 124] }, { n: [142, 130, 118, 106], f: [14, , , , , , , , , , , , , , , , , , , , , , , , 55] }] }], rowLen: 5703, patternLen: 24, endPattern: 9, numChannels: 6 };
    //----------------------------------------------------------------------------
    // Demo program section
    //----------------------------------------------------------------------------
    // Initialize music generation (player).
    var player = new CPlayer();
    player.init(song);

    done = player.generate() >= 1;

    var done = false;
    setInterval(function () {
        if (done) {
            return;
        }
        var wave = player.createWave();
        var audio = document.createElement("audio");
        audio.src = URL.createObjectURL(new Blob([wave], { type: "audio/wav" }));
        audio.play();

        setInterval(function () {

            var t = audio.currentTime;
            var data = player.getData(t, 300);
        }, 16);
    }, 10);
}
/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*-
*
* Copyright (c) 2011-2013 Marcus Geelnard
*
* This software is provided 'as-is', without any express or implied
* warranty. In no event will the authors be held liable for any damages
* arising from the use of this software.
*
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
*
* 1. The origin of this software must not be misrepresented; you must not
*    claim that you wrote the original software. If you use this software
*    in a product, an acknowledgment in the product documentation would be
*    appreciated but is not required.
*
* 2. Altered source versions must be plainly marked as such, and must not be
*    misrepresented as being the original software.
*
* 3. This notice may not be removed or altered from any source
*    distribution.
*
*/

"use strict";

var CPlayer = function () {

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------

    // Oscillators
    var osc_sin = function (value) {
        return Math.sin(value * 6.283184);
    };

    var osc_saw = function (value) {
        return 2 * (value % 1) - 1;
    };

    var osc_square = function (value) {
        return (value % 1) < 0.5 ? 1 : -1;
    };

    var osc_tri = function (value) {
        var v2 = (value % 1) * 4;
        if (v2 < 2) return v2 - 1;
        return 3 - v2;
    };

    var getnotefreq = function (n) {
        // 174.61.. / 44100 = 0.003959503758 (F3)
        return 0.003959503758 * Math.pow(2, (n - 128) / 12);
    };

    var createNote = function (instr, n, rowLen) {
        var osc1 = mOscillators[instr.i[0]],
            o1vol = instr.i[1],
            o1xenv = instr.i[3],
            osc2 = mOscillators[instr.i[4]],
            o2vol = instr.i[5],
            o2xenv = instr.i[8],
            noiseVol = instr.i[9],
            attack = instr.i[10] * instr.i[10] * 4,
            sustain = instr.i[11] * instr.i[11] * 4,
            release = instr.i[12] * instr.i[12] * 4,
            releaseInv = 1 / release,
            arp = instr.i[13],
            arpInterval = rowLen * Math.pow(2, 2 - instr.i[14]);

        var noteBuf = new Int32Array(attack + sustain + release);

        // Re-trig oscillators
        var c1 = 0, c2 = 0;

        // Local variables.
        var j, j2, e, t, rsample, o1t, o2t;

        // Generate one note (attack + sustain + release)
        for (j = 0, j2 = 0; j < attack + sustain + release; j++ , j2++) {
            if (j2 >= 0) {
                // Switch arpeggio note.
                arp = (arp >> 8) | ((arp & 255) << 4);
                j2 -= arpInterval;

                // Calculate note frequencies for the oscillators
                o1t = getnotefreq(n + (arp & 15) + instr.i[2] - 128);
                o2t = getnotefreq(n + (arp & 15) + instr.i[6] - 128) * (1 + 0.0008 * instr.i[7]);
            }

            // Envelope
            e = 1;
            if (j < attack) {
                e = j / attack;
            } else if (j >= attack + sustain) {
                e -= (j - attack - sustain) * releaseInv;
            }

            // Oscillator 1
            t = o1t;
            if (o1xenv) {
                t *= e * e;
            }
            c1 += t;
            rsample = osc1(c1) * o1vol;

            // Oscillator 2
            t = o2t;
            if (o2xenv) {
                t *= e * e;
            }
            c2 += t;
            rsample += osc2(c2) * o2vol;

            // Noise oscillator
            if (noiseVol) {
                rsample += (2 * Math.random() - 1) * noiseVol;
            }

            // Add to (mono) channel buffer
            noteBuf[j] = (80 * rsample * e) | 0;
        }

        return noteBuf;
    };


    //--------------------------------------------------------------------------
    // Private members
    //--------------------------------------------------------------------------

    // Array of oscillator functions
    var mOscillators = [
        osc_sin,
        osc_square,
        osc_saw,
        osc_tri
    ];

    // Private variables set up by init()
    var mSong, mLastRow, mCurrentCol, mNumWords, mMixBuf;


    //--------------------------------------------------------------------------
    // Initialization
    //--------------------------------------------------------------------------

    this.init = function (song) {
        // Define the song
        mSong = song;

        // Init iteration state variables
        mLastRow = song.endPattern;
        mCurrentCol = 0;

        // Prepare song info
        mNumWords = song.rowLen * song.patternLen * (mLastRow + 1) * 2;

        // Create work buffer (initially cleared)
        mMixBuf = new Int32Array(mNumWords);
    };


    //--------------------------------------------------------------------------
    // Public methods
    //--------------------------------------------------------------------------

    // Generate audio data for a single track
    this.generate = function () {
        // Local variables
        var i, j, b, p, row, col, n, cp,
            k, t, lfor, e, x, rsample, rowStartSample, f, da;

        // Put performance critical items in local variables
        var chnBuf = new Int32Array(mNumWords),
            instr = mSong.songData[mCurrentCol],
            rowLen = mSong.rowLen,
            patternLen = mSong.patternLen;

        // Clear effect state
        var low = 0, band = 0, high;
        var lsample, filterActive = false;

        // Clear note cache.
        var noteCache = [];

        // Patterns
        for (p = 0; p <= mLastRow; ++p) {
            cp = instr.p[p];

            // Pattern rows
            for (row = 0; row < patternLen; ++row) {
                // Execute effect command.
                var cmdNo = cp ? instr.c[cp - 1].f[row] : 0;
                if (cmdNo) {
                    instr.i[cmdNo - 1] = instr.c[cp - 1].f[row + patternLen] || 0;

                    // Clear the note cache since the instrument has changed.
                    if (cmdNo < 16) {
                        noteCache = [];
                    }
                }

                // Put performance critical instrument properties in local variables
                var oscLFO = mOscillators[instr.i[15]],
                    lfoAmt = instr.i[16] / 512,
                    lfoFreq = Math.pow(2, instr.i[17] - 9) / rowLen,
                    fxLFO = instr.i[18],
                    fxFilter = instr.i[19],
                    fxFreq = instr.i[20] * 43.23529 * 3.141592 / 44100,
                    q = 1 - instr.i[21] / 255,
                    dist = instr.i[22] * 1e-5,
                    drive = instr.i[23] / 32,
                    panAmt = instr.i[24] / 512,
                    panFreq = 6.283184 * Math.pow(2, instr.i[25] - 9) / rowLen,
                    dlyAmt = instr.i[26] / 255,
                    dly = instr.i[27] * rowLen & ~1;  // Must be an even number

                // Calculate start sample number for this row in the pattern
                rowStartSample = (p * patternLen + row) * rowLen;

                // Generate notes for this pattern row
                for (col = 0; col < 4; ++col) {
                    n = cp ? instr.c[cp - 1].n[row + col * patternLen] : 0;
                    if (n) {
                        if (!noteCache[n]) {
                            noteCache[n] = createNote(instr, n, rowLen);
                        }

                        // Copy note from the note cache
                        var noteBuf = noteCache[n];
                        for (j = 0, i = rowStartSample * 2; j < noteBuf.length; j++ , i += 2) {
                            chnBuf[i] += noteBuf[j];
                        }
                    }
                }

                // Perform effects for this pattern row
                for (j = 0; j < rowLen; j++) {
                    // Dry mono-sample
                    k = (rowStartSample + j) * 2;
                    rsample = chnBuf[k];

                    // We only do effects if we have some sound input
                    if (rsample || filterActive) {
                        // State variable filter
                        f = fxFreq;
                        if (fxLFO) {
                            f *= oscLFO(lfoFreq * k) * lfoAmt + 0.5;
                        }
                        f = 1.5 * Math.sin(f);
                        low += f * band;
                        high = q * (rsample - band) - low;
                        band += f * high;
                        rsample = fxFilter == 3 ? band : fxFilter == 1 ? high : low;

                        // Distortion
                        if (dist) {
                            rsample *= dist;
                            rsample = rsample < 1 ? rsample > -1 ? osc_sin(rsample * .25) : -1 : 1;
                            rsample /= dist;
                        }

                        // Drive
                        rsample *= drive;

                        // Is the filter active (i.e. still audiable)?
                        filterActive = rsample * rsample > 1e-5;

                        // Panning
                        t = Math.sin(panFreq * k) * panAmt + 0.5;
                        lsample = rsample * (1 - t);
                        rsample *= t;
                    } else {
                        lsample = 0;
                    }

                    // Delay is always done, since it does not need sound input
                    if (k >= dly) {
                        // Left channel = left + right[-p] * t
                        lsample += chnBuf[k - dly + 1] * dlyAmt;

                        // Right channel = right + left[-p] * t
                        rsample += chnBuf[k - dly] * dlyAmt;
                    }

                    // Store in stereo channel buffer (needed for the delay effect)
                    chnBuf[k] = lsample | 0;
                    chnBuf[k + 1] = rsample | 0;

                    // ...and add to stereo mix buffer
                    mMixBuf[k] += lsample | 0;
                    mMixBuf[k + 1] += rsample | 0;
                }
            }
        }

        // Next iteration. Return progress (1.0 == done!).
        mCurrentCol++;
        return mCurrentCol / mSong.numChannels;
    };

    // Create a WAVE formatted Uint8Array from the generated audio data
    this.createWave = function () {
        // Create WAVE header
        var headerLen = 44;
        var l1 = headerLen + mNumWords * 2 - 8;
        var l2 = l1 - 36;
        var wave = new Uint8Array(headerLen + mNumWords * 2);
        wave.set(
            [82, 73, 70, 70,
                l1 & 255, (l1 >> 8) & 255, (l1 >> 16) & 255, (l1 >> 24) & 255,
                87, 65, 86, 69, 102, 109, 116, 32, 16, 0, 0, 0, 1, 0, 2, 0,
                68, 172, 0, 0, 16, 177, 2, 0, 4, 0, 16, 0, 100, 97, 116, 97,
                l2 & 255, (l2 >> 8) & 255, (l2 >> 16) & 255, (l2 >> 24) & 255]
        );

        // Append actual wave data
        for (var i = 0, idx = headerLen; i < mNumWords; ++i) {
            // Note: We clamp here
            var y = mMixBuf[i];
            y = y < -32767 ? -32767 : (y > 32767 ? 32767 : y);
            wave[idx++] = y & 255;
            wave[idx++] = (y >> 8) & 255;
        }

        // Return the WAVE formatted typed array
        return wave;
    };

    // Get n samples of wave data at time t [s]. Wave data in range [-2,2].
    this.getData = function (t, n) {
        var i = 2 * Math.floor(t * 44100);
        var d = new Array(n);
        for (var j = 0; j < 2 * n; j += 1) {
            var k = i + j;
            d[j] = t > 0 && k < mMixBuf.length ? mMixBuf[k] / 32768 : 0;
        }
        return d;
    };
};


  // TODO-LIST
  // -- START SCREEN -
  // -- ORDER INTERFACE 
  // -- INSTRUCTIONS - 
  // -- COUNTDOWN -
  // -- GENERATE ORDER -
  // -- countdown
  // -- SOUNDS 
  // -- SCORE RECORD